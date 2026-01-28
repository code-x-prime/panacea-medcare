import { useTranslations } from "next-intl";
import Image from "next/image";
import AIPreScreeningForm from "@/components/AIPreScreeningForm";

export const metadata = {
    title: "AI Medical Pre-Screening | Panacea Medcare",
    description: "Get a preliminary medical assessment within 2 hours using our advanced AI Pre-Screening system.",
};

export default function AISolutionsPage({ params }) {
    const { locale } = params;
    const t = useTranslations("aiSolutions"); // Make sure this key exists or fallback

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-panacea-dark to-panacea-primary py-20 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <Image src="/hero-banner.png" alt="AI Background" fill className="object-cover" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        AI Pre-Screening for International Patients
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 font-light">
                        Fast. Accurate. Personalized. <br />
                        <span className="font-semibold text-white">Get Medical Clarity Before You Travel.</span>
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold opacity-90">
                        <span className="bg-white/20 px-4 py-1.5 rounded-full">⏱️ Report in 2 Hours</span>
                        <span className="bg-white/20 px-4 py-1.5 rounded-full">🛡️ 100% Secure Data</span>
                        <span className="bg-white/20 px-4 py-1.5 rounded-full">🤖 Advanced AI Analysis</span>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">

                        {/* Left: Content & Steps */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">How AI Pre-Screening Works</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Panacea Medcare’s AI-powered process reviews your medical information to guide you toward the right treatment, hospital, and specialist in India — saving time, money, and uncertainty.
                            </p>

                            <div className="space-y-8">
                                {[
                                    { title: "Step 1: Share Details", desc: "Fill a simple form with your condition & symptoms.", icon: "1" },
                                    { title: "Step 2: Upload Reports", desc: "Attach prescriptions, scans, or lab reports.", icon: "2" },
                                    { title: "Step 3: AI Analysis", desc: "Our engine structures data & matches with treatment paths.", icon: "3" },
                                    { title: "Step 4: Receive Report", desc: "Get a clear guide via Email/WhatsApp in 2 hours.", icon: "4" }
                                ].map((step, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-panacea-secondary text-white flex items-center justify-center font-bold text-lg">
                                            {step.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-lg">{step.title}</h4>
                                            <p className="text-gray-600 text-sm">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 bg-blue-50 border-l-4 border-panacea-primary p-6 rounded-r-lg">
                                <h4 className="font-bold text-panacea-dark mb-2">What the Report Includes:</h4>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li>✔ Initial medical assessment</li>
                                    <li>✔ Suggested treatment options & cost range</li>
                                    <li>✔ Recommended medical specialty</li>
                                    <li>✔ Urgency level (Routine vs. Urgent)</li>
                                </ul>
                            </div>
                        </div>

                        {/* Right: The Form */}
                        <div id="ai-form">
                            <AIPreScreeningForm locale={locale} />
                        </div>

                    </div>
                </div>
            </section>

            {/* Disclaimer Section */}
            <section className="bg-white py-12 border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h4 className="text-lg font-bold text-gray-800 mb-3">Important Disclaimer</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        AI Pre-Screening provides preliminary medical guidance and does not replace a doctor’s diagnosis.
                        Final treatment decisions are made only after evaluation by qualified medical professionals.
                        Your data is protected with encrypted uploads and strict confidentiality protocols.
                    </p>
                </div>
            </section>
        </main>
    );
}
