"use client";

import { useState } from "react";
import TopBanner from "@/components/TopBanner";
import { useTranslations } from "next-intl";
import { FaWhatsapp, FaPhone, FaEnvelope, FaClock, FaSpinner } from "react-icons/fa";
import Link from "next/link";

import { COUNTRIES } from "@/lib/countries";
import { CountryCombobox } from "@/components/ui/country-combobox";
import { PhoneCodeCombobox } from "@/components/ui/phone-code-combobox";

export default function ContactPage({ params }) {
    const { locale } = params;
    const t = useTranslations("contact");
    const tCTA = useTranslations("contactCTA");
    const isRTL = locale === "ar";
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneCode: "+91",
        phone: "",
        country: "",
        treatment: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const countries = COUNTRIES;
    const phoneCodes = countries.map((country) => ({
        value: country.code,
        label: `${country.code} (${country.label})`,
    }));

    const onCountryChange = (value) => {
        const country = COUNTRIES.find((c) => c.value === value);
        const code = country?.code ?? formData.phoneCode;
        setFormData((prev) => ({ ...prev, country: value, phoneCode: code }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        if (!formData.name || !formData.email || !formData.phone) {
            setError("Please fill all required fields");
            setIsSubmitting(false);
            return;
        }

        try {
            const fullPhone = `${formData.phoneCode}${formData.phone}`;
            const response = await fetch("/api/leads", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: fullPhone,
                    country: formData.country,
                    message: `Treatment: ${formData.treatment || "Not specified"}\nMessage: ${formData.message || "No message"}`,
                    source: "contact form",
                    locale: locale,
                    timestamp: new Date().toISOString(),
                }),
            });

            if (response.ok) {
                setIsSuccess(true);
                setFormData({
                    name: "",
                    email: "",
                    phoneCode: "+91",
                    phone: "",
                    country: "",
                    treatment: "",
                    message: ""
                });
                setTimeout(() => {
                    setIsSuccess(false);
                }, 3000);
            } else {
                const data = await response.json();
                setError(data.error || "Failed to submit. Please try again.");
            }
        } catch (err) {
            console.error("Form submission error:", err);
            setError("Failed to submit. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const phoneNumber = "+91-9958800961";
    const whatsappNumber = "919958800961";
    const email = "care@panaceamedcare.com";
    const whatsappMessage = encodeURIComponent(
        tCTA("whatsappMessage") || "Hello, I need medical assistance from Panacea Medcare"
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="contact"
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 xl:max-w-7xl sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                <div className="max-w-5xl mx-auto">
                    <h2 className={`text-3xl md:text-4xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("heading")}
                    </h2>
                    <p className={`text-lg text-gray-700 mb-12 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("intro")}
                    </p>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-white p-6 rounded-xl border-2 border-[#066F89]/30 shadow-lg">
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {error && (
                                    <div className="bg-[#FF6B35]/10 text-[#FF6B35] p-3 rounded-lg text-sm border-2 border-[#FF6B35]/30">
                                        {error}
                                    </div>
                                )}

                                {isSuccess && (
                                    <div className="bg-[#0BA35A]/10 text-[#0BA35A] p-4 rounded-lg text-center border-2 border-[#0BA35A]/30">
                                        <p className="font-semibold">Thank you! We&apos;ll contact you soon.</p>
                                    </div>
                                )}
                                <div>
                                    <label className={`block text-sm font-medium text-panacea-dark mb-2 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("form.name")} <span className="text-[#FF6B35]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={`w-full px-4 py-3 border-2 border-panacea-primary/30 rounded-lg focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary transition-all ${isRTL ? "text-right" : "text-left"}`}
                                        dir={isRTL ? "rtl" : "ltr"}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium text-panacea-dark mb-2 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("form.email")} <span className="text-[#FF6B35]">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={`w-full px-4 py-3 border-2 border-panacea-primary/30 rounded-lg focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary transition-all ${isRTL ? "text-right" : "text-left"}`}
                                        dir="ltr"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium text-panacea-dark mb-2 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("form.phone")} <span className="text-[#FF6B35]">*</span>
                                    </label>
                                    <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <PhoneCodeCombobox
                                            value={formData.phoneCode}
                                            onValueChange={(value) => setFormData({ ...formData, phoneCode: value })}
                                        />
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="9999999999"
                                            className={`flex-1 px-4 py-3 border-2 border-panacea-primary/30 rounded-lg focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary transition-all ${isRTL ? "text-right" : "text-left"}`}
                                            dir="ltr"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium text-panacea-dark mb-2 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("form.country")}
                                    </label>
                                    <CountryCombobox
                                        value={formData.country}
                                        onValueChange={onCountryChange}
                                        placeholder="Select Country"
                                        className={isRTL ? 'text-right' : 'text-left'}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium text-panacea-dark mb-2 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("form.treatment")}
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.treatment}
                                        onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                                        className={`w-full px-4 py-3 border-2 border-panacea-primary/30 rounded-lg focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary transition-all ${isRTL ? "text-right" : "text-left"}`}
                                        dir={isRTL ? "rtl" : "ltr"}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium text-panacea-dark mb-2 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("form.message")}
                                    </label>
                                    <textarea
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className={`w-full px-4 py-3 border-2 border-panacea-primary/30 rounded-lg focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary transition-all resize-none ${isRTL ? "text-right" : "text-left"}`}
                                        dir={isRTL ? "rtl" : "ltr"}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || isSuccess}
                                    className="w-full bg-gradient-to-r from-[#066F89] via-[#066F89] to-[#FF6B35] hover:from-[#05596D] hover:via-[#066F89] hover:to-[#FF6B35] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <FaSpinner className="w-5 h-5 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        t("form.submit")
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-6">
                            {/* Phone Card */}
                            <a
                                href={`tel:${phoneNumber.replace(/-/g, "")}`}
                                className={`bg-panacea-light p-6 rounded-lg hover:shadow-lg transition-all group ${isRTL ? "text-right" : "text-left"}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-panacea-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                                        <FaPhone className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-panacea-primary mb-1">{tCTA("phoneLabel") || "Call Us Now"}</h3>
                                        <p className="text-lg font-semibold text-gray-700 mb-1" dir="ltr">{phoneNumber}</p>
                                        <p className="text-sm text-gray-600">{tCTA("phoneSubtext") || "24/7 Available"}</p>
                                    </div>
                                </div>
                            </a>

                            {/* WhatsApp Card */}
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`bg-green-50 border-2 border-green-200 p-6 rounded-lg hover:shadow-lg transition-all group ${isRTL ? "text-right" : "text-left"}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                                        <FaWhatsapp className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-green-700 mb-1">{tCTA("whatsappLabel") || "WhatsApp Us"}</h3>
                                        <p className="text-sm text-green-600 mb-1">{tCTA("whatsappSubtext") || "Instant Response"}</p>
                                        <span className="inline-block px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold mt-2">
                                            {tCTA("whatsappBadge") || "Click to Chat"}
                                        </span>
                                    </div>
                                </div>
                            </a>

                            {/* Email Card */}
                            <a
                                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=Inquiry from Panacea Medcare Website&body=Hello, I would like to know more about your services.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`bg-panacea-light p-6 rounded-lg hover:shadow-lg transition-all group ${isRTL ? "text-right" : "text-left"}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-panacea-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                                        <FaEnvelope className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-panacea-primary mb-1">{tCTA("emailLabel") || "Email Us"}</h3>
                                        <p className="text-sm font-semibold text-gray-700 mb-1 break-all" dir="ltr">{email}</p>
                                        <p className="text-sm text-gray-600">{tCTA("emailSubtext") || "We'll respond quickly"}</p>
                                    </div>
                                </div>
                            </a>

                            {/* Teleconsultation Card */}
                            <Link
                                href={`/${locale}/services/teleconsultation`}
                                className={`bg-panacea-light p-6 rounded-lg hover:shadow-lg transition-all group ${isRTL ? "text-right" : "text-left"}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-panacea-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                                        <FaClock className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-panacea-primary mb-1">{tCTA("teleconsultLabel") || "Free Teleconsultation"}</h3>
                                        <p className="text-sm font-semibold text-panacea-accent mb-1">{tCTA("teleconsultSubtext") || "Book Today"}</p>
                                        <p className="text-sm text-gray-600">{tCTA("teleconsultDesc") || "Expert doctors available"}</p>
                                    </div>
                                </div>
                            </Link>

                            {/* Urgency Banner */}
                            <div className="bg-panacea-gradient p-6 rounded-lg text-white">
                                <h3 className="text-xl font-bold mb-2">{tCTA("urgencyTitle") || "Get a Free Teleconsultation Today!"}</h3>
                                <p className="text-white/90 mb-4">{tCTA("urgencyDesc") || "Don't wait - speak with our medical experts now and get personalized treatment recommendations."}</p>
                                <div className="flex flex-wrap gap-3">
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                                    >
                                        <FaWhatsapp className="w-5 h-5" />
                                        <span>{tCTA("whatsappButton") || "WhatsApp Now"}</span>
                                    </a>
                                    <a
                                        href={`tel:${phoneNumber.replace(/-/g, "")}`}
                                        className="px-6 py-2 bg-white hover:bg-gray-100 text-panacea-primary rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                                    >
                                        <FaPhone className="w-5 h-5" />
                                        <span>{tCTA("callButton") || "Call Now"}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
