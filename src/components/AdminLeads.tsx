import { useEffect, useState } from "react";
import { 
  Users, CheckCircle, Mail, Phone, Calendar, DollarSign, 
  Filter, SlidersHorizontal, ExternalLink, Copy, Check, MessageSquare
} from "lucide-react";
import { Lead, PersonaType } from "../types";

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterPersona, setFilterPersona] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/leads");
      const data = await response.json();
      if (response.ok) {
        setLeads(data.leads || []);
      } else {
        setError(data.error || "Failed to load leads from database");
      }
    } catch (err) {
      setError("Server is booting or offline. Retrying...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    // Poll every 10 seconds to keep leads synchronized
    const interval = setInterval(fetchLeads, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (id: string, newStatus: "pending" | "contacted" | "enrolled") => {
    setUpdatingId(id);
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        // Optimistic state update
        setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
      }
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Pre-filled WhatsApp template generator
  const getWhatsAppLink = (lead: Lead) => {
    const formattedPhone = lead.phone.replace(/[^0-9]/g, "");
    
    // Customize message depending on audience persona
    let audienceHook = "";
    if (lead.persona === "student") {
      audienceHook = "boost your resume, learn Tailwind CSS, and land high-paying student freelance gigs";
    } else if (lead.persona === "homemaker") {
      audienceHook = "learn flexible website development step-by-step, and start an independent remote side-hustle from home";
    } else if (lead.persona === "jobseeker") {
      audienceHook = "master React & Tailwind UI engineering, build your developer portfolio, and transition into a tech career";
    } else {
      audienceHook = "learn to design, host, and optimize your own business landing pages independently without paying web agencies";
    }

    const message = `Hello ${lead.name},\n\nThis is the Admissions Team at *AK Development*! 🎓\n\nWe received your provisional registration for our *₹499 Website Development Course* under our *${lead.persona.toUpperCase()}* program to ${audienceHook}.\n\nYour seat is temporarily locked. Would you like us to share the course schedule, modules, and secure payment link to confirm your entry?\n\nLooking forward to onboarding you!\n\nBest regards,\nAdmissions Team\nAK Development`;
    
    return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
  };

  const filteredLeads = leads.filter(lead => {
    const matchPersona = filterPersona === "all" || lead.persona === filterPersona;
    const matchStatus = filterStatus === "all" || lead.status === filterStatus;
    return matchPersona && matchStatus;
  });

  // KPI Calculations
  const totalCount = leads.length;
  const enrolledCount = leads.filter(l => l.status === "enrolled").length;
  const contactedCount = leads.filter(l => l.status === "contacted").length;
  const pendingCount = leads.filter(l => l.status === "pending").length;
  
  const projectedRevenue = enrolledCount * 499;
  const conversionRate = totalCount > 0 ? Math.round((enrolledCount / totalCount) * 100) : 0;

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* HEADER */}
        <div className="mb-10 border-b border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              Course Admin Control
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white">Student Lead Tracker</h1>
            <p className="text-xs text-slate-400 mt-1">
              Analyze incoming registrations, update status logs, and launch direct WhatsApp outreach scripts.
            </p>
          </div>
          <button 
            onClick={fetchLeads} 
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-lg border border-slate-800 transition-colors"
          >
            Refresh Database
          </button>
        </div>

        {/* METRIC CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Leads</span>
              <Users className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-black text-white mt-1">{totalCount}</div>
            <div className="text-[9px] text-slate-500 mt-1">Registrations submitted</div>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Conversion Rate</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{conversionRate}%</div>
            <div className="text-[9px] text-slate-500 mt-1">{enrolledCount} enrolled students</div>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Projected Income</span>
              <DollarSign className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-400 mt-1">₹{projectedRevenue}</div>
            <div className="text-[9px] text-slate-500 mt-1">Based on ₹499 fee</div>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Pending Tasks</span>
              <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-black text-indigo-400 mt-1">{pendingCount}</div>
            <div className="text-[9px] text-slate-500 mt-1">{contactedCount} currently contacted</div>
          </div>
        </div>

        {/* FILTERS PANEL */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 self-start md:self-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Filters</span>
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>Profile:</span>
              <select 
                value={filterPersona}
                onChange={(e) => setFilterPersona(e.target.value)}
                className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Profiles</option>
                <option value="student">Students</option>
                <option value="homemaker">Homemakers</option>
                <option value="jobseeker">Job Seekers</option>
                <option value="entrepreneur">Entrepreneurs</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>Status:</span>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="enrolled">Enrolled</option>
              </select>
            </div>
          </div>
        </div>

        {/* LEADS LIST */}
        {loading && leads.length === 0 ? (
          <div className="py-20 text-center text-slate-500 text-sm bg-slate-900/40 rounded-xl border border-slate-900">
            Connecting to database, pulling records...
          </div>
        ) : error && leads.length === 0 ? (
          <div className="py-20 text-center text-red-400 text-sm bg-slate-900/40 rounded-xl border border-red-900/30">
            {error}
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-20 text-center text-slate-500 text-sm bg-slate-900/40 rounded-xl border border-slate-900">
            No matching lead records found.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <div 
                key={lead.id} 
                className={`bg-slate-900 p-5 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                  lead.status === "enrolled" 
                    ? "border-emerald-950 hover:border-emerald-900" 
                    : lead.status === "contacted" 
                      ? "border-indigo-950 hover:border-indigo-900" 
                      : "border-slate-850 hover:border-slate-800"
                }`}
              >
                
                {/* Left col: Name, Profile badge, booking date, contact */}
                <div className="space-y-3 max-w-xl">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-bold text-white">{lead.name}</h3>
                    
                    {/* Persona Badge */}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${
                      lead.persona === "student" 
                        ? "bg-indigo-950 border border-indigo-800 text-indigo-400" 
                        : lead.persona === "homemaker" 
                          ? "bg-pink-950 border border-pink-800 text-pink-400" 
                          : lead.persona === "jobseeker" 
                            ? "bg-emerald-950 border border-emerald-800 text-emerald-400" 
                            : "bg-amber-950 border border-amber-800 text-amber-400"
                    }`}>
                      {lead.persona}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-y-1.5 gap-x-4 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <span>{lead.email}</span>
                      <button 
                        onClick={() => handleCopy(lead.email, `email-${lead.id}`)}
                        className="text-slate-600 hover:text-white transition-colors ml-1"
                      >
                        {copiedId === `email-${lead.id}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      <span>{lead.phone}</span>
                      <button 
                        onClick={() => handleCopy(lead.phone, `phone-${lead.id}`)}
                        className="text-slate-600 hover:text-white transition-colors ml-1"
                      >
                        {copiedId === `phone-${lead.id}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {lead.notes && (
                    <div className="text-xs bg-slate-950 p-3 rounded border border-slate-800/80 text-slate-300">
                      <span className="font-bold text-slate-400 block mb-0.5 uppercase tracking-wide text-[9px]">Expectations/Notes:</span>
                      "{lead.notes}"
                    </div>
                  )}
                </div>

                {/* Right col: Actions, Status switches & Outreach */}
                <div className="flex flex-row md:flex-col items-end md:justify-center gap-3 border-t md:border-t-0 border-slate-800/80 pt-4 md:pt-0 shrink-0">
                  
                  {/* Status switches dropdown */}
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-slate-500 text-[10px] uppercase font-bold">Status:</span>
                    <select
                      value={lead.status}
                      disabled={updatingId === lead.id}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                      className={`px-2 py-1 rounded text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                        lead.status === "enrolled"
                          ? "bg-emerald-950/80 border border-emerald-800 text-emerald-300"
                          : lead.status === "contacted"
                            ? "bg-indigo-950/80 border border-indigo-800 text-indigo-300"
                            : "bg-slate-950 border border-slate-800 text-slate-400"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="enrolled">Enrolled (₹499 Paid)</option>
                    </select>
                  </div>

                  {/* Outreach launching links */}
                  <div className="flex items-center gap-2">
                    <a 
                      href={getWhatsAppLink(lead)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 font-bold text-white text-[11px] flex items-center gap-1.5 transition-colors shadow shadow-emerald-600/10"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-white" />
                      WhatsApp Invite
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
