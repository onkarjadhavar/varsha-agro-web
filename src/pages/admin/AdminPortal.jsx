import React, { useState, useEffect } from "react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export default function AdminPortal() {
  const [token, setToken] = useState(() => localStorage.getItem("va_admin_token"));
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("va_admin_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [checkingAuth, setCheckingAuth] = useState(() => !!localStorage.getItem("va_admin_token"));

  useEffect(() => {
    const savedToken = localStorage.getItem("va_admin_token");
    if (!savedToken) return;

    // Verify token with backend
    fetch("/api/admin/me", {
      headers: {
        Authorization: `Bearer ${savedToken}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Session expired or invalid");
        return res.json();
      })
      .then((data) => {
        if (data.success && data.user) {
          setUser(data.user);
          setToken(savedToken);
        } else {
          localStorage.removeItem("va_admin_token");
          localStorage.removeItem("va_admin_user");
        }
      })
      .catch(() => {
        localStorage.removeItem("va_admin_token");
        localStorage.removeItem("va_admin_user");
      })
      .finally(() => {
        setCheckingAuth(false);
      });
  }, []);

  const handleLoginSuccess = (authenticatedUser, authToken) => {
    setUser(authenticatedUser);
    setToken(authToken);
  };

  const handleLogout = async () => {
    try {
      if (token) {
        await fetch("/api/admin/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    } catch {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem("va_admin_token");
      localStorage.removeItem("va_admin_user");
      setUser(null);
      setToken(null);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-forest border-t-gold rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest text-forest font-semibold">
            Verifying Admin Session...
          </p>
        </div>
      </div>
    );
  }

  if (!user || !token) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return <AdminDashboard user={user} token={token} onLogout={handleLogout} />;
}
