import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
  getInquiryStats,
  exportInquiriesToCSV,
  authenticateAdmin,
  verifySessionToken,
  revokeSession
} from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === "production";

// Trust proxy for Render / Cloudflare / reverse proxies (needed for rate limiting and IP logging)
app.set("trust proxy", 1);

// Security Headers via Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        imgSrc: ["'self'", "data:", "blob:", "https:", "http:"],
        frameSrc: ["'self'", "https://www.google.com"],
        connectSrc: ["'self'", "https:", "http:"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: isProd ? [] : null
      }
    },
    crossOriginEmbedderPolicy: false
  })
);

// Body Parsing & Cookie Middleware
app.use(express.json({ limit: "50kb" }));
app.use(cookieParser());

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5000",
  "http://127.0.0.1:5000",
  "https://varshaagro.com",
  "https://www.varshaagro.com",
  "https://varsha-agro.onrender.com"
];

if (process.env.ADDITIONAL_ORIGINS) {
  process.env.ADDITIONAL_ORIGINS.split(",").forEach((o) => allowedOrigins.push(o.trim()));
}

// Strict CORS Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, server-to-server, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.some((allowed) => origin.startsWith(allowed) || origin === allowed)) {
        return callback(null, true);
      }
      if (!isProd) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy violation: origin not allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"]
  })
);

// Rate Limiter for Inquiries (Spam Prevention: 15 inquiries per 15 minutes per IP)
const inquiryRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many inquiries submitted from this connection. Please wait 15 minutes or contact us directly on phone or WhatsApp."
  }
});

// Rate Limiter for Admin Login (Brute Force Protection: 10 attempts per 15 mins)
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many login attempts. For security reasons, please wait 15 minutes before trying again."
  }
});

// Authentication Middleware
async function requireAdminAuth(req, res, next) {
  try {
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

    const session = await verifySessionToken(token);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized: Invalid or expired session. Please log in again." });
    }

    req.admin = session.user;
    req.sessionToken = token;
    next();
  } catch (err) {
    console.error("[AUTH MIDDLEWARE ERROR]", err);
    return res.status(500).json({ error: "Authentication internal error." });
  }
}

// ==========================================
// SYSTEM HEALTH & KEEP-ALIVE (Solves Render Idle Sleep)
// ==========================================

app.get(["/api/health", "/api/ping"], (req, res) => {
  return res.status(200).json({
    status: "ok",
    service: "varsha-agro-api",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime())
  });
});

// ==========================================
// PUBLIC INQUIRY API
// ==========================================

// POST /api/inquiries - Submit an inquiry with spam protection & strict validation
app.post("/api/inquiries", inquiryRateLimiter, async (req, res) => {
  try {
    const {
      name,
      fullName,
      phone,
      email,
      requirement,
      message,
      quantity,
      source,
      // Honeypot fields for anti-spam bots
      b_hp_field,
      website
    } = req.body || {};

    // 1. Honeypot check: If hidden field is filled, silently ignore or reject
    if (b_hp_field || website) {
      console.warn("[SPAM BOT DETECTED] Rejected honeypot submission.");
      return res.status(200).json({
        success: true,
        referenceId: "VA-CONFIRMED",
        message: "Your inquiry has been received successfully."
      });
    }

    const customerName = (name || fullName || "").toString().trim();

    // 2. Validate customer name
    if (!customerName || customerName.length < 2) {
      return res.status(400).json({ error: "Please enter your full name (minimum 2 characters)." });
    }
    if (customerName.length > 100) {
      return res.status(400).json({ error: "Name exceeds maximum length of 100 characters." });
    }

    // 3. Validate phone number (Strict Indian mobile phone or standard international format)
    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return res.status(400).json({ error: "Phone number is required." });
    }

    const cleanPhone = phone.trim().replace(/[\s\-()]/g, "");
    // Accepts 10-digit Indian numbers with optional +91 or 0 prefix: +919011601055, 09011601055, 9011601055
    const isIndianPhone = /^(?:\+91|0)?[6-9]\d{9}$/.test(cleanPhone);
    const isGeneralPhone = /^\+?[0-9]{8,15}$/.test(cleanPhone);

    if (!isIndianPhone && !isGeneralPhone) {
      return res.status(400).json({
        error: "Please enter a valid 10-digit mobile number (e.g. 9011601055)."
      });
    }

    // 4. Validate email if provided
    if (email && typeof email === "string" && email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return res.status(400).json({ error: "Please provide a valid email address." });
      }
    }

    // 5. Sanitize string inputs
    const sanitizedName = customerName.slice(0, 100);
    const sanitizedRequirement = (requirement || "Fresh Eggs").toString().slice(0, 100);
    const sanitizedMessage = message ? message.toString().slice(0, 2000) : "";
    const sanitizedQuantity = quantity ? quantity.toString().slice(0, 100) : "";
    const sanitizedSource = source ? source.toString().slice(0, 100) : "Website Inquiry";

    // 6. Record inquiry into persistent storage & dispatch instant email/webhook
    const result = await createInquiry({
      name: sanitizedName,
      phone: phone.trim(),
      email: email ? email.trim().toLowerCase() : null,
      requirement: sanitizedRequirement,
      message: sanitizedMessage,
      quantity: sanitizedQuantity,
      source: sanitizedSource
    });

    console.log(`[INQUIRY RECORDED] Reference: ${result.referenceId} from ${sanitizedName} (${phone})`);

    return res.status(201).json({
      success: true,
      referenceId: result.referenceId,
      message: "Your inquiry has been received successfully. Our team will review your request."
    });
  } catch (err) {
    console.error("[ERROR IN SUBMITTING INQUIRY]", err);
    return res.status(500).json({
      error: "Sorry, we could not submit your inquiry right now. Please call or WhatsApp us directly."
    });
  }
});

// ==========================================
// ADMIN AUTHENTICATION ENDPOINTS
// ==========================================

// POST /api/admin/login
app.post("/api/admin/login", loginRateLimiter, async (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    const authResult = await authenticateAdmin(username, password);
    if (!authResult) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Set secure HTTP-only cookie
    res.cookie("va_admin_session", authResult.token, {
      httpOnly: true,
      secure: isProd,
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
app.post("/api/admin/logout", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else if (req.cookies && req.cookies.va_admin_session) {
      token = req.cookies.va_admin_session;
    }

    if (token) {
      await revokeSession(token);
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
    success: true,
    authenticated: true,
    user: req.admin
  });
});

// ==========================================
// PROTECTED ADMIN INQUIRY MANAGEMENT
// ==========================================

// GET /api/admin/stats - Inquiry summary numbers
app.get("/api/admin/stats", requireAdminAuth, async (req, res) => {
  try {
    const stats = await getInquiryStats();
    return res.json({ success: true, stats });
  } catch (err) {
    console.error("[STATS ERROR]", err);
    return res.status(500).json({ error: "Failed to fetch inquiry statistics." });
  }
});

// GET /api/admin/inquiries - List inquiries with search & filter
app.get("/api/admin/inquiries", requireAdminAuth, async (req, res) => {
  try {
    const { search = "", status = "ALL" } = req.query;
    const inquiries = await getAllInquiries({ search, status });
    return res.json({ success: true, count: inquiries.length, inquiries });
  } catch (err) {
    console.error("[FETCH INQUIRIES ERROR]", err);
    return res.status(500).json({ error: "Failed to retrieve inquiries." });
  }
});

// GET /api/admin/inquiries/:id - Single inquiry details
app.get("/api/admin/inquiries/:id", requireAdminAuth, async (req, res) => {
  try {
    const inquiry = await getInquiryById(req.params.id);
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
app.patch("/api/admin/inquiries/:id/status", requireAdminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: "New status is required." });
    }

    const updated = await updateInquiryStatus(req.params.id, status);
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
app.delete("/api/admin/inquiries/:id", requireAdminAuth, async (req, res) => {
  try {
    const deleted = await deleteInquiry(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Inquiry not found." });
    }

    return res.json({ success: true, message: "Inquiry deleted successfully." });
  } catch (err) {
    console.error("[DELETE INQUIRY ERROR]", err);
    return res.status(500).json({ error: "Failed to delete inquiry." });
  }
});

// GET /api/admin/export/csv - Download inquiries CSV backup
app.get("/api/admin/export/csv", requireAdminAuth, async (req, res) => {
  try {
    const csvContent = await exportInquiriesToCSV();
    const dateStr = new Date().toISOString().slice(0, 10);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="varsha_agro_inquiries_${dateStr}.csv"`);
    return res.send(csvContent);
  } catch (err) {
    console.error("[CSV EXPORT ERROR]", err);
    return res.status(500).json({ error: "Failed to export CSV." });
  }
});

// GET /api/admin/export/json - Download inquiries JSON backup
app.get("/api/admin/export/json", requireAdminAuth, async (req, res) => {
  try {
    const inquiries = await getAllInquiries();
    const dateStr = new Date().toISOString().slice(0, 10);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="varsha_agro_inquiries_${dateStr}.json"`);
    return res.json(inquiries);
  } catch (err) {
    console.error("[JSON EXPORT ERROR]", err);
    return res.status(500).json({ error: "Failed to export JSON." });
  }
});

// ==========================================
// PRODUCTION CLIENT ASSET SERVING & SPA FALLBACK ROUTING
// ==========================================

const distPath = path.join(__dirname, "..", "dist");

// Serve static assets with caching headers
app.use(
  express.static(distPath, {
    maxAge: "1d",
    setHeaders: (res, filePath) => {
      // Immutable cache for fingerprinted vite build assets
      if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
    }
  })
);

// Catch-all route for SPA navigation (Express 5 compatible: ensures /products, /gallery, /about, deep links never 404)
app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/api")) {
    return next();
  }

  const indexPath = path.join(distPath, "index.html");
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }

  return res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head><title>VARSHA AGRO Server Running</title></head>
      <body style="font-family: sans-serif; padding: 40px; text-align: center;">
        <h2>VARSHA AGRO Backend Service Active</h2>
        <p>Frontend production bundle not yet generated. Run <code>npm run build</code> to produce client dist assets.</p>
        <p><a href="/api/health">Check Health Status &rarr;</a></p>
      </body>
    </html>
  `);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[VARSHA AGRO SECURE SERVER] Running on port ${PORT}`);
});
