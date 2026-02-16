"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaCalendarCheck, FaSpinner, FaCheckCircle } from "react-icons/fa";
import { COUNTRIES } from "@/lib/countries";
import { CountryCombobox } from "@/components/ui/country-combobox";
import { PhoneCodeCombobox } from "@/components/ui/phone-code-combobox";

export default function QuoteForm({ trigger, embedded = false, variant = "default" }) {
  // variant can be "default" or "hospital"
  const isHospitalVariant = variant === "hospital";
  const t = useTranslations("quoteForm");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    country: "",
    city: "",
    phoneCode: "+91",
    phoneNumber: "",
    whatsappCode: "+91",
    whatsappNumber: "",
    medicalProblem: "",
  });

  const countries = COUNTRIES;
  const phoneCodes = countries.map((country) => ({
    value: country.code,
    label: `${country.code} (${country.label})`,
  }));

  const onCountryChange = (value) => {
    const country = COUNTRIES.find((c) => c.value === value);
    const code = country?.code ?? formData.phoneCode;
    setFormData((prev) => ({
      ...prev,
      country: value,
      phoneCode: code,
      whatsappCode: code,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Validate required fields (email optional)
    if (!formData.patientName || !formData.phoneNumber || !formData.whatsappNumber || !formData.medicalProblem) {
      setError(t("fillRequiredFields") || "Please fill all required fields including WhatsApp number");
      setIsSubmitting(false);
      return;
    }

    try {
      const fullPhone = `${formData.phoneCode}${formData.phoneNumber}`;
      const fullWhatsapp = formData.whatsappNumber ? `${formData.whatsappCode}${formData.whatsappNumber}` : "";

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.patientName,
          email: formData.email,
          phone: fullPhone,
          country: formData.country,
          message: `City: ${formData.city}\nPhone Code: ${formData.phoneCode}\nWhatsApp Code: ${formData.whatsappCode}\nWhatsApp: ${fullWhatsapp}\nMedical Problem: ${formData.medicalProblem}`,
          source: "quote form",
          locale: locale,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        // Track conversion
        if (typeof window !== 'undefined' && window.gtag_report_conversion) {
          window.gtag_report_conversion();
        }

        setFormData({
          patientName: "",
          email: "",
          country: "",
          city: "",
          phoneCode: "+91",
          phoneNumber: "",
          whatsappCode: "+91",
          whatsappNumber: "",
          medicalProblem: "",
        });

        // Auto close dialog after 3 seconds
        setTimeout(() => {
          setIsSuccess(false);
          if (!embedded) {
            setOpen(false);
          }
        }, 5000);
      } else {
        const data = await response.json();
        setError(data.error || t("submitError") || "Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setError(t("submitError") || "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultTrigger = (
    <Button className={`bg-gradient-to-r from-[#066F89] via-[#066F89] to-[#FF6B35] hover:from-[#05596D] hover:via-[#066F89] hover:to-[#FF6B35] text-white shadow-lg hover:shadow-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
      <FaCalendarCheck className={isRTL ? "w-4 h-4 ml-2" : "w-4 h-4 mr-2"} />
      {t("getQuote")}
    </Button>
  );

  const formFieldsContent = (
    <>
      {/* Patient Name */}
      <div className={isHospitalVariant ? "space-y-4" : "grid md:grid-cols-2 gap-4"}>
        <div>
          <label className={`block text-sm font-medium mb-1 ${isHospitalVariant ? 'text-white' : 'text-gray-700'} ${isRTL ? 'text-right' : 'text-left'}`}>
            {t("patientName")} <span className="text-[#FF6B35]">*</span>
          </label>
          <Input
            type="text"
            placeholder={t("patientNamePlaceholder")}
            value={formData.patientName}
            onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
            required
            className={`w-full bg-white border-2 border-[#066F89]/40 focus:border-[#FF6B35] focus:ring-2 focus:ring-[#066F89]/30 ${isRTL ? 'text-right' : 'text-left'} shadow-sm`}
          />
        </div>

        {/* Country – selecting a country auto-sets phone code */}
        <div>
          <label className={`block text-sm font-medium mb-1 ${isHospitalVariant ? 'text-white' : 'text-gray-700'} ${isRTL ? 'text-right' : 'text-left'}`}>
            {t("country")}
          </label>
          <CountryCombobox
            value={formData.country}
            onValueChange={onCountryChange}
            placeholder={t("selectCountry")}
            className={isRTL ? 'text-right' : 'text-left'}
          />
        </div>
      </div>

      <div className="grid gap-4">
        {/* Email Address - Optional */}
        <div>
          <label className={`block text-sm font-medium mb-1 ${isHospitalVariant ? 'text-white' : 'text-gray-700'} ${isRTL ? 'text-right' : 'text-left'}`}>
            {t("email") || "Email Address"}
          </label>
          <Input
            type="email"
            placeholder={t("emailPlaceholder") || "your@email.com"}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full bg-white border-2 border-[#066F89]/40 focus:border-[#FF6B35] focus:ring-2 focus:ring-[#066F89]/30 ${isRTL ? 'text-right' : 'text-left'} shadow-sm`}
          />
        </div>

        {/* City */}
        <div>
          <label className={`block text-sm font-medium mb-1 ${isHospitalVariant ? 'text-white' : 'text-gray-700'} ${isRTL ? 'text-right' : 'text-left'}`}>
            {t("city")}
          </label>
          <Input
            type="text"
            placeholder={t("selectCity")}
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
            className={`w-full bg-white border-2 border-[#066F89]/40 focus:border-[#FF6B35] focus:ring-2 focus:ring-[#066F89]/30 ${isRTL ? 'text-right' : 'text-left'} shadow-sm`}
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className={`block text-sm font-medium mb-1 ${isHospitalVariant ? 'text-white' : 'text-gray-700'} ${isRTL ? 'text-right' : 'text-left'}`}>
            {t("phoneNumber")} <span className="text-[#FF6B35]">*</span>
          </label>
          <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <PhoneCodeCombobox
              value={formData.phoneCode}
              onValueChange={(value) => setFormData({ ...formData, phoneCode: value })}
            />
            <Input
              type="tel"
              placeholder={t("phonePlaceholder")}
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              required
              className={`flex-1 bg-white border-2 border-[#066F89]/40 focus:border-[#FF6B35] focus:ring-2 focus:ring-[#066F89]/30 ${isRTL ? 'text-right' : 'text-left'} shadow-sm`}
            />
          </div>
        </div>
      </div>

      {/* WhatsApp Number */}
      <div>
        <label className={`block text-sm font-medium mb-1 ${isHospitalVariant ? 'text-white' : 'text-gray-700'} ${isRTL ? 'text-right' : 'text-left'}`}>
          {t("whatsappNumber")} <span className="text-[#FF6B35]">*</span>
        </label>
        <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <PhoneCodeCombobox
            value={formData.whatsappCode}
            onValueChange={(value) => setFormData({ ...formData, whatsappCode: value })}
          />
          <Input
            type="tel"
            placeholder={t("whatsappPlaceholder")}
            value={formData.whatsappNumber}
            onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
            required
            className={`flex-1 bg-white border-2 border-panacea-primary/30 focus:border-panacea-primary focus:ring-2 focus:ring-panacea-primary/20 ${isRTL ? 'text-right' : 'text-left'}`}
          />
        </div>
      </div>

      {/* Medical Problem */}
      <div>
        <label className={`block text-sm font-medium mb-1 ${isHospitalVariant ? 'text-white' : 'text-gray-700'} ${isRTL ? 'text-right' : 'text-left'}`}>
          {t("medicalProblem")} <span className="text-[#FF6B35]">*</span>
        </label>
        <textarea
          placeholder={t("medicalProblemPlaceholder")}
          value={formData.medicalProblem}
          onChange={(e) => setFormData({ ...formData, medicalProblem: e.target.value })}
          required
          disabled={isSubmitting || isSuccess}
          rows={embedded ? 3 : 4}
          className={`flex min-h-[60px] w-full rounded-md border-2 border-[#066F89]/40 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#066F89]/30 focus-visible:border-[#FF6B35] disabled:cursor-not-allowed disabled:opacity-50 ${isRTL ? 'text-right' : 'text-left'}`}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-[#FF6B35]/10 text-[#FF6B35] p-3 rounded-lg text-sm border-2 border-[#FF6B35]/30">
          {error}
        </div>
      )}

      {/* Success Message UI - Beautiful Full Height Overlay when Embedded, or standard when Dialog */}
      {isSuccess && (
        <div className={`bg-white/95 absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-6 ${embedded ? 'rounded-xl' : ''}`}>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
            <FaCheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{t("submitSuccess") || "Request Received!"}</h3>
          <p className="text-gray-600 mb-6 max-w-xs">{t("successMessage") || "We'll review your medical problem and send you a quote shortly."}</p>
          {!embedded && (
            <Button onClick={() => setOpen(false)} variant="outline" className="border-panacea-primary text-panacea-primary hover:bg-panacea-primary/5">
              Close
            </Button>
          )}
        </div>
      )}

      {/* Submit Button */}
      {!isSuccess && (
        <Button
          type="submit"
          disabled={isSubmitting}
          className={`w-full shadow-lg hover:shadow-xl transition-all ${embedded ? 'py-5 text-base' : 'py-6 text-lg'} font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${isHospitalVariant
            ? "bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
            : "bg-gradient-to-r from-[#066F89] via-[#066F89] to-[#FF6B35] hover:from-[#05596D] hover:via-[#066F89] hover:to-[#FF6B35] text-white"
            }`}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="w-5 h-5 animate-spin" />
              {t("submitting") || "Submitting..."}
            </>
          ) : (
            t("submitButton")
          )}
        </Button>
      )}

      {/* Terms */}
      <p className={`text-xs text-center ${isHospitalVariant ? 'text-white/90' : 'text-gray-500'}`}>
        {t("termsText")}{" "}
        <a href="/terms" className={`transition-colors font-semibold ${isHospitalVariant ? 'text-white hover:text-white/80' : 'text-[#066F89] hover:text-[#05596D]'}`}>
          {t("termsOfUse")}
        </a>{" "}
        {t("and")}{" "}
        <a href="/privacy" className={`transition-colors font-semibold ${isHospitalVariant ? 'text-white hover:text-white/80' : 'text-[#066F89] hover:text-[#05596D]'}`}>
          {t("privacyPolicy")}
        </a>{" "}
        {t("ofPanacea")}
      </p>
    </>
  );

  // Embedded form (no dialog)
  if (embedded) {
    return (
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className={`relative p-6 rounded-xl border-2 shadow-lg ${isHospitalVariant
          ? "bg-[#066F89] border-[#066F89]/50"
          : "bg-white border-[#066F89]/30"
          }`}
      >
        <div className="mb-4">
          <h3 className={`text-xl font-bold ${isHospitalVariant
            ? "text-white"
            : "bg-gradient-to-r from-[#066F89] to-[#FF6B35] bg-clip-text text-transparent"
            } ${isRTL ? 'text-right' : 'text-left'}`}>
            {t("title")}
          </h3>
          <p className={`text-sm mt-1 ${isHospitalVariant ? "text-white/90" : "text-gray-600"
            } ${isRTL ? 'text-right' : 'text-left'}`}>{t("description")}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          {formFieldsContent}
        </form>
      </div>
    );
  }

  // Dialog form (original)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent
        className={`sm:max-w-[500px] max-h-[95vh] overflow-y-auto bg-white border-2 border-[#066F89]/30 ${isRTL ? "rtl" : "ltr"}`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-[#066F89] to-[#FF6B35] bg-clip-text text-transparent">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">{t("description")}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3 mt-2 relative min-h-[400px]">
          {formFieldsContent}
        </form>
      </DialogContent>
    </Dialog>
  );
}


