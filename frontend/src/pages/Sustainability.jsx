import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Recycle, Leaf, Sprout, CheckCircle2 } from "lucide-react";
import { COMPANY } from "../data/companyData";
import { IMAGES } from "../data/images";
import SectionHeader from "../components/SectionHeader";
import SEO from "../components/SEO";

export default function Sustainability({ onOpenEnquiry }) {
  return (
    <div className="pt-24 sm:pt-28 pb-20">
      <SEO
        title="Sustainability & Manure Utilization"
        description="Discover how VARSHA AGRO connects layer poultry farming with regional soil rejuvenation through organic poultry manure in Maharashtra."
        canonicalPath="/sustainability"
      />

      {/* Hero Header */}
      <section className="relative py-20 lg:py-28 bg-forest text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.landscapeBreak}
            alt="Agricultural landscape and crop fields at Varsha Agro"
            loading="lazy"
            decoding="async"
            width="1376"
            height="768"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest/90 to-forest-dark/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-gold">
              RESPONSIBLE FARMING
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              From Farm Waste to<br />
              <span className="text-gold-light italic">Agricultural Value</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed max-w-2xl">
              How our layer poultry farming operations create an active, regenerative connection with soil enrichment and agricultural crop cultivation in Maharashtra.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-ivory border-b border-forest/10 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-charcoal/70 flex items-center gap-2">
          <Link to="/" className="hover:text-forest">Home</Link>
          <span>/</span>
          <span className="text-forest font-semibold">Sustainability</span>
        </div>
      </div>

      {/* Core Philosophy Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <SectionHeader
              badge="CIRCULAR PRINCIPLE"
              title="A Natural Agricultural Partnership"
              subtitle="Poultry farming and agriculture are not separate activities—they are complementary halves of a sustainable rural cycle."
              centered
            />
            <p className="text-charcoal/80 text-base leading-relaxed pt-2">
              At <strong>VARSHA AGRO</strong>, we take a balanced, sensible approach to environmental responsibility. Rather than making unsubstantiated claims, we focus on concrete, everyday agricultural practices: reducing resource waste, keeping sheds hygienic, and channeling organic poultry manure back into cultivating crops.
            </p>
          </div>
        </div>
      </section>

      {/* Four Pillar Sections */}
      <section className="py-16 bg-ivory border-y border-forest/10 space-y-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Section 1: Resource Efficiency */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-forest text-gold flex items-center justify-center">
                <Recycle className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-forest">
                Resource Efficiency in Daily Operations
              </h2>
              <p className="text-charcoal/80 text-base leading-relaxed font-light">
                We believe responsible farming starts with how thoughtfully inputs are utilized inside the shed.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  "Controlled water lines to eliminate wastage and keep shed floors dry",
                  "Formulated ration delivery so feed is consumed efficiently without excess loss",
                  "Naturally ventilated shed orientations that harness ambient airflow to reduce energy consumption",
                  "Careful handling of fiber egg flats to minimize carton damage and encourage reuse"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-charcoal/85">
                    <CheckCircle2 className="w-4 h-4 text-agri shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-card border border-forest/10">
                <img
                  src={IMAGES.layerShed}
                  alt="Ventilated shed with water lines and bird management"
                  className="w-full h-[360px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Poultry Manure Utilization */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 lg:order-2 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-forest text-gold flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-forest">
                Poultry Manure: Organic Soil Wealth
              </h2>
              <p className="text-charcoal/80 text-base leading-relaxed font-light">
                Poultry manure is widely recognized among agronomists as an exceptional organic soil conditioner. It replenishes micro-flora and organic carbon that intensive chemical fertilizers deplete over time.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  "High natural concentration of organic nitrogen, phosphorus, and potassium (NPK)",
                  "Improves moisture retention and soil aeration in clayey and loamy soils",
                  "Encourages beneficial earthworms and soil microbial diversity",
                  "Collected from clean, aerated sheds and cured properly before bagging"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-charcoal/85">
                    <CheckCircle2 className="w-4 h-4 text-agri shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-card border border-forest/10">
                <img
                  src={IMAGES.products.manure}
                  alt="Bagged organic poultry manure beside crop field"
                  className="w-full h-[360px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Agricultural Utilization */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-forest text-gold flex items-center justify-center">
                <Sprout className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-forest">
                Agricultural Utilization in Dharashiv &amp; Marathwada
              </h2>
              <p className="text-charcoal/80 text-base leading-relaxed font-light">
                Our farm is deeply embedded in the rural landscape of Kalamb taluka. We take pride in supplying organic manure to farmers across diverse cropping sectors.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  "Sugarcane Cultivators: Basal application before furrow planting and ratoon maintenance",
                  "Fruit Orchards: Used extensively in pomegranate, mango, custard apple and grape groves",
                  "Field Crops: Soybean, cotton, tur dal (pigeon pea), and grams",
                  "Bagged packaging ensures easy transportation in tractors, pickups, and trucks"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-charcoal/85">
                    <CheckCircle2 className="w-4 h-4 text-agri shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-card border border-forest/10">
                <img
                  src={IMAGES.farmAerial}
                  alt="Agricultural farmland and crop cultivation in Maharashtra"
                  className="w-full h-[360px] object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Responsible Farming Commitment CTA */}
      <section className="py-20 bg-forest text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold">
            COMMUNITY &amp; AGRICULTURE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Supplying Organic Manure for Your Farm Land
          </h2>
          <p className="text-base text-gray-200 font-light max-w-2xl mx-auto leading-relaxed">
            Interested in booking bagged poultry manure for your upcoming crop season? Get in touch with our dispatch coordinator for current availability and farm-gate collection.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onOpenEnquiry && onOpenEnquiry("Poultry Manure")}
              className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-forest-dark font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-md transition-all"
            >
              <span>ENQUIRE ABOUT MANURE SACKS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={COMPANY.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold text-white border border-white/40 hover:bg-white/10 transition-all"
            >
              <span>CHAT ON WHATSAPP</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
