import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "data");

// Ensure the data directory exists before opening SQLite database
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, "varsha_agro.db");

// Initialize Database connection
export const db = new DatabaseSync(DB_PATH);

// Enable WAL mode for fast concurrency & durability
db.exec("PRAGMA journal_mode = WAL;");
db.exec("PRAGMA foreign_keys = ON;");

// Initialize Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reference_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    requirement TEXT NOT NULL,
    message TEXT,
    quantity TEXT,
    source TEXT DEFAULT 'Website Form',
    status TEXT NOT NULL DEFAULT 'NEW',
    submission_date TEXT NOT NULL,
    submission_time TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    admin_id INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL,
    FOREIGN KEY(admin_id) REFERENCES admins(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
  CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
`);

// Password hashing utilities using crypto scrypt
function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { hash, salt };
}

function verifyPassword(password, salt, storedHash) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(storedHash, "hex"));
}

// Seed initial admin if none exists
const adminCountStmt = db.prepare("SELECT COUNT(*) AS count FROM admins");
const adminCount = adminCountStmt.get().count;

if (adminCount === 0) {
  const defaultPassword = process.env.ADMIN_INITIAL_PASSWORD || "VarshaAgro@2026";
  const { hash, salt } = hashPassword(defaultPassword);
  const now = Date.now();

  const insertAdmin = db.prepare(`
    INSERT INTO admins (username, email, password_hash, salt, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);
  insertAdmin.run("admin", "baba.bondar@gmail.com", hash, salt, now);
  console.log("Initialized default VARSHA AGRO admin user: admin / baba.bondar@gmail.com");
}

// ==========================================
// INQUIRY OPERATIONS
// ==========================================

export function createInquiry({ name, phone, email, requirement, message, quantity, source }) {
  const now = new Date();
  const year = now.getFullYear();

  // Generate unique human-readable reference: VA-YYYY-XXXXXX
  const countRow = db.prepare("SELECT COUNT(*) as count FROM inquiries").get();
  const nextSeq = (countRow.count + 1).toString().padStart(6, "0");
  const referenceId = `VA-${year}-${nextSeq}`;

  // Formatted date and time
  const dateFormatted = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  const timeFormatted = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  }) + " IST";

  const stmt = db.prepare(`
    INSERT INTO inquiries (
      reference_id, name, phone, email, requirement,
      message, quantity, source, status, submission_date,
      submission_time, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'NEW', ?, ?, ?)
  `);

  stmt.run(
    referenceId,
    name.trim(),
    phone.trim(),
    email ? email.trim() : null,
    requirement || "Fresh Eggs",
    message ? message.trim() : "",
    quantity ? quantity.trim() : "",
    source || "Website Form",
    dateFormatted,
    timeFormatted,
    now.getTime()
  );

  return {
    referenceId,
    name,
    submissionDate: dateFormatted,
    submissionTime: timeFormatted,
    status: "NEW"
  };
}

export function getAllInquiries({ search = "", status = "ALL" } = {}) {
  let query = "SELECT * FROM inquiries WHERE 1=1";
  const params = [];

  if (status && status !== "ALL") {
    query += " AND status = ?";
    params.push(status);
  }

  if (search && search.trim()) {
    const term = `%${search.trim()}%`;
    query += ` AND (
      name LIKE ? OR
      phone LIKE ? OR
      email LIKE ? OR
      reference_id LIKE ? OR
      requirement LIKE ?
    )`;
    params.push(term, term, term, term, term);
  }

  query += " ORDER BY created_at DESC";

  return db.prepare(query).all(...params);
}

export function getInquiryById(id) {
  return db.prepare("SELECT * FROM inquiries WHERE id = ? OR reference_id = ?").get(id, id);
}

export function updateInquiryStatus(id, newStatus) {
  const allowed = ["NEW", "CONTACTED", "IN PROGRESS", "COMPLETED"];
  if (!allowed.includes(newStatus)) {
    throw new Error(`Invalid status: ${newStatus}`);
  }

  const stmt = db.prepare("UPDATE inquiries SET status = ? WHERE id = ? OR reference_id = ?");
  const result = stmt.run(newStatus, id, id);
  return result.changes > 0;
}

export function deleteInquiry(id) {
  const stmt = db.prepare("DELETE FROM inquiries WHERE id = ? OR reference_id = ?");
  const result = stmt.run(id, id);
  return result.changes > 0;
}

export function getInquiryStats() {
  const rows = db.prepare(`
    SELECT 
      COUNT(*) AS total,
      SUM(CASE WHEN status = 'NEW' THEN 1 ELSE 0 END) AS new_count,
      SUM(CASE WHEN status = 'CONTACTED' THEN 1 ELSE 0 END) AS contacted_count,
      SUM(CASE WHEN status = 'IN PROGRESS' THEN 1 ELSE 0 END) AS in_progress_count,
      SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) AS completed_count
    FROM inquiries
  `).get();

  return {
    total: rows.total || 0,
    new: rows.new_count || 0,
    contacted: rows.contacted_count || 0,
    inProgress: rows.in_progress_count || 0,
    completed: rows.completed_count || 0
  };
}

// ==========================================
// AUTHENTICATION & SESSION OPERATIONS
// ==========================================

export function authenticateAdmin(identifier, password) {
  if (!identifier || !password) return null;

  const admin = db.prepare(`
    SELECT * FROM admins WHERE username = ? OR email = ?
  `).get(identifier.trim().toLowerCase(), identifier.trim().toLowerCase());

  if (!admin) return null;

  const isValid = verifyPassword(password, admin.salt, admin.password_hash);
  if (!isValid) return null;

  // Generate 256-bit cryptographically secure session token
  const token = crypto.randomBytes(32).toString("hex");
  const now = Date.now();
  const expiresAt = now + 7 * 24 * 60 * 60 * 1000; // 7 days

  db.prepare(`
    INSERT INTO sessions (token, admin_id, created_at, expires_at)
    VALUES (?, ?, ?, ?)
  `).run(token, admin.id, now, expiresAt);

  return {
    token,
    user: {
      id: admin.id,
      username: admin.username,
      email: admin.email
    },
    expiresAt
  };
}

export function verifySessionToken(token) {
  if (!token) return null;

  // Delete expired sessions first
  db.prepare("DELETE FROM sessions WHERE expires_at < ?").run(Date.now());

  const session = db.prepare(`
    SELECT s.token, s.expires_at, a.id AS admin_id, a.username, a.email
    FROM sessions s
    JOIN admins a ON s.admin_id = a.id
    WHERE s.token = ? AND s.expires_at > ?
  `).get(token, Date.now());

  if (!session) return null;

  return {
    token: session.token,
    user: {
      id: session.admin_id,
      username: session.username,
      email: session.email
    }
  };
}

export function revokeSession(token) {
  if (!token) return false;
  const result = db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
  return result.changes > 0;
}
