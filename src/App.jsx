import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileStickyBar from "./components/MobileStickyBar";
import ScrollToTop from "./components/ScrollToTop";
import EnquiryModal from "./components/EnquiryModal";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import OurFarm from "./pages/OurFarm";
import Products from "./pages/Products";
import Sustainability from "./pages/Sustainability";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import CompanyProfile from "./pages/CompanyProfile";
import AdminPortal from "./pages/admin/AdminPortal";

function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-24 pb-16 px-4 bg-ivory text-center">
      <div className="max-w-md space-y-5">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold">404 ERROR</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest">
          Page Not Found
        </h1>
        <p className="text-sm text-charcoal/80 leading-relaxed">
          The requested page could not be located. Please return to the homepage or explore our farm operations.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-forest-dark font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-sm"
          >
            <span>RETURN TO HOMEPAGE →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryDefaultCategory, setEnquiryDefaultCategory] = useState("Eggs");
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  const handleOpenEnquiry = (category = "Eggs") => {
    setEnquiryDefaultCategory(category);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-charcoal font-sans antialiased selection:bg-gold selection:text-forest-dark">
      {/* Main Sticky Header (Hidden on Admin) */}
      {!isAdmin && <Header onOpenEnquiry={handleOpenEnquiry} />}

      {/* Page Viewports */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/about" element={<About onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/farm" element={<OurFarm onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/products" element={<Products onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/sustainability" element={<Sustainability onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/company-profile" element={<CompanyProfile onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Global Footer (Hidden on Admin) */}
      {!isAdmin && <Footer onOpenEnquiry={handleOpenEnquiry} />}

      {/* Mobile Sticky Action Bar (Hidden on Admin) */}
      {!isAdmin && <MobileStickyBar onOpenEnquiry={handleOpenEnquiry} />}

      {/* Reusable Interactive Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultProduct={enquiryDefaultCategory}
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

