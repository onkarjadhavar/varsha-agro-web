import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, User, AlertCircle, ArrowRight, ArrowLeft, ShieldCheck, KeyRound } from "lucide-react";

export default function AdminLogin({ onLoginSuccess }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setError("Please enter your username/email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: identifier.trim(),
          password: password.trim()
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store session token in localStorage for Authorization header
        localStorage.setItem("va_admin_token", data.token);
        localStorage.setItem("va_admin_user", JSON.stringify(data.user));
        if (onLoginSuccess) {
          onLoginSuccess(data.user, data.token);
        }
      } else {
        setError(data.error || "Invalid username or password.");
      }
    } catch {
      setError("Cannot reach authentication server. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Back Link */}
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-forest hover:text-agri uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gold" />
            <span>RETURN TO VARSHA AGRO WEBSITE</span>
          </Link>
        </div>

        {/* Brand Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-forest/10 shadow-card space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-forest text-gold mx-auto flex items-center justify-center shadow-sm border border-gold/30">
              <ShieldCheck className="w-7 h-7" />
            </div>
            
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold block">
                ADMIN PORTAL
              </span>
              <h1 className="font-serif text-3xl font-bold text-forest mt-1">
                VARSHA AGRO
              </h1>
            </div>

            <p className="text-xs text-charcoal/70 font-light">
              Secure access for authorized administrators
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4 text-left">
            <div>
              <label
                htmlFor="admin-username"
                className="block text-xs font-semibold uppercase tracking-wider text-forest mb-1.5"
              >
                Username or Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="admin-username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="admin or baba.bondar@gmail.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-sm bg-ivory/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold"
                  required
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold uppercase tracking-wider text-forest mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="admin-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-sm bg-ivory/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold"
                  required
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-full bg-gold hover:bg-gold-light text-forest-dark font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-glow-gold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <span>AUTHENTICATING...</span>
                ) : (
                  <>
                    <span>LOGIN</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Security Notice & Credential Helper */}
          <div className="pt-4 border-t border-forest/10 space-y-3 text-center">
            <div className="p-3 rounded-xl bg-forest/5 border border-forest/10 text-xs text-forest">
              <div className="flex items-center justify-center gap-1.5 font-bold text-forest-dark mb-1">
                <KeyRound className="w-3.5 h-3.5 text-gold" />
                <span>Authorized Admin Credentials</span>
              </div>
              <p className="text-[11px] text-charcoal/80 font-mono">
                User: <span className="font-bold text-forest">admin</span> &bull; Pass: <span className="font-bold text-forest">VarshaAgro@2026</span>
              </p>
            </div>
            <p className="text-[11px] text-charcoal/60 leading-snug">
              Protected by server-side cryptographic authentication &amp; encrypted sessions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
