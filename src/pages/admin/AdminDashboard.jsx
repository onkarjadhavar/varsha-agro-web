import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  RefreshCw,
  LogOut,
  Phone,
  Mail,
  Trash2,
  Eye,
  X,
  AlertTriangle,
  Inbox,
  CheckCircle,
  PhoneCall,
  Activity,
  Layers,
  ArrowUpDown,
  ArrowLeft
} from "lucide-react";

export default function AdminDashboard({ user, token, onLogout }) {
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    inProgress: 0,
    completed: 0
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [activeInquiry, setActiveInquiry] = useState(null); // Inquiry detail view modal
  const [inquiryToDelete, setInquiryToDelete] = useState(null); // Delete confirmation modal
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const authHeader = useCallback(() => {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
  }, [token]);

  // Fetch inquiries & stats
  const fetchData = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      // Build query string
      const params = new URLSearchParams();
      if (search.trim()) params.append("search", search.trim());
      if (selectedStatus !== "ALL") params.append("status", selectedStatus);

      const [inquiriesRes, statsRes] = await Promise.all([
        fetch(`/api/admin/inquiries?${params.toString()}`, {
          headers: authHeader()
        }),
        fetch("/api/admin/stats", {
          headers: authHeader()
        })
      ]);

      if (inquiriesRes.status === 401 || statsRes.status === 401) {
        onLogout();
        return;
      }

      const inquiriesData = await inquiriesRes.json();
      const statsData = await statsRes.json();

      if (inquiriesData.success) {
        setInquiries(inquiriesData.inquiries || []);
      }
      if (statsData.success) {
        setStats(statsData.stats);
      }
    } catch {
      setErrorMessage("Could not load dashboard data from server.");
    } finally {
      setLoading(false);
    }
  }, [search, selectedStatus, authHeader, onLogout]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Update status handler
  const handleStatusChange = async (id, newStatus) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}/status`, {
        method: "PATCH",
        headers: authHeader(),
        body: JSON.stringify({ status: newStatus })
      });

      if (res.status === 401) {
        onLogout();
        return;
      }

      const data = await res.json();
      if (data.success) {
        // Update local state immediately
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (activeInquiry && activeInquiry.id === id) {
          setActiveInquiry((prev) => ({ ...prev, status: newStatus }));
        }
        // Refresh stats
        fetch("/api/admin/stats", { headers: authHeader() })
          .then((r) => r.json())
          .then((d) => d.success && setStats(d.stats));
      }
    } catch {
      alert("Failed to update inquiry status. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  // Delete handler
  const handleDelete = async () => {
    if (!inquiryToDelete) return;
    setActionLoading(true);

    try {
      const res = await fetch(`/api/admin/inquiries/${inquiryToDelete.id}`, {
        method: "DELETE",
        headers: authHeader()
      });

      if (res.status === 401) {
        onLogout();
        return;
      }

      const data = await res.json();
      if (data.success) {
        setInquiries((prev) => prev.filter((item) => item.id !== inquiryToDelete.id));
        if (activeInquiry && activeInquiry.id === inquiryToDelete.id) {
          setActiveInquiry(null);
        }
        setInquiryToDelete(null);
        // Refresh stats
        fetch("/api/admin/stats", { headers: authHeader() })
          .then((r) => r.json())
          .then((d) => d.success && setStats(d.stats));
      }
    } catch {
      alert("Failed to delete inquiry.");
    } finally {
      setActionLoading(false);
    }
  };

  // Status badge helper
  const renderStatusBadge = (status) => {
    switch (status) {
      case "NEW":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
            <span>NEW</span>
          </span>
        );
      case "CONTACTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-900 border border-blue-300">
            <PhoneCall className="w-3 h-3 text-blue-700" />
            <span>CONTACTED</span>
          </span>
        );
      case "IN PROGRESS":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-100 text-purple-900 border border-purple-300">
            <Activity className="w-3 h-3 text-purple-700" />
            <span>IN PROGRESS</span>
          </span>
        );
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300">
            <CheckCircle className="w-3 h-3 text-emerald-700" />
            <span>COMPLETED</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col">
      {/* Top Navbar */}
      <header className="bg-forest-dark text-white border-b border-forest-light/40 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-forest border border-gold/40 flex items-center justify-center text-gold shadow-sm">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wider text-white">
                VARSHA AGRO
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold-light block">
                ADMIN DASHBOARD
              </span>
            </div>
          </div>

          {/* Right actions: User, View Site & Logout */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden md:block text-right text-xs">
              <span className="text-gray-300 block">Logged in as:</span>
              <span className="font-semibold text-gold">{user?.username || "admin"}</span>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-forest/80 hover:bg-forest text-gold hover:text-gold-light border border-gold/30 text-xs font-semibold transition-colors"
              title="Return to public website"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WEBSITE</span>
            </Link>

            <button
              onClick={fetchData}
              className="p-2 rounded-lg bg-forest hover:bg-forest-light text-gray-200 hover:text-white transition-colors border border-white/10"
              title="Refresh inquiries"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-gold" : ""}`} />
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-200 border border-red-700/50 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>LOG OUT</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top Summary Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          
          {/* TOTAL INQUIRIES */}
          <div className="p-5 rounded-2xl bg-white border border-forest/10 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal/70">
              TOTAL INQUIRIES
            </span>
            <div className="font-serif text-3xl font-bold text-forest mt-2">
              {stats.total}
            </div>
            <span className="text-[10px] text-charcoal/60 mt-1">All time records</span>
          </div>

          {/* NEW */}
          <div className="p-5 rounded-2xl bg-white border border-amber-300 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                NEW
              </span>
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            </div>
            <div className="font-serif text-3xl font-bold text-amber-700 mt-2">
              {stats.new}
            </div>
            <span className="text-[10px] text-amber-800/80 mt-1">Pending review</span>
          </div>

          {/* CONTACTED */}
          <div className="p-5 rounded-2xl bg-white border border-blue-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800">
              CONTACTED
            </span>
            <div className="font-serif text-3xl font-bold text-blue-700 mt-2">
              {stats.contacted}
            </div>
            <span className="text-[10px] text-blue-800/80 mt-1">Followed up</span>
          </div>

          {/* IN PROGRESS */}
          <div className="p-5 rounded-2xl bg-white border border-purple-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800">
              IN PROGRESS
            </span>
            <div className="font-serif text-3xl font-bold text-purple-700 mt-2">
              {stats.inProgress}
            </div>
            <span className="text-[10px] text-purple-800/80 mt-1">Under fulfillment</span>
          </div>

          {/* COMPLETED */}
          <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-sm flex flex-col justify-between col-span-2 sm:col-span-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              COMPLETED
            </span>
            <div className="font-serif text-3xl font-bold text-emerald-700 mt-2">
              {stats.completed}
            </div>
            <span className="text-[10px] text-emerald-800/80 mt-1">Resolved inquiries</span>
          </div>

        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-5 rounded-2xl border border-forest/10 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search inquiries..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm bg-ivory/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {["ALL", "NEW", "CONTACTED", "IN PROGRESS", "COMPLETED"].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-colors ${
                  selectedStatus === st
                    ? "bg-forest text-gold shadow-xs"
                    : "bg-ivory text-charcoal/80 hover:bg-forest/10 hover:text-forest"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Inquiries Table Card */}
        <div className="bg-white rounded-3xl border border-forest/10 shadow-card overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-forest/10 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-forest">
                Customer Inquiries
              </h2>
              <p className="text-xs text-charcoal/70 mt-0.5">
                Newest inquiries appear first. Click View to inspect full requirement.
              </p>
            </div>
            <span className="text-xs font-semibold text-agri">
              Showing {inquiries.length} {inquiries.length === 1 ? "inquiry" : "inquiries"}
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-ivory border-b border-forest/10 text-forest text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-4 sm:px-6">INQUIRY ID</th>
                  <th className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1">
                      <span>DATE</span>
                      <ArrowUpDown className="w-3 h-3 text-gray-400" />
                    </span>
                  </th>
                  <th className="py-3.5 px-4">CUSTOMER</th>
                  <th className="py-3.5 px-4">MOBILE</th>
                  <th className="py-3.5 px-4">EMAIL</th>
                  <th className="py-3.5 px-4">REQUIREMENT</th>
                  <th className="py-3.5 px-4">STATUS</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className="hover:bg-ivory/60 transition-colors group"
                  >
                    {/* Inquiry ID */}
                    <td className="py-4 px-4 sm:px-6 font-mono font-bold text-forest">
                      {inq.reference_id}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 whitespace-nowrap text-charcoal/80">
                      <div>{inq.submission_date}</div>
                      <div className="text-[10px] text-gray-400">{inq.submission_time}</div>
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-4 font-semibold text-charcoal">
                      {inq.name}
                    </td>

                    {/* Mobile */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <a
                        href={`tel:${inq.phone}`}
                        className="text-forest hover:text-agri font-medium underline-offset-2 hover:underline inline-flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3 text-gold" />
                        <span>{inq.phone}</span>
                      </a>
                    </td>

                    {/* Email */}
                    <td className="py-4 px-4 text-charcoal/80">
                      {inq.email ? (
                        <a
                          href={`mailto:${inq.email}`}
                          className="hover:text-forest hover:underline"
                        >
                          {inq.email}
                        </a>
                      ) : (
                        <span className="text-gray-400 italic">Not provided</span>
                      )}
                    </td>

                    {/* Requirement */}
                    <td className="py-4 px-4 font-medium text-forest">
                      {inq.requirement}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {renderStatusBadge(inq.status)}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => setActiveInquiry(inq)}
                          className="px-3 py-1.5 rounded-lg bg-forest hover:bg-forest-light text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs"
                          title="View complete details"
                        >
                          <Eye className="w-3 h-3 text-gold" />
                          <span>VIEW</span>
                        </button>

                        <button
                          onClick={() => setInquiryToDelete(inq)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {inquiries.length === 0 && !loading && (
            <div className="py-16 px-4 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-forest/5 text-forest/40 mx-auto flex items-center justify-center">
                <Inbox className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest">
                No inquiries yet.
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/70 max-w-sm mx-auto">
                Customer inquiries submitted through the website will appear here.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* ==================================================
          DETAILED INQUIRY VIEW MODAL
          ================================================== */}
      {activeInquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-ivory text-charcoal w-full max-w-2xl rounded-3xl shadow-2xl border border-forest/15 overflow-hidden relative max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-forest text-white p-5 sm:p-6 relative shrink-0 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-light block">
                  CUSTOMER INQUIRY DOSSIER
                </span>
                <h3 className="font-mono text-2xl font-bold mt-0.5 text-white">
                  {activeInquiry.reference_id}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                {renderStatusBadge(activeInquiry.status)}
                <button
                  onClick={() => setActiveInquiry(null)}
                  className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Details Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-sm">
              
              {/* Customer Contact Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-white border border-forest/10">
                <div>
                  <span className="text-xs uppercase font-semibold text-agri block">Customer Name</span>
                  <div className="font-serif text-xl font-bold text-forest mt-0.5">
                    {activeInquiry.name}
                  </div>
                </div>

                <div>
                  <span className="text-xs uppercase font-semibold text-agri block">Requirement</span>
                  <div className="text-sm font-bold text-forest mt-0.5">
                    {activeInquiry.requirement}
                  </div>
                </div>

                <div className="pt-2 border-t border-forest/5">
                  <span className="text-xs uppercase font-semibold text-charcoal/70 block">Mobile Number</span>
                  <a
                    href={`tel:${activeInquiry.phone}`}
                    className="font-mono text-base font-bold text-forest hover:text-agri inline-flex items-center gap-1.5 mt-0.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold" />
                    <span>{activeInquiry.phone}</span>
                  </a>
                </div>

                <div className="pt-2 border-t border-forest/5">
                  <span className="text-xs uppercase font-semibold text-charcoal/70 block">Email Address</span>
                  {activeInquiry.email ? (
                    <a
                      href={`mailto:${activeInquiry.email}`}
                      className="text-sm text-forest hover:text-agri inline-flex items-center gap-1.5 mt-0.5 break-all"
                    >
                      <Mail className="w-3.5 h-3.5 text-gold" />
                      <span>{activeInquiry.email}</span>
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400 italic">Not provided</span>
                  )}
                </div>
              </div>

              {/* Message Details */}
              <div className="space-y-2">
                <span className="text-xs uppercase font-semibold text-forest block">
                  Customer Message / Requirement Details
                </span>
                <div className="p-4 rounded-xl bg-white border border-forest/10 text-charcoal/90 leading-relaxed font-light whitespace-pre-wrap">
                  {activeInquiry.message || "No additional message text provided."}
                </div>
              </div>

              {/* Submission Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-charcoal/70 p-4 rounded-xl bg-forest/5 border border-forest/10">
                <div>
                  <span className="font-semibold block text-forest">Submitted Date:</span>
                  <span>{activeInquiry.submission_date}</span>
                </div>
                <div>
                  <span className="font-semibold block text-forest">Submitted Time:</span>
                  <span>{activeInquiry.submission_time}</span>
                </div>
                <div>
                  <span className="font-semibold block text-forest">Source:</span>
                  <span>{activeInquiry.source || "Website"}</span>
                </div>
              </div>

              {/* Status Change Action Section */}
              <div className="pt-4 border-t border-forest/10 space-y-3">
                <span className="text-xs uppercase font-bold tracking-wider text-forest block">
                  Update Inquiry Status:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    disabled={actionLoading || activeInquiry.status === "CONTACTED"}
                    onClick={() => handleStatusChange(activeInquiry.id, "CONTACTED")}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-300 hover:bg-blue-100 disabled:opacity-50 transition-colors"
                  >
                    MARK AS CONTACTED
                  </button>

                  <button
                    disabled={actionLoading || activeInquiry.status === "IN PROGRESS"}
                    onClick={() => handleStatusChange(activeInquiry.id, "IN PROGRESS")}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-300 hover:bg-purple-100 disabled:opacity-50 transition-colors"
                  >
                    MARK AS IN PROGRESS
                  </button>

                  <button
                    disabled={actionLoading || activeInquiry.status === "COMPLETED"}
                    onClick={() => handleStatusChange(activeInquiry.id, "COMPLETED")}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 disabled:opacity-50 transition-colors"
                  >
                    MARK AS COMPLETED
                  </button>

                  {activeInquiry.status !== "NEW" && (
                    <button
                      disabled={actionLoading}
                      onClick={() => handleStatusChange(activeInquiry.id, "NEW")}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      RESET TO NEW
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-white border-t border-forest/10 flex items-center justify-between">
              <button
                onClick={() => {
                  setInquiryToDelete(activeInquiry);
                  setActiveInquiry(null);
                }}
                className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-800 font-semibold transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Inquiry</span>
              </button>

              <button
                onClick={() => setActiveInquiry(null)}
                className="px-6 py-2.5 rounded-full bg-forest text-white text-xs font-semibold hover:bg-forest-light transition-colors"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==================================================
          DELETE CONFIRMATION MODAL
          ================================================== */}
      {inquiryToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white text-charcoal w-full max-w-md rounded-2xl shadow-2xl border border-red-200 p-6 space-y-5">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest">
                Confirm Deletion
              </h3>
            </div>

            <p className="text-sm text-charcoal/80 leading-relaxed">
              Are you sure you want to permanently delete this inquiry?
            </p>

            <div className="p-3 rounded-lg bg-ivory text-xs border border-forest/10 space-y-1">
              <div><strong>Reference:</strong> {inquiryToDelete.reference_id}</div>
              <div><strong>Customer:</strong> {inquiryToDelete.name}</div>
              <div><strong>Requirement:</strong> {inquiryToDelete.requirement}</div>
            </div>

            <p className="text-xs text-red-600 font-medium">
              This action cannot be undone.
            </p>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                disabled={actionLoading}
                onClick={() => setInquiryToDelete(null)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-charcoal hover:bg-gray-100 transition-colors"
              >
                CANCEL
              </button>

              <button
                disabled={actionLoading}
                onClick={handleDelete}
                className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                {actionLoading ? "DELETING..." : "DELETE"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
