# VARSHA AGRO — Foods & Feeds
> Production-ready corporate web application for VARSHA AGRO, an agricultural and layer poultry enterprise in Dharashiv, Maharashtra.

---

## 🌾 Brand Overview
- **Enterprise Name**: VARSHA AGRO
- **Tagline**: Foods and Feeds
- **Business**: Layer poultry farming, egg production, farm-made poultry feed, and poultry manure for agricultural soil enrichment.
- **Location**: Wathwada, Tq. Kalamb, Dist. Dharashiv, Maharashtra, India
- **Helpline / Phone**: +91 9011601055
- **Email**: baba.bondar@gmail.com
- **WhatsApp**: [Chat directly](https://wa.me/919011601055)

---

## 🎨 Design System & Palette
- **Deep Forest Green** (`#123B2A`): Primary corporate brand color
- **Agricultural Green** (`#3F6B45`): Secondary natural accent
- **Warm Gold** (`#C69A3A`): Premium highlights & interactive accents
- **Warm Ivory** (`#F7F4EC`): Background and clean negative space
- **Charcoal** (`#202522`): High-legibility text
- **Typography**:
  - Headings: *Playfair Display* / *Cormorant Garamond* (Serif)
  - Body & UI: *Inter* / *Poppins* (Sans-serif)

---

## 🚀 Technology Stack
- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS 3.4 with custom brand tokens
- **Routing**: React Router 7 (`/`, `/about`, `/farm`, `/products`, `/sustainability`, `/gallery`, `/contact`, `/company-profile`)
- **Icons**: Lucide React
- **Code Quality**: Zero warnings, zero errors (`npm run lint` & `npm run build`)

---

## 📂 Project Structure
```
├── public/
│   ├── favicon.svg             # Brand monogram crest favicon
│   ├── robots.txt              # Search engine crawler instructions
│   └── images/                 # Realistic corporate agriculture photography
│       ├── hero_farm_sunrise.jpg
│       ├── layer_birds_shed.jpg
│       ├── fresh_eggs_trays.jpg
│       ├── poultry_feed_preparation.jpg
│       ├── poultry_manure_field.jpg
│       ├── farm_aerial_golden.jpg
│       └── egg_sorting_packing.jpg
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Sticky header (transparent -> solid ivory on scroll)
│   │   ├── Footer.jsx          # Dark forest corporate footer + Privacy/Terms modals
│   │   ├── MobileStickyBar.jsx # Bottom action bar (CALL | WHATSAPP | ENQUIRE)
│   │   ├── EnquiryModal.jsx    # Interactive validated enquiry modal
│   │   ├── Lightbox.jsx        # Fullscreen gallery image modal with navigation
│   │   ├── SectionHeader.jsx   # Consistent corporate section typography
│   │   └── ScrollToTop.jsx     # Route change scroll-reset handler
│   ├── data/
│   │   ├── companyData.js      # Verified company details, products, contact info
│   │   └── images.js           # Centralized image paths & gallery metadata
│   ├── pages/
│   │   ├── Home.jsx            # Full 16-section corporate homepage
│   │   ├── About.jsx           # Enterprise background, approach & values
│   │   ├── OurFarm.jsx         # Connected production cycle & operational pillars
│   │   ├── Products.jsx        # Table eggs, layer birds, and poultry manure
│   │   ├── Sustainability.jsx  # Circular resource efficiency & manure utilization
│   │   ├── Gallery.jsx         # Interactive masonry gallery with category filters
│   │   ├── Contact.jsx         # Contact form, Google Maps embed & direct channels
│   │   └── CompanyProfile.jsx  # Executive profile dossier with print & PDF download
│   ├── index.css               # Tailwind directives & typography layers
│   ├── App.jsx                 # App routing and modal coordination
│   └── main.jsx
├── tailwind.config.js
└── package.json
```

---

## 🛠️ Local Development & Build Commands

### 1. Install dependencies
```bash
npm install
```

### 2. Start local development server
```bash
npm run dev
```
Accessible at: `http://localhost:5173/`

### 3. Run linting check
```bash
npm run lint
```

### 4. Build for production
```bash
npm run build
```
Creates an optimized, compressed production bundle in `./dist` ready for immediate deployment on **Vercel**, **Netlify**, or **Cloudflare Pages**.
