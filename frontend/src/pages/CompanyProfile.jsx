import React from "react";
import { Link } from "react-router-dom";
import {
  Download,
  Phone,
  Mail,
  MapPin,
  Printer
} from "lucide-react";
import { COMPANY } from "../data/companyData";
import SEO from "../components/SEO";

export default function CompanyProfile({ onOpenEnquiry }) {
  const COMPANY_PROFILE_PDF_URL = COMPANY.profilePdfUrl || "#";

  const handleDownload = (e) => {
    if (COMPANY_PROFILE_PDF_URL === "#") {
      e.preventDefault();
      window.print();
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 print:p-0 print:m-0">
      <SEO
        title="Company Profile & Corporate Dossier"
        description="Executive summary and printable corporate dossier of VARSHA AGRO: enterprise background, poultry operations, produce range, and farming principles."
        canonicalPath="/company-profile"
      />

      {/* Hero Header (Hidden in Print) */}
      <section className="relative py-20 lg:py-24 bg-forest text-white overflow-hidden print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-gold">
              CORPORATE DOSSIER
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Company Profile
            </h1>
            <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed max-w-2xl">
              An executive summary of VARSHA AGRO: enterprise background, poultry operations, produce range, and farming principles.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={COMPANY_PROFILE_PDF_URL}
                onClick={handleDownload}
                className="inline-flex items-center gap-2.5 bg-gold hover:bg-gold-light text-forest-dark font-bold px-7 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-md transition-all"
                title="Download or print Company Profile"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD COMPANY PROFILE (PDF)</span>
              </a>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold text-white border border-white/40 hover:bg-white/10 transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print Dossier</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb (Hidden in Print) */}
      <div className="bg-ivory border-b border-forest/10 py-3 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-charcoal/70 flex items-center gap-2">
          <Link to="/" className="hover:text-forest">Home</Link>
          <span>/</span>
          <span className="text-forest font-semibold">Company Profile</span>
        </div>
      </div>

      {/* Document Content Sheet */}
      <section className="py-16 bg-ivory print:py-0 print:bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 print:p-0 print:max-w-none">
          <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-forest/15 shadow-card space-y-12 print:shadow-none print:border-none print:p-0 print:space-y-8">
            
            {/* Print-Only Header Banner */}
            <div className="hidden print:block border-b-2 border-forest pb-4 mb-6">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="font-serif text-3xl font-bold text-forest">VARSHA AGRO</h1>
                  <p className="text-xs uppercase tracking-widest text-agri font-semibold">Foods and Feeds &bull; Official Enterprise Dossier</p>
                </div>
                <div className="text-right text-[11px] text-charcoal/80">
                  <p>Wathwada, Taluka Kalamb, Dist. Dharashiv, Maharashtra</p>
                  <p>Helpline: +91 90116 01055 | Email: contact@varshaagro.com</p>
                </div>
              </div>
            </div>

            {/* Header of the Dossier */}
            <div className="border-b border-forest/15 pb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 print:pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold block">
                  CORPORATE SUMMARY
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest mt-1">
                  {COMPANY.name}
                </h2>
                <p className="text-sm font-medium text-agri uppercase tracking-widest mt-0.5">
                  {COMPANY.tagline}
                </p>
              </div>

              <div className="text-xs text-charcoal/70 space-y-1 sm:text-right">
                <p>Location: Kalamb, Dharashiv</p>
                <p>State: Maharashtra, India</p>
                <p>Domain: Layer Poultry &amp; Agriculture</p>
              </div>
            </div>

            {/* Section 1: Who We Are */}
            <div className="space-y-4 print:break-inside-avoid">
              <h3 className="font-serif text-2xl font-bold text-forest">
                1. Who We Are
              </h3>
              <p className="text-charcoal/85 text-base leading-relaxed">
                VARSHA AGRO is an agricultural enterprise located in Wathwada, Taluka Kalamb, District Dharashiv, Maharashtra. The enterprise is dedicated to commercial layer poultry farming, high-quality egg production, and responsible agricultural by-product utilization.
              </p>
              <p className="text-charcoal/85 text-base leading-relaxed">
                Our farm model integrates bird welfare, in-house feed formulation, rigorous shed biosecurity, and circular resource recycling into regional agriculture.
              </p>
            </div>

            {/* Section 2: Our Business */}
            <div className="space-y-4 print:break-inside-avoid">
              <h3 className="font-serif text-2xl font-bold text-forest">
                2. Our Business Operations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-ivory border border-forest/10 space-y-2 print:border print:border-gray-200">
                  <h4 className="font-bold text-forest text-sm">Layer Poultry Husbandry</h4>
                  <p className="text-xs text-charcoal/80 leading-relaxed font-light">
                    Hygienic housing, fresh water delivery, and daily health observation for commercial layer birds.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-ivory border border-forest/10 space-y-2 print:border print:border-gray-200">
                  <h4 className="font-bold text-forest text-sm">Table Egg Production</h4>
                  <p className="text-xs text-charcoal/80 leading-relaxed font-light">
                    Daily morning egg collection, grading, and secure pulp tray packing for wholesale distribution.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-ivory border border-forest/10 space-y-2 print:border print:border-gray-200">
                  <h4 className="font-bold text-forest text-sm">Farm-Prepared Feed</h4>
                  <p className="text-xs text-charcoal/80 leading-relaxed font-light">
                    Nutritionally balanced rations prepared exclusively for our flock using yellow maize, grains, and soya meal.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-ivory border border-forest/10 space-y-2 print:border print:border-gray-200">
                  <h4 className="font-bold text-forest text-sm">Agricultural Manure</h4>
                  <p className="text-xs text-charcoal/80 leading-relaxed font-light">
                    Regular shed collection, curing, and bagging of organic poultry manure for regional crop soils.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Our Products */}
            <div className="space-y-4 print:break-inside-avoid">
              <h3 className="font-serif text-2xl font-bold text-forest">
                3. Primary Products
              </h3>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white border border-forest/15 flex items-start gap-4 print:border-gray-200">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold shrink-0 mt-1.5 print:hidden"></div>
                  <div>
                    <h4 className="font-bold text-forest text-sm">Fresh Table Eggs</h4>
                    <p className="text-xs text-charcoal/80 mt-1 leading-relaxed">
                      Supplied in standard 30-egg pulp filler flats, boxes, and bulk crates to distributors, traders, and institutional clients.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-forest/15 flex items-start gap-4 print:border-gray-200">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold shrink-0 mt-1.5 print:hidden"></div>
                  <div>
                    <h4 className="font-bold text-forest text-sm">Layer Poultry Birds</h4>
                    <p className="text-xs text-charcoal/80 mt-1 leading-relaxed">
                      Available in scheduled batches at the conclusion of their laying cycle, subject to flock lifecycle timings.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-forest/15 flex items-start gap-4 print:border-gray-200">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold shrink-0 mt-1.5 print:hidden"></div>
                  <div>
                    <h4 className="font-bold text-forest text-sm">Bagged Poultry Manure</h4>
                    <p className="text-xs text-charcoal/80 mt-1 leading-relaxed">
                      Dry, organic fertilizer rich in NPK, supplied in sturdy sacks for fruit orchards, sugarcane, and field crops.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Farming Practices & Approach */}
            <div className="space-y-4 print:break-inside-avoid">
              <h3 className="font-serif text-2xl font-bold text-forest">
                4. Farming Practices &amp; Approach
              </h3>
              <p className="text-charcoal/85 text-base leading-relaxed">
                Our approach emphasizes disciplined flock care, controlled biosecurity, daily sanitization, and responsible stewardship. By maintaining feed preparation within our own facility, we guarantee nutritional consistency without relying on external commercial feeds.
              </p>
            </div>

            {/* Section 5: Core Values */}
            <div className="space-y-4 print:break-inside-avoid">
              <h3 className="font-serif text-2xl font-bold text-forest">
                5. Core Corporate Values
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {COMPANY.values.map((val, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-ivory border border-forest/10 print:border-gray-200">
                    <span className="font-bold text-forest text-sm block">{val.title}</span>
                    <span className="text-xs text-charcoal/80 font-light mt-0.5 block">{val.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 6: Contact & Verification */}
            <div className="border-t border-forest/15 pt-8 space-y-4 print:break-inside-avoid">
              <h3 className="font-serif text-2xl font-bold text-forest">
                6. Contact &amp; Farm Location
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-charcoal/85">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>{COMPANY.contact.address.full}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-gold shrink-0" />
                  <a href={COMPANY.contact.phoneHref} className="hover:text-forest font-medium">
                    {COMPANY.contact.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-gold shrink-0" />
                  <a href={COMPANY.contact.emailHref} className="hover:text-forest">
                    {COMPANY.contact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Action Bar (Hidden in Print) */}
            <div className="pt-6 border-t border-forest/15 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
              <button
                onClick={() => onOpenEnquiry && onOpenEnquiry("Business Enquiry")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-forest-dark font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                <span>INITIATE BUSINESS ENQUIRY</span>
              </button>

              <a
                href={COMPANY_PROFILE_PDF_URL}
                onClick={handleDownload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-forest hover:text-agri font-semibold text-xs uppercase tracking-wider"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Printable Version</span>
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
