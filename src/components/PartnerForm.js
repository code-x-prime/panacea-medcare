"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FaSpinner } from "react-icons/fa";
import { COUNTRIES } from "@/lib/countries";
import { CountryCombobox } from "@/components/ui/country-combobox";
import { PhoneCodeCombobox } from "@/components/ui/phone-code-combobox";

export default function PartnerForm({ locale }) {
    const t = useTranslations("partnerWithUs.form");
    const isRTL = locale === "ar";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneCode: "+91",
        phone: "",
        whatsappCode: "+91",
        whatsapp: "",
        country: "",
        areasOfInterest: "",
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
        setFormData((prev) => ({ ...prev, country: value, phoneCode: code, whatsappCode: code }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
        // Validation (email optional)
        if (!formData.name || !formData.phone) {
            setError(t("error") || "Please fill all required fields (name and phone)");
            setIsSubmitting(false);
            return;
        }

        try {
            const fullPhone = `${formData.phoneCode}${formData.phone}`;
            const fullWhatsapp = formData.whatsapp ? `${formData.whatsappCode}${formData.whatsapp}` : "";

            const response = await fetch("/api/leads", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: fullPhone,
                    whatsapp: fullWhatsapp,
                    country: formData.country,
                    message: `WhatsApp: ${fullWhatsapp}\nAreas of Interest: ${formData.areasOfInterest || "Not specified"}\nMessage: ${formData.message || "No message"}`,
                    source: "partner form",
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
                    whatsappCode: "+91",
                    whatsapp: "",
                    country: "",
                    areasOfInterest: "",
                    message: ""
                });
                setTimeout(() => {
                    setIsSuccess(false);
                }, 5000);
            } else {
                const data = await response.json();
                setError(data.error || t("error") || "Failed to submit. Please try again.");
            }
        } catch (err) {
            console.error("Form submission error:", err);
            setError(t("error") || "Failed to submit. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl border-2 border-panacea-primary/30 shadow-panacea-lg">
            <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                    <div className="bg-[#FF6B35]/10 text-[#FF6B35] p-3 rounded-lg text-sm border-2 border-[#FF6B35]/30">
                        {error}
                    </div>
                )}

                {isSuccess && (
                    <div className="bg-[#0BA35A]/10 text-[#0BA35A] p-4 rounded-lg text-center border-2 border-[#0BA35A]/30">
                        <p className="font-semibold">{t("success")}</p>
                    </div>
                )}

                {/* Name */}
                <div>
                    <label className={`block text-sm font-medium text-panacea-dark mb-2 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("name")} <span className="text-[#FF6B35]">*</span>
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

                {/* Email */}
                <div>
                    <label className={`block text-sm font-medium text-panacea-dark mb-2 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("email")} <span className="text-[#FF6B35]">*</span>
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

                {/* Phone */}
                <div>
                    <label className={`block text-sm font-medium text-panacea-dark mb-2 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("phone")} <span className="text-[#FF6B35]">*</span>
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

                {/* WhatsApp */}
                <div>
                    <label className={`block text-sm font-medium text-panacea-dark mb-2 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("whatsapp")}
                    </label>
                    <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <PhoneCodeCombobox
                            value={formData.whatsappCode}
                            onValueChange={(value) => setFormData({ ...formData, whatsappCode: value })}
                        />
                        <input
                            type="tel"
                            value={formData.whatsapp}
                            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                            placeholder="9999999999"
                            className={`flex-1 px-4 py-3 border-2 border-panacea-primary/30 rounded-lg focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary transition-all ${isRTL ? "text-right" : "text-left"}`}
                            dir="ltr"
                        />
                    </div>
                </div>

                {/* Country */}
                <div>
                    <label className={`block text-sm font-medium text-panacea-dark mb-2 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("country")}
                    </label>
                    <CountryCombobox
                        value={formData.country}
                        onValueChange={onCountryChange}
                        placeholder="Select Country"
                        className={isRTL ? 'text-right' : 'text-left'}
                    />
                </div>

                {/* Areas of Interest */}
                <div>
                    <label className={`block text-sm font-medium text-panacea-dark mb-2 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("areasOfInterest")}
                    </label>
                    <input
                        type="text"
                        value={formData.areasOfInterest}
                        onChange={(e) => setFormData({ ...formData, areasOfInterest: e.target.value })}
                        placeholder={t("areasPlaceholder")}
                        className={`w-full px-4 py-3 border-2 border-panacea-primary/30 rounded-lg focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary transition-all ${isRTL ? "text-right" : "text-left"}`}
                        dir={isRTL ? "rtl" : "ltr"}
                    />
                </div>

                {/* Message */}
                <div>
                    <label className={`block text-sm font-medium text-panacea-dark mb-2 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("message")}
                    </label>
                    <textarea
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`w-full px-4 py-3 border-2 border-panacea-primary/30 rounded-lg focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary transition-all resize-none ${isRTL ? "text-right" : "text-left"}`}
                        dir={isRTL ? "rtl" : "ltr"}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className="w-full bg-gradient-to-r from-[#066F89] via-[#066F89] to-[#FF6B35] hover:from-[#05596D] hover:via-[#066F89] hover:to-[#FF6B35] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <FaSpinner className="w-5 h-5 animate-spin" />
                            {t("sending")}
                        </>
                    ) : (
                        t("submit")
                    )}
                </button>
            </form>
        </div>
    );
}
