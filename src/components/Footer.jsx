import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageSquare, ArrowUp, ShieldCheck, FileText, X } from "lucide-react";
import { COMPANY } from "../data/companyData";

export default function Footer({ onOpenEnquiry }) {
  const [modalType, setModalType] = useState(null); // 'privacy' | 'terms' | null

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer id="main-footer" className="bg-forest-dark text-white relative border-t border-forest-light/40">
        {/* Decorative Top Accent Line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-60"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            
            {/* Column 1: Brand & Identity (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-forest border border-gold/40 flex items-center justify-center text-gold shadow-glow-gold">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2C15.5 6 16.5 10 12 17C7.5 10 8.5 6 12 2Z" fill="currentColor" />
                    <path d="M12 5.5V15.5M12 9.5L9 12M12 9.5L15 12" stroke="#0B2419" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold tracking-wider text-white">
                    {COMPANY.name}
                  </span>
                  <p className="text-xs uppercase tracking-[0.25em] text-gold-light font-medium mt-0.5">
                    {COMPANY.tagline}
                  </p>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
                Responsible poultry farming. Quality production. Sustainable agricultural practices. Committed to bird welfare, clean egg production and circular agricultural resource utilization.
              </p>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href={COMPANY.contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest text-gold text-xs font-semibold hover:bg-forest-light transition-colors border border-gold/30"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Business</span>
                </a>
                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/15 text-gold-light text-xs font-semibold hover:bg-gold/25 transition-colors border border-gold/30"
                >
                  <span>Quick Enquiry</span>
                </button>
              </div>
            </div>

            {/* Column 2: Quick Links (3 cols on lg) */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="font-serif text-lg text-gold font-medium tracking-wide">
                QUICK LINKS
              </h3>
              <ul className="space-y-2.5 text-sm text-gray-300">
                <li>
                  <Link to="/" className="hover:text-gold transition-colors inline-block py-0.5">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-gold transition-colors inline-block py-0.5">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/farm" className="hover:text-gold transition-colors inline-block py-0.5">
                    Our Farm
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="hover:text-gold transition-colors inline-block py-0.5">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/sustainability" className="hover:text-gold transition-colors inline-block py-0.5">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="hover:text-gold transition-colors inline-block py-0.5">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/company-profile" className="hover:text-gold transition-colors inline-block py-0.5">
                    Company Profile
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-gold transition-colors inline-block py-0.5">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Details (4 cols on lg) */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="font-serif text-lg text-gold font-medium tracking-wide">
                CONTACT
              </h3>

              <div className="space-y-3.5 text-sm text-gray-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    {COMPANY.contact.address.full}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gold shrink-0" />
                  <a
                    href={COMPANY.contact.phoneHref}
                    className="hover:text-gold transition-colors font-medium tracking-wide"
                  >
                    {COMPANY.contact.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gold shrink-0" />
                  <a
                    href={COMPANY.contact.emailHref}
                    className="hover:text-gold transition-colors break-all"
                  >
                    {COMPANY.contact.email}
                  </a>
                </div>
              </div>

              <div className="pt-3">
                <p className="text-xs text-gray-400">
                  Business Hours: Mon - Sat, 8:00 AM - 6:00 PM IST
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Farm gate dispatch &amp; transport scheduling available.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <div>
              &copy; 2026 VARSHA AGRO. All Rights Reserved.
            </div>

            <div className="flex items-center gap-6">
              <Link
                to="/admin"
                className="hover:text-gold text-gold/90 transition-colors uppercase tracking-wider font-semibold flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ADMIN LOGIN</span>
              </Link>
              <span>•</span>
              <button
                onClick={() => setModalType("privacy")}
                className="hover:text-gold transition-colors underline-offset-4 hover:underline"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                onClick={() => setModalType("terms")}
                className="hover:text-gold transition-colors underline-offset-4 hover:underline"
              >
                Terms &amp; Conditions
              </button>
              <span>•</span>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 hover:text-gold transition-colors ml-2"
                title="Scroll back to top"
              >
                <span>Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal for Privacy Policy & Terms */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-ivory text-charcoal max-w-xl w-full max-h-[85vh] rounded-2xl shadow-2xl p-6 sm:p-8 overflow-y-auto relative border border-forest/10">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-forest/10 text-charcoal transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {modalType === "privacy" ? (
              <div className="space-y-4 text-sm leading-relaxed">
                <div className="flex items-center gap-2.5 text-forest">
                  <ShieldCheck className="w-6 h-6 text-gold" />
                  <h3 className="font-serif text-2xl font-bold">Privacy Policy</h3>
                </div>
                <p className="text-xs text-agri font-medium">Last updated: 2026</p>
                <p>
                  At <strong>VARSHA AGRO</strong>, we respect your privacy. Any personal information you provide to us through contact forms, telephone communications, or email inquiries (such as your name, contact phone number, email address, and order specifics) is handled with strict confidentiality.
                </p>
                <h4 className="font-semibold text-forest text-base pt-2">Information Use</h4>
                <p>
                  We solely use your submitted information to respond to inquiries regarding table eggs, layer birds, and poultry manure, fulfill orders, and coordinate business logistics. We do not sell, rent, or trade your personal details with third-party advertising companies.
                </p>
                <h4 className="font-semibold text-forest text-base pt-2">Contact &amp; Data Rights</h4>
                <p>
                  For any questions regarding our data practices or to request removal of your contact information from our communications log, please contact us at <a href="mailto:baba.bondar@gmail.com" className="text-agri font-semibold underline">baba.bondar@gmail.com</a>.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-sm leading-relaxed">
                <div className="flex items-center gap-2.5 text-forest">
                  <FileText className="w-6 h-6 text-gold" />
                  <h3 className="font-serif text-2xl font-bold">Terms &amp; Conditions</h3>
                </div>
                <p className="text-xs text-agri font-medium">Last updated: 2026</p>
                <p>
                  Welcome to the official website of <strong>VARSHA AGRO</strong> (Foods and Feeds). By accessing or using this website, you agree to comply with the terms and conditions outlined herein.
                </p>
                <h4 className="font-semibold text-forest text-base pt-2">Product Availability &amp; Inquiries</h4>
                <p>
                  All product inquiries (Fresh Eggs, Layer Poultry Birds, and Poultry Manure) submitted through this platform are subject to seasonal production capacity, scheduled farm batches, and direct confirmation by farm management. Website content does not constitute a legally binding quotation until confirmed in writing.
                </p>
                <h4 className="font-semibold text-forest text-base pt-2">Intellectual Property</h4>
                <p>
                  All photography, graphics, textual descriptions, and branding elements displayed on this site are the property of VARSHA AGRO and may not be reproduced without prior written permission.
                </p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-forest/10 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="px-5 py-2 rounded-lg bg-forest text-white text-xs font-semibold hover:bg-forest-light transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
