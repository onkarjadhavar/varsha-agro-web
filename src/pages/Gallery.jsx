import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Filter } from "lucide-react";
import { GALLERY_ITEMS } from "../data/images";
import Lightbox from "../components/Lightbox";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { label: "All Photos", value: "ALL" },
    { label: "Farm & Sheds", value: "FARM" },
    { label: "Layer Birds", value: "BIRDS" },
    { label: "Fresh Eggs", value: "EGGS" },
    { label: "Feed Preparation", value: "FEED" },
    { label: "Operations & Sorting", value: "OPERATIONS" },
    { label: "Poultry Manure", value: "MANURE" },
  ];

  const filteredItems = activeCategory === "ALL"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const handleLightboxNav = (direction) => {
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex((img) => img.id === selectedImage.id);
    if (direction === "next") {
      const nextIndex = (currentIndex + 1) % filteredItems.length;
      setSelectedImage(filteredItems[nextIndex]);
    } else {
      const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
      setSelectedImage(filteredItems[prevIndex]);
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20">
      {/* Hero Header */}
      <section className="relative py-20 lg:py-24 bg-forest text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-gold">
              VISUAL ARCHIVE
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Our Farm in Pictures
            </h1>
            <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed max-w-2xl">
              A photographic tour of our layer poultry sheds, white birds, fresh egg grading lines, feed preparation, and agricultural manure dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-ivory border-b border-forest/10 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-charcoal/70 flex items-center gap-2">
          <Link to="/" className="hover:text-forest">Home</Link>
          <span>/</span>
          <span className="text-forest font-semibold">Gallery</span>
        </div>
      </div>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-forest/5 sticky top-[60px] z-30 shadow-xs backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-forest uppercase tracking-wider pr-3 border-r border-forest/20 shrink-0">
              <Filter className="w-3.5 h-3.5 text-gold" />
              <span>Filter:</span>
            </div>

            <div className="flex items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all duration-200 ${
                    activeCategory === cat.value
                      ? "bg-forest text-gold shadow-sm"
                      : "bg-ivory text-charcoal/80 hover:bg-forest/10 hover:text-forest"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover border border-forest/10 bg-forest-dark transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="h-72 sm:h-80 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-forest-dark/85 backdrop-blur-md text-gold text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-gold/30">
                      {item.category}
                    </span>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/95 via-forest-dark/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-6 text-white">
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-light transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-300 font-light mt-1.5 leading-relaxed line-clamp-2">
                      {item.caption}
                    </p>
                    <div className="pt-3 flex items-center gap-1.5 text-xs font-semibold text-gold">
                      <Eye className="w-4 h-4" />
                      <span>View in Full Lightbox</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="py-16 text-center text-charcoal/70">
              <p>No photographs found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <Lightbox
          item={selectedImage}
          onClose={() => setSelectedImage(null)}
          onNext={() => handleLightboxNav("next")}
          onPrev={() => handleLightboxNav("prev")}
        />
      )}
    </div>
  );
}
