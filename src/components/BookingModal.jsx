"use client";

import { useState } from "react";
import { FaTimes, FaUserMd, FaHospital, FaSpinner, FaCheckCircle } from "react-icons/fa";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { COUNTRIES } from "@/lib/countries";

export default function BookingModal({ isOpen, onClose, doctor, hospital, locale }) {
    const [formData, setFormData] = useState({
        name: "",
        phoneCode: "+91",
        phone: "",
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const phoneCodes = COUNTRIES.map((c) => ({
        value: c.code,
        label: `${c.code} (${c.label})`,
    }));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        // Validate (email optional)
        if (!formData.name || !formData.phone) {
            setError("Please fill all required fields (name and phone)");
            setIsSubmitting(false);
            return;
        }

        try {
            const fullPhone = `${formData.phoneCode}${formData.phone}`;
            const response = await fetch("/api/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone: fullPhone,
                    email: formData.email,
                    message: formData.message,
                    doctorName: doctor?.name || "",
                    doctorSpecialty: doctor?.specialty || "",
                    hospitalName: hospital || doctor?.hospital || "",
                    timestamp: new Date().toISOString()
                })
            });

            if (response.ok) {
                setIsSuccess(true);
                // Track conversion
                if (typeof window !== 'undefined' && window.gtag_report_conversion) {
                    window.gtag_report_conversion();
                }
                setFormData({ name: "", phoneCode: "+91", phone: "", email: "", message: "" });
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
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn border-2 border-[#066F89]/30">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#066F89] via-[#066F89] to-[#FF6B35] p-6 text-white">
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
                            <FaCheckCircle className="w-16 h-16 text-[#0BA35A] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Request Sent!</h3>
                            <p className="text-gray-600">We will contact you shortly.</p>
                        </div>
                    ) : (
                        <>
                            {error && (
                                <div className="bg-[#FF6B35]/10 text-[#FF6B35] p-3 rounded-lg text-sm border-2 border-[#FF6B35]/30">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name <span className="text-[#FF6B35]">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 bg-white border-2 border-[#066F89]/40 rounded-lg focus:ring-2 focus:ring-[#066F89]/30 focus:border-[#FF6B35] transition-all shadow-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number <span className="text-[#FF6B35]">*</span>
                                </label>
                                <div className="flex gap-2">
                                    <Select
                                        value={formData.phoneCode}
                                        onValueChange={(value) => setFormData({ ...formData, phoneCode: value })}
                                    >
                                        <SelectTrigger className="w-28 bg-white border-2 border-[#066F89]/40 focus:border-[#FF6B35] shadow-sm">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white max-h-[200px]">
                                            {phoneCodes.map((code) => (
                                                <SelectItem key={code.value} value={code.value}>
                                                    {code.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="9999999999"
                                        className="flex-1 px-4 py-3 bg-white border-2 border-[#066F89]/40 rounded-lg focus:ring-2 focus:ring-[#066F89]/30 focus:border-[#FF6B35] transition-all shadow-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address <span className="text-[#FF6B35]">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-3 bg-white border-2 border-[#066F89]/40 rounded-lg focus:ring-2 focus:ring-[#066F89]/30 focus:border-[#FF6B35] transition-all shadow-sm"
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
                                    className="w-full px-4 py-3 bg-white border-2 border-[#066F89]/40 rounded-lg focus:ring-2 focus:ring-[#066F89]/30 focus:border-[#FF6B35] transition-all resize-none shadow-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#066F89] hover:bg-[#05596D] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
