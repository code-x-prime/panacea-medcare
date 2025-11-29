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

export default function QuoteForm({ trigger, className }) {
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
    { value: "india", label: t("countries.india") },
    { value: "turkey", label: t("countries.turkey") },
    { value: "thailand", label: t("countries.thailand") },
    { value: "germany", label: t("countries.germany") },
  ];

  const phoneCodes = [
    { value: "+91", label: "+91 (India)" },
    { value: "+90", label: "+90 (Turkey)" },
    { value: "+66", label: "+66 (Thailand)" },
    { value: "+49", label: "+49 (Germany)" },
    { value: "+1", label: "+1 (USA)" },
    { value: "+44", label: "+44 (UK)" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would send the data to your API
    alert(t("submitSuccess"));
    setOpen(false);
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
    <Button className="bg-panacea-primary hover:bg-panacea-primary/90 text-white">
      <FaCalendarCheck className="w-4 h-4 mr-2" />
      {t("getQuote")}
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent
        className={`sm:max-w-[600px] max-h-[90vh] overflow-y-auto ${isRTL ? "rtl" : "ltr"}`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {t("title")}
          </DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Patient Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("patientName")}
            </label>
            <Input
              type="text"
              placeholder={t("patientNamePlaceholder")}
              value={formData.patientName}
              onChange={(e) =>
                setFormData({ ...formData, patientName: e.target.value })
              }
              required
              className="w-full"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("country")}
            </label>
            <Select
              value={formData.country}
              onValueChange={(value) =>
                setFormData({ ...formData, country: value })
              }
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("selectCountry")} />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("city")}
            </label>
            <Input
              type="text"
              placeholder={t("selectCity")}
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              required
              className="w-full"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("phoneNumber")}
            </label>
            <div className="flex gap-2">
              <Select
                value={formData.phoneCode}
                onValueChange={(value) =>
                  setFormData({ ...formData, phoneCode: value })
                }
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
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
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                required
                className="flex-1"
              />
            </div>
          </div>

          {/* Medical Problem */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("medicalProblem")}
            </label>
            <textarea
              placeholder={t("medicalProblemPlaceholder")}
              value={formData.medicalProblem}
              onChange={(e) =>
                setFormData({ ...formData, medicalProblem: e.target.value })
              }
              required
              rows={4}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Age or DOB */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("ageOrDob")}
            </label>
            <Input
              type="text"
              placeholder={t("ageOrDobPlaceholder")}
              value={formData.ageOrDob}
              onChange={(e) =>
                setFormData({ ...formData, ageOrDob: e.target.value })
              }
              required
              className="w-full"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-panacea-accent hover:bg-panacea-accent/90 text-white py-6 text-lg font-bold"
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
        </form>
      </DialogContent>
    </Dialog>
  );
}



