"use client";

import { useState, useRef } from "react";
import { X, Upload, Star, Youtube, MapPin, User, FileText, Image as ImageIcon } from "lucide-react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

// Convert embed URL back to watch URL for editing
function convertEmbedToWatchUrl(url) {
  if (!url) return "";
  // If it's already a watch URL, return as is
  if (url.includes("watch?v=") || url.includes("youtu.be/")) return url;
  // If it's an embed URL, convert to watch URL
  if (url.includes("embed/")) {
    const videoId = url.split("embed/")[1]?.split("?")[0];
    return videoId ? `https://www.youtube.com/watch?v=${videoId}` : "";
  }
  return url;
}

export default function TestimonialForm({ testimonial, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: testimonial?.name || "",
    description: testimonial?.description || "",
    location: testimonial?.location || "",
    rating: testimonial?.rating || 5,
    videoUrl: convertEmbedToWatchUrl(testimonial?.videoUrl) || "",
    isVisible: testimonial?.isVisible !== undefined ? testimonial?.isVisible : true,
  });

  const [imagePreview, setImagePreview] = useState(testimonial?.image || null);
  const [imageFile, setImageFile] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("Image size should be less than 5MB");
        return;
      }
      setImageFile(file);
      setRemoveImage(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setRemoveImage(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();

      if (testimonial?.id) {
        formDataToSend.append('id', testimonial.id);
      }

      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('rating', formData.rating);
      formDataToSend.append('videoUrl', formData.videoUrl);
      formDataToSend.append('isVisible', formData.isVisible);

      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      if (removeImage) {
        formDataToSend.append('removeImage', 'true');
      }

      const url = '/api/testimonials';
      const method = testimonial?.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        credentials: 'include',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to save testimonial');
      }

      // Reset form completely on success
      setFormData({
        name: "",
        description: "",
        location: "",
        rating: 5,
        videoUrl: "",
        isVisible: true,
      });
      setImagePreview(null);
      setImageFile(null);
      setRemoveImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {testimonial?.id ? "Edit Testimonial" : "Create New Testimonial"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <ImageIcon className="w-4 h-4 inline mr-1" />
              Patient Image (Optional)
            </label>
            <div className="space-y-3">
              {imagePreview ? (
                <div className="relative inline-block">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={128}
                    height={128}
                    className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-panacea-primary transition-colors"
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload image</p>
                  <p className="text-xs text-gray-400 mt-1">Max 5MB</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* YouTube URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Youtube className="w-4 h-4 inline mr-1" />
              YouTube Video URL (Optional)
            </label>
            <input
              type="text"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary transition-all"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-1" />
              Patient Name (Optional)
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary transition-all"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Location (Optional)
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="New York, USA"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary transition-all"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Star className="w-4 h-4 inline mr-1" />
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="transition-transform hover:scale-110"
                >
                  <FaStar
                    className={`w-8 h-8 ${star <= formData.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                      }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-1" />
              Testimonial (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Share your experience..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary transition-all resize-none"
            />
          </div>

          {/* Visibility Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isVisible"
              checked={formData.isVisible}
              onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
              className="w-4 h-4 text-panacea-primary border-gray-300 rounded focus:ring-panacea-primary"
            />
            <label htmlFor="isVisible" className="text-sm font-medium text-gray-700">
              Publish immediately
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-panacea-primary text-white rounded-lg hover:bg-panacea-dark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : testimonial?.id ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
