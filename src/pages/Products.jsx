import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, AlertCircle, Phone } from "lucide-react";
import { COMPANY } from "../data/companyData";
import { IMAGES } from "../data/images";
import SEO from "../components/SEO";

export default function Products({ onOpenEnquiry }) {

  const productData = [
    {
      id: "fresh-eggs",
      title: "Fresh Table Eggs",
      category: "Eggs",
      badge: "Core Produce",
      tagline: "Farm-Fresh Quality Table Eggs",
      image: IMAGES.products.eggs,
      description: "Our table eggs are produced by healthy layer birds reared under systematic hygiene and farm-controlled feed. Every morning, eggs are collected, inspected for shell integrity, and graded before being packed in standard 30-egg pulp filler flats.",
      specifications: [
        { label: "Product Category", value: "Commercial Table Eggs" },
        { label: "Collection Frequency", value: "Daily Morning Harvest" },
        { label: "Packaging Type", value: "Molded Fiber Pulp Filler Flats (30 Eggs / Tray)" },
        { label: "Shell Characteristic", value: "Uniform, clean, resilient shell texture" },
        { label: "Diet Base", value: "In-house balanced grain, maize & protein mash" },
        { label: "Supply Formats", value: "Wholesale crates, carton boxes, bulk vehicle lots" },
      ],
      suitableFor: [
        "Egg wholesalers and regional distributors",
        "Retailers and supermarket chains",
        "Food processing units, bakeries and institutions",
        "Hotels, caterers and commercial kitchens"
      ],
      enquiryCategory: "Eggs",
      cta: "ENQUIRE ABOUT FRESH EGGS →"
    },
    {
      id: "layer-poultry-birds",
      title: "Layer Poultry Birds",
      category: "Birds",
      badge: "Flock Batches",
      tagline: "End-of-Cycle Layer Birds",
      image: IMAGES.products.birds,
      description: "At the conclusion of their productive laying cycle, layer poultry birds are made available in scheduled farm batches. Reared throughout their lifetime under rigorous biosecurity protocols and attentive nutritional monitoring.",
      specifications: [
        { label: "Product Category", value: "Layer Poultry Birds (Spent Hens)" },
        { label: "Flock Type", value: "Commercial Layer Breed" },
        { label: "Availability", value: "Scheduled cycle-end batches (pre-booking recommended)" },
        { label: "Health Protocols", value: "Maintained under systematic veterinary schedules" },
        { label: "Pickup Mode", value: "Direct farm-gate pickup & vehicle transport" },
      ],
      suitableFor: [
        "Poultry meat wholesalers and processors",
        "Live bird traders and suppliers",
        "Commercial food processors"
      ],
      enquiryCategory: "Layer Birds",
      cta: "CHECK FLOCK AVAILABILITY →"
    },
    {
      id: "poultry-manure",
      title: "Poultry Manure",
      category: "Manure",
      badge: "Organic Soil Fertilizer",
      tagline: "High-Nitrogen Organic Fertilizer for Agriculture",
      image: IMAGES.products.manure,
      description: "Poultry manure is renowned as one of the most nutrient-dense natural organic fertilizers. Collected regularly from our clean, well-aerated sheds, our manure is available in bagged or bulk lots to enrich agricultural soil and enhance crop yields.",
      specifications: [
        { label: "Product Category", value: "Natural Organic Poultry Manure" },
        { label: "Nutrient Profile", value: "Naturally rich in Nitrogen (N), Phosphorus (P), Potassium (K) & organic carbon" },
        { label: "Form", value: "Dry, cured farm manure" },
        { label: "Packaging", value: "Heavy-duty HDPE woven sacks (Standard farm bagging) & bulk lorry dispatch" },
        { label: "Application", value: "Soil preparation, pre-sowing and basal fertilization" },
      ],
      suitableFor: [
        "Sugarcane, cotton, soybean and pulse farmers",
        "Pomegranate, grape and fruit orchard growers",
        "Vegetable and greenhouse floriculture cultivators",
        "Agricultural input distributors and fertilizer dealers"
      ],
      enquiryCategory: "Poultry Manure",
      cta: "ENQUIRE ABOUT POULTRY MANURE →"
    }
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-20">
      <SEO
        title="Products | Fresh Table Eggs, Layer Birds & Organic Manure"
        description="Wholesale fresh table eggs in 30-egg trays, productive cycle layer poultry birds, and bagged organic poultry manure from VARSHA AGRO in Dharashiv."
        canonicalPath="/products"
      />

      {/* Hero Header */}
      <section className="relative py-20 lg:py-28 bg-forest text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.products.eggs}
            alt="Varsha Agro poultry and agricultural produce"
            loading="lazy"
            decoding="async"
            width="1200"
            height="896"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest/90 to-forest-dark/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-gold">
              WHAT WE PRODUCE
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Our Products &amp;<br />
              <span className="text-gold-light italic">Agricultural Supply</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed max-w-2xl">
              Fresh table eggs, layer birds, and nutrient-dense poultry manure produced under disciplined farm management in Dharashiv, Maharashtra.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-ivory border-b border-forest/10 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-charcoal/70 flex items-center gap-2">
          <Link to="/" className="hover:text-forest">Home</Link>
          <span>/</span>
          <span className="text-forest font-semibold">Products</span>
        </div>
      </div>

      {/* Pricing / Enquiry Transparency Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-4 rounded-xl bg-ivory border border-forest/15 flex items-start sm:items-center gap-3 text-xs sm:text-sm text-charcoal/80">
          <AlertCircle className="w-5 h-5 text-gold shrink-0 mt-0.5 sm:mt-0" />
          <span>
            <strong>Trade Pricing Note:</strong> Agricultural commodity prices and egg rates fluctuate according to regional market indices and batch availability. Please submit an enquiry or call our sales desk for today's trade rates and logistics dispatch schedules.
          </span>
        </div>
      </div>

      {/* Detailed Product Showcases */}
      <section className="py-16 bg-white space-y-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {productData.map((item, idx) => (
            <div
              key={item.id}
              id={item.id}
              className={`py-12 border-b border-forest/10 last:border-0 ${
                idx > 0 ? "pt-16" : ""
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                
                {/* Product Image Column */}
                <div className={`lg:col-span-5 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-card border border-forest/10 group">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      width="1200"
                      height="896"
                      className="w-full h-[360px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-forest text-gold text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-gold/40 shadow-sm">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  {/* Fast Action Box */}
                  <div className="mt-5 p-5 rounded-2xl bg-ivory border border-forest/10 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-agri font-semibold block">Ready to order?</span>
                      <span className="text-sm font-bold text-forest">{item.title}</span>
                    </div>
                    <button
                      onClick={() => onOpenEnquiry && onOpenEnquiry(item.enquiryCategory)}
                      className="px-5 py-2.5 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-semibold transition-colors"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>

                {/* Product Details Column */}
                <div className={`lg:col-span-7 space-y-6 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold block">
                      {item.tagline}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest mt-1">
                      {item.title}
                    </h2>
                  </div>

                  <p className="text-charcoal/85 text-base leading-relaxed">
                    {item.description}
                  </p>

                  {/* Specifications Table */}
                  <div className="bg-ivory rounded-2xl p-6 border border-forest/10">
                    <h3 className="font-serif text-lg font-bold text-forest mb-4">
                      Product Specifications
                    </h3>
                    <div className="space-y-3 text-xs sm:text-sm">
                      {item.specifications.map((spec, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-forest/5 last:border-0 gap-1"
                        >
                          <span className="font-medium text-charcoal/70">
                            {spec.label}
                          </span>
                          <span className="font-semibold text-forest text-left sm:text-right">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Suitable For */}
                  <div>
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-agri mb-3">
                      Recommended For
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {item.suitableFor.map((sub, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-xs text-charcoal/85">
                          <CheckCircle2 className="w-4 h-4 text-agri shrink-0" />
                          <span>{sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call to action button */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => onOpenEnquiry && onOpenEnquiry(item.enquiryCategory)}
                      className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-forest-dark font-bold px-7 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-sm transition-all"
                    >
                      <span>{item.cta}</span>
                    </button>

                    <a
                      href={COMPANY.contact.phoneHref}
                      className="inline-flex items-center justify-center gap-2 bg-ivory hover:bg-ivory-dark text-forest font-semibold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider border border-forest/15 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-gold" />
                      <span>Call Sales Desk</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Logistics & Dispatch Info */}
      <section className="py-16 bg-forest text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold">
            TRADE LOGISTICS
          </span>
          <h2 className="font-serif text-3xl font-bold text-white">
            Reliable Farm-Gate Dispatch &amp; Supply
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed font-light">
            We work closely with regional transporters and wholesalers across Dharashiv, Latur, Solapur, Beed, and surrounding Maharashtra districts. Order loading is managed systematically to ensure zero downtime and optimal product safety.
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-forest-dark font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-md transition-all"
            >
              <span>CONNECT FOR TRADE SUPPLY</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
