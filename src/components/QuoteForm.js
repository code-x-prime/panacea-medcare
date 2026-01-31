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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FaCalendarCheck, FaSpinner, FaCheckCircle } from "react-icons/fa";
import { COUNTRIES } from "@/lib/countries";

export default function QuoteForm({ trigger, className, embedded = false }) {
  const t = useTranslations("quoteForm");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    patientName: "",
    country: "",
    city: "",
    phoneCode: "+91",
    phoneNumber: "",
    whatsappCode: "+91",
    whatsappNumber: "",
    medicalProblem: "",
  });

  const countries = COUNTRIES.map((c) => ({ ...c, label: t(c.value) || c.label }));
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

    // Validate required fields
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
        }, 3000);
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
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t("patientName")}
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

        {/* Country – selecting a country auto-sets phone code (e.g. Nigeria → +234) */}
        <div>
          <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t("country")}
          </label>
          <Select
            value={formData.country}
            onValueChange={onCountryChange}
            required
          >
            <SelectTrigger className={`w-full bg-white border-2 border-[#066F89]/40 focus:border-[#FF6B35] ${isRTL ? 'text-right' : 'text-left'} shadow-sm`}>
              <SelectValue placeholder={t("selectCountry")} />
            </SelectTrigger>
            <SelectContent className="bg-white max-h-[280px]">
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label} ({country.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* City */}
        <div>
          <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
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
          <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t("phoneNumber")}
          </label>
          <div className={`flex gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Select
              value={formData.phoneCode}
              onValueChange={(value) => setFormData({ ...formData, phoneCode: value })}
            >
              <SelectTrigger className="w-24 bg-white border-2 border-[#066F89]/40 focus:border-[#FF6B35] shadow-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white max-h-[200px]">
                {phoneCodes.map((code, index) => (
                  <SelectItem key={`phone-${index}`} value={code.value}>
                    {code.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
        <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
          {t("whatsappNumber")} <span className="text-[#FF6B35]">*</span>
        </label>
        <div className={`flex gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Select
            value={formData.whatsappCode}
            onValueChange={(value) => setFormData({ ...formData, whatsappCode: value })}
          >
            <SelectTrigger className="w-24 bg-white border-2 border-[#066F89]/40 focus:border-[#FF6B35] shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white max-h-[200px]">
              {phoneCodes.map((code, index) => (
                <SelectItem key={`whatsapp-${index}`} value={code.value}>
                  {code.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
        <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
          {t("medicalProblem")}
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

      {/* Success Message */}
      {isSuccess && (
        <div className="bg-[#0BA35A]/10 text-[#0BA35A] p-4 rounded-lg text-center border-2 border-[#0BA35A]/30">
          <FaCheckCircle className="w-8 h-8 mx-auto mb-2 text-[#0BA35A]" />
          <p className="font-semibold">{t("submitSuccess") || "Request submitted successfully!"}</p>
          <p className="text-sm mt-1">{t("successMessage") || "We will contact you shortly."}</p>
        </div>
      )}

      {/* Submit Button */}
      {!isSuccess && (
        <Button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-gradient-to-r from-[#066F89] via-[#066F89] to-[#FF6B35] hover:from-[#05596D] hover:via-[#066F89] hover:to-[#FF6B35] text-white shadow-lg hover:shadow-xl transition-all ${embedded ? 'py-5 text-base' : 'py-6 text-lg'} font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
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
      <p className="text-xs text-gray-500 text-center">
        {t("termsText")}{" "}
        <a href="/terms" className="text-[#066F89] hover:text-[#05596D] transition-colors font-semibold">
          {t("termsOfUse")}
        </a>{" "}
        {t("and")}{" "}
        <a href="/privacy" className="text-[#066F89] hover:text-[#05596D] transition-colors font-semibold">
          {t("privacyPolicy")}
        </a>{" "}
        {t("ofPanacea")}
      </p>
    </>
  );

  // Embedded form (no dialog)
  if (embedded) {
    return (
      <div dir={isRTL ? "rtl" : "ltr"} className="bg-white p-6 rounded-xl border-2 border-[#066F89]/30 shadow-lg">
        <div className="mb-4">
          <h3 className={`text-xl font-bold bg-gradient-to-r from-[#066F89] to-[#FF6B35] bg-clip-text text-transparent ${isRTL ? 'text-right' : 'text-left'}`}>
            {t("title")}
          </h3>
          <p className={`text-sm text-gray-600 mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>{t("description")}</p>
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
        <form onSubmit={handleSubmit} className="space-y-3 mt-2">
          {formFieldsContent}
        </form>
      </DialogContent>
    </Dialog>
  );
}


