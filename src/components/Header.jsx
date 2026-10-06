import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, Phone, MessageSquare, ShieldCheck } from "lucide-react";
import { COMPANY } from "../data/companyData";

export default function Header({ onOpenEnquiry }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  // Determine header styling based on page and scroll position
  const isTransparent = isHomePage && !isScrolled;

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Our Farm", to: "/farm" },
    { name: "Products", to: "/products" },
    { name: "Sustainability", to: "/sustainability" },
    { name: "Gallery", to: "/gallery" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-forest/20 backdrop-blur-[2px] border-b border-white/10 text-white py-5"
          : "bg-ivory/95 backdrop-blur-md shadow-card border-b border-forest/5 text-forest py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Link
            to="/"
            id="brand-logo"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg p-1"
          >
            {/* Elegant Emblem */}
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                isTransparent
                  ? "bg-forest/60 border-gold/40 text-gold shadow-glow-gold"
                  : "bg-forest border-forest text-gold shadow-sm"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C15.5 6 16.5 10 12 17C7.5 10 8.5 6 12 2Z" fill="currentColor" />
                <path d="M12 5.5V15.5M12 9.5L9 12M12 9.5L15 12" stroke="#123B2A" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            
            <div className="flex flex-col">
              <span
                className={`font-serif text-xl sm:text-2xl font-bold tracking-wider leading-none transition-colors ${
                  isTransparent ? "text-white" : "text-forest"
                }`}
              >
                {COMPANY.name}
              </span>
              <span
                className={`text-[10px] sm:text-xs uppercase tracking-[0.25em] font-medium mt-1 transition-colors ${
                  isTransparent ? "text-gold-light" : "text-agri"
                }`}
              >
                {COMPANY.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            id="desktop-nav"
            className="hidden lg:flex items-center space-x-1 xl:space-x-2"
            aria-label="Main Navigation"
          >
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isTransparent
                      ? isActive
                        ? "text-gold font-semibold bg-white/10"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                      : isActive
                      ? "text-forest-dark font-semibold bg-forest/5"
                      : "text-charcoal hover:text-forest hover:bg-forest/5"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right side CTA & Contact */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={COMPANY.contact.phoneHref}
              className={`flex items-center gap-1.5 text-xs font-semibold tracking-wider transition-colors py-1.5 px-2.5 rounded-full ${
                isTransparent
                  ? "text-white/90 hover:text-gold"
                  : "text-agri hover:text-forest hover:bg-forest/5"
              }`}
              title="Call Varsha Agro"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>{COMPANY.contact.phoneDisplay}</span>
            </a>

            <Link
              to="/admin"
              className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider py-2 px-3 rounded-full border transition-all ${
                isTransparent
                  ? "border-white/30 text-white/90 hover:border-gold hover:text-gold hover:bg-white/10"
                  : "border-forest/20 text-forest hover:border-forest hover:bg-forest/5"
              }`}
              title="Varsha Agro Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>ADMIN</span>
            </Link>

            <button
              id="header-enquire-cta"
              onClick={() => onOpenEnquiry && onOpenEnquiry()}
              className="group inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-forest-dark px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-sm hover:shadow-glow-gold transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>ENQUIRE NOW</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gold ${
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-forest hover:bg-forest/5"
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="lg:hidden fixed inset-x-0 top-[60px] bg-ivory border-b border-forest/10 shadow-2xl animate-in slide-in-from-top duration-200 max-h-[calc(100vh-60px)] overflow-y-auto"
        >
          <div className="px-6 py-6 space-y-4">
            <div className="space-y-1">
              {navLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? "bg-forest text-gold font-semibold"
                        : "text-charcoal hover:bg-forest/5 hover:text-forest"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            <div className="pt-4 border-t border-forest/10 space-y-3">
              <div className="text-xs uppercase tracking-wider text-agri font-semibold px-4">
                Direct Contact
              </div>
              <a
                href={COMPANY.contact.phoneHref}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-forest hover:bg-forest/5 font-medium text-sm"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>{COMPANY.contact.phone}</span>
              </a>
              <a
                href={COMPANY.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-forest hover:bg-forest/5 font-medium text-sm"
              >
                <MessageSquare className="w-4 h-4 text-gold" />
                <span>WhatsApp Message</span>
              </a>
              
              <button
                id="mobile-enquire-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenEnquiry) onOpenEnquiry();
                }}
                className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-forest-dark py-3.5 rounded-lg font-bold text-sm tracking-wider uppercase shadow-md mt-2"
              >
                <span>ENQUIRE NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-forest text-gold border border-gold/30 py-3 rounded-lg font-bold text-xs tracking-wider uppercase mt-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>ADMIN LOGIN</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
