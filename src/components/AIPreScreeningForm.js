"use client";
import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { FaFileUpload, FaCheckCircle, FaSpinner } from "react-icons/fa";

export default function AIPreScreeningForm({ locale }) {
    const t = useTranslations("aiPrescreening"); // Ensure you add this later
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
            setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
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
            setError("Please fill in all required fields.");
        }
    };

    const prevStep = () => setStep((prev) => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep(4)) {
            setError("Please agree to the consent terms.");
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
                setError(result.error || "Submission failed. Please try again.");
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-2xl mx-auto border-t-4 border-green-500">
                <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Request Submitted Successfully!</h3>
                <p className="text-gray-600 mb-6">
                    Thank you, <strong>{formData.patientName}</strong>. Our AI system is analyzing your details.
                    <br />You will receive your <strong>AI Pre-Screening Report</strong> via Email/WhatsApp within <strong>2 hours</strong>.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                >
                    Submit Another Request
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-3xl mx-auto border border-gray-100">
            {/* Progress Bar */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <span className="text-sm font-semibold text-panacea-primary uppercase tracking-wider">
                    Step {step} of 4
                </span>
                <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-panacea-primary transition-all duration-300"
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
                    {/* Step 1: Patient Details */}
                    {step === 1 && (
                        <div className="space-y-5 animate-fadeIn">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Patient Information</h3>
                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                    <input
                                        type="text"
                                        name="patientName"
                                        value={formData.patientName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary outline-none transition-all"
                                        placeholder="As per passport"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Country of Residence *</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary outline-none transition-all"
                                        placeholder="e.g. Nigeria, UAE"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary outline-none transition-all"
                                        placeholder="+91 9999999999"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Include country code</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary outline-none transition-all"
                                        placeholder="primary@email.com"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Medical Details */}
                    {step === 2 && (
                        <div className="space-y-5 animate-fadeIn">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Medical Condition</h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Medical Concern *</label>
                                <select
                                    name="medicalConcern"
                                    value={formData.medicalConcern}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary outline-none transition-all bg-white"
                                >
                                    <option value="">Select Concern...</option>
                                    <option value="Oncology (Cancer)">Oncology (Cancer)</option>
                                    <option value="Cardiology (Heart)">Cardiology (Heart)</option>
                                    <option value="Neurology">Neurology & Neurosurgery</option>
                                    <option value="Orthopedics">Orthopedics (Bone/Joint)</option>
                                    <option value="Transplant">Organ Transplant</option>
                                    <option value="IVF & Fertility">IVF & Fertility</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms Description *</label>
                                <textarea
                                    name="symptoms"
                                    value={formData.symptoms}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary outline-none transition-all"
                                    placeholder="Describe current symptoms..."
                                ></textarea>
                            </div>
                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration of Symptoms</label>
                                    <select
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary outline-none transition-all bg-white"
                                    >
                                        <option value="">Select Duration...</option>
                                        <option value="Less than 1 month">Less than 1 month</option>
                                        <option value="1-3 months">1-3 months</option>
                                        <option value="3-6 months">3-6 months</option>
                                        <option value="More than 6 months">More than 6 months</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Country for Treatment</label>
                                    <select
                                        name="preferredCountry"
                                        value={formData.preferredCountry}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary outline-none transition-all bg-white"
                                    >
                                        <option value="India">India (Default)</option>
                                        <option value="Turkey">Turkey</option>
                                        <option value="Thailand">Thailand</option>
                                        <option value="UAE">UAE</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: File Upload */}
                    {step === 3 && (
                        <div className="space-y-5 animate-fadeIn">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Upload Medical Reports</h3>
                            <div
                                className="border-2 border-dashed border-panacea-primary/30 rounded-xl p-8 text-center bg-blue-50/30 hover:bg-blue-50/60 transition-colors cursor-pointer"
                                onClick={() => fileInputRef.current.click()}
                            >
                                <FaFileUpload className="w-12 h-12 text-panacea-primary mx-auto mb-3" />
                                <p className="font-semibold text-gray-700">Click to Upload Reports</p>
                                <p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG (Max 10MB)</p>
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
                                    <p className="text-sm font-medium text-gray-700">Selected Files:</p>
                                    {files.map((file, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                                            <span className="text-sm text-gray-600 truncate max-w-xs">{file.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(idx)}
                                                className="text-red-500 hover:text-red-700 text-sm font-medium"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm text-yellow-800">
                                💡 <strong>Tip:</strong> Uploading recent reports (Prescriptions, MRI, Blood Tests) significantly improves the accuracy of the AI analysis.
                            </div>
                        </div>
                    )}

                    {/* Step 4: Consent & Review */}
                    {step === 4 && (
                        <div className="space-y-5 animate-fadeIn">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Review & Consent</h3>

                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2 text-sm text-gray-600">
                                <p><strong>Name:</strong> {formData.patientName}</p>
                                <p><strong>Concern:</strong> {formData.medicalConcern}</p>
                                <p><strong>Files:</strong> {files.length} attached</p>
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="consent"
                                        checked={formData.consent}
                                        onChange={handleInputChange}
                                        className="mt-1 w-5 h-5 text-panacea-primary rounded border-gray-300 focus:ring-panacea-primary"
                                    />
                                    <span className="text-sm text-gray-600">
                                        I consent to the processing of my medical data for AI Pre-Screening. I understand that this report provides <strong>preliminary insights only</strong> and does not replace a doctor's diagnosis.
                                    </span>
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6 mt-6 border-t border-gray-100">
                        {step > 1 ? (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                                disabled={isSubmitting}
                            >
                                Back
                            </button>
                        ) : (
                            <div></div> // Spacer
                        )}

                        {step < 4 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="px-8 py-2.5 bg-panacea-primary hover:bg-panacea-secondary text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
                            >
                                Next Step
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <FaSpinner className="animate-spin" /> Processing...
                                    </>
                                ) : "Submit for AI Analysis"}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
