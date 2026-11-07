import React from "react";
import { Phone, MessageSquare, Send } from "lucide-react";
import { COMPANY } from "../data/companyData";

export default function MobileStickyBar({ onOpenEnquiry }) {
  return (
    <aside
      id="mobile-sticky-action-bar"
      aria-label="Mobile quick action bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-forest-dark/95 backdrop-blur-md border-t border-gold/30 px-3 py-2.5 shadow-2xl flex items-center justify-between gap-2"
    >
      {/* Call */}
      <a
        href={COMPANY.contact.phoneHref}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-forest border border-white/10 text-white text-xs font-semibold hover:bg-forest-light active:scale-95 transition-all text-center"
      >
        <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
        <span>CALL</span>
      </a>

      {/* WhatsApp */}
      <a
        href={COMPANY.contact.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/30 active:scale-95 transition-all text-center"
      >
        <MessageSquare className="w-3.5 h-3.5 shrink-0" />
        <span>WHATSAPP</span>
      </a>

      {/* Enquire */}
      <button
        onClick={() => onOpenEnquiry && onOpenEnquiry()}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-gold text-forest-dark text-xs font-bold hover:bg-gold-light active:scale-95 transition-all shadow-sm text-center"
      >
        <Send className="w-3.5 h-3.5 shrink-0" />
        <span>ENQUIRE</span>
      </button>
    </aside>
  );
}
