"use client";

import { useState } from "react";
import { FaTimes, FaUserMd, FaHospital, FaSpinner, FaCheckCircle } from "react-icons/fa";

export default function BookingModal({ isOpen, onClose, doctor, hospital, locale }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        // Validate
        if (!formData.name || !formData.phone || !formData.email) {
            setError("Please fill all required fields");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch("/api/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    doctorName: doctor?.name || "",
                    doctorSpecialty: doctor?.specialty || "",
                    hospitalName: hospital || doctor?.hospital || "",
                    timestamp: new Date().toISOString()
                })
            });

            if (response.ok) {
                setIsSuccess(true);
                setFormData({ name: "", phone: "", email: "", message: "" });
                setTimeout(() => {
                    setIsSuccess(false);
                    onClose();
                }, 3000);
            } else {
                const data = await response.json();
                setError(data.message || "Failed to submit. Please try again.");
            }
        } catch (err) {
            setError("Failed to submit. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn">
                {/* Header */}
                <div className="bg-gradient-to-r from-panacea-primary to-panacea-accent p-6 text-white">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>
                    <h2 className="text-xl font-bold mb-2">Book Appointment</h2>
                    {doctor && (
                        <div className="flex items-center gap-2 text-white/90 text-sm">
                            <FaUserMd className="w-4 h-4" />
                            <span>{doctor.name}</span>
                        </div>
                    )}
                    {(hospital || doctor?.hospital) && (
                        <div className="flex items-center gap-2 text-white/90 text-sm mt-1">
                            <FaHospital className="w-4 h-4" />
                            <span>{hospital || doctor?.hospital}</span>
                        </div>
                    )}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {isSuccess ? (
                        <div className="text-center py-8">
                            <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Request Sent!</h3>
                            <p className="text-gray-600">We will contact you shortly.</p>
                        </div>
                    ) : (
                        <>
                            {error && (
                                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-panacea-primary focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+91 9999999999"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-panacea-primary focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-panacea-primary focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Message (Optional)
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Any specific requirements..."
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-panacea-primary focus:border-transparent transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-panacea-primary to-panacea-accent hover:from-panacea-accent hover:to-panacea-primary text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <FaSpinner className="w-5 h-5 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Booking Request"
                                )}
                            </button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}
