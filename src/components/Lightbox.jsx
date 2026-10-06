import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({ item, onClose, onNext, onPrev }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-label="Image Lightbox"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-2 rounded-full bg-forest text-white/80 hover:text-white hover:bg-forest-light transition-colors z-10"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-forest/80 text-white hover:bg-forest transition-colors z-10 hidden sm:flex items-center justify-center border border-white/10"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-forest/80 text-white hover:bg-forest transition-colors z-10 hidden sm:flex items-center justify-center border border-white/10"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Card container */}
      <div
        className="max-w-4xl max-h-[88vh] bg-forest-dark border border-forest-light/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative max-h-[70vh] flex items-center justify-center bg-black/40 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
        </div>

        <div className="p-5 sm:p-6 bg-forest-dark text-white border-t border-forest-light/30">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
              {item.category}
            </span>
            <span className="text-xs text-gray-400">VARSHA AGRO Operations</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold mt-1 text-white">
            {item.title}
          </h3>
          <p className="text-sm text-gray-300 mt-1.5 leading-relaxed">
            {item.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
