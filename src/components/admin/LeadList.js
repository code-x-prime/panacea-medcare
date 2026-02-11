"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  Eye,
  Trash2,
  Mail,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Inbox,
  X,
  User,
  MessageSquare,
  Globe
} from "lucide-react";
import { useDebounce } from "@/lib/useDebounce";

export default function LeadList({ leads = [] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qFromUrl = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 350);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    if (qFromUrl) setSearchTerm(qFromUrl);
  }, [qFromUrl]);

  // Get unique sources for filter
  const sources = [...new Set(leads.map(l => l.source || 'Website'))];

  // Filter Logic (use debounced search)
  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      (lead.name?.toLowerCase() || "").includes(debouncedSearch.toLowerCase()) ||
      (lead.email?.toLowerCase() || "").includes(debouncedSearch.toLowerCase()) ||
      (lead.phone?.toLowerCase() || "").includes(debouncedSearch.toLowerCase());
    const matchesStatus = statusFilter === "all" || (lead.status?.toLowerCase() || "new") === statusFilter.toLowerCase();
    const matchesSource = sourceFilter === "all" || (lead.source?.toLowerCase() || "website") === sourceFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesSource;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + itemsPerPage);

  const handleExport = () => {
    if (filteredLeads.length === 0) return;

    const headers = ["ID", "Name", "Email", "Phone", "Source", "Status", "Message", "Date"];
    const csvContent = [
      headers.join(","),
      ...filteredLeads.map(lead => [
        lead.id,
        `"${lead.name || ''}"`,
        lead.email || '',
        lead.phone || "",
        lead.source || "",
        lead.status || "New",
        `"${(lead.message || '').replace(/"/g, '""').substring(0, 100)}"`,
        new Date(lead.createdAt).toLocaleDateString()
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (leadId) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        router.refresh();
        setDeleteConfirm(null);
      } else {
        alert('Failed to delete lead');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting lead');
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'contacted': return 'bg-yellow-100 text-yellow-700';
      case 'converted': return 'bg-green-100 text-green-700';
      case 'lost': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSourceColor = (source) => {
    switch (source?.toLowerCase()) {
      case 'chatbot': return 'bg-purple-100 text-purple-700';
      case 'contact form': return 'bg-blue-100 text-blue-700';
      case 'whatsapp': return 'bg-green-100 text-green-700';
      case 'ai_prescreen': return 'bg-orange-100 text-orange-700';
      case 'quote form': return 'bg-teal-100 text-teal-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Parse message JSON for AI_PRESCREEN leads
  const parseLeadMessage = (lead) => {
    if (!lead.message) return null;
    try {
      const data = JSON.parse(lead.message);
      return data;
    } catch {
      return null;
    }
  };

  const isAIPrescreen = (lead) => lead.source?.toUpperCase() === 'AI_PRESCREEN';

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary transition-all text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
            {/* Status Filter */}
            <div className="relative flex-1 md:flex-none">
              <select
                className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-panacea-primary/20 cursor-pointer text-sm"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Source Filter */}
            <div className="relative flex-1 md:flex-none">
              <select
                className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-panacea-primary/20 cursor-pointer text-sm"
                value={sourceFilter}
                onChange={(e) => {
                  setSourceFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All Sources</option>
                {sources.map(source => (
                  <option key={source} value={source.toLowerCase()}>{source}</option>
                ))}
              </select>
              <Globe className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <button
              onClick={handleExport}
              disabled={filteredLeads.length === 0}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-panacea-primary text-white rounded-lg hover:bg-panacea-dark transition-colors shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Table - premium striped feel */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-50/80 border-b-2 border-gray-100">
              <tr>
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lead Details</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Contact Info</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">Source</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">Date</th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedLeads.length > 0 ? (
                paginatedLeads.map((lead, idx) => (
                  <tr key={lead.id} className={`hover:bg-panacea-primary/5 transition-colors group ${idx % 2 === 1 ? "bg-gray-50/40" : ""}`}>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-panacea-primary/10 flex items-center justify-center text-panacea-primary font-bold text-sm mr-3 flex-shrink-0">
                          {lead.name?.charAt(0) || "?"}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{lead.name || "Unknown"}</div>
                          <div className="text-xs text-gray-500">ID: #{lead.id}</div>
                          <div className="md:hidden text-xs text-gray-500 mt-1">
                            {lead.email || lead.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="flex flex-col gap-1">
                        {lead.email && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="w-3 h-3 mr-2 text-gray-400" />
                            {lead.email}
                          </div>
                        )}
                        {lead.phone && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-3 h-3 mr-2 text-gray-400" />
                            {lead.phone}
                          </div>
                        )}
                        {!lead.email && !lead.phone && (
                          <span className="text-gray-400 text-sm">No contact info</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getSourceColor(lead.source)}`}>
                        {lead.source === 'AI_PRESCREEN' ? '🤖 AI Pre-Screen' : lead.source || "Website"}
                      </span>
                      {isAIPrescreen(lead) && parseLeadMessage(lead)?.medical?.concern && (
                        <p className="text-xs text-gray-500 mt-1 max-w-[150px] truncate">
                          {parseLeadMessage(lead).medical.concern}
                        </p>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-3 h-3 mr-2 text-gray-400" />
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                        {lead.status || 'New'}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="p-2 text-gray-400 hover:text-panacea-primary hover:bg-panacea-primary/10 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(lead.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 sm:px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-gray-50 p-4 rounded-full mb-3">
                        <Inbox className="w-6 h-6 text-gray-400" />
                      </div>
                      <h3 className="text-gray-900 font-medium mb-1">No leads found</h3>
                      <p className="text-gray-500 text-sm">Try adjusting your search or filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 sm:px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredLeads.length > 0 ? startIndex + 1 : 0}</span> to <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredLeads.length)}</span> of <span className="font-medium">{filteredLeads.length}</span> results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <div className="flex items-center gap-1">
              {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                let pageNum = i + 1;
                if (totalPages > 5) {
                  if (currentPage > 3) {
                    pageNum = currentPage - 2 + i;
                  }
                  if (pageNum > totalPages) return null;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === pageNum
                      ? "bg-panacea-primary text-white"
                      : "text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* View Lead Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white p-6 border-b border-gray-100 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900">Lead Details</h2>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getSourceColor(selectedLead.source)}`}>
                  {selectedLead.source || "Website"}
                </span>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-panacea-primary to-panacea-dark flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {selectedLead.name?.charAt(0) || "?"}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{selectedLead.name || "Unknown"}</h3>
                  <p className="text-sm text-gray-500">ID: #{selectedLead.id} • {new Date(selectedLead.createdAt).toLocaleString()}</p>
                  <span className={`mt-1 inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedLead.status)}`}>
                    {selectedLead.status || 'New'}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid sm:grid-cols-2 gap-3">
                {selectedLead.email && (
                  <a href={`mailto:${selectedLead.email}`} className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-600 font-medium">Email</p>
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 break-all">{selectedLead.email}</p>
                    </div>
                  </a>
                )}
                {selectedLead.phone && (
                  <a href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-green-600 font-medium">WhatsApp</p>
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-green-600">{selectedLead.phone}</p>
                    </div>
                  </a>
                )}
              </div>

              {/* AI Pre-Screening Details */}
              {isAIPrescreen(selectedLead) && parseLeadMessage(selectedLead) && (() => {
                const data = parseLeadMessage(selectedLead);
                const patient = data.patient || {};
                const medical = data.medical || {};
                const prefs = data.preferences || {};
                const files = data.files || [];

                return (
                  <div className="space-y-5">
                    {/* Patient Profile */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-600" />
                        Patient Profile
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                        {patient.gender && <div><span className="text-gray-500">Gender:</span> <span className="font-medium text-gray-900">{patient.gender}</span></div>}
                        {patient.age && <div><span className="text-gray-500">Age:</span> <span className="font-medium text-gray-900">{patient.age} years</span></div>}
                        {patient.dob && <div><span className="text-gray-500">DOB:</span> <span className="font-medium text-gray-900">{patient.dob}</span></div>}
                        {patient.country && <div><span className="text-gray-500">Country:</span> <span className="font-medium text-gray-900">{patient.country}</span></div>}
                        {patient.city && <div><span className="text-gray-500">City:</span> <span className="font-medium text-gray-900">{patient.city}</span></div>}
                        {patient.nationality && <div><span className="text-gray-500">Nationality:</span> <span className="font-medium text-gray-900">{patient.nationality}</span></div>}
                        {patient.preferredComm && <div><span className="text-gray-500">Preferred Comm:</span> <span className="font-medium text-gray-900">{patient.preferredComm}</span></div>}
                      </div>
                    </div>

                    {/* Medical Details */}
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-5 border border-red-100">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="text-lg">🏥</span>
                        Medical Information
                      </h4>
                      <div className="space-y-3 text-sm">
                        {medical.concern && (
                          <div className="bg-white/60 rounded-lg p-3">
                            <span className="text-gray-500 block text-xs mb-1">Primary Concern</span>
                            <span className="font-bold text-red-700 text-base">{medical.concern}</span>
                          </div>
                        )}
                        {medical.specificDiagnosis && <div><span className="text-gray-500">Specific Diagnosis:</span> <span className="font-medium text-gray-900">{medical.specificDiagnosis}</span></div>}
                        {medical.duration && <div><span className="text-gray-500">Duration:</span> <span className="font-medium text-gray-900">{medical.duration}</span></div>}
                        {medical.previousTreatment && <div><span className="text-gray-500">Previous Treatment:</span> <span className="font-medium text-gray-900">{medical.previousTreatment}</span></div>}
                        {medical.treatmentDetails && <div><span className="text-gray-500">Treatment Details:</span> <span className="font-medium text-gray-900">{medical.treatmentDetails}</span></div>}
                        {medical.currentMedications && <div><span className="text-gray-500">Current Medications:</span> <span className="font-medium text-gray-900">{medical.currentMedications}</span></div>}
                        {medical.allergies && <div><span className="text-gray-500">Allergies:</span> <span className="font-medium text-gray-900">{medical.allergies}</span></div>}
                        {medical.existingConditions && <div><span className="text-gray-500">Existing Conditions:</span> <span className="font-medium text-gray-900">{medical.existingConditions}</span></div>}
                        {medical.symptoms && (
                          <div className="bg-white/60 rounded-lg p-3 mt-3">
                            <span className="text-gray-500 block text-xs mb-1">Symptoms Description</span>
                            <p className="text-gray-900 whitespace-pre-wrap">{medical.symptoms}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Treatment Preferences */}
                    {(prefs.preferredCountry || prefs.preferredCity || prefs.budgetRange || prefs.travelReadiness || prefs.assistanceNeeded) && (
                      <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-5 border border-green-100">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <span className="text-lg">✈️</span>
                          Treatment Preferences
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                          {prefs.preferredCountry && <div><span className="text-gray-500">Country:</span> <span className="font-medium text-gray-900">{prefs.preferredCountry}</span></div>}
                          {prefs.preferredCity && <div><span className="text-gray-500">City:</span> <span className="font-medium text-gray-900">{prefs.preferredCity}</span></div>}
                          {prefs.budgetRange && <div><span className="text-gray-500">Budget:</span> <span className="font-medium text-gray-900">{prefs.budgetRange}</span></div>}
                          {prefs.travelReadiness && <div><span className="text-gray-500">Travel Ready:</span> <span className="font-medium text-gray-900">{prefs.travelReadiness}</span></div>}
                          {prefs.assistanceNeeded && <div className="sm:col-span-2"><span className="text-gray-500">Assistance Needed:</span> <span className="font-medium text-gray-900">{prefs.assistanceNeeded}</span></div>}
                        </div>
                      </div>
                    )}

                    {/* Uploaded Files */}
                    {files.length > 0 && (
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <span className="text-lg">📎</span>
                          Uploaded Documents ({files.length})
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {files.map((file, idx) => (
                            <a
                              key={idx}
                              href={file.url || file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-purple-100 rounded-lg border border-purple-200 text-sm font-medium text-purple-700 transition-colors"
                            >
                              📄 {file.name || `Document ${idx + 1}`}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Submission Info */}
                    {data.submittedAt && (
                      <div className="text-xs text-gray-500 text-center pt-2">
                        Submitted: {new Date(data.submittedAt).toLocaleString()}
                        {data.consentData && data.consentDisclaimer && ' • ✅ Consent Given'}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Regular Message (non-AI leads) */}
              {!isAIPrescreen(selectedLead) && selectedLead.message && (
                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-gray-600" />
                    Message
                  </h4>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedLead.message}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="sticky bottom-0 bg-white p-6 border-t border-gray-100 flex gap-3">
              {selectedLead.email && (
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-panacea-primary text-white rounded-xl hover:bg-panacea-dark transition-colors font-medium shadow-lg shadow-panacea-primary/20"
                >
                  <Mail className="w-5 h-5" />
                  Send Email
                </a>
              )}
              {selectedLead.phone && (
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium shadow-lg shadow-green-500/20"
                >
                  <Phone className="w-5 h-5" />
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Lead</h3>
                <p className="text-sm text-gray-500">This action cannot be undone.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

