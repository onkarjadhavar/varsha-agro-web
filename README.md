# VARSHA AGRO — Foods & Feeds
> Production Web Application & Enterprise Portal for VARSHA AGRO, an agriculture-focused layer poultry enterprise located in Dharashiv, Maharashtra.

---

## 🌾 Enterprise Profile
- **Enterprise Name**: VARSHA AGRO
- **Tagline**: Foods and Feeds
- **Core Operations**: Commercial layer poultry farming, fresh table egg production, farm-controlled poultry feed formulation, and organic poultry manure for regional agriculture.
- **Farm Facility**: Wathwada, Taluka Kalamb, District Dharashiv, Maharashtra – 413507, India
- **Egg Shop Outlet**: Murud, Latur District, Maharashtra – 413510, India
- **Helpline / Phone**: +91 90116 01055
- **Official Email**: contact@varshaagro.com
- **Direct WhatsApp**: [Chat on WhatsApp](https://wa.me/919011601055)
- **Live Production URL**: [varsha-agro.onrender.com](https://varsha-agro.onrender.com) &bull; Custom Domain: [varshaagro.com](https://varshaagro.com)

---

## 🏗️ Architecture & Technology Stack

| Layer | Technologies | Purpose |
|---|---|---|
| **Frontend Client** | React 19, React Router 7, Vite 8 | Ultra-fast responsive SPA with native SEO `<title>`/`<meta>` |
| **Styling & UI** | Tailwind CSS 3.4, Vanilla CSS | Bespoke brand tokens (Deep Forest, Agricultural Green, Warm Gold, Ivory) |
| **Icons & Media** | Lucide React, WebP Images (79% payload compression) | Accessible SVG iconography, optimized responsive imagery |
| **Backend Server** | Express 5, Node.js 22+, Helmet, Express-Rate-Limit | Production-grade API server, security headers & deep-link SPA routing |
| **Data & Storage** | SQLite (`node:sqlite` WAL mode) / Persistent Disk / Postgres / Mongo | Durable inquiry records, admin session auth & CSV lead export |
| **Notifications** | Nodemailer (SMTP / Gmail App Pass) & Webhook dispatch | Instant lead alert emails & webhook pings so no enquiry is lost |

---

## 🚀 Routes & Application Sitemap

| Route | Page | Purpose |
|---|---|---|
| `/` | [Home](file:///d:/ALL%20PROJECTS%20DEV/varsha-agro%20web/src/pages/Home.jsx) | Full corporate presentation, produce highlights & farm intro |
| `/about` | [About Us](file:///d:/ALL%20PROJECTS%20DEV/varsha-agro%20web/src/pages/About.jsx) | Enterprise background, bird welfare standards & core values |
| `/farm` | [Our Farm](file:///d:/ALL%20PROJECTS%20DEV/varsha-agro%20web/src/pages/OurFarm.jsx) | Layer sheds, automated watering, feed milling & hygiene |
| `/products` | [Products](file:///d:/ALL%20PROJECTS%20DEV/varsha-agro%20web/src/pages/Products.jsx) | Table eggs (30-egg trays), layer birds & organic manure |
| `/sustainability` | [Sustainability](file:///d:/ALL%20PROJECTS%20DEV/varsha-agro%20web/src/pages/Sustainability.jsx) | Circular agriculture & soil rejuvenation via manure |
| `/gallery` | [Gallery](file:///d:/ALL%20PROJECTS%20DEV/varsha-agro%20web/src/pages/Gallery.jsx) | Interactive photo archive with lightbox modal |
| `/contact` | [Contact](file:///d:/ALL%20PROJECTS%20DEV/varsha-agro%20web/src/pages/Contact.jsx) | Inquiry form, direct calling, and Google Maps directions |
| `/company-profile` | [Company Profile](file:///d:/ALL%20PROJECTS%20DEV/varsha-agro%20web/src/pages/CompanyProfile.jsx) | Printable corporate dossier with PDF print stylesheet |
| `/privacy` | [Privacy Policy](file:///d:/ALL%20PROJECTS%20DEV/varsha-agro%20web/src/pages/PrivacyPolicy.jsx) | DPDP Act compliant personal data & inquiry policy |
| `/terms` | [Terms & Conditions](file:///d:/ALL%20PROJECTS%20DEV/varsha-agro%20web/src/pages/TermsConditions.jsx) | Commercial trade policies & farm gate pickup terms |
| `/admin` | [Admin Portal](file:///d:/ALL%20PROJECTS%20DEV/varsha-agro%20web/src/pages/admin/AdminPortal.jsx) | Secure lead management, status tracking & CSV export |

---

## 🛡️ Security & Lead Protection Features
1. **Instant Lead Delivery**: Every form submission triggers asynchronous email delivery via SMTP or Gmail, plus webhook dispatch. Even if hosted on ephemeral cloud instances, leads are immediately delivered to farm management.
2. **Anti-Spam & Validation**: Hidden honeypot fields silently reject automated spam bots. Mobile numbers are strictly validated against standard 10-digit Indian formats (`/^(?:\+91|0)?[6-9]\d{9}$/`).
3. **Helmet & Rate Limiting**: HTTP security headers (CSP, frame protection) plus IP-based rate limiting (15 submissions/15 min for public forms; 10 attempts/15 min on admin login).
4. **Admin Authentication**: Bcrypt-hashed password verification, cryptographically secure 256-bit sessions, and HTTP-only cookies.
5. **Lead Backup & Export**: Authorized managers can download all customer leads as an Excel-compatible CSV file directly from `/admin`.

---

## 🛠️ Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Run Client & Server Concurrently
```bash
npm run dev
```
- Client runs at: `http://localhost:5173`
- Backend API runs at: `http://localhost:5000`

---

## ☁️ Deployment Guide (Render)

VARSHA AGRO is built to run smoothly as a unified **Render Web Service**.

### Render Configuration Settings
1. **Environment**: Node
2. **Build Command**:
   ```bash
   npm install && npm run build
   ```
3. **Start Command**:
   ```bash
   npm start
   ```
4. **Environment Variables**:
   Add the variables listed in `.env.example` to your Render service environment settings:
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (Render sets this automatically)
   - `ADMIN_INITIAL_PASSWORD`: Set a secure initial password
   - `ADMIN_EMAIL`: `contact@varshaagro.com`
   - `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` (Optional, for instant lead notification emails)
5. **Persistent Disk (Optional)**:
   If attaching a Render Persistent Disk, mount it at `/var/data` and add:
   - `PERSISTENT_DATA_DIR`: `/var/data`
6. **Preventing Free-Tier Sleep (Keep-Alive)**:
   Add a free uptime check on [UptimeRobot.com](https://uptimerobot.com) or [cron-job.org](https://cron-job.org) hitting:
   ```
   https://varsha-agro.onrender.com/api/health
   ```
   every 10 minutes. This guarantees the instance stays awake with zero cold-start delay for visitors!

---

## 📊 Admin Portal Credentials

- **URL**: `https://varshaagro.com/admin` (or `http://localhost:5000/admin`)
- **Default Username**: `admin`
- **Default Password**: `VarshaAgro@2026` *(Configurable via `ADMIN_INITIAL_PASSWORD` in `.env`)*
