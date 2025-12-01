"use client";

import { useState } from "react";
import {
  Search,
  Star,
  Check,
  X,
  Trash2,
  Quote,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Filter
} from "lucide-react";

export default function TestimonialList({ testimonials = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3x3 grid

  // Filter Logic
  const filteredTestimonials = testimonials.filter(t => {
    const matchesSearch =
      (t.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (t.content?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const isVisible = t.isVisible;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && isVisible) ||
      (statusFilter === "pending" && !isVisible);

    return matchesSearch && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTestimonials = filteredTestimonials.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search testimonials..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary transition-all"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="relative">
            <select
              className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-panacea-primary/20 cursor-pointer"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="pending">Pending</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="text-sm text-gray-500 whitespace-nowrap">
            Total: <span className="font-bold text-gray-900">{filteredTestimonials.length}</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      {paginatedTestimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow group relative h-full">
              {/* Quote Icon Background */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-gray-100 -z-0 rotate-180" />

              {/* Header */}
              <div className="flex justify-between items-start mb-4 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-panacea-primary to-panacea-dark text-white flex items-center justify-center font-bold text-lg shadow-md flex-shrink-0">
                    {testimonial.name?.charAt(0) || "?"}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 line-clamp-1">{testimonial.name || "Anonymous"}</h3>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < (testimonial.rating || 5) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${testimonial.isVisible
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                  }`}>
                  {testimonial.isVisible ? "Published" : "Pending"}
                </span>
              </div>

              {/* Content */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6 z-10 relative line-clamp-4">
                "{testimonial.content}"
              </p>

              {/* Footer / Actions */}
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center z-10 mt-auto">
                <span className="text-xs text-gray-400">
                  {new Date(testimonial.createdAt).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    className={`p-2 rounded-lg transition-colors ${testimonial.isVisible
                        ? "text-yellow-600 hover:bg-yellow-50"
                        : "text-green-600 hover:bg-green-50"
                      }`}
                    title={testimonial.isVisible ? "Unpublish" : "Publish"}
                  >
                    {testimonial.isVisible ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                  </button>
                  <button
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
          <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 font-medium text-lg mb-1">No testimonials found</h3>
          <p className="text-gray-500">Try adjusting your search or filters.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <span className="text-sm text-gray-600 font-medium px-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
}
