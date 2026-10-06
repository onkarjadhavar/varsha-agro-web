import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Shield, Sprout, Target } from "lucide-react";
import { COMPANY } from "../data/companyData";
import { IMAGES } from "../data/images";
import SectionHeader from "../components/SectionHeader";

export default function About({ onOpenEnquiry }) {
  return (
    <div className="pt-24 sm:pt-28 pb-20">
      {/* Hero Header */}
      <section className="relative py-20 lg:py-28 bg-forest text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.farmAerial}
            alt="Agricultural farmland in Maharashtra"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest/90 to-forest-dark/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-gold">
              ABOUT VARSHA AGRO
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Growing with Agriculture.<br />
              <span className="text-gold-light italic">Driven by Quality.</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed max-w-2xl">
              An enterprise established to combine modern layer poultry management with sustainable agricultural resource utilization in Dharashiv, Maharashtra.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <div className="bg-ivory border-b border-forest/10 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-charcoal/70 flex items-center gap-2">
          <Link to="/" className="hover:text-forest">Home</Link>
          <span>/</span>
          <span className="text-forest font-semibold">About Us</span>
        </div>
      </div>

      {/* Who We Are & Our Business */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <SectionHeader
                badge="ENTERPRISE PROFILE"
                title="Who We Are"
              />
              <div className="space-y-4 text-charcoal/85 text-base leading-relaxed">
                <p>
                  <strong>VARSHA AGRO (Foods and Feeds)</strong> is an agriculture-focused enterprise headquartered in Wathwada, Taluka Kalamb, District Dharashiv, Maharashtra.
                </p>
                <p>
                  Our primary activities center around disciplined layer poultry farming and high-quality egg production. We operate with a strong focus on hygienic flock management, farm-controlled nutrition, and systematic biosecurity to ensure consistent quality in every egg we supply.
                </p>
                <p>
                  Beyond egg production, we understand that poultry and agriculture share an indispensable bond. We process farm by-products into high-grade poultry manure, providing local agricultural communities with rich organic nutrients to nourish regional crop soils.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry("Business Enquiry")}
                  className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-forest-dark font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>CONNECT WITH US</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Image Grid */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-card border border-forest/10">
                <img
                  src={IMAGES.layerShed}
                  alt="Layer poultry farming environment at Varsha Agro"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gold">
                    Flock Care &amp; Facilities
                  </span>
                  <p className="font-serif text-lg font-medium text-white/95 mt-1">
                    Structured sheds designed for clean airflow, hydration, and flock well-being.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-ivory border-y border-forest/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <SectionHeader
              badge="METHODOLOGY"
              title="Our Approach"
              subtitle="A systematic, hygiene-first model that integrates every step of the poultry and egg production cycle."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-forest/10 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-forest text-gold flex items-center justify-center font-bold">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest">
                Biosecurity &amp; Bird Welfare
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-light">
                We believe healthy layer birds are the cornerstone of quality egg production. Our sheds maintain strict entry protocols, daily cleaning routines, and constant freshwater availability.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-forest/10 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-forest text-gold flex items-center justify-center font-bold">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest">
                Nutritional Integrity
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-light">
                Rather than relying on generic formulations, we prepare our feed on-site using carefully verified yellow maize, grain, and protein ingredients customized for our flock's lifecycle.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-forest/10 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-forest text-gold flex items-center justify-center font-bold">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest">
                Agricultural Integration
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-light">
                Our farm does not treat manure as waste. We collect, cure, and bag nutrient-rich poultry manure to support surrounding farmers and sugarcane/crop growers in Marathwada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionHeader
              badge="GUIDING PRINCIPLES"
              title="Our Values"
              subtitle="The core values that guide our day-to-day operations and partnerships across the agricultural ecosystem."
              centered
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {COMPANY.values.map((v, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-ivory border border-forest/10 flex flex-col justify-between hover:border-gold/50 transition-all duration-300"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold block mb-2">
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-forest">
                    {v.title}
                  </h3>
                  <p className="text-xs text-charcoal/80 mt-3 leading-relaxed font-light">
                    {v.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-forest/10 flex items-center gap-1.5 text-xs text-agri font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Standard</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-20 bg-forest text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold">
            FORWARD OUTLOOK
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Our Vision
          </h2>
          <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed max-w-2xl mx-auto">
            To be a benchmark of responsible poultry farming in Maharashtra—recognized for high standards of hygiene, consistent quality in table eggs, and sustainable agricultural partnership with regional farming communities.
          </p>

          <div className="pt-6">
            <Link
              to="/farm"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-forest-dark font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-md transition-all"
            >
              <span>EXPLORE OUR FARM OPERATIONS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
