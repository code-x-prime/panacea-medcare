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
  Filter,
  Plus,
  Edit,
  Youtube,
  MapPin,
  Image as ImageIcon
} from "lucide-react";
import TestimonialForm from "./TestimonialForm";
import Image from "next/image";

export default function TestimonialList({ testimonials: initialTestimonials = [] }) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const itemsPerPage = 9; // 3x3 grid

  const refreshTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const handleToggleVisibility = async (testimonial) => {
    try {
      const formData = new FormData();
      formData.append('id', testimonial.id);
      formData.append('isVisible', !testimonial.isVisible);

      const response = await fetch('/api/testimonials', {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      });

      if (response.ok) {
        await refreshTestimonials();
      }
    } catch (error) {
      console.error('Error toggling visibility:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/testimonials?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        await refreshTestimonials();
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  // Filter Logic
  const filteredTestimonials = testimonials.filter(t => {
    const matchesSearch =
      (t.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (t.description?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (t.location?.toLowerCase() || "").includes(searchTerm.toLowerCase());

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

          <button
            onClick={() => {
              setEditingTestimonial(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-panacea-primary text-white rounded-lg hover:bg-panacea-dark transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            Create New
          </button>
        </div>
      </div>

      {/* Grid */}
      {paginatedTestimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="group">
              {/* Gradient Border Card */}
              <div className="relative bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-500 rounded-2xl p-[2px] h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                <div className="bg-white rounded-2xl p-6 flex flex-col h-full">
                  {/* Header with Status */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {testimonial.image ? (
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name || "Patient"}
                          width={56}
                          height={56}
                          className="w-14 h-14 rounded-full object-cover shadow-md flex-shrink-0 ring-2 ring-panacea-primary/20"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-panacea-primary to-panacea-dark text-white flex items-center justify-center font-bold text-xl shadow-md flex-shrink-0">
                          {testimonial.name?.charAt(0) || "?"}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 truncate">{testimonial.name || "Anonymous"}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < (testimonial.rating || 5) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 ml-2 ${testimonial.isVisible
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                      }`}>
                      {testimonial.isVisible ? "Published" : "Pending"}
                    </span>
                  </div>

                  {/* Media Indicators */}
                  <div className="flex gap-2 mb-3">
                    {testimonial.image && (
                      <span className="flex items-center gap-1 text-xs text-gray-600 bg-blue-50 px-2 py-1 rounded-full">
                        <ImageIcon className="w-3 h-3 text-blue-600" />
                        Image
                      </span>
                    )}
                    {testimonial.videoUrl && (
                      <span className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                        <Youtube className="w-3 h-3" />
                        Video
                      </span>
                    )}
                  </div>

                  {/* Location */}
                  {testimonial.location && (
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 text-panacea-primary" />
                      <span className="truncate">{testimonial.location}</span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 mb-4">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {testimonial.description ? `"${testimonial.description}"` : <span className="text-gray-400 italic">No description</span>}
                    </p>
                  </div>

                  {/* Footer / Actions */}
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto">
                    <span className="text-xs text-gray-400">
                      {new Date(testimonial.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingTestimonial(testimonial);
                          setShowForm(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleVisibility(testimonial)}
                        className={`p-2 rounded-lg transition-colors ${testimonial.isVisible
                          ? "text-yellow-600 hover:bg-yellow-50"
                          : "text-green-600 hover:bg-green-50"
                          }`}
                        title={testimonial.isVisible ? "Unpublish" : "Publish"}
                      >
                        {testimonial.isVisible ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(testimonial.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
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

      {/* Form Modal */}
      {showForm && (
        <TestimonialForm
          testimonial={editingTestimonial}
          onClose={() => {
            setShowForm(false);
            setEditingTestimonial(null);
          }}
          onSuccess={refreshTestimonials}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Testimonial</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this testimonial? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
