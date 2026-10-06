import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink
} from "lucide-react";
import { COMPANY } from "../data/companyData";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interestedIn: "Eggs",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'

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
      errs.interestedIn = "Please select an interest";
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

    // Isolated Submission Handler: Connect API or backend service here
    try {
      // Simulating real submission
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Ready for API integration:
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      interestedIn: "Eggs",
      message: ""
    });
    setErrors({});
    setStatus("idle");
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20">
      {/* Hero Header */}
      <section className="relative py-20 lg:py-24 bg-forest text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-gold">
              LET'S CONNECT
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              We'd Love to Hear<br />
              <span className="text-gold-light italic">From You</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed max-w-2xl">
              Whether you are an egg wholesaler, farmer seeking poultry manure, or an agricultural partner, get in touch with our team in Kalamb, Dharashiv.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-ivory border-b border-forest/10 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-charcoal/70 flex items-center gap-2">
          <Link to="/" className="hover:text-forest">Home</Link>
          <span>/</span>
          <span className="text-forest font-semibold">Contact</span>
        </div>
      </div>

      {/* Main Contact Section */}
      <section className="py-16 lg:py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left: Contact Info & Channels (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold block">
                  FARM HEADQUARTERS
                </span>
                <h2 className="font-serif text-3xl font-bold text-forest mt-1">
                  {COMPANY.name}
                </h2>
                <p className="text-sm font-medium text-agri uppercase tracking-wider mt-0.5">
                  {COMPANY.tagline}
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Address Card */}
                <div className="p-5 rounded-2xl bg-white border border-forest/10 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-agri shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-forest">Farm Location</h3>
                    <p className="text-sm text-charcoal/80 mt-1 leading-relaxed">
                      {COMPANY.contact.address.full}
                    </p>
                    <a
                      href={COMPANY.contact.mapDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-agri hover:text-forest mt-2"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Telephone Card */}
                <div className="p-5 rounded-2xl bg-white border border-forest/10 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-agri shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-forest">Direct Calling</h3>
                    <p className="text-xs text-charcoal/70 mt-0.5">General &amp; trade sales enquiry</p>
                    <a
                      href={COMPANY.contact.phoneHref}
                      className="inline-block text-base font-bold text-forest hover:text-agri mt-1 tracking-wide"
                    >
                      {COMPANY.contact.phone}
                    </a>
                  </div>
                </div>

                {/* Email Card */}
                <div className="p-5 rounded-2xl bg-white border border-forest/10 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-agri shrink-0 mt-0.5">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-forest">Email Communications</h3>
                    <p className="text-xs text-charcoal/70 mt-0.5">Formal quotations &amp; supplier proposals</p>
                    <a
                      href={COMPANY.contact.emailHref}
                      className="inline-block text-sm font-semibold text-forest hover:text-agri mt-1 break-all"
                    >
                      {COMPANY.contact.email}
                    </a>
                  </div>
                </div>

                {/* Operational Hours */}
                <div className="p-5 rounded-2xl bg-white border border-forest/10 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-agri shrink-0 mt-0.5">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-forest">Farm &amp; Office Timings</h3>
                    <p className="text-sm text-charcoal/80 mt-1 leading-relaxed">
                      Monday to Saturday: 8:00 AM – 6:00 PM IST<br />
                      Sunday: Essential dispatch operations
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Fast CTA Card */}
              <div className="p-6 rounded-2xl bg-forest text-white border border-gold/30 shadow-card space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                  INSTANT MESSAGING
                </span>
                <h3 className="font-serif text-xl font-bold">Chat with us on WhatsApp</h3>
                <p className="text-xs text-gray-200 leading-relaxed font-light">
                  Get prompt answers regarding daily egg rates, available layer bird lots, and booked manure sacks.
                </p>
                <a
                  href={COMPANY.contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-3.5 px-5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>START WHATSAPP CHAT</span>
                </a>
              </div>
            </div>

            {/* Right: Enquiry Form (7 cols on lg) */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-forest/10 shadow-card">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold block">
                    ONLINE ENQUIRY
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-forest mt-1">
                    Send Us a Message
                  </h2>
                  <p className="text-sm text-charcoal/80 mt-1">
                    Please fill out the form below. We will attend to your request promptly.
                  </p>
                </div>

                {status === "success" ? (
                  <div className="py-12 text-center space-y-4">
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
                        href={`https://wa.me/919011601055?text=Hello%20VARSHA%20AGRO%2C%20I%20have%20submitted%20an%20enquiry%20via%20your%20website%20for%20${encodeURIComponent(
                          formData.interestedIn
                        )}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white text-xs font-bold hover:bg-[#20b858] transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Chat via WhatsApp</span>
                      </a>

                      <button
                        onClick={resetForm}
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-forest text-white text-xs font-semibold hover:bg-forest-light transition-colors"
                      >
                        Send Another Enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5 mt-8 text-left">
                    {status === "error" && (
                      <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>Could not submit enquiry at this moment. Please call our sales desk directly.</span>
                      </div>
                    )}

                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1.5">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Anand Shinde"
                        className={`w-full px-4 py-3 rounded-xl border text-sm bg-ivory/50 focus:bg-white focus:outline-none focus:ring-2 ${
                          errors.name ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-gold"
                        }`}
                        required
                      />
                      {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    {/* Phone & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-phone" className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1.5">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="contact-phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 9011601055"
                          className={`w-full px-4 py-3 rounded-xl border text-sm bg-ivory/50 focus:bg-white focus:outline-none focus:ring-2 ${
                            errors.phone ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-gold"
                          }`}
                          required
                        />
                        {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1.5">
                          Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="yourname@gmail.com"
                          className={`w-full px-4 py-3 rounded-xl border text-sm bg-ivory/50 focus:bg-white focus:outline-none focus:ring-2 ${
                            errors.email ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-gold"
                          }`}
                        />
                        {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Interested In */}
                    <div>
                      <label htmlFor="contact-interest" className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1.5">
                        Interested In <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="contact-interest"
                        name="interestedIn"
                        value={formData.interestedIn}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm bg-ivory/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold"
                      >
                        <option value="Eggs">Eggs (Fresh Table Eggs)</option>
                        <option value="Layer Birds">Layer Birds (Spent Flock)</option>
                        <option value="Poultry Manure">Poultry Manure (Organic Fertilizer)</option>
                        <option value="Business Enquiry">Business / Trade Partnership</option>
                        <option value="Other">Other Agricultural Inquiry</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1.5">
                        Message / Order Specifics
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please mention required quantity, delivery location, or trade inquiry details..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm bg-ivory/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold resize-none"
                      ></textarea>
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full py-4 px-8 rounded-full bg-gold hover:bg-gold-light text-forest-dark font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-glow-gold transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-60"
                      >
                        {status === "submitting" ? (
                          <span>PROCESSING ENQUIRY...</span>
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
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                MAP LOCATION
              </span>
              <h3 className="font-serif text-2xl font-bold text-forest mt-0.5">
                Visit or Dispatch from Our Farm
              </h3>
              <p className="text-xs text-charcoal/70 mt-1">
                Wathwada, Taluka Kalamb, District Dharashiv, Maharashtra
              </p>
            </div>

            <a
              href={COMPANY.contact.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest text-gold text-xs font-semibold hover:bg-forest-light transition-colors shrink-0"
            >
              <span>Get Driving Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Embedded Google Map */}
          <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-card border border-forest/10 relative bg-ivory">
            <iframe
              title="Varsha Agro Farm Location Map"
              src={COMPANY.contact.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[25%] contrast-[105%]"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
