// src/components/admin/TestimonialForm.js
"use client";

import { useState } from "react";

export default function TestimonialForm() {
  const [formData, setFormData] = useState({
    name: "",
    content: "",
    rating: 5,
    isVisible: true,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Testimonial created successfully!");
        setFormData({ name: "", content: "", rating: 5, isVisible: true });
        window.location.reload();
      } else {
        const data = await response.json();
        setMessage(data.error || "Error creating testimonial");
      }
    } catch (error) {
      setMessage("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-panacea-primary"
        />
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Content
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          required
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-panacea-primary"
        />
      </div>
      <div>
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Rating (1-5)
        </label>
        <input
          id="rating"
          type="number"
          min="1"
          max="5"
          value={formData.rating}
          onChange={(e) =>
            setFormData({ ...formData, rating: parseInt(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-panacea-primary"
        />
      </div>
      <div className="flex items-center">
        <input
          id="isVisible"
          type="checkbox"
          checked={formData.isVisible}
          onChange={(e) =>
            setFormData({ ...formData, isVisible: e.target.checked })
          }
          className="mr-2"
        />
        <label
          htmlFor="isVisible"
          className="text-sm font-medium text-gray-700"
        >
          Visible on website
        </label>
      </div>
      {message && (
        <div
          className={`text-sm ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-panacea-primary text-white rounded-md hover:bg-panacea-accent transition disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Testimonial"}
      </button>
    </form>
  );
}
