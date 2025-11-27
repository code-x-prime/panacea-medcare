// src/components/admin/TestimonialList.js
"use client";

import { useState, useEffect } from "react";

export default function TestimonialList() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      // Admin should see all testimonials, so we need to be authenticated
      const response = await fetch("/api/testimonials", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const response = await fetch(`/api/testimonials?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  const handleEdit = (testimonial) => {
    setEditingId(testimonial.id);
    setEditData({
      name: testimonial.name,
      content: testimonial.content,
      rating: testimonial.rating,
      isVisible: testimonial.isVisible,
    });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch("/api/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, ...editData }),
      });

      if (response.ok) {
        setEditingId(null);
        fetchTestimonials();
      }
    } catch (error) {
      console.error("Error updating testimonial:", error);
    }
  };

  if (loading) {
    return <div className="text-gray-500">Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4 max-h-[600px] overflow-y-auto">
      {testimonials.length === 0 ? (
        <p className="text-gray-500">No testimonials yet.</p>
      ) : (
        testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            {editingId === testimonial.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
                <textarea
                  value={editData.content}
                  onChange={(e) =>
                    setEditData({ ...editData, content: e.target.value })
                  }
                  rows={3}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(testimonial.id)}
                    className="px-3 py-1 bg-panacea-primary text-white rounded text-sm hover:bg-panacea-accent"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Rating: {testimonial.rating}/5
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.isVisible ? "Visible" : "Hidden"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="px-2 py-1 bg-panacea-primary text-white rounded text-xs hover:bg-panacea-accent"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="px-2 py-1 bg-panacea-accent text-white rounded text-xs hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.content}</p>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
