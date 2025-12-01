"use client";

import { useState } from "react";
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
  Inbox
} from "lucide-react";

export default function LeadList({ leads = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter Logic
  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      (lead.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (lead.email?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || (lead.status?.toLowerCase() || "new") === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + itemsPerPage);

  const handleExport = () => {
    if (filteredLeads.length === 0) return;

    const headers = ["ID", "Name", "Email", "Phone", "Source", "Status", "Date"];
    const csvContent = [
      headers.join(","),
      ...filteredLeads.map(lead => [
        lead.id,
        `"${lead.name}"`,
        lead.email,
        lead.phone || "",
        lead.source || "",
        lead.status || "New",
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

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'contacted': return 'bg-yellow-100 text-yellow-700';
      case 'converted': return 'bg-green-100 text-green-700';
      case 'lost': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Toolbar */}
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads by name or email..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary transition-all"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <select
              className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-panacea-primary/20 cursor-pointer"
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Lead Details</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Contact Info</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Source</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedLeads.length > 0 ? (
              paginatedLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-panacea-primary/10 flex items-center justify-center text-panacea-primary font-bold text-sm mr-3 flex-shrink-0">
                        {lead.name?.charAt(0) || "?"}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{lead.name || "Unknown"}</div>
                        <div className="text-xs text-gray-500">ID: #{lead.id}</div>
                        {/* Mobile only contact info */}
                        <div className="md:hidden text-xs text-gray-500 mt-1">
                          {lead.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-3 h-3 mr-2 text-gray-400" />
                        {lead.email}
                      </div>
                      {lead.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-3 h-3 mr-2 text-gray-400" />
                          {lead.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {lead.source || "Website"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-3 h-3 mr-2 text-gray-400" />
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                      {lead.status || 'New'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-panacea-primary hover:bg-panacea-primary/10 rounded-lg transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center">
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
      <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
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
            {[...Array(totalPages)].map((_, i) => {
              // Show limited pages logic could go here, but for now simple list
              if (totalPages > 5 && Math.abs(currentPage - (i + 1)) > 2) return null;
              return (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === i + 1
                      ? "bg-panacea-primary text-white"
                      : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  {i + 1}
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
  );
}
