"use client";
import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { FaFileUpload, FaCheckCircle, FaSpinner } from "react-icons/fa";

export default function AIPreScreeningForm({ locale }) {
    const t = useTranslations("aiPrescreening");
    const isRTL = locale === "ar";
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        patientName: "",
        country: "",
        phone: "",
        email: "",
        medicalConcern: "",
        symptoms: "",
        duration: "",
        history: "",
        preferredCountry: "India",
        consent: false,
    });
    const [files, setFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const validFiles = newFiles.filter(file => {
                if (file.size > 25 * 1024 * 1024) { // 25MB limit
                    alert(`File ${file.name} is too large. Max size is 25MB.`);
                    return false;
                }
                return true;
            });
            setFiles((prev) => [...prev, ...validFiles]);
        }
    };

    const removeFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const validateStep = (currentStep) => {
        if (currentStep === 1) {
            if (!formData.patientName || !formData.phone || !formData.email || !formData.country) return false;
        }
        if (currentStep === 2) {
            if (!formData.medicalConcern || !formData.symptoms) return false;
        }
        if (currentStep === 4) {
            if (!formData.consent) return false;
        }
        return true;
    };

    const nextStep = () => {
        if (validateStep(step)) {
            setStep((prev) => prev + 1);
            setError("");
        } else {
            setError(t("errorRequired"));
        }
    };

    const prevStep = () => setStep((prev) => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep(4)) {
            setError(t("errorConsent"));
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });
            files.forEach((file) => {
                data.append("files", file);
            });
            data.append("locale", locale);

            const response = await fetch("/api/prescreen", {
                method: "POST",
                body: data,
            });

            const result = await response.json();

            if (result.success) {
                setIsSuccess(true);
                setStep(5); // Success Step
            } else {
                setError(result.error || t("errorSubmit"));
            }
        } catch (err) {
            setError(t("errorNetwork"));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-2xl mx-auto border-t-4 border-[#0BA35A]" dir={isRTL ? "rtl" : "ltr"}>
                <FaCheckCircle className="w-16 h-16 text-[#0BA35A] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#003459] mb-2">{t("success.title")}</h3>
                <p className="text-[#6D7A8A] mb-6 whitespace-pre-line">
                    {t("success.message", { name: formData.patientName })}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2.5 bg-[#F5F7FA] hover:bg-gray-200 text-[#066F89] rounded-lg font-medium transition-colors border border-[#066F89]/30"
                >
                    {t("success.submitAnother")}
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-3xl mx-auto border border-gray-100" dir={isRTL ? "rtl" : "ltr"}>
            {/* Progress Bar */}
            <div className="bg-[#F5F7FA] px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-2">
                <span className="text-sm font-semibold text-[#066F89] uppercase tracking-wider">
                    {t("stepOf", { current: step })}
                </span>
                <span className="text-xs text-[#6D7A8A]">{t("takesAbout")}</span>
                <div className="h-2 flex-1 min-w-[120px] max-w-[200px] bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-[#066F89] to-[#FF6B35] transition-all duration-300"
                        style={{ width: `${(step / 4) * 100}%` }}
                    />
                </div>
            </div>

            <div className="p-6 md:p-8">
                {error && (
                    <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <div className="space-y-5">
                            <h3 className="text-xl font-bold text-[#003459] mb-4">{t("step1.title")}</h3>
                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-[#6D7A8A] mb-1">{t("step1.fullName")}</label>
                                    <input
                                        type="text"
                                        name="patientName"
                                        value={formData.patientName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#066F89]/30 focus:border-[#066F89] outline-none transition-all"
                                        placeholder={t("step1.fullNamePlaceholder")}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#6D7A8A] mb-1">{t("step1.country")}</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#066F89]/30 focus:border-[#066F89] outline-none transition-all"
                                        placeholder={t("step1.countryPlaceholder")}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#6D7A8A] mb-1">{t("step1.whatsapp")}</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#066F89]/30 focus:border-[#066F89] outline-none transition-all"
                                        placeholder={t("step1.whatsappPlaceholder")}
                                    />
                                    <p className="text-xs text-[#6D7A8A] mt-1">{t("step1.whatsappHint")}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#6D7A8A] mb-1">{t("step1.email")}</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#066F89]/30 focus:border-[#066F89] outline-none transition-all"
                                        placeholder={t("step1.emailPlaceholder")}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-5">
                            <h3 className="text-xl font-bold text-[#003459] mb-4">{t("step2.title")}</h3>
                            <div>
                                <label className="block text-sm font-medium text-[#6D7A8A] mb-1">{t("step2.concern")}</label>
                                <select
                                    name="medicalConcern"
                                    value={formData.medicalConcern}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#066F89]/30 focus:border-[#066F89] outline-none transition-all bg-white"
                                >
                                    <option value="">{t("step2.concernPlaceholder")}</option>
                                    <option value="Oncology (Cancer)">{t("step2.concerns.oncology")}</option>
                                    <option value="Cardiology (Heart)">{t("step2.concerns.cardiology")}</option>
                                    <option value="Neurology">{t("step2.concerns.neuro")}</option>
                                    <option value="Orthopedics">{t("step2.concerns.ortho")}</option>
                                    <option value="Transplant">{t("step2.concerns.transplant")}</option>
                                    <option value="IVF & Fertility">{t("step2.concerns.ivf")}</option>
                                    <option value="Other">{t("step2.concerns.other")}</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#6D7A8A] mb-1">{t("step2.symptoms")}</label>
                                <textarea
                                    name="symptoms"
                                    value={formData.symptoms}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#066F89]/30 focus:border-[#066F89] outline-none transition-all"
                                    placeholder={t("step2.symptomsPlaceholder")}
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-[#6D7A8A] mb-1">{t("step2.duration")}</label>
                                    <select
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#066F89]/30 focus:border-[#066F89] outline-none transition-all bg-white"
                                    >
                                        <option value="">{t("step2.durationPlaceholder")}</option>
                                        <option value="Less than 1 month">{t("step2.durations.lt1")}</option>
                                        <option value="1-3 months">{t("step2.durations.1to3")}</option>
                                        <option value="3-6 months">{t("step2.durations.3to6")}</option>
                                        <option value="More than 6 months">{t("step2.durations.gt6")}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#6D7A8A] mb-1">{t("step2.preferredCountry")}</label>
                                    <select
                                        name="preferredCountry"
                                        value={formData.preferredCountry}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#066F89]/30 focus:border-[#066F89] outline-none transition-all bg-white"
                                    >
                                        <option value="India">{t("step2.countries.india")}</option>
                                        <option value="Turkey">{t("step2.countries.turkey")}</option>
                                        <option value="Thailand">{t("step2.countries.thailand")}</option>
                                        <option value="UAE">{t("step2.countries.uae")}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-5">
                            <h3 className="text-xl font-bold text-[#003459] mb-4">{t("step3.title")}</h3>
                            <div
                                className="border-2 border-dashed border-[#066F89]/40 rounded-xl p-8 text-center bg-[#066F89]/5 hover:bg-[#066F89]/10 transition-colors cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <FaFileUpload className="w-12 h-12 text-[#066F89] mx-auto mb-3" />
                                <p className="font-semibold text-[#003459]">{t("step3.clickToUpload")}</p>
                                <p className="text-sm text-[#6D7A8A] mt-1">{t("step3.formats")}</p>
                                <input
                                    type="file"
                                    multiple
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                />
                            </div>
                            {files.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-[#6D7A8A]">{t("step3.selectedFiles")}</p>
                                    {files.map((file, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-[#F5F7FA] px-3 py-2 rounded-lg border border-gray-200">
                                            <span className="text-sm text-[#003459] truncate max-w-xs">{file.name}</span>
                                            <button type="button" onClick={() => removeFile(idx)} className="text-red-500 hover:text-red-700 text-sm font-medium">
                                                {t("step3.remove")}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="bg-[#FFD166]/20 p-4 rounded-lg border border-[#FFD166]/50 text-sm text-[#003459]">
                                💡 {t("step3.tip")}
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-5">
                            <h3 className="text-xl font-bold text-[#003459] mb-4">{t("step4.title")}</h3>
                            <div className="bg-[#F5F7FA] p-4 rounded-lg border border-gray-200 space-y-2 text-sm text-[#6D7A8A]">
                                <p><strong className="text-[#003459]">{t("step4.name")}</strong> {formData.patientName}</p>
                                <p><strong className="text-[#003459]">{t("step4.concern")}</strong> {formData.medicalConcern}</p>
                                <p><strong className="text-[#003459]">{t("step4.files")}</strong> {t("step4.filesCount", { count: files.length })}</p>
                            </div>
                            <div className="space-y-3">
                                <label
                                    htmlFor="ai-prescreen-consent"
                                    className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border-2 border-gray-200 hover:border-[#066F89]/40 transition-colors has-[:checked]:border-[#066F89] has-[:checked]:bg-[#066F89]/5"
                                >
                                    <input
                                        id="ai-prescreen-consent"
                                        type="checkbox"
                                        name="consent"
                                        checked={formData.consent}
                                        onChange={handleInputChange}
                                        className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-[#066F89] focus:ring-2 focus:ring-[#066F89]/30 focus:ring-offset-0 accent-[#066F89] cursor-pointer"
                                    />
                                    <span className="text-sm text-[#6D7A8A]">
                                        {t("step4.consentLabel")}
                                    </span>
                                </label>
                            </div>
                        </div>
                    )}

                    <div className={`flex pt-6 mt-6 border-t border-gray-100 gap-4 ${isRTL ? "flex-row-reverse" : "justify-between"}`}>
                        {step > 1 ? (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-6 py-2.5 bg-white border-2 border-gray-200 text-[#003459] font-medium rounded-lg hover:bg-[#F5F7FA] hover:border-[#066F89]/30 transition-colors"
                                disabled={isSubmitting}
                            >
                                {t("nav.back")}
                            </button>
                        ) : (
                            <div />
                        )}
                        {step < 4 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="px-8 py-2.5 bg-[#066F89] hover:bg-[#05596D] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
                            >
                                {t("nav.next")}
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-2.5 bg-[#0BA35A] hover:bg-[#088248] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <FaSpinner className="animate-spin" /> {t("nav.processing")}
                                    </>
                                ) : (
                                    t("nav.submit")
                                )}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
