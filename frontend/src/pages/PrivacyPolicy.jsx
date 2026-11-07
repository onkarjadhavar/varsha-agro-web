import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import SEO from "../components/SEO";
import { COMPANY } from "../data/companyData";

export default function PrivacyPolicy() {
  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-ivory min-h-screen">
      <SEO
        title="Privacy Policy"
        description="VARSHA AGRO Privacy Policy: Learn how we protect and responsibly handle customer contact details and business inquiry data."
        canonicalPath="/privacy"
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
            <ShieldCheck className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-[0.25em]">CORPORATE COMPLIANCE</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold">Privacy Policy</h1>
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
          <span className="text-forest font-semibold">Privacy Policy</span>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-forest/10 shadow-card space-y-8 text-charcoal/90 text-sm leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-forest">1. Introduction &amp; Commitment</h2>
            <p>
              At <strong>VARSHA AGRO</strong> (Foods and Feeds), located in Wathwada, Taluka Kalamb, District Dharashiv, Maharashtra, we value and respect the privacy of every visitor, commercial buyer, and agricultural partner who engages with our enterprise.
            </p>
            <p>
              This Privacy Policy explains how we collect, handle, utilize, and protect personal and commercial information provided to us through our official website (<a href="https://varshaagro.com" className="text-forest font-semibold underline">varshaagro.com</a>), phone inquiries, WhatsApp correspondence, and farm gate office interactions, in accordance with applicable Indian laws including the <em>Digital Personal Data Protection Act, 2023 (DPDP Act)</em>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-forest">2. Information We Collect and Why</h2>
            <p>
              We collect information that you voluntarily furnish when requesting quotations, placing orders, or seeking information regarding our table eggs, layer flock batches, or bagged poultry manure:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-charcoal/80">
              <li><strong>Contact Identification:</strong> Full Name, Business/Trader Name.</li>
              <li><strong>Communication Details:</strong> Mobile Phone Number, WhatsApp Number, Email Address.</li>
              <li><strong>Inquiry Specifics:</strong> Produce requirement (Fresh Eggs, Layer Birds, Organic Manure), required volumes/quantities, and destination logistics/delivery location.</li>
              <li><strong>Technical Logs:</strong> Minimal server logs (IP address, browser type, timestamp) collected solely for cybersecurity, spam prevention, and server performance monitoring.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-forest">3. Purpose of Data Processing</h2>
            <p>Your submitted information is utilized strictly for legitimate business operations:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-charcoal/80">
              <li>Responding to trade inquiries and furnishing accurate pricing and availability schedules.</li>
              <li>Coordinating farm gate dispatches, vehicle loading, and transport logistics.</li>
              <li>Generating delivery challans, invoices, and accounting documentation required by law.</li>
              <li>Preventing automated spam, fraudulent submissions, and unauthorized access to our web infrastructure.</li>
            </ul>
            <p className="font-semibold text-forest pt-1">
              We do not sell, rent, trade, or monetize your contact information with external advertising agencies or brokers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-forest">4. Data Storage, Security &amp; Retention</h2>
            <p>
              All inquiry records are stored in protected databases with encryption, strict access controls, and rate-limiting safeguards. Only authorized farm personnel responsible for sales and dispatch have access to inquiry details.
            </p>
            <p>
              We retain customer contact records for the duration necessary to satisfy commercial orders, resolve transaction queries, and adhere to statutory tax and agricultural trade compliance requirements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-forest">5. Your Data Rights</h2>
            <p>
              Under Indian data protection principles, you possess the right to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-charcoal/80">
              <li>Request a summary of your inquiry details recorded in our system.</li>
              <li>Request correction or updating of erroneous or outdated contact information.</li>
              <li>Request deletion of your contact information from our active communication records once commercial transactions have completed.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-forest/10 pt-6">
            <h2 className="font-serif text-2xl font-bold text-forest">6. Data Protection Contact</h2>
            <p>
              If you have questions regarding this Privacy Policy or wish to exercise your data rights, please contact our administrative office:
            </p>
            <div className="p-4 rounded-xl bg-ivory border border-forest/10 space-y-2 mt-3">
              <p className="font-bold text-forest">VARSHA AGRO &bull; Data Compliance</p>
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
