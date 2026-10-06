import "dotenv/config";
import mongoose from "mongoose";
import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { fileURLToPath } from "node:url";
import { notifyNewInquiry } from "./notifier.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Password utility
export function hashPasswordBcrypt(password) {
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);
  return { hash, salt };
}

export function verifyPassword(password, salt, storedHash) {
  if (storedHash && storedHash.startsWith("$2")) {
    return bcrypt.compareSync(password, storedHash);
  }
  if (salt) {
    const legacyHash = crypto.scryptSync(password, salt, 64).toString("hex");
    return crypto.timingSafeEqual(Buffer.from(legacyHash, "hex"), Buffer.from(storedHash, "hex"));
  }
  return false;
}

// ==========================================
// 1. MONGODB ATLAS SCHEMAS & MODELS
// ==========================================

const mongoInquirySchema = new mongoose.Schema(
  {
    reference_id: { type: String, unique: true, required: true, index: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: null },
    requirement: { type: String, required: true },
    message: { type: String, default: "" },
    quantity: { type: String, default: "" },
    source: { type: String, default: "Website Form" },
    status: {
      type: String,
      default: "NEW",
      enum: ["NEW", "CONTACTED", "IN PROGRESS", "COMPLETED"],
      index: true
    },
    submission_date: { type: String, required: true },
    submission_time: { type: String, required: true },
    created_at: { type: Number, required: true, index: -1 }
  },
  { collection: "inquiries" }
);

const mongoAdminSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true, lowercase: true, trim: true },
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    password_hash: { type: String, required: true },
    salt: { type: String, default: null },
    created_at: { type: Number, required: true }
  },
  { collection: "admins" }
);

const mongoSessionSchema = new mongoose.Schema(
  {
    token: { type: String, unique: true, required: true, index: true },
    admin_id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    created_at: { type: Number, required: true },
    expires_at: { type: Number, required: true, index: true }
  },
  { collection: "sessions" }
);

export const MongoInquiry = mongoose.models.Inquiry || mongoose.model("Inquiry", mongoInquirySchema);
export const MongoAdmin = mongoose.models.Admin || mongoose.model("Admin", mongoAdminSchema);
export const MongoSession = mongoose.models.Session || mongoose.model("Session", mongoSessionSchema);

// ==========================================
// 2. LOCAL SQLITE FALLBACK INITIALIZATION
// ==========================================

const DATA_DIR = process.env.PERSISTENT_DATA_DIR || process.env.DATA_DIR || path.join(__dirname, "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, "varsha_agro.db");
let sqliteDb = null;

function getSqlite() {
  if (!sqliteDb) {
    sqliteDb = new DatabaseSync(DB_PATH);
    sqliteDb.exec("PRAGMA journal_mode = WAL;");
    sqliteDb.exec("PRAGMA foreign_keys = ON;");
    sqliteDb.exec(`
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
        salt TEXT,
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

    // Seed admin if empty
    const count = sqliteDb.prepare("SELECT COUNT(*) AS count FROM admins").get().count;
    if (count === 0) {
      const defaultPassword = process.env.ADMIN_INITIAL_PASSWORD || "VarshaAgro@2026";
      const defaultEmail = process.env.ADMIN_EMAIL || "contact@varshaagro.com";
      const { hash, salt } = hashPasswordBcrypt(defaultPassword);
      sqliteDb
        .prepare("INSERT INTO admins (username, email, password_hash, salt, created_at) VALUES (?, ?, ?, ?, ?)")
        .run("admin", defaultEmail, hash, salt, Date.now());
    }
  }
  return sqliteDb;
}

// ==========================================
// 3. DATABASE INITIALIZATION & DETECTION
// ==========================================

export let isMongo = false;

export async function initDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (mongoUri && !mongoUri.includes("<db_password>") && !mongoUri.includes("<password>")) {
    try {
      console.log("[DATABASE] Connecting to MongoDB Atlas Cloud Database...");
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 8000,
        dbName: "varsha_agro"
      });
      isMongo = true;
      console.log("✅ [DATABASE] Successfully connected to MongoDB Atlas! All enquiries will persist across all redeployments.");

      // Seed initial admin user if none exists
      const adminCount = await MongoAdmin.countDocuments();
      if (adminCount === 0) {
        const defaultPassword = process.env.ADMIN_INITIAL_PASSWORD || "VarshaAgro@2026";
        const defaultEmail = process.env.ADMIN_EMAIL || "contact@varshaagro.com";
        const { hash, salt } = hashPasswordBcrypt(defaultPassword);
        await MongoAdmin.create({
          username: "admin",
          email: defaultEmail,
          password_hash: hash,
          salt,
          created_at: Date.now()
        });
        console.log(`[AUTH SEED] Initialized VARSHA AGRO admin in MongoDB: admin / ${defaultEmail}`);
      }

      // One-time migration: If SQLite has inquiries, migrate them to Mongo
      try {
        if (fs.existsSync(DB_PATH)) {
          const sql = getSqlite();
          const localInquiries = sql.prepare("SELECT * FROM inquiries").all();
          if (localInquiries && localInquiries.length > 0) {
            for (const item of localInquiries) {
              const exists = await MongoInquiry.findOne({ reference_id: item.reference_id });
              if (!exists) {
                await MongoInquiry.create({
                  reference_id: item.reference_id,
                  name: item.name,
                  phone: item.phone,
                  email: item.email,
                  requirement: item.requirement,
                  message: item.message,
                  quantity: item.quantity,
                  source: item.source,
                  status: item.status,
                  submission_date: item.submission_date,
                  submission_time: item.submission_time,
                  created_at: item.created_at
                });
              }
            }
            console.log(`[DATA MIGRATION] Synced ${localInquiries.length} inquiries from local SQLite into MongoDB Atlas!`);
          }
        }
      } catch (migErr) {
        console.warn("[DATA MIGRATION] Note: Local SQLite sync skipped:", migErr.message);
      }

      return;
    } catch (err) {
      console.error("⚠️ [DATABASE WARNING] MongoDB Atlas connection failed:", err.message);
      console.log("🔄 [DATABASE] Gracefully falling back to local SQLite database...");
      isMongo = false;
    }
  } else {
    console.log("ℹ️ [DATABASE] MONGODB_URI not set or contains password placeholder. Running on local SQLite database.");
    isMongo = false;
  }

  // Initialize SQLite
  getSqlite();
}

// Auto-run initialization
initDatabase().catch((e) => {
  console.error("[DATABASE INIT ERROR]", e);
});

// ==========================================
// 4. INQUIRY OPERATIONS
// ==========================================

export async function createInquiry({ name, phone, email, requirement, message, quantity, source }) {
  const now = new Date();
  const year = now.getFullYear();

  let count = 0;
  if (isMongo) {
    count = await MongoInquiry.countDocuments();
  } else {
    count = getSqlite().prepare("SELECT COUNT(*) as count FROM inquiries").get().count;
  }

  const nextSeq = (count + 1).toString().padStart(6, "0");
  const referenceId = `VA-${year}-${nextSeq}`;

  const dateFormatted = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  const timeFormatted =
    now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    }) + " IST";

  const inquiryRecord = {
    referenceId,
    reference_id: referenceId,
    name: name.trim(),
    phone: phone.trim(),
    email: email ? email.trim() : null,
    requirement: requirement || "Fresh Eggs",
    quantity: quantity ? quantity.trim() : "",
    message: message ? message.trim() : "",
    source: source || "Website Form",
    status: "NEW",
    submission_date: dateFormatted,
    submission_time: timeFormatted,
    dateFormatted,
    timeFormatted,
    created_at: now.getTime()
  };

  if (isMongo) {
    const doc = await MongoInquiry.create(inquiryRecord);
    inquiryRecord.id = doc._id.toString();
  } else {
    const stmt = getSqlite().prepare(`
      INSERT INTO inquiries (
        reference_id, name, phone, email, requirement,
        message, quantity, source, status, submission_date,
        submission_time, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'NEW', ?, ?, ?)
    `);
    const res = stmt.run(
      referenceId,
      inquiryRecord.name,
      inquiryRecord.phone,
      inquiryRecord.email,
      inquiryRecord.requirement,
      inquiryRecord.message,
      inquiryRecord.quantity,
      inquiryRecord.source,
      dateFormatted,
      timeFormatted,
      now.getTime()
    );
    inquiryRecord.id = res.lastInsertRowid;
  }

  // Dispatch asynchronous lead notification (Email & Webhook)
  notifyNewInquiry(inquiryRecord).catch((err) => {
    console.error("[INQUIRY NOTIFICATION DISPATCH ERROR]", err);
  });

  return inquiryRecord;
}

export async function getAllInquiries({ search = "", status = "ALL" } = {}) {
  if (isMongo) {
    const filter = {};
    if (status && status !== "ALL") {
      filter.status = status;
    }
    if (search && search.trim()) {
      const term = search.trim();
      const rgx = new RegExp(term, "i");
      filter.$or = [
        { name: rgx },
        { phone: rgx },
        { email: rgx },
        { reference_id: rgx },
        { requirement: rgx }
      ];
    }
    const docs = await MongoInquiry.find(filter).sort({ created_at: -1 }).lean();
    return docs.map((d) => ({
      ...d,
      id: d._id.toString(),
      referenceId: d.reference_id
    }));
  }

  // SQLite
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
  return getSqlite().prepare(query).all(...params);
}

export async function getInquiryById(id) {
  if (isMongo) {
    let query = { $or: [{ reference_id: id }] };
    if (mongoose.Types.ObjectId.isValid(id)) {
      query.$or.push({ _id: id });
    }
    const doc = await MongoInquiry.findOne(query).lean();
    if (!doc) return null;
    return { ...doc, id: doc._id.toString() };
  }

  return getSqlite().prepare("SELECT * FROM inquiries WHERE id = ? OR reference_id = ?").get(id, id);
}

export async function updateInquiryStatus(id, newStatus) {
  const allowed = ["NEW", "CONTACTED", "IN PROGRESS", "COMPLETED"];
  if (!allowed.includes(newStatus)) {
    throw new Error(`Invalid status: ${newStatus}`);
  }

  if (isMongo) {
    let query = { $or: [{ reference_id: id }] };
    if (mongoose.Types.ObjectId.isValid(id)) {
      query.$or.push({ _id: id });
    }
    const res = await MongoInquiry.updateOne(query, { status: newStatus });
    return res.matchedCount > 0;
  }

  const stmt = getSqlite().prepare("UPDATE inquiries SET status = ? WHERE id = ? OR reference_id = ?");
  const result = stmt.run(newStatus, id, id);
  return result.changes > 0;
}

export async function deleteInquiry(id) {
  if (isMongo) {
    let query = { $or: [{ reference_id: id }] };
    if (mongoose.Types.ObjectId.isValid(id)) {
      query.$or.push({ _id: id });
    }
    const res = await MongoInquiry.deleteOne(query);
    return res.deletedCount > 0;
  }

  const stmt = getSqlite().prepare("DELETE FROM inquiries WHERE id = ? OR reference_id = ?");
  const result = stmt.run(id, id);
  return result.changes > 0;
}

export async function getInquiryStats() {
  if (isMongo) {
    const [total, newCount, contactedCount, inProgressCount, completedCount] = await Promise.all([
      MongoInquiry.countDocuments(),
      MongoInquiry.countDocuments({ status: "NEW" }),
      MongoInquiry.countDocuments({ status: "CONTACTED" }),
      MongoInquiry.countDocuments({ status: "IN PROGRESS" }),
      MongoInquiry.countDocuments({ status: "COMPLETED" })
    ]);

    return {
      total,
      new: newCount,
      contacted: contactedCount,
      inProgress: inProgressCount,
      completed: completedCount
    };
  }

  const rows = getSqlite()
    .prepare(`
      SELECT 
        COUNT(*) AS total,
        SUM(CASE WHEN status = 'NEW' THEN 1 ELSE 0 END) AS new_count,
        SUM(CASE WHEN status = 'CONTACTED' THEN 1 ELSE 0 END) AS contacted_count,
        SUM(CASE WHEN status = 'IN PROGRESS' THEN 1 ELSE 0 END) AS in_progress_count,
        SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) AS completed_count
      FROM inquiries
    `)
    .get();

  return {
    total: rows.total || 0,
    new: rows.new_count || 0,
    contacted: rows.contacted_count || 0,
    inProgress: rows.in_progress_count || 0,
    completed: rows.completed_count || 0
  };
}

export async function exportInquiriesToCSV() {
  const inquiries = await getAllInquiries();
  const headers = [
    "Reference ID",
    "Customer Name",
    "Phone",
    "Email",
    "Requirement",
    "Quantity",
    "Message",
    "Status",
    "Date",
    "Time",
    "Source"
  ];

  const escapeCsv = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = inquiries.map((row) =>
    [
      escapeCsv(row.reference_id),
      escapeCsv(row.name),
      escapeCsv(row.phone),
      escapeCsv(row.email || ""),
      escapeCsv(row.requirement),
      escapeCsv(row.quantity || ""),
      escapeCsv(row.message || ""),
      escapeCsv(row.status),
      escapeCsv(row.submission_date),
      escapeCsv(row.submission_time),
      escapeCsv(row.source)
    ].join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}

// ==========================================
// 5. AUTHENTICATION & SESSION OPERATIONS
// ==========================================

export async function authenticateAdmin(identifier, password) {
  if (!identifier || !password) return null;
  const cleanId = identifier.trim().toLowerCase();

  let admin = null;
  if (isMongo) {
    admin = await MongoAdmin.findOne({
      $or: [{ username: cleanId }, { email: cleanId }]
    }).lean();
  } else {
    admin = getSqlite()
      .prepare("SELECT * FROM admins WHERE username = ? OR email = ?")
      .get(cleanId, cleanId);
  }

  if (!admin) return null;

  const isValid = verifyPassword(password, admin.salt, admin.password_hash);
  if (!isValid) return null;

  // Generate 256-bit cryptographically secure session token
  const token = crypto.randomBytes(32).toString("hex");
  const now = Date.now();
  const expiresAt = now + 7 * 24 * 60 * 60 * 1000; // 7 days

  if (isMongo) {
    await MongoSession.create({
      token,
      admin_id: admin._id.toString(),
      username: admin.username,
      email: admin.email,
      created_at: now,
      expires_at: expiresAt
    });
  } else {
    getSqlite()
      .prepare("INSERT INTO sessions (token, admin_id, created_at, expires_at) VALUES (?, ?, ?, ?)")
      .run(token, admin.id, now, expiresAt);
  }

  return {
    token,
    user: {
      id: admin._id ? admin._id.toString() : admin.id,
      username: admin.username,
      email: admin.email
    },
    expiresAt
  };
}

export async function verifySessionToken(token) {
  if (!token) return null;
  const now = Date.now();

  if (isMongo) {
    // Delete expired sessions
    await MongoSession.deleteMany({ expires_at: { $lt: now } });
    const session = await MongoSession.findOne({ token, expires_at: { $gt: now } }).lean();
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

  // SQLite
  getSqlite().prepare("DELETE FROM sessions WHERE expires_at < ?").run(now);

  const session = getSqlite()
    .prepare(`
      SELECT s.token, s.expires_at, a.id AS admin_id, a.username, a.email
      FROM sessions s
      JOIN admins a ON s.admin_id = a.id
      WHERE s.token = ? AND s.expires_at > ?
    `)
    .get(token, now);

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

export async function revokeSession(token) {
  if (!token) return false;

  if (isMongo) {
    const res = await MongoSession.deleteOne({ token });
    return res.deletedCount > 0;
  }

  const result = getSqlite().prepare("DELETE FROM sessions WHERE token = ?").run(token);
  return result.changes > 0;
}
