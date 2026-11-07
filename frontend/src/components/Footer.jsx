import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageSquare, ArrowUp, ShieldCheck } from "lucide-react";
import { COMPANY } from "../data/companyData";

export default function Footer({ onOpenEnquiry }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="main-footer" className="bg-forest-dark text-white relative border-t border-forest-light/40">
      {/* Decorative Top Accent Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 md:pb-12">
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
              Responsible poultry farming. Quality production. Sustainable agricultural practices. Committed to bird welfare, clean egg production and circular agricultural resource utilization in Dharashiv, Maharashtra.
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

          <div className="flex items-center gap-5 sm:gap-6 flex-wrap">
            <Link
              to="/admin"
              className="hover:text-gold text-gold/90 transition-colors uppercase tracking-wider font-semibold flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ADMIN LOGIN</span>
            </Link>
            <span>•</span>
            <Link
              to="/privacy"
              className="hover:text-gold transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link
              to="/terms"
              className="hover:text-gold transition-colors underline-offset-4 hover:underline"
            >
              Terms &amp; Conditions
            </Link>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-gold transition-colors ml-1"
              title="Scroll back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
