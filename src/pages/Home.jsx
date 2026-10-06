import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Phone,
  MessageSquare,
  Check,
  Recycle,
  Leaf,
  Sprout,
  ShieldCheck,
  CheckCircle,
  TrendingUp,
  Handshake,
  Download,
  Eye,
  MapPin,
  ChevronRight,
  Clock,
  ShoppingBag
} from "lucide-react";
import { COMPANY } from "../data/companyData";
import { IMAGES, GALLERY_ITEMS } from "../data/images";
import SectionHeader from "../components/SectionHeader";
import Lightbox from "../components/Lightbox";

export default function Home({ onOpenEnquiry }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryFilter, setGalleryFilter] = useState("ALL");

  // Home preview gallery filtered items
  const filteredGallery = galleryFilter === "ALL" 
    ? GALLERY_ITEMS.slice(0, 6) 
    : GALLERY_ITEMS.filter((item) => item.category === galleryFilter).slice(0, 6);

  const handleLightboxNav = (direction) => {
    if (!selectedImage) return;
    const currentIndex = GALLERY_ITEMS.findIndex((img) => img.id === selectedImage.id);
    if (direction === "next") {
      const nextIndex = (currentIndex + 1) % GALLERY_ITEMS.length;
      setSelectedImage(GALLERY_ITEMS[nextIndex]);
    } else {
      const prevIndex = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
      setSelectedImage(GALLERY_ITEMS[prevIndex]);
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* ==================================================
          5. HERO SECTION (Full-Screen 90–100vh)
          ================================================== */}
      <section
        id="hero-section"
        className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 lg:pt-32 lg:pb-16 text-white overflow-hidden"
      >
        {/* Cinematic Background with Slow Zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={IMAGES.hero}
            alt="Modern layer poultry farm at sunrise in Maharashtra"
            className="w-full h-full object-cover object-center scale-105 animate-[pulse_10s_ease-in-out_infinite] transition-transform duration-1000 ease-out"
            style={{ animationDuration: "20s" }}
          />
          {/* Subtle Dark Forest Green Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/95 via-forest/85 to-forest-dark/70"></div>
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,36,25,0.6)_100%)]"></div>
        </div>

        {/* Hero Main Content (Left Aligned) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto w-full">
          <div className="max-w-3xl space-y-6 sm:space-y-8">
            {/* Small Gold Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-light/60 border border-gold/30 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-gold">
                {COMPANY.name}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              Nurturing Birds.<br />
              Producing Quality.<br />
              <span className="text-gold-light italic">Growing Sustainably.</span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-xl text-gray-200 font-light leading-relaxed max-w-2xl">
              We are committed to responsible layer poultry farming, quality egg production and sustainable utilization of agricultural resources.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to="/farm"
                id="hero-explore-farm-btn"
                className="group inline-flex items-center justify-center gap-2.5 bg-gold hover:bg-gold-light text-forest-dark font-bold px-8 py-4 rounded-full text-xs sm:text-sm tracking-wider uppercase shadow-card hover:shadow-glow-gold transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>EXPLORE OUR FARM</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/contact"
                id="hero-contact-btn"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-xs sm:text-sm tracking-wider uppercase font-semibold text-white border border-white/60 hover:bg-white/10 hover:border-white transition-all duration-300 text-center"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>

        {/* Subtle Information Strip at bottom */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8 sm:mt-12">
          {/* Contact & Admin Login Row above horizontal line */}
          <div className="flex items-center justify-between pb-3.5 gap-4">
            <a
              href={COMPANY.contact.phoneHref}
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-gold transition-colors py-1.5 px-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 whitespace-nowrap shrink-0"
              title="Call Varsha Agro Direct Farm"
            >
              <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
              <span className="whitespace-nowrap font-medium tracking-normal">+91&nbsp;9011601055</span>
            </a>

            <Link
              to="/admin"
              id="hero-admin-login-btn"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest-dark/90 hover:bg-gold text-gold hover:text-forest-dark border border-gold/50 hover:border-gold shadow-md backdrop-blur-md text-xs font-bold tracking-widest uppercase transition-all duration-300 transform hover:-translate-y-0.5 group shrink-0 whitespace-nowrap"
            >
              <ShieldCheck className="w-4 h-4 text-gold group-hover:text-forest-dark transition-colors" />
              <span>ADMIN LOGIN</span>
            </Link>
          </div>

          <div className="pt-5 border-t border-white/15">
            <div className="flex flex-wrap items-center justify-between gap-y-3 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-gold-muted/90">
              <span className="hover:text-gold transition-colors">LAYER POULTRY</span>
              <span className="text-gold/50 hidden sm:inline">•</span>
              <span className="hover:text-gold transition-colors">EGG PRODUCTION</span>
              <span className="text-gold/50 hidden sm:inline">•</span>
              <span className="hover:text-gold transition-colors">FARM-MADE FEED</span>
              <span className="text-gold/50 hidden sm:inline">•</span>
              <span className="hover:text-gold transition-colors">POULTRY MANURE</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          6. INTRODUCTION SECTION (Warm Ivory #F7F4EC)
          ================================================== */}
      <section id="introduction" className="py-20 lg:py-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Large Professional Poultry Farm Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-card border border-forest/10 group">
                <img
                  src={IMAGES.farmShedReal}
                  alt="Varsha Agro poultry farm shed and layer poultry facility"
                  className="w-full h-[340px] sm:h-[460px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold">
                    Dharashiv District, Maharashtra
                  </span>
                  <p className="font-serif text-lg font-medium text-white/95 mt-1">
                    Structured farm facility with disciplined management
                  </p>
                </div>
              </div>

              {/* Decorative Accent Badge */}
              <div className="hidden sm:flex absolute -bottom-6 -right-6 bg-forest text-white p-5 rounded-2xl shadow-card border border-gold/30 items-center gap-4 max-w-xs">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-wider uppercase text-gold">Biosecurity &amp; Care</div>
                  <div className="text-xs text-gray-300 mt-0.5">Strict daily hygiene and flock monitoring</div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="lg:col-span-6 space-y-6">
              <SectionHeader
                badge="WHO WE ARE"
                title="Modern Poultry Farming with a Purpose"
              />

              <div className="space-y-4 text-charcoal/85 text-base sm:text-lg leading-relaxed">
                <p>
                  <strong>VARSHA AGRO</strong> is an agriculture-focused enterprise engaged in layer poultry farming and egg production.
                </p>
                <p>
                  Our operation combines responsible bird management, farm-made feed preparation, hygienic practices and efficient resource utilization.
                </p>
                <p>
                  Alongside egg production, we responsibly utilize poultry by-products and make poultry manure available for agricultural use.
                </p>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  id="intro-discover-story-btn"
                  className="group inline-flex items-center gap-3 bg-forest hover:bg-forest-light text-white font-semibold px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all duration-300 shadow-sm"
                >
                  <span>DISCOVER OUR STORY</span>
                  <ArrowRight className="w-4 h-4 text-gold transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          NEW: VARSHA AGRO EGG SHOP SECTION (Murud, Latur)
          ================================================== */}
      <section
        id="egg-shop-section"
        className="py-20 lg:py-28 bg-white border-t border-forest/10 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header (Mobile Title appears first) */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-gold mb-2">
              OUR CUSTOMER OUTLET
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-forest leading-[1.15]">
              VARSHA AGRO EGG SHOP
            </h2>
            <p className="text-base sm:text-lg font-medium text-agri mt-2">
              Fresh Eggs. Wholesale &amp; Retail.
            </p>
            <p className="text-charcoal/80 text-sm sm:text-base mt-2 leading-relaxed">
              Our dedicated offline egg shop in Murud brings Varsha Agro's eggs directly to customers, retailers and local businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT SIDE: ATTACHED IMAGE 1 (REAL VARSHA AGRO EGG SHOP) */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-card border border-gold/30 bg-ivory group">
                <img
                  src={IMAGES.eggShop}
                  alt="Varsha Agro Egg Shop in Murud, Latur, Maharashtra"
                  className="w-full h-auto max-h-[640px] sm:max-h-[720px] object-contain sm:object-cover mx-auto transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                
                {/* Small elegant badge over the image: OFFLINE STORE | MURUD • LATUR */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-forest/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full border border-gold/40 shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-light">
                      OFFLINE STORE
                    </span>
                    <span className="text-white/40">•</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-white">
                      MURUD • LATUR
                    </span>
                  </div>
                </div>

                {/* Subtle bottom gradient for clarity */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-forest-dark/50 to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* RIGHT SIDE: Text and Shop Information */}
            <div className="lg:col-span-6 space-y-8">
              
              {/* Content Block */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold block">
                  VARSHA AGRO — MURUD
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest leading-tight">
                  Your Local Source for Quality Eggs
                </h3>
                <div className="space-y-3.5 text-charcoal/85 text-sm sm:text-base leading-relaxed font-light">
                  <p>
                    Varsha Agro operates its own offline Egg Shop in Murud, where customers can purchase eggs directly through wholesale and retail sales.
                  </p>
                  <p>
                    The outlet serves local customers, retailers and bulk buyers, making it convenient to access Varsha Agro eggs directly from our customer-facing location.
                  </p>
                  <p>
                    Our shop team is available throughout operating hours to assist customers with egg purchases, availability and wholesale requirements.
                  </p>
                </div>
              </div>

              {/* Three Information Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* CARD 1: WHOLESALE & RETAIL */}
                <div className="p-4 rounded-xl bg-ivory border border-forest/10 shadow-xs flex flex-col justify-between hover:border-gold/40 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-forest/5 text-forest flex items-center justify-center mb-3">
                    <ShoppingBag className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-forest uppercase tracking-wide">
                      WHOLESALE &amp; RETAIL
                    </h4>
                    <p className="text-xs text-charcoal/80 mt-1 leading-snug font-light">
                      Eggs available for both wholesale and retail customers.
                    </p>
                  </div>
                </div>

                {/* CARD 2: OPEN DAILY */}
                <div className="p-4 rounded-xl bg-ivory border border-forest/10 shadow-xs flex flex-col justify-between hover:border-gold/40 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-forest/5 text-forest flex items-center justify-center mb-3">
                    <Clock className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-forest uppercase tracking-wide">
                      OPEN DAILY
                    </h4>
                    <p className="text-xs text-charcoal/80 mt-1 leading-snug font-light">
                      8:00 AM – 9:00 PM
                    </p>
                  </div>
                </div>

                {/* CARD 3: MURUD, LATUR */}
                <a
                  href="https://maps.app.goo.gl/dTYpuwWmy4fk7GJKA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-ivory border border-forest/10 shadow-xs flex flex-col justify-between hover:border-gold/60 transition-colors group cursor-pointer"
                  title="Open Egg Shop location in Google Maps"
                >
                  <div className="w-9 h-9 rounded-lg bg-forest/5 text-forest group-hover:bg-gold/20 flex items-center justify-center mb-3 transition-colors">
                    <MapPin className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-forest uppercase tracking-wide group-hover:text-gold transition-colors">
                      MURUD, LATUR
                    </h4>
                    <p className="text-xs text-charcoal/80 mt-1 leading-snug font-light">
                      Murud, Latur District, Maharashtra – 413510
                    </p>
                  </div>
                </a>

              </div>

              {/* LOCATION BLOCK */}
              <div className="p-5 sm:p-6 rounded-2xl bg-ivory border border-forest/15 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-forest">
                  <MapPin className="w-4 h-4 text-gold shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider text-forest">
                    VISIT OUR EGG SHOP
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-sm text-charcoal/85 leading-snug">
                    <p className="font-semibold text-forest">Varsha Agro Egg Shop</p>
                    <p>Murud, Latur District,</p>
                    <p>Maharashtra – 413510</p>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/dTYpuwWmy4fk7GJKA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-forest hover:bg-forest-light text-white text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 shadow-sm"
                  >
                    <span>GET DIRECTIONS</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold" />
                  </a>
                </div>
              </div>

              {/* SHOP CALL TO ACTION */}
              <div className="pt-2 border-t border-forest/10 space-y-4">
                <div>
                  <h4 className="font-serif text-lg font-bold text-forest">
                    LOOKING FOR EGGS IN BULK?
                  </h4>
                  <p className="text-xs sm:text-sm text-charcoal/80 mt-0.5">
                    Visit our Murud outlet for wholesale and retail egg requirements.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <a
                    href="https://maps.app.goo.gl/dTYpuwWmy4fk7GJKA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-forest-dark font-bold px-7 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-sm transition-all text-center"
                  >
                    <span>VISIT OUR SHOP →</span>
                  </a>

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 border border-forest text-forest hover:bg-forest hover:text-white px-7 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all text-center"
                  >
                    <span>CONTACT US</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          7. BUSINESS HIGHLIGHTS (Dark Forest-Green)
          ================================================== */}
      <section id="business-highlights" className="bg-forest-dark text-white py-16 lg:py-20 relative border-y border-forest-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gold/25">
            {COMPANY.highlights.map((item) => (
              <div
                key={item.number}
                className="py-6 sm:py-4 px-4 lg:px-6 first:pl-0 last:pr-0 group"
              >
                <span className="font-serif text-3xl lg:text-4xl text-gold font-light tracking-tight block">
                  {item.number}
                </span>
                <h3 className="font-serif text-lg lg:text-xl font-bold tracking-wide mt-3 text-white group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs lg:text-sm text-gray-300 font-light mt-1.5 leading-snug">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          8. PRODUCTS SECTION (White Background)
          ================================================== */}
      <section id="products-section" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionHeader
              badge="WHAT WE PRODUCE"
              title="Our Products"
              subtitle="From our poultry farming operation to agricultural utilization, every product reflects our commitment to responsible production."
              centered
            />
          </div>

          {/* Three Premium Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {COMPANY.products.map((product) => {
              const imageMap = {
                "fresh-eggs": IMAGES.products.eggs,
                "layer-poultry-birds": IMAGES.products.birds,
                "poultry-manure": IMAGES.products.manure,
              };

              return (
                <div
                  key={product.id}
                  className="bg-ivory rounded-2xl overflow-hidden border border-forest/10 shadow-card hover:shadow-card-hover transition-all duration-500 group flex flex-col justify-between transform hover:-translate-y-1.5"
                >
                  <div>
                    {/* Image with Zoom */}
                    <div className="relative h-64 overflow-hidden bg-forest-dark">
                      <img
                        src={imageMap[product.id]}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-forest/85 backdrop-blur-md text-gold text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-gold/30">
                          {product.badge}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-7 space-y-3">
                      <h3 className="font-serif text-2xl font-bold text-forest tracking-tight group-hover:text-forest-light transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-sm text-charcoal/80 leading-relaxed">
                        {product.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="px-6 pb-6 pt-2">
                    <button
                      onClick={() => onOpenEnquiry && onOpenEnquiry(product.enquiryCategory)}
                      className="w-full inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest-light text-white font-semibold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-sm border border-forest/10 hover:border-gold/30"
                    >
                      <span>{product.ctaText}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-forest hover:text-agri font-semibold text-sm underline underline-offset-4 tracking-wider transition-colors"
            >
              <span>View full product specifications and details</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          9. FARM PROCESS (Dark Forest-Green)
          ================================================== */}
      <section id="process-section" className="py-24 bg-forest text-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-agri/10 filter blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionHeader
              badge="FROM FARM TO PRODUCT"
              title="Our Farming Process"
              subtitle="We focus on maintaining a connected production cycle—from preparing feed for our own birds to managing egg production and responsibly utilizing farm by-products."
              centered
              theme="dark"
            />
          </div>

          {/* Horizontal Process / Timeline on Desktop, Vertical on Mobile */}
          <div className="relative">
            {/* Subtle Gold Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/10 via-gold/40 to-gold/10 -translate-y-12 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
              {COMPANY.processStages.map((stage) => (
                <div
                  key={stage.number}
                  className="bg-forest-dark/80 backdrop-blur-sm p-6 rounded-2xl border border-gold/20 flex flex-col items-center text-center group hover:border-gold/50 transition-all duration-300"
                >
                  {/* Step Number Circle */}
                  <div className="w-12 h-12 rounded-full bg-forest border-2 border-gold text-gold font-serif text-lg font-bold flex items-center justify-center shadow-glow-gold mb-4 group-hover:scale-110 transition-transform">
                    {stage.number}
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                    {stage.title}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-gold-light mt-1 font-medium">
                    {stage.subtitle}
                  </p>
                  <p className="text-xs text-gray-300 font-light mt-3 leading-relaxed">
                    {stage.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 p-6 rounded-2xl bg-forest-dark/50 border border-white/10 max-w-3xl mx-auto text-center">
            <p className="text-sm text-gray-300 leading-relaxed font-light">
              Every stage is managed with an emphasis on animal welfare, consistent nutrition, and closed-loop resource efficiency between poultry operations and regional agriculture.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          10. FARM-MADE FEED (Split Screen)
          ================================================== */}
      <section id="feed-section" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Large Realistic Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-card border border-forest/10 group">
                <img
                  src={IMAGES.feed}
                  alt="Poultry feed ingredients including yellow corn, wheat, and soya meal at Varsha Agro"
                  className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold block">
                    In-House Nutrition Management
                  </span>
                  <p className="text-sm text-gray-200 mt-1 font-light">
                    Controlled ingredients prepared exclusively for our own layer flock.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="lg:col-span-6 space-y-6">
              <SectionHeader
                badge="OUR FEED"
                title="Feed Prepared for Our Own Birds"
                subtitle="We prepare poultry feed using selected raw materials for use within our own poultry farming operation."
              />

              {/* Four Feature Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  "Selected raw materials",
                  "Controlled preparation",
                  "Efficient feeding practices",
                  "Farm-focused nutrition"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-ivory border border-forest/10">
                    <div className="w-7 h-7 rounded-full bg-agri/15 text-agri flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <span className="text-sm font-semibold text-forest">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <p className="text-xs text-charcoal/70 italic border-l-2 border-gold pl-3">
                  * Note: Varsha Agro prepares balanced feed strictly for our in-house layer poultry flock to maintain uniform egg quality and bird health.
                </p>
              </div>

              <div className="pt-4">
                <Link
                  to="/farm"
                  id="feed-learn-farm-btn"
                  className="group inline-flex items-center gap-3 bg-forest hover:bg-forest-light text-white font-semibold px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all duration-300 shadow-sm"
                >
                  <span>LEARN ABOUT OUR FARM</span>
                  <ArrowRight className="w-4 h-4 text-gold transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          11. SUSTAINABILITY (Warm Ivory #F7F4EC)
          ================================================== */}
      <section id="sustainability-section" className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionHeader
              badge="RESPONSIBLE FARMING"
              title="Making Better Use of Every Resource"
              subtitle="Our poultry operation connects healthy bird management with practical agricultural reuse, minimizing waste and giving back to the soil."
              centered
            />
          </div>

          {/* Three Premium Cards with Lucide Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl border border-forest/10 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-forest/5 text-agri flex items-center justify-center mb-6 group-hover:bg-agri group-hover:text-white transition-colors duration-300">
                  <Recycle className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-forest tracking-tight">
                  RESOURCE EFFICIENCY
                </h3>
                <p className="text-sm text-charcoal/80 mt-3 leading-relaxed">
                  We aim to use farm resources efficiently and reduce avoidable waste through disciplined handling, water conservation, and clean shed management.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-forest/10 flex items-center text-xs font-semibold text-agri">
                <span>Sustainable operations</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl border border-forest/10 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-forest/5 text-agri flex items-center justify-center mb-6 group-hover:bg-agri group-hover:text-white transition-colors duration-300">
                  <Leaf className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-forest tracking-tight">
                  POULTRY MANURE
                </h3>
                <p className="text-sm text-charcoal/80 mt-3 leading-relaxed">
                  Poultry manure is collected and made available for agricultural use, providing local cultivators with an organic source of nitrogen and soil nutrients.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-forest/10 flex items-center text-xs font-semibold text-agri">
                <span>Organic soil replenishment</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl border border-forest/10 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-forest/5 text-agri flex items-center justify-center mb-6 group-hover:bg-agri group-hover:text-white transition-colors duration-300">
                  <Sprout className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-forest tracking-tight">
                  FARM + AGRICULTURE
                </h3>
                <p className="text-sm text-charcoal/80 mt-3 leading-relaxed">
                  Our poultry operation creates a connection between livestock production and agricultural use of farm by-products, fostering a circular rural economy.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-forest/10 flex items-center text-xs font-semibold text-agri">
                <span>Circular rural partnership</span>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/sustainability"
              className="inline-flex items-center gap-2 bg-agri/10 hover:bg-agri/20 text-agri px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-colors"
            >
              <span>Explore our sustainability practices</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          12. LARGE IMAGE BREAK (500–600px tall)
          ================================================== */}
      <section
        id="image-break"
        className="relative h-[500px] lg:h-[580px] flex items-center justify-center text-center text-white overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={IMAGES.landscapeBreak}
            alt="Aerial panoramic view of Indian agricultural fields at golden hour"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/80 via-forest-dark/60 to-forest-dark/90"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">
            VARSHA AGRO
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight">
            From Our Farm<br />
            to Your Market
          </h2>
          <p className="text-base sm:text-xl text-gray-200 font-light tracking-wide max-w-xl mx-auto">
            Responsible production. Consistent quality. Sustainable thinking.
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-forest-dark font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-card transition-all transform hover:-translate-y-0.5"
            >
              <span>GET IN TOUCH WITH US</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          13. WHY VARSHA AGRO (White Background)
          ================================================== */}
      <section id="why-us" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionHeader
              badge="WHY CHOOSE US"
              title="Built on Quality & Responsibility"
              centered
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="p-7 rounded-2xl bg-ivory border border-forest/10 hover:border-gold/40 transition-all duration-300 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-forest text-gold flex items-center justify-center font-bold">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest tracking-tight">
                RESPONSIBLE FARMING
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-light">
                Focused on healthy birds and efficient farm management with regular care and hygiene.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-7 rounded-2xl bg-ivory border border-forest/10 hover:border-gold/40 transition-all duration-300 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-forest text-gold flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest tracking-tight">
                QUALITY PRODUCTION
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-light">
                Dedicated to consistent egg production, uniform grading, and careful paper tray handling.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-7 rounded-2xl bg-ivory border border-forest/10 hover:border-gold/40 transition-all duration-300 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-forest text-gold flex items-center justify-center font-bold">
                <Recycle className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest tracking-tight">
                RESOURCE UTILIZATION
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-light">
                Responsible use of poultry by-products and bagged poultry manure for agricultural purposes.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-7 rounded-2xl bg-ivory border border-forest/10 hover:border-gold/40 transition-all duration-300 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-forest text-gold flex items-center justify-center font-bold">
                <Handshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest tracking-tight">
                TRUST &amp; TRANSPARENCY
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-light">
                Building long-term relationships with customers, traders, and agricultural business partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          14. GALLERY (Dark Forest-Green)
          ================================================== */}
      <section id="gallery-preview" className="py-24 bg-forest text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <SectionHeader
                badge="LIFE AT VARSHA AGRO"
                title="Our Farm in Pictures"
                theme="dark"
              />
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              {["ALL", "FARM", "BIRDS", "EGGS", "FEED", "OPERATIONS", "MANURE"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors ${
                    galleryFilter === cat
                      ? "bg-gold text-forest-dark font-bold"
                      : "bg-forest-dark text-gray-300 hover:text-white border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry / Grid Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-card border border-white/10 bg-forest-dark"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white mt-1 group-hover:text-gold-light transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-300 font-light mt-1 line-clamp-2">
                    {item.caption}
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs text-gold font-medium">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Click to expand</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2.5 bg-gold hover:bg-gold-light text-forest-dark px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
            >
              <span>VIEW FULL GALLERY</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          15. COMPANY PROFILE CTA (Dark Premium)
          ================================================== */}
      <section id="company-profile-cta" className="py-20 bg-forest-dark text-white border-y border-forest-light/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold">
            ENTERPRISE OVERVIEW
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Want to Know More About VARSHA AGRO?
          </h2>
          <p className="text-base sm:text-lg text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Explore our company profile and learn more about our poultry farming operation, products and business approach.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/company-profile"
              id="home-profile-view-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gold hover:bg-gold-light text-forest-dark font-bold px-7 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-md transition-all"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD COMPANY PROFILE ↓</span>
            </Link>

            <Link
              to="/contact"
              id="home-profile-contact-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold text-white border border-white/40 hover:bg-white/10 transition-all"
            >
              <span>CONTACT US →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          16. CONTACT CTA (Warm Ivory #F7F4EC)
          ================================================== */}
      <section id="contact-cta" className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-forest/10 shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Heading and Info */}
              <div className="lg:col-span-7 space-y-6">
                <SectionHeader
                  badge="LET'S CONNECT"
                  title="Have an Enquiry?"
                  subtitle="Whether you are interested in our products, business opportunities or simply want to connect with us, we would be happy to hear from you."
                />

                <div className="pt-2 space-y-3 text-sm text-charcoal/90">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-agri shrink-0 mt-0.5" />
                    <span>{COMPANY.contact.address.full}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-agri shrink-0" />
                    <a href={COMPANY.contact.phoneHref} className="font-semibold text-forest hover:text-agri">
                      {COMPANY.contact.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <a
                  href={COMPANY.contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-4 px-6 rounded-2xl text-sm uppercase tracking-wider shadow-md transition-all duration-300"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>CHAT ON WHATSAPP</span>
                </a>

                <a
                  href={COMPANY.contact.phoneHref}
                  className="w-full inline-flex items-center justify-center gap-3 bg-forest hover:bg-forest-light text-white font-bold py-4 px-6 rounded-2xl text-sm uppercase tracking-wider shadow-md transition-all duration-300"
                >
                  <Phone className="w-5 h-5 text-gold" />
                  <span>CALL {COMPANY.contact.phone}</span>
                </a>

                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry()}
                  className="w-full inline-flex items-center justify-center gap-3 bg-ivory hover:bg-ivory-dark text-forest font-bold py-3.5 px-6 rounded-2xl text-xs uppercase tracking-wider border border-forest/20 transition-all"
                >
                  <span>SEND WRITTEN ENQUIRY</span>
                  <ArrowRight className="w-4 h-4 text-gold" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <Lightbox
          item={selectedImage}
          onClose={() => setSelectedImage(null)}
          onNext={() => handleLightboxNav("next")}
          onPrev={() => handleLightboxNav("prev")}
        />
      )}
    </div>
  );
}
