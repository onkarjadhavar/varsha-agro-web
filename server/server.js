import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
  getInquiryStats,
  authenticateAdmin,
  verifySessionToken,
  revokeSession
} from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Parsing Middleware
app.use(express.json({ limit: "50kb" }));
app.use(cookieParser());

// CORS configuration (handles development and custom domains)
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin) return callback(null, true);
      // Allow localhost & local IP dev servers
      if (
        origin.startsWith("http://localhost:") ||
        origin.startsWith("http://127.0.0.1:") ||
        origin.includes("varshaagro.com")
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive for local setup
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"]
  })
);

// Basic In-Memory Rate Limiting for Public Inquiry Submission (15 requests per 10 mins per IP)
const rateLimitMap = new Map();
function rateLimiter(req, res, next) {
  const ip = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 15;

  let record = rateLimitMap.get(ip);
  if (!record || now - record.startTime > windowMs) {
    record = { count: 1, startTime: now };
    rateLimitMap.set(ip, record);
    return next();
  }

  if (record.count >= maxRequests) {
    return res.status(429).json({
      error: "Too many inquiry submissions from this connection. Please try again after 10 minutes or call us directly."
    });
  }

  record.count += 1;
  next();
}

// Authentication Middleware
function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  let token = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  } else if (req.cookies && req.cookies.va_admin_session) {
    token = req.cookies.va_admin_session;
  }

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing authentication credentials." });
  }

  const session = verifySessionToken(token);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized: Invalid or expired session. Please log in again." });
  }

  req.admin = session.user;
  req.sessionToken = token;
  next();
}

// ==========================================
// PUBLIC INQUIRY API
// ==========================================

// POST /api/inquiries - Submit an inquiry
app.post("/api/inquiries", rateLimiter, (req, res) => {
  try {
    const { name, fullName, phone, email, requirement, message, quantity, source } = req.body || {};
    const customerName = (name || fullName || "").toString().trim();

    // Server-side validation
    if (!customerName) {
      return res.status(400).json({ error: "Customer name is required." });
    }
    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return res.status(400).json({ error: "Phone number is required." });
    }

    // Clean and validate phone (8 to 15 alphanumeric/symbols)
    const cleanPhone = phone.trim();
    if (!/^[0-9+\-\s()]{8,18}$/.test(cleanPhone)) {
      return res.status(400).json({ error: "Please provide a valid contact number." });
    }

    // Validate email if provided
    if (email && typeof email === "string" && email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return res.status(400).json({ error: "Please provide a valid email address." });
      }
    }

    // Sanitize string inputs
    const sanitizedName = customerName.slice(0, 100);
    const sanitizedRequirement = (requirement || "Fresh Eggs").toString().slice(0, 100);
    const sanitizedMessage = message ? message.toString().slice(0, 2000) : "";
    const sanitizedQuantity = quantity ? quantity.toString().slice(0, 100) : "";
    const sanitizedSource = source ? source.toString().slice(0, 100) : "Website Inquiry";

    // Insert directly into SQLite database
    const result = createInquiry({
      name: sanitizedName,
      phone: cleanPhone,
      email: email ? email.trim() : null,
      requirement: sanitizedRequirement,
      message: sanitizedMessage,
      quantity: sanitizedQuantity,
      source: sanitizedSource
    });

    console.log(`[INQUIRY RECORDED] Reference: ${result.referenceId} from ${sanitizedName} (${cleanPhone})`);

    // Customer safe response - NEVER expose database IDs or server internals
    return res.status(201).json({
      success: true,
      referenceId: result.referenceId,
      message: "Your inquiry has been received successfully. Our team will review your request."
    });
  } catch (err) {
    console.error("[ERROR IN SUBMITTING INQUIRY]", err);
    return res.status(500).json({
      error: "Sorry, we couldn't submit your inquiry right now. Please try again."
    });
  }
});

// ==========================================
// ADMIN AUTHENTICATION ENDPOINTS
// ==========================================

// POST /api/admin/login
app.post("/api/admin/login", (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    const authResult = authenticateAdmin(username, password);
    if (!authResult) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Set secure HTTP-only cookie
    res.cookie("va_admin_session", authResult.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.json({
      success: true,
      token: authResult.token,
      user: authResult.user
    });
  } catch (err) {
    console.error("[ADMIN LOGIN ERROR]", err);
    return res.status(500).json({ error: "Authentication server error." });
  }
});

// POST /api/admin/logout
app.post("/api/admin/logout", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else if (req.cookies && req.cookies.va_admin_session) {
      token = req.cookies.va_admin_session;
    }

    if (token) {
      revokeSession(token);
    }

    res.clearCookie("va_admin_session");
    return res.json({ success: true, message: "Logged out successfully." });
  } catch (err) {
    console.error("[LOGOUT ERROR]", err);
    return res.status(500).json({ error: "Error logging out." });
  }
});

// GET /api/admin/me - Verify current session
app.get("/api/admin/me", requireAdminAuth, (req, res) => {
  return res.json({
    authenticated: true,
    user: req.admin
  });
});

// ==========================================
// PROTECTED ADMIN INQUIRY MANAGEMENT
// ==========================================

// GET /api/admin/stats - Inquiry summary numbers
app.get("/api/admin/stats", requireAdminAuth, (req, res) => {
  try {
    const stats = getInquiryStats();
    return res.json({ success: true, stats });
  } catch (err) {
    console.error("[STATS ERROR]", err);
    return res.status(500).json({ error: "Failed to fetch inquiry statistics." });
  }
});

// GET /api/admin/inquiries - List inquiries with search & filter
app.get("/api/admin/inquiries", requireAdminAuth, (req, res) => {
  try {
    const { search = "", status = "ALL" } = req.query;
    const inquiries = getAllInquiries({ search, status });
    return res.json({ success: true, count: inquiries.length, inquiries });
  } catch (err) {
    console.error("[FETCH INQUIRIES ERROR]", err);
    return res.status(500).json({ error: "Failed to retrieve inquiries." });
  }
});

// GET /api/admin/inquiries/:id - Single inquiry details
app.get("/api/admin/inquiries/:id", requireAdminAuth, (req, res) => {
  try {
    const inquiry = getInquiryById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ error: "Inquiry not found." });
    }
    return res.json({ success: true, inquiry });
  } catch (err) {
    console.error("[GET INQUIRY ERROR]", err);
    return res.status(500).json({ error: "Failed to fetch inquiry details." });
  }
});

// PATCH /api/admin/inquiries/:id/status - Update inquiry status
app.patch("/api/admin/inquiries/:id/status", requireAdminAuth, (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: "New status is required." });
    }

    const updated = updateInquiryStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ error: "Inquiry not found or unchanged." });
    }

    return res.json({ success: true, message: `Inquiry status updated to ${status}` });
  } catch (err) {
    console.error("[UPDATE STATUS ERROR]", err);
    return res.status(400).json({ error: err.message });
  }
});

// DELETE /api/admin/inquiries/:id - Delete inquiry
app.delete("/api/admin/inquiries/:id", requireAdminAuth, (req, res) => {
  try {
    const deleted = deleteInquiry(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Inquiry not found." });
    }

    return res.json({ success: true, message: "Inquiry deleted successfully." });
  } catch (err) {
    console.error("[DELETE INQUIRY ERROR]", err);
    return res.status(500).json({ error: "Failed to delete inquiry." });
  }
});

// Production: Serve Vite build assets if running as a unified server
const distPath = path.join(__dirname, "..", "dist");
app.use(express.static(distPath));

// For SPA routing in production: any non-API route serves index.html
app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.join(distPath, "index.html"), (err) => {
    if (err) next();
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[VARSHA AGRO SECURE SERVER] Running on http://127.0.0.1:${PORT}`);
});
