"use client";
import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { FaFileUpload, FaCheckCircle, FaSpinner, FaTimesCircle, FaFilePdf, FaFileImage, FaFileWord, FaChevronDown, FaSave } from "react-icons/fa";
import { COUNTRIES } from "@/lib/countries";
import { CountryCombobox } from "@/components/ui/country-combobox";
import { PhoneCodeCombobox } from "@/components/ui/phone-code-combobox";

const ACCEPTED_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

const MEDICAL_CONDITIONS = [
    "Diabetes", "Hypertension", "Heart Disease", "Asthma", "Thyroid", "Kidney Disease", "Liver Disease", "Arthritis", "Cancer History", "None"
];

const BUDGET_RANGES = [
    { value: "", label: "Select Budget Range" },
    { value: "Under $5,000", label: "Under $5,000" },
    { value: "$5,000 - $10,000", label: "$5,000 - $10,000" },
    { value: "$10,000 - $25,000", label: "$10,000 - $25,000" },
    { value: "$25,000 - $50,000", label: "$25,000 - $50,000" },
    { value: "Above $50,000", label: "Above $50,000" },
];

const ASSISTANCE_OPTIONS = ["Visa", "Travel Booking", "Accommodation", "Airport Pickup", "Interpreter", "Local Transport"];

const INDIAN_CITIES = ["Delhi NCR", "Mumbai", "Chennai", "Bangalore", "Hyderabad", "Kolkata", "Pune", "Other"];

// Local storage key for save/resume functionality
const STORAGE_KEY = "panacea_prescreening_draft";

export default function AIPreScreeningForm({ locale }) {
    const t = useTranslations("aiPrescreening");
    const isRTL = locale === "ar";
    // const phoneCodes = getPhoneCodes(); // Removed as using PhoneCodeCombobox
    const [step, setStep] = useState(1);

    const onCountryChange = (value) => {
        const country = COUNTRIES.find((c) => c.value === value);
        const code = country?.code ?? formData.phoneCode;
        setFormData((prev) => ({ ...prev, country: value, phoneCode: code }));
    };

    const [formData, setFormData] = useState({
        // Step 1: Patient Details
        patientName: "",
        gender: "",
        dob: "",
        country: "",
        city: "",
        nationality: "",
        phoneCode: "",
        phoneNumber: "",
        email: "",
        preferredComm: [],
        // Step 2: Medical Condition
        medicalConcern: "",
        specificDiagnosis: "",
        symptoms: "",
        duration: "",
        previousTreatment: "",
        treatmentDetails: "",
        currentMedications: "",
        allergies: "",
        existingConditions: [],
        // Step 3: Files handled separately
        // Step 4: Preferences & Consent
        preferredCountry: "India",
        preferredCity: "",
        budgetRange: "",
        travelReadiness: "",
        assistanceNeeded: [],
        consentData: false,
        consentDisclaimer: false,
    });

    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");
    const [refId, setRefId] = useState("");
    const [draftSaved, setDraftSaved] = useState(false);
    const [showResumeBanner, setShowResumeBanner] = useState(false);

    const fileInputRef = useRef(null);
    const formContainerRef = useRef(null);

    // Scroll to form top (not page top)
    const scrollToForm = () => {
        if (formContainerRef.current) {
            formContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    // Calculate age from DOB
    const calculateAge = (dob) => {
        if (!dob) return "";
        const today = new Date();
        const birth = new Date(dob);
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
        return age > 0 ? age : "";
    };

    // Load saved draft on component mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedDraft = localStorage.getItem(STORAGE_KEY);
            if (savedDraft) {
                try {
                    const { formData: savedFormData, step: savedStep, savedAt } = JSON.parse(savedDraft);
                    // Check if draft is less than 30 days old
                    const daysOld = (Date.now() - new Date(savedAt).getTime()) / (1000 * 60 * 60 * 24);
                    if (daysOld < 30) {
                        setShowResumeBanner(true);
                    } else {
                        // Clear old draft
                        localStorage.removeItem(STORAGE_KEY);
                    }
                } catch (error) {
                    console.error("Error loading saved draft:", error);
                    localStorage.removeItem(STORAGE_KEY);
                }
            }
        }
    }, []);

    // Auto-save form data to local storage
    useEffect(() => {
        if (typeof window !== "undefined" && !isSuccess) {
            // Don't save if form is empty or just initialized
            if (formData.patientName || formData.email || formData.medicalConcern) {
                const draftData = {
                    formData,
                    step,
                    savedAt: new Date().toISOString()
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(draftData));
                setDraftSaved(true);
                // Hide "Draft Saved" indicator after 2 seconds
                const timer = setTimeout(() => setDraftSaved(false), 2000);
                return () => clearTimeout(timer);
            }
        }
    }, [formData, step, isSuccess]);

    // Function to resume from saved draft
    const resumeDraft = () => {
        if (typeof window !== "undefined") {
            const savedDraft = localStorage.getItem(STORAGE_KEY);
            if (savedDraft) {
                try {
                    const { formData: savedFormData, step: savedStep } = JSON.parse(savedDraft);
                    setFormData(savedFormData);
                    setStep(savedStep);
                    setShowResumeBanner(false);
                    scrollToForm();
                } catch (error) {
                    console.error("Error resuming draft:", error);
                }
            }
        }
    };

    // Function to discard saved draft
    const discardDraft = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem(STORAGE_KEY);
            setShowResumeBanner(false);
        }
    };

    // Function to manually save draft
    const saveDraft = () => {
        if (typeof window !== "undefined") {
            const draftData = {
                formData,
                step,
                savedAt: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(draftData));
            setDraftSaved(true);
            setTimeout(() => setDraftSaved(false), 3000);
        }
    };


    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            if (name === "consentData" || name === "consentDisclaimer") {
                setFormData((prev) => ({ ...prev, [name]: checked }));
            } else {
                // Multi-select checkboxes
                const field = name.split("-")[0];
                const val = name.split("-").slice(1).join("-");
                setFormData((prev) => {
                    const arr = prev[field] || [];
                    if (checked) return { ...prev, [field]: [...arr, val] };
                    return { ...prev, [field]: arr.filter((v) => v !== val) };
                });
            }
        } else {
            if (name === "country") {
                const country = COUNTRIES.find((c) => c.label === value);
                const phoneCode = country?.code ?? "";
                setFormData((prev) => ({ ...prev, [name]: value, phoneCode: phoneCode || prev.phoneCode }));
            } else {
                setFormData((prev) => ({ ...prev, [name]: value }));
            }
        }
    };

    const getFileIcon = (file) => {
        if (file.type.includes("pdf")) return <FaFilePdf className="text-red-500" />;
        if (file.type.includes("image")) return <FaFileImage className="text-blue-500" />;
        if (file.type.includes("word") || file.type.includes("document")) return <FaFileWord className="text-blue-600" />;
        return <FaFileUpload className="text-gray-500" />;
    };

    const handleFileChange = (e) => {
        if (!e.target.files) return;
        const newFiles = Array.from(e.target.files);
        const valid = [];
        for (const file of newFiles) {
            if (!ACCEPTED_TYPES.includes(file.type)) {
                setError(t("errorFileType"));
                return;
            }
            if (file.size > MAX_FILE_BYTES) {
                setError(t("errorFileSize"));
                return;
            }
            valid.push(file);
        }
        setError("");
        // Simulate upload progress for each file
        valid.forEach((file, idx) => {
            const fileId = `${file.name}-${Date.now()}-${idx}`;
            file._id = fileId;
            setUploadProgress((prev) => ({ ...prev, [fileId]: 0 }));
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 30 + 10;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                }
                setUploadProgress((prev) => ({ ...prev, [fileId]: Math.min(100, Math.floor(progress)) }));
            }, 200);
        });
        setFiles((prev) => [...prev, ...valid]);
    };

    const removeFile = (index) => {
        const file = files[index];
        if (file._id) {
            setUploadProgress((prev) => {
                const copy = { ...prev };
                delete copy[file._id];
                return copy;
            });
        }
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const validateStep = (currentStep) => {
        if (currentStep === 1) {
            // Require Name, Gender, DOB, Country, City AND (Phone OR Email)
            if (!formData.patientName || !formData.gender || !formData.dob || !formData.country || !formData.city) return false;
            // EITHER Phone OR Email is required
            if (!formData.phoneNumber && !formData.email) return false;
        }
        if (currentStep === 2) {
            if (!formData.medicalConcern || !formData.symptoms || !formData.previousTreatment) return false;
            if (String(formData.symptoms).trim().length < 30) return false;
        }
        if (currentStep === 4) {
            if (!formData.consentData || !formData.consentDisclaimer) return false;
        }
        return true;
    };

    const nextStep = () => {
        setError("");
        if (step === 2 && String(formData.symptoms).trim().length < 30) {
            setError(t("errorSymptoms"));
            return;
        }
        if (validateStep(step)) {
            setStep((prev) => prev + 1);
            setTimeout(scrollToForm, 100);
        } else {
            setError(t("errorRequired"));
        }
    };

    const prevStep = () => {
        setStep((prev) => prev - 1);
        setTimeout(scrollToForm, 100);
    };

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
            const phone = `${formData.phoneCode}${String(formData.phoneNumber).replace(/\D/g, "")}`;
            const age = calculateAge(formData.dob);

            // Step 1
            data.append("patientName", formData.patientName);
            data.append("gender", formData.gender);
            data.append("dob", formData.dob);
            data.append("age", age);
            data.append("country", formData.country);
            data.append("city", formData.city);
            data.append("nationality", formData.nationality);
            data.append("phone", phone);
            data.append("email", formData.email);
            data.append("preferredComm", formData.preferredComm.join(", "));

            // Step 2
            data.append("medicalConcern", formData.medicalConcern);
            data.append("specificDiagnosis", formData.specificDiagnosis);
            data.append("symptoms", formData.symptoms);
            data.append("duration", formData.duration);
            data.append("previousTreatment", formData.previousTreatment);
            data.append("treatmentDetails", formData.treatmentDetails);
            data.append("currentMedications", formData.currentMedications);
            data.append("allergies", formData.allergies);
            data.append("existingConditions", formData.existingConditions.join(", "));

            // Step 4
            data.append("preferredCountry", formData.preferredCountry);
            data.append("preferredCity", formData.preferredCity);
            data.append("budgetRange", formData.budgetRange);
            data.append("travelReadiness", formData.travelReadiness);
            data.append("assistanceNeeded", formData.assistanceNeeded.join(", "));
            data.append("consentData", "1");
            data.append("consentDisclaimer", "1");

            data.append("locale", locale);
            data.append("timestamp", new Date().toISOString());

            files.forEach((file) => data.append("files", file));

            const response = await fetch("/api/prescreen", {
                method: "POST",
                body: data,
            });

            const result = await response.json();

            if (result.success) {
                setIsSuccess(true);
                setRefId(result.id || "");
                // Clear saved draft from local storage
                if (typeof window !== "undefined") {
                    localStorage.removeItem(STORAGE_KEY);
                }
                if (typeof window !== "undefined" && window.gtag_report_conversion) {
                    window.gtag_report_conversion();
                }
                setStep(5);
            } else {
                setError(result.error || t("errorSubmit"));
            }
        } catch (err) {
            setError(t("errorNetwork"));
        } finally {
            setIsSubmitting(false);
        }
    };

    // Success Screen
    if (isSuccess) {
        return (
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 text-center max-w-2xl mx-auto border-t-4 border-[#0BA35A]" dir={isRTL ? "rtl" : "ltr"}>
                <div className="w-20 h-20 bg-[#0BA35A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCheckCircle className="w-12 h-12 text-[#0BA35A]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#003459] mb-3">{t("success.title")}</h3>
                {refId && (
                    <p className="text-[#066F89] font-semibold mb-2">Reference ID: #{refId}</p>
                )}
                <p className="text-[#6D7A8A] mb-6 text-lg">{t("success.message")}</p>
                <div className="bg-[#F5F7FA] rounded-xl p-4 mb-6 text-left space-y-2">
                    <p className="text-sm text-[#6D7A8A]">✅ {t("success.emailSent")}</p>
                    <p className="text-sm text-[#6D7A8A]">✅ {t("success.whatsappSent")}</p>
                    <p className="text-sm text-[#6D7A8A]">⏱️ {t("success.reportTime")}</p>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 bg-[#066F89] hover:bg-[#05596D] text-white rounded-xl font-semibold transition-all shadow-lg"
                >
                    {t("success.submitAnother")}
                </button>
            </div>
        );
    }



    const inputClass = "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#066F89]/30 focus:border-[#066F89] outline-none transition-all bg-white";
    const labelClass = "block text-sm font-semibold text-[#003459] mb-1.5";
    const optionalClass = "text-xs text-[#6D7A8A] font-normal";


    return (
        <div className="py-8 px-4">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50  rounded-3xl">
                <div ref={formContainerRef} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100" dir={isRTL ? "rtl" : "ltr"}>
                    {/* Resume Banner */}
                    {showResumeBanner && (
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b-2 border-amber-200 px-6 py-4">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <FaSave className="w-5 h-5 text-amber-600" />
                                    <div>
                                        <p className="font-semibold text-amber-900">Resume Your Application</p>
                                        <p className="text-sm text-amber-700">You have a saved draft. Would you like to continue where you left off?</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={resumeDraft}
                                        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-all text-sm"
                                    >
                                        Resume
                                    </button>
                                    <button
                                        onClick={discardDraft}
                                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all text-sm"
                                    >
                                        Start Fresh
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Progress Header */}
                    <div className="bg-gradient-to-r from-[#066F89] to-[#003459] px-6 py-5 text-white">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-semibold uppercase tracking-wider opacity-90">
                                {t("stepOf", { current: step })}
                            </span>
                            <span className="text-xs opacity-75">{t("takesAbout")}</span>
                        </div>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4].map((s) => (
                                <div
                                    key={s}
                                    className={`flex-1 h-2 rounded-full transition-all ${s <= step ? "bg-[#FF6B35]" : "bg-white/30"
                                        }`}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs opacity-75">
                            <span>{t("steps.s1")}</span>
                            <span>{t("steps.s2")}</span>
                            <span>{t("steps.s3")}</span>
                            <span>{t("steps.s4")}</span>
                        </div>
                    </div>

                    {/* Draft Saved Toast */}
                    {draftSaved && (
                        <div className="fixed bottom-6 right-6 bg-[#0BA35A] text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fadeIn z-50 border border-white/20">
                            <FaSave className="w-5 h-5" />
                            <span className="font-semibold">{t("nav.draftSaved")}</span>
                        </div>
                    )}

                    <div className="p-6 md:p-8">
                        {error && (
                            <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm border border-red-200 flex items-center gap-2">
                                <FaTimesCircle /> {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            {/* STEP 1: Patient Details */}
                            {step === 1 && (
                                <div className="space-y-5">
                                    <h3 className="text-xl font-bold text-[#003459] mb-2 flex items-center gap-2">
                                        👤 {t("step1.title")}
                                    </h3>
                                    <p className="text-sm text-[#6D7A8A] mb-4">{t("step1.subtitle")}</p>

                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div className="md:col-span-2">
                                            <label className={labelClass}>{t("step1.fullName")} *</label>
                                            <input type="text" name="patientName" value={formData.patientName} onChange={handleInputChange} className={inputClass} placeholder={t("step1.fullNamePlaceholder")} />
                                        </div>

                                        <div>
                                            <label className={labelClass}>{t("step1.gender")} *</label>
                                            <div className="flex gap-3 flex-wrap">
                                                {["Male", "Female", "Other"].map((g) => (
                                                    <label key={g} className={`flex items-center gap-2 px-4 py-2.5 border-2 rounded-xl cursor-pointer transition-all ${formData.gender === g ? "border-[#066F89] bg-[#066F89]/5" : "border-gray-200 hover:border-[#066F89]/40"}`}>
                                                        <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleInputChange} className="accent-[#066F89]" />
                                                        <span className="text-sm">{t(`step1.genders.${g.toLowerCase()}`)}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelClass}>{t("step1.dob")} *</label>
                                            <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className={inputClass} max={new Date().toISOString().split("T")[0]} />
                                            {formData.dob && (
                                                <p className="text-xs text-[#066F89] mt-1 font-medium">Age: {calculateAge(formData.dob)} years</p>
                                            )}
                                        </div>



                                        <div>
                                            <label className={labelClass}>{t("step1.country")} *</label>
                                            <CountryCombobox
                                                value={formData.country}
                                                onValueChange={onCountryChange}
                                                placeholder={t("step1.countryPlaceholder")}
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClass}>{t("step1.city")} *</label>
                                            <input type="text" name="city" value={formData.city} onChange={handleInputChange} className={inputClass} placeholder={t("step1.cityPlaceholder")} />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className={labelClass}>{t("step1.whatsapp")}</label>
                                            <div className="flex gap-2">
                                                <PhoneCodeCombobox
                                                    value={formData.phoneCode}
                                                    onValueChange={(value) => setFormData({ ...formData, phoneCode: value })}
                                                />
                                                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#066F89]/30 focus:border-[#066F89] outline-none" placeholder={t("step1.whatsappPlaceholder")} />
                                            </div>
                                            {!formData.phoneNumber && !formData.email && (
                                                <p className="text-xs text-[#FF6B35] mt-1">Please provide either WhatsApp or Email</p>
                                            )}
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className={labelClass}>{t("step1.email")}</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={inputClass} placeholder={t("step1.emailPlaceholder")} />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className={labelClass}>{t("step1.preferredComm")} <span className={optionalClass}>({t("optional")})</span></label>
                                            <div className="flex gap-3 flex-wrap">
                                                {["WhatsApp", "Email", "Call"].map((c) => (
                                                    <label key={c} className="flex items-center gap-2 cursor-pointer">
                                                        <input type="checkbox" name={`preferredComm-${c}`} checked={formData.preferredComm.includes(c)} onChange={handleInputChange} className="w-4 h-4 accent-[#066F89]" />
                                                        <span className="text-sm text-[#6D7A8A]">{c}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: Medical Condition */}
                            {step === 2 && (
                                <div className="space-y-5">
                                    <h3 className="text-xl font-bold text-[#003459] mb-2 flex items-center gap-2">
                                        🏥 {t("step2.title")}
                                    </h3>
                                    <p className="text-sm text-[#6D7A8A] mb-4">{t("step2.subtitle")}</p>

                                    <div>
                                        <label className={labelClass}>{t("step2.concern")} *</label>
                                        <select name="medicalConcern" value={formData.medicalConcern} onChange={handleInputChange} className={inputClass}>
                                            <option value="">{t("step2.concernPlaceholder")}</option>
                                            <option value="Oncology (Cancer)">{t("step2.concerns.oncology")}</option>
                                            <option value="Cardiology (Heart)">{t("step2.concerns.cardiology")}</option>
                                            <option value="Neurology">{t("step2.concerns.neuro")}</option>
                                            <option value="Orthopedics">{t("step2.concerns.ortho")}</option>
                                            <option value="Transplant">{t("step2.concerns.transplant")}</option>
                                            <option value="IVF & Fertility">{t("step2.concerns.ivf")}</option>
                                            <option value="Urology">{t("step2.concerns.urology")}</option>
                                            <option value="Gastroenterology">{t("step2.concerns.gastro")}</option>
                                            <option value="Ophthalmology">{t("step2.concerns.ophth")}</option>
                                            <option value="Other">{t("step2.concerns.other")}</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className={labelClass}>{t("step2.specificDiagnosis")} <span className={optionalClass}>({t("optional")})</span></label>
                                        <input type="text" name="specificDiagnosis" value={formData.specificDiagnosis} onChange={handleInputChange} className={inputClass} placeholder={t("step2.specificDiagnosisPlaceholder")} />
                                    </div>

                                    <div>
                                        <label className={labelClass}>{t("step2.symptoms")} *</label>
                                        <textarea name="symptoms" value={formData.symptoms} onChange={handleInputChange} rows="4" minLength={30} className={inputClass} placeholder={t("step2.symptomsPlaceholder")} />
                                        <p className="text-xs text-[#6D7A8A] mt-1">{t("step2.symptomsHint")} <span className={formData.symptoms.length >= 30 ? "text-[#0BA35A]" : "text-[#FF6B35]"}>({formData.symptoms.length}/30)</span></p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label className={labelClass}>{t("step2.duration")}</label>
                                            <select name="duration" value={formData.duration} onChange={handleInputChange} className={inputClass}>
                                                <option value="">{t("step2.durationPlaceholder")}</option>
                                                <option value="Less than 1 month">{t("step2.durations.lt1")}</option>
                                                <option value="1-3 months">{t("step2.durations.1to3")}</option>
                                                <option value="3-6 months">{t("step2.durations.3to6")}</option>
                                                <option value="More than 6 months">{t("step2.durations.gt6")}</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className={labelClass}>{t("step2.previousTreatment")} *</label>
                                            <div className="flex gap-4">
                                                {["Yes", "No"].map((v) => (
                                                    <label key={v} className={`flex items-center gap-2 px-5 py-2.5 border-2 rounded-xl cursor-pointer transition-all ${formData.previousTreatment === v ? "border-[#066F89] bg-[#066F89]/5" : "border-gray-200 hover:border-[#066F89]/40"}`}>
                                                        <input type="radio" name="previousTreatment" value={v} checked={formData.previousTreatment === v} onChange={handleInputChange} className="accent-[#066F89]" />
                                                        <span className="text-sm">{v === "Yes" ? t("yes") : t("no")}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {formData.previousTreatment === "Yes" && (
                                        <div className="bg-[#F5F7FA] p-4 rounded-xl border border-gray-200">
                                            <label className={labelClass}>{t("step2.treatmentDetails")}</label>
                                            <textarea name="treatmentDetails" value={formData.treatmentDetails} onChange={handleInputChange} rows="2" className={inputClass} placeholder={t("step2.treatmentDetailsPlaceholder")} />
                                        </div>
                                    )}

                                    <div>
                                        <label className={labelClass}>{t("step2.currentMedications")} <span className={optionalClass}>({t("optional")})</span></label>
                                        <textarea name="currentMedications" value={formData.currentMedications} onChange={handleInputChange} rows="2" className={inputClass} placeholder={t("step2.currentMedicationsPlaceholder")} />
                                    </div>

                                    <div>
                                        <label className={labelClass}>{t("step2.allergies")} <span className={optionalClass}>({t("optional")})</span></label>
                                        <input type="text" name="allergies" value={formData.allergies} onChange={handleInputChange} className={inputClass} placeholder={t("step2.allergiesPlaceholder")} />
                                    </div>

                                    <div>
                                        <label className={labelClass}>{t("step2.existingConditions")} <span className={optionalClass}>({t("optional")})</span></label>
                                        <div className="flex flex-wrap gap-2">
                                            {MEDICAL_CONDITIONS.map((cond) => (
                                                <label key={cond} className={`px-3 py-1.5 border-2 rounded-full text-sm cursor-pointer transition-all ${formData.existingConditions.includes(cond) ? "border-[#066F89] bg-[#066F89]/10 text-[#066F89]" : "border-gray-200 text-[#6D7A8A] hover:border-[#066F89]/40"}`}>
                                                    <input type="checkbox" name={`existingConditions-${cond}`} checked={formData.existingConditions.includes(cond)} onChange={handleInputChange} className="hidden" />
                                                    {cond}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: Upload Reports */}
                            {step === 3 && (
                                <div className="space-y-5">
                                    <h3 className="text-xl font-bold text-[#003459] mb-2 flex items-center gap-2">
                                        📎 {t("step3.title")}
                                    </h3>
                                    <p className="text-sm text-[#6D7A8A] mb-4">{t("step3.subtitle")}</p>

                                    <div
                                        className="border-2 border-dashed border-[#066F89]/40 rounded-2xl p-8 text-center bg-gradient-to-br from-[#066F89]/5 to-[#FF6B35]/5 hover:from-[#066F89]/10 hover:to-[#FF6B35]/10 transition-all cursor-pointer"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <FaFileUpload className="w-14 h-14 text-[#066F89] mx-auto mb-4" />
                                        <p className="font-bold text-[#003459] text-lg">{t("step3.clickToUpload")}</p>
                                        <p className="text-sm text-[#6D7A8A] mt-2">{t("step3.formats")}</p>
                                        <p className="text-xs text-[#066F89] mt-1 font-medium">{t("step3.formatsHint")}</p>
                                        <input
                                            type="file"
                                            multiple
                                            ref={fileInputRef}
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                        />
                                    </div>

                                    {files.length > 0 && (
                                        <div className="space-y-3">
                                            <p className="text-sm font-semibold text-[#003459] flex items-center gap-2">
                                                <FaCheckCircle className="text-[#0BA35A]" /> {t("step3.selectedFiles")} ({files.length})
                                            </p>
                                            {files.map((file, idx) => {
                                                const progress = uploadProgress[file._id] || 100;
                                                return (
                                                    <div key={idx} className="bg-[#F5F7FA] px-4 py-3 rounded-xl border border-gray-200">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <div className="flex items-center gap-3">
                                                                {getFileIcon(file)}
                                                                <span className="text-sm text-[#003459] font-medium truncate max-w-[200px]">{file.name}</span>
                                                                <span className="text-xs text-[#6D7A8A]">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                                            </div>
                                                            <button type="button" onClick={() => removeFile(idx)} className="text-red-500 hover:text-red-700 text-sm font-medium">
                                                                {t("step3.remove")}
                                                            </button>
                                                        </div>
                                                        {progress < 100 ? (
                                                            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                                <div className="h-full bg-gradient-to-r from-[#066F89] to-[#FF6B35] transition-all" style={{ width: `${progress}%` }} />
                                                            </div>
                                                        ) : (
                                                            <p className="text-xs text-[#0BA35A] font-medium">✓ {t("step3.uploadComplete")}</p>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {files.length > 0 && (
                                        <div className="bg-[#0BA35A]/10 border border-[#0BA35A]/30 rounded-xl p-4 flex items-center gap-3 animate-fadeIn">
                                            <FaCheckCircle className="text-[#0BA35A] w-5 h-5 flex-shrink-0" />
                                            <span className="text-[#003459] font-semibold">Reports Uploaded Successfully</span>
                                        </div>
                                    )}

                                    <div className="bg-[#FFD166]/20 p-4 rounded-xl border border-[#FFD166]/50">
                                        <p className="text-sm text-[#003459] font-medium">💡 {t("step3.tip")}</p>
                                    </div>
                                </div>
                            )}

                            {/* STEP 4: Preferences & Consent */}
                            {step === 4 && (
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-[#003459] mb-2 flex items-center gap-2">
                                        ✅ {t("step4.title")}
                                    </h3>

                                    {/* Summary */}
                                    <div className="bg-gradient-to-br from-[#F5F7FA] to-[#066F89]/5 p-5 rounded-xl border border-gray-200">
                                        <h4 className="font-semibold text-[#003459] mb-3">{t("step4.summary")}</h4>
                                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                                            <p><strong>{t("step4.name")}</strong> {formData.patientName}</p>
                                            <p><strong>{t("step4.age")}</strong> {calculateAge(formData.dob)} years ({formData.gender})</p>
                                            <p><strong>{t("step4.concern")}</strong> {formData.medicalConcern}</p>
                                            <p><strong>{t("step4.files")}</strong> {files.length} {t("step4.filesAttached")}</p>
                                            <p><strong>WhatsApp:</strong> {formData.phoneCode} {formData.phoneNumber}</p>
                                            <p><strong>Email:</strong> {formData.email}</p>
                                        </div>
                                    </div>

                                    {/* Preferences */}
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-[#003459]">{t("step4.preferences")}</h4>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className={labelClass}>{t("step4.preferredCountry")}</label>
                                                <select name="preferredCountry" value={formData.preferredCountry} onChange={handleInputChange} className={inputClass}>
                                                    <option value="India">India</option>
                                                    <option value="Turkey">Turkey</option>
                                                    <option value="Thailand">Thailand</option>
                                                    <option value="UAE">UAE</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className={labelClass}>{t("step4.preferredCity")} <span className={optionalClass}>({t("optional")})</span></label>
                                                <select name="preferredCity" value={formData.preferredCity} onChange={handleInputChange} className={inputClass}>
                                                    <option value="">{t("step4.selectCity")}</option>
                                                    {INDIAN_CITIES.map((c) => (
                                                        <option key={c} value={c}>{c}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className={labelClass}>{t("step4.budgetRange")} <span className={optionalClass}>({t("optional")})</span></label>
                                                <select name="budgetRange" value={formData.budgetRange} onChange={handleInputChange} className={inputClass}>
                                                    {BUDGET_RANGES.map((b) => (
                                                        <option key={b.value} value={b.value}>{b.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className={labelClass}>{t("step4.travelReadiness")} <span className={optionalClass}>({t("optional")})</span></label>
                                                <select name="travelReadiness" value={formData.travelReadiness} onChange={handleInputChange} className={inputClass}>
                                                    <option value="">{t("step4.selectReadiness")}</option>
                                                    <option value="Immediately">{t("step4.readiness.immediately")}</option>
                                                    <option value="1-3 months">{t("step4.readiness.1to3")}</option>
                                                    <option value="Later">{t("step4.readiness.later")}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelClass}>{t("step4.assistanceNeeded")} <span className={optionalClass}>({t("optional")})</span></label>
                                            <div className="flex flex-wrap gap-2">
                                                {ASSISTANCE_OPTIONS.map((opt) => (
                                                    <label key={opt} className={`px-3 py-1.5 border-2 rounded-full text-sm cursor-pointer transition-all ${formData.assistanceNeeded.includes(opt) ? "border-[#066F89] bg-[#066F89]/10 text-[#066F89]" : "border-gray-200 text-[#6D7A8A] hover:border-[#066F89]/40"}`}>
                                                        <input type="checkbox" name={`assistanceNeeded-${opt}`} checked={formData.assistanceNeeded.includes(opt)} onChange={handleInputChange} className="hidden" />
                                                        {opt}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Detailed Consent & Disclaimer Section */}
                                    <div className="space-y-4 pt-4 border-t border-gray-200">
                                        <h4 className="font-semibold text-[#003459]">{t("step4.consentTitle")}</h4>

                                        {/* 1. Patient Consent (Mandatory) */}
                                        <div className="p-4 rounded-xl border-2 transition-all hover:border-[#066F89]/40 bg-gray-50/50">
                                            <h5 className="font-semibold text-[#003459] mb-2 text-sm">{t("step4.patientConsent.title")}</h5>
                                            <label className="flex items-start gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="consentData"
                                                    checked={formData.consentData}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-5 h-5 accent-[#066F89]"
                                                />
                                                <div className="text-sm text-[#6D7A8A] space-y-2">
                                                    <p>{t("step4.patientConsent.label")}</p>
                                                    <p className="text-xs opacity-80">{t("step4.patientConsent.text")}</p>
                                                </div>
                                            </label>
                                        </div>

                                        {/* 2. AI Disclaimer (Mandatory) */}
                                        <div className="p-4 rounded-xl border-2 transition-all hover:border-[#066F89]/40 bg-gray-50/50">
                                            <h5 className="font-semibold text-[#003459] mb-2 text-sm">{t("step4.aiDisclaimer.title")}</h5>
                                            <label className="flex items-start gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="consentDisclaimer"
                                                    checked={formData.consentDisclaimer}
                                                    onChange={handleInputChange}
                                                    className="mt-1 w-5 h-5 accent-[#066F89]"
                                                />
                                                <div className="text-sm text-[#6D7A8A] space-y-2">
                                                    <p>{t("step4.aiDisclaimer.label")}</p>
                                                    <ul className="list-disc pl-4 text-xs opacity-80 space-y-1">
                                                        <li>{t("step4.aiDisclaimer.points.0")}</li>
                                                        <li>{t("step4.aiDisclaimer.points.1")}</li>
                                                        <li>{t("step4.aiDisclaimer.points.2")}</li>
                                                    </ul>
                                                </div>
                                            </label>
                                        </div>

                                        {/* 3. Limitation of Liability */}
                                        <details className="group border border-gray-200 rounded-xl bg-white overflow-hidden">
                                            <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-[#003459] text-sm hover:bg-gray-50">
                                                {t("step4.liability.title")}
                                                <FaChevronDown className="w-3 h-3 transition-transform group-open:rotate-180" />
                                            </summary>
                                            <div className="p-4 pt-0 text-xs text-[#6D7A8A] border-t border-transparent group-open:border-gray-100">
                                                <p>{t("step4.liability.text")}</p>
                                            </div>
                                        </details>

                                        {/* 4. Data Privacy */}
                                        <div className="bg-[#066F89]/5 p-4 rounded-xl border border-[#066F89]/10">
                                            <h5 className="font-semibold text-[#003459] mb-2 text-sm flex items-center gap-2">
                                                🛡️ {t("step4.privacy.title")}
                                            </h5>
                                            <p className="text-xs text-[#6D7A8A] mb-2">{t("step4.privacy.intro")}</p>
                                            <ul className="list-disc pl-4 text-xs text-[#6D7A8A] space-y-1">
                                                <li>{t("step4.privacy.points.0")}</li>
                                                <li>{t("step4.privacy.points.1")}</li>
                                                <li>{t("step4.privacy.points.2")}</li>
                                                <li>{t("step4.privacy.points.3")}</li>
                                            </ul>
                                        </div>

                                        {/* 5. Cross-Border Disclaimer */}
                                        <details className="group border border-gray-200 rounded-xl bg-white overflow-hidden">
                                            <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-[#003459] text-sm hover:bg-gray-50">
                                                {t("step4.crossBorder.title")}
                                                <FaChevronDown className="w-3 h-3 transition-transform group-open:rotate-180" />
                                            </summary>
                                            <div className="p-4 pt-0 text-xs text-[#6D7A8A] border-t border-transparent group-open:border-gray-100">
                                                <p>{t("step4.crossBorder.text")}</p>
                                            </div>
                                        </details>

                                        {/* 8. Final Confirmation */}
                                        <div className="p-4 bg-[#FF6B35]/5 border border-[#FF6B35]/20 rounded-xl text-center">
                                            <h5 className="font-bold text-[#003459] mb-2 text-sm">{t("step4.finalConfirmation.title")}</h5>
                                            <p className="text-xs text-[#6D7A8A] mb-2">{t("step4.finalConfirmation.label")}</p>
                                            <ul className="text-xs text-[#6D7A8A] space-y-1 inline-block text-left">
                                                {t("step4.finalConfirmation.points.0") && <li>✅ {t("step4.finalConfirmation.points.0")}</li>}
                                                {t("step4.finalConfirmation.points.1") && <li>✅ {t("step4.finalConfirmation.points.1")}</li>}
                                                {t("step4.finalConfirmation.points.2") && <li>✅ {t("step4.finalConfirmation.points.2")}</li>}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation */}
                            <div className={`flex pt-6 mt-6 border-t border-gray-100 gap-4 ${isRTL ? "flex-row-reverse" : "justify-between"}`}>
                                {step > 1 ? (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-6 py-3 bg-white border-2 border-gray-200 text-[#003459] font-semibold rounded-xl hover:bg-[#F5F7FA] hover:border-[#066F89]/30 transition-all"
                                        disabled={isSubmitting}
                                    >
                                        ← {t("nav.back")}
                                    </button>
                                ) : (
                                    <div />
                                )}

                                {/* Save Draft Button */}
                                <button
                                    type="button"
                                    onClick={saveDraft}
                                    className="px-4 py-2 text-[#066F89] hover:bg-[#066F89]/5 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
                                >
                                    <FaSave className="w-4 h-4" />
                                    <span className="hidden sm:inline">{t("nav.saveDraft")}</span>
                                    <span className="sm:hidden">Save</span>
                                </button>
                                {step < 4 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="px-8 py-3 bg-gradient-to-r from-[#066F89] to-[#003459] hover:from-[#05596D] hover:to-[#002a47] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                                    >
                                        {t("nav.next")} →
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !formData.consentData || !formData.consentDisclaimer}
                                        className="px-8 py-3 bg-gradient-to-r from-[#0BA35A] to-[#088248] hover:from-[#099D52] hover:to-[#077740] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <FaSpinner className="animate-spin" /> {t("nav.processing")}
                                            </>
                                        ) : (
                                            <>🚀 {t("nav.submit")}</>
                                        )}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}
