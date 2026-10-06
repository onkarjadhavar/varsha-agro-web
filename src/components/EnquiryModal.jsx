import React, { useState } from "react";
import { X, Send, CheckCircle2, AlertCircle, Phone, MessageSquare } from "lucide-react";
import { COMPANY } from "../data/companyData";

export default function EnquiryModal({ isOpen, onClose, defaultProduct = "Eggs" }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interestedIn: defaultProduct,
    quantity: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "Full name is required";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = "Please enter a valid phone number";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.interestedIn) {
      errs.interestedIn = "Please select a product or interest area";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    // Isolated Submission Handler: Connect to backend or webhook here
    try {
      // Simulating a real backend dispatch
      await new Promise((resolve) => setTimeout(resolve, 800));

      // In production, payload would be sent to your endpoint:
      // await fetch('/api/enquiry', { method: 'POST', body: JSON.stringify(formData) });
      
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      interestedIn: "Eggs",
      quantity: "",
      message: ""
    });
    setErrors({});
    setStatus("idle");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-ivory text-charcoal w-full max-w-lg rounded-2xl shadow-2xl border border-forest/10 overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-forest text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light block">
            VARSHA AGRO • FOODS &amp; FEEDS
          </span>
          <h2 id="modal-title" className="font-serif text-2xl font-bold mt-1 text-white">
            Send Business Enquiry
          </h2>
          <p className="text-xs text-ivory/80 mt-1">
            Connect directly with our farm operations in Dharashiv, Maharashtra.
          </p>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {status === "success" ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-agri/15 text-agri mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-forest">
                Thank you for contacting VARSHA AGRO.
              </h3>
              <p className="text-sm text-charcoal/80 max-w-sm mx-auto">
                We will get back to you shortly regarding your enquiry for <strong>{formData.interestedIn}</strong>.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/919011601055?text=Hello%20VARSHA%20AGRO%2C%20I%20have%20submitted%20an%20enquiry%20for%20${encodeURIComponent(
                    formData.interestedIn
                  )}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-bold hover:bg-[#20b858] transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Follow Up via WhatsApp</span>
                </a>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-forest text-white text-xs font-semibold hover:bg-forest-light transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4 text-left">
              {status === "error" && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>There was an issue sending your enquiry. Please call us directly.</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label htmlFor="modal-name" className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="modal-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ramesh Patil"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 ${
                    errors.name ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-gold"
                  }`}
                  required
                />
                {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
              </div>

              {/* Phone & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-phone" className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="modal-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 ${
                      errors.phone ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-gold"
                    }`}
                    required
                  />
                  {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="modal-email" className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
                    Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    id="modal-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="yourname@gmail.com"
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 ${
                      errors.email ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-gold"
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Interested In */}
              <div>
                <label htmlFor="modal-interested" className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
                  Interested In <span className="text-red-500">*</span>
                </label>
                <select
                  id="modal-interested"
                  name="interestedIn"
                  value={formData.interestedIn}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  <option value="Eggs">Fresh Eggs (Table Eggs)</option>
                  <option value="Layer Birds">Layer Poultry Birds</option>
                  <option value="Poultry Manure">Poultry Manure (Organic Fertilizer)</option>
                  <option value="Business Enquiry">Business / Partnership Enquiry</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="modal-message" className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
                  Requirement Details / Message
                </label>
                <textarea
                  id="modal-message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Mention quantity, delivery location, or questions..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-3.5 px-6 rounded-lg bg-gold hover:bg-gold-light text-forest-dark font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-glow-gold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <span>SENDING ENQUIRY...</span>
                  ) : (
                    <>
                      <span>SEND ENQUIRY →</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Quick Contact Footnote */}
          <div className="mt-5 pt-4 border-t border-forest/10 flex flex-wrap items-center justify-between text-xs text-charcoal/70 gap-2">
            <span>Direct helpline:</span>
            <div className="flex items-center gap-3">
              <a href={COMPANY.contact.phoneHref} className="font-semibold text-forest hover:text-agri flex items-center gap-1">
                <Phone className="w-3 h-3 text-gold" />
                <span>{COMPANY.contact.phone}</span>
              </a>
              <span>•</span>
              <a href={COMPANY.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#25D366] hover:underline flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
