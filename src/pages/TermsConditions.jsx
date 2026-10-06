import React from "react";
import { Link } from "react-router-dom";
import { FileText, Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import SEO from "../components/SEO";
import { COMPANY } from "../data/companyData";

export default function TermsConditions() {
  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-ivory min-h-screen">
      <SEO
        title="Terms & Conditions"
        description="VARSHA AGRO Terms & Conditions: Understand our commercial inquiry policies, produce availability schedules, and website terms."
        canonicalPath="/terms"
      />

      {/* Header */}
      <section className="py-12 sm:py-16 bg-forest text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold-light font-semibold uppercase tracking-wider mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
          <div className="flex items-center gap-3 text-gold mb-2">
            <FileText className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-[0.25em]">LEGAL &amp; COMMERCIAL TERMS</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold">Terms &amp; Conditions</h1>
          <p className="text-sm text-gray-200 mt-2">
            Effective Date: January 1, 2026 &bull; Last Revised: October 2026
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="border-b border-forest/10 py-3 bg-white/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-charcoal/70 flex items-center gap-2">
          <Link to="/" className="hover:text-forest">Home</Link>
          <span>/</span>
          <span className="text-forest font-semibold">Terms &amp; Conditions</span>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-forest/10 shadow-card space-y-8 text-charcoal/90 text-sm leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-forest">1. Acceptance of Terms</h2>
            <p>
              Welcome to the official digital platform of <strong>VARSHA AGRO</strong> (Foods and Feeds), operated from Wathwada, Taluka Kalamb, District Dharashiv, Maharashtra. By browsing this website, submitting an inquiry, or placing wholesale orders, you agree to be bound by the terms and conditions described below.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-forest">2. Produce Availability &amp; Commercial Inquiries</h2>
            <p>
              VARSHA AGRO engages in the production of agricultural produce, specifically commercial table eggs, layer poultry birds, and organic poultry manure:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-charcoal/80">
              <li><strong>Table Eggs:</strong> Graded daily and supplied in standard 30-egg trays or master boxes. Rates and quantities fluctuate based on daily egg market trade benchmarks and farm production volumes.</li>
              <li><strong>Layer Poultry Birds:</strong> Flocks are sold exclusively at the conclusion of their natural laying cycles and are strictly subject to batch completion dates and prior booking.</li>
              <li><strong>Poultry Manure:</strong> Dry, cured organic fertilizer bagged or supplied in bulk lots, dependent on farm cleaning schedules.</li>
              <li><strong>Inquiry Quotes:</strong> Inquiries submitted via this website represent expressions of interest and do not constitute a binding sales contract until confirmed in writing by authorized farm management.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-forest">3. Farm Gate Pickup &amp; Transport Logistics</h2>
            <p>
              Unless explicitly contracted under mutually signed transit terms, all dispatches are conducted at farm gate pickup (ex-farm Wathwada, Kalamb). Buyers or their designated logistics carriers are responsible for vehicle suitability, loading coordination, crates/trays handling, and in-transit cargo insurance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-forest">4. Intellectual Property Rights</h2>
            <p>
              All photographs, brand emblems, textual content, infographics, and technical materials displayed on this website are the proprietary assets of VARSHA AGRO. Reproduction, redistribution, or modification of any material without express written consent is prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-forest">5. Governing Law &amp; Jurisdiction</h2>
            <p>
              These terms and all commercial transactions originating through this enterprise are governed exclusively by the laws of the Republic of India. Any legal dispute or claim arising shall fall within the jurisdiction of courts in Dharashiv (formerly Osmanabad) district, Maharashtra.
            </p>
          </section>

          <section className="space-y-3 border-t border-forest/10 pt-6">
            <h2 className="font-serif text-2xl font-bold text-forest">6. Enterprise Inquiries &amp; Verification</h2>
            <p>
              For commercial verification, corporate billing queries, or partnership clarifications, reach out to our farm desk:
            </p>
            <div className="p-4 rounded-xl bg-ivory border border-forest/10 space-y-2 mt-3">
              <p className="font-bold text-forest">VARSHA AGRO &bull; Farm Office</p>
              <div className="flex items-center gap-2 text-xs">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                <span>{COMPANY.contact.address.full}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href={COMPANY.contact.emailHref} className="text-forest hover:underline font-semibold">
                  {COMPANY.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href={COMPANY.contact.phoneHref} className="text-forest hover:underline">
                  {COMPANY.contact.phone}
                </a>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
