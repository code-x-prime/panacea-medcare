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
import { FaCalendarCheck } from "react-icons/fa";

export default function QuoteForm({ trigger, className, embedded = false }) {
  const t = useTranslations("quoteForm");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    country: "",
    city: "",
    phoneCode: "+91",
    phoneNumber: "",
    medicalProblem: "",
    ageOrDob: "",
  });

  const countries = [
    { value: "afghanistan", label: "afghanistan", code: "+93" },
    { value: "albania", label: "albania", code: "+355" },
    { value: "algeria", label: "algeria", code: "+213" },
    { value: "argentina", label: "argentina", code: "+54" },
    { value: "australia", label: "australia", code: "+61" },
    { value: "austria", label: "austria", code: "+43" },
    { value: "bahrain", label: "bahrain", code: "+973" },
    { value: "bangladesh", label: "bangladesh", code: "+880" },
    { value: "belgium", label: "belgium", code: "+32" },
    { value: "brazil", label: "brazil", code: "+55" },
    { value: "canada", label: "canada", code: "+1" },
    { value: "china", label: "china", code: "+86" },
    { value: "denmark", label: "denmark", code: "+45" },
    { value: "egypt", label: "egypt", code: "+20" },
    { value: "france", label: "france", code: "+33" },
    { value: "germany", label: "germany", code: "+49" },
    { value: "greece", label: "greece", code: "+30" },
    { value: "india", label: "india", code: "+91" },
    { value: "indonesia", label: "indonesia", code: "+62" },
    { value: "iran", label: "iran", code: "+98" },
    { value: "iraq", label: "iraq", code: "+964" },
    { value: "ireland", label: "ireland", code: "+353" },
    { value: "israel", label: "israel", code: "+972" },
    { value: "italy", label: "italy", code: "+39" },
    { value: "japan", label: "japan", code: "+81" },
    { value: "jordan", label: "jordan", code: "+962" },
    { value: "kenya", label: "kenya", code: "+254" },
    { value: "kuwait", label: "kuwait", code: "+965" },
    { value: "lebanon", label: "lebanon", code: "+961" },
    { value: "malaysia", label: "malaysia", code: "+60" },
    { value: "mexico", label: "mexico", code: "+52" },
    { value: "morocco", label: "morocco", code: "+212" },
    { value: "netherlands", label: "netherlands", code: "+31" },
    { value: "newzealand", label: "newzealand", code: "+64" },
    { value: "nigeria", label: "nigeria", code: "+234" },
    { value: "norway", label: "norway", code: "+47" },
    { value: "oman", label: "oman", code: "+968" },
    { value: "pakistan", label: "pakistan", code: "+92" },
    { value: "philippines", label: "philippines", code: "+63" },
    { value: "poland", label: "poland", code: "+48" },
    { value: "portugal", label: "portugal", code: "+351" },
    { value: "qatar", label: "qatar", code: "+974" },
    { value: "russia", label: "russia", code: "+7" },
    { value: "saudiarabia", label: "saudiarabia", code: "+966" },
    { value: "singapore", label: "singapore", code: "+65" },
    { value: "southafrica", label: "southafrica", code: "+27" },
    { value: "southkorea", label: "southkorea", code: "+82" },
    { value: "spain", label: "spain", code: "+34" },
    { value: "srilanka", label: "srilanka", code: "+94" },
    { value: "sweden", label: "sweden", code: "+46" },
    { value: "switzerland", label: "switzerland", code: "+41" },
    { value: "thailand", label: "thailand", code: "+66" },
    { value: "turkey", label: "turkey", code: "+90" },
    { value: "uae", label: "uae", code: "+971" },
    { value: "uk", label: "uk", code: "+44" },
    { value: "usa", label: "usa", code: "+1" },
    { value: "vietnam", label: "vietnam", code: "+84" },
  ];

  const phoneCodes = countries.map(country => ({
    value: country.code,
    label: `${country.code} (${country.label})`
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(t("submitSuccess"));
    if (!embedded) {
      setOpen(false);
    }
    setFormData({
      patientName: "",
      country: "",
      city: "",
      phoneCode: "+91",
      phoneNumber: "",
      medicalProblem: "",
      ageOrDob: "",
    });
  };

  const defaultTrigger = (
    <Button className={`bg-panacea-primary hover:bg-panacea-primary/90 text-white ${isRTL ? 'flex-row-reverse' : ''}`}>
      <FaCalendarCheck className={isRTL ? "w-4 h-4 ml-2" : "w-4 h-4 mr-2"} />
      {t("getQuote")}
    </Button>
  );

  const FormFields = () => (
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
            className={`w-full bg-white ${isRTL ? 'text-right' : 'text-left'}`}
          />
        </div>

        {/* Country */}
        <div>
          <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t("country")}
          </label>
          <Select
            value={formData.country}
            onValueChange={(value) => setFormData({ ...formData, country: value })}
            required
          >
            <SelectTrigger className={`w-full bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
              <SelectValue placeholder={t("selectCountry")} />
            </SelectTrigger>
            <SelectContent className="bg-white max-h-[150px]">
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
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
            className={`w-full bg-white ${isRTL ? 'text-right' : 'text-left'}`}
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
              <SelectTrigger className="w-24 bg-white">
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
            <Input
              type="tel"
              placeholder={t("phonePlaceholder")}
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              required
              className={`flex-1 bg-white ${isRTL ? 'text-right' : 'text-left'}`}
            />
          </div>
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
          rows={embedded ? 3 : 4}
          className={`flex min-h-[60px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${isRTL ? 'text-right' : 'text-left'}`}
        />
      </div>

      {/* Age or DOB */}
      <div>
        <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
          {t("ageOrDob")}
        </label>
        <Input
          type="text"
          placeholder={t("ageOrDobPlaceholder")}
          value={formData.ageOrDob}
          onChange={(e) => setFormData({ ...formData, ageOrDob: e.target.value })}
          required
          className={`w-full bg-white ${isRTL ? 'text-right' : 'text-left'}`}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className={`w-full bg-panacea-accent hover:bg-panacea-accent/90 text-white ${embedded ? 'py-5 text-base' : 'py-6 text-lg'} font-bold`}
      >
        {t("submitButton")}
      </Button>

      {/* Terms */}
      <p className="text-xs text-gray-500 text-center">
        {t("termsText")}{" "}
        <a href="/terms" className="text-panacea-primary hover:underline">
          {t("termsOfUse")}
        </a>{" "}
        {t("and")}{" "}
        <a href="/privacy" className="text-panacea-primary hover:underline">
          {t("privacyPolicy")}
        </a>{" "}
        {t("ofPanacea")}
      </p>
    </>
  );

  // Embedded form (no dialog)
  if (embedded) {
    return (
      <div dir={isRTL ? "rtl" : "ltr"}>
        <div className="mb-4">
          <h3 className={`text-xl font-bold text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t("title")}
          </h3>
          <p className={`text-sm text-gray-600 mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>{t("description")}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <FormFields />
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
        className={`sm:mix-w-[500px] max-h-[95vh] overflow-y-auto ${isRTL ? "rtl" : "ltr"}`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-sm">{t("description")}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3 mt-2">
          <FormFields />
        </form>
      </DialogContent>
    </Dialog>
  );
}


