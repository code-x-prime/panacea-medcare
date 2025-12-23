"use client";

import TopBanner from "@/components/TopBanner";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import { Award } from "lucide-react";

export default function AboutPage({ params }) {
    const { locale } = params;
    const t = useTranslations("about");
    const isRTL = locale === "ar";

    const breadcrumbItems = [
        { label: locale === "ar" ? "الرئيسية" : locale === "fr" ? "Accueil" : "Home", href: `/${locale}` },
        { label: locale === "ar" ? "من نحن" : locale === "fr" ? "À propos de nous" : "About Us", href: `/${locale}/about` }
    ];

    // Core Team Members
    const teamMembers = [
        {
            id: "sumiit-gupta",
            name: locale === "ar" ? "السيد سوميت جوبتا" : locale === "fr" ? "M. Sumiit Gupta" : "Mr. Sumiit Gupta",
            title: locale === "ar" ? "المؤسس والمدير" : locale === "fr" ? "Fondateur Directeur" : "Founder Director",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
            description: locale === "ar"
                ? "السيد سوميت جوبتا لديه أكثر من 30 عامًا من الخبرة في مختلف الوظائف المؤسسية مثل الإنتاج والتصنيع والعمليات واللوجستيات والمشتريات والمشاريع والتجارية والمالية. لديه خلفية قوية في الهندسة وإدارة الأعمال، بما في ذلك PGDBM في المواد والمالية ودرجة BTech."
                : locale === "fr"
                    ? "M. Sumiit Gupta possède plus de 30 ans d'expérience dans diverses fonctions d'entreprise telles que la production, la fabrication, les opérations, la logistique, les achats, les projets, le commercial et les finances. Il a une solide formation en ingénierie et en gestion d'entreprise, notamment un PGDBM en Matériaux et Finance et un diplôme BTech."
                    : "Mr. Sumiit Gupta has over 30 years of experience in various corporate functions like production, manufacturing, operations, logistics, purchase, projects, commercial, and finance. He has a strong engineering and business management background, including a PGDBM in Materials and Finance and a BTech degree.",
            roles: locale === "ar"
                ? "مدير في Panacea Medcare (متخصص في العلاج الطبي بأسعار معقولة في الهند)، ومدير في Athena Land & Real Estate، ومدير تطوير الأعمال لشركة Famsun Storage Co. Ltd. China."
                : locale === "fr"
                    ? "Directeur chez Panacea Medcare (spécialisé dans les traitements médicaux abordables en Inde), Directeur chez Athena Land & Real Estate, et Directeur du développement commercial pour Famsun Storage Co. Ltd. China."
                    : "Director at Panacea Medcare (focused on affordable medical treatment in India), Director at Athena Land & Real Estate, and Director of Business Development for Famsun Storage Co. Ltd. China."
        },
        {
            id: "dr-mandakini-chopra",
            name: locale === "ar" ? "الدكتورة مانداكيني تشوبرا" : locale === "fr" ? "Dr. Mandakini Chopra" : "Dr. Mandakini Chopra",
            title: locale === "ar" ? "أخصائية صحة المرأة" : locale === "fr" ? "Spécialiste de la santé des femmes" : "Women Health Specialist",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop",
            description: locale === "ar"
                ? "أخصائية علاج طبيعي أولى، مدربة في علم الحركة، ومربية معتمدة للياقة البدنية أثناء الحمل، ومربية معتمدة في البيلاتس، ومعالجة يدوية معتمدة، ومستشارة رضاعة معتمدة مع أكثر من 13 عامًا من الخبرة في العلاج الطبيعي."
                : locale === "fr"
                    ? "Physiothérapeute principale, formatrice en ergonomie, éducatrice certifiée en conditionnement physique prénatal, instructrice certifiée Pilates, thérapeute manuelle certifiée, conseillère en lactation certifiée avec plus de 13 ans d'expérience en physiothérapie."
                    : "Sr. Physiotherapist, Ergonomics trainer and a Certified Pregnancy fitness educator, Certified Pilates Instructor, Certified Manual therapist, Certified Lactation Counsellor with 13+ years of physical therapy experience.",
            specialties: locale === "ar"
                ? "الخبرة في علاج PCOD، العقم، عسر الطمث، ألم الفرج، عسر الجماع، خلل وظائف قاع الحوض."
                : locale === "fr"
                    ? "Expertise dans le traitement du SOPK, de l'infertilité, de la dysménorrhée, de la vulvodynie, de la dyspareunie, des dysfonctionnements du plancher pelvien."
                    : "Expertise in treating PCOD, Infertility, Dysmenorrhea, Vulvodynia, Dyspareunia, Pelvic floor dysfunctions."
        },
        {
            id: "dr-prerna",
            name: locale === "ar" ? "الدكتورة بريرنا" : locale === "fr" ? "Dr. Prerna" : "Dr. Prerna",
            title: locale === "ar" ? "دكتوراه في أمراض الكلى" : locale === "fr" ? "M.D. Néphrologie" : "M.D Nephrology",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop",
            description: locale === "ar"
                ? "الدكتورة بريرنا حاصلة على درجة البكالوريوس في الطب والجراحة ودرجة MD في أمراض الكلى وخبيرة في زراعة الأعضاء، مع أكثر من 16 عامًا من الخبرة. لديها شهادة من المجلس الأمريكي للطب الباطني. درست على نطاق واسع في جامعة إلينوي، مستشفيات وعيادات جامعة أيوا وأكملت زمالة في زراعة الكلى."
                : locale === "fr"
                    ? "Dr. Prerna est titulaire d'un diplôme de Bachelor of Medicine and Surgery et d'un MD en Néphrologie et experte en transplantation, avec plus de 16 ans d'expérience. Elle est certifiée par l'American Board of Internal Medicine. Elle a enseigné largement à l'Université de l'Illinois, aux hôpitaux et cliniques de l'Université de l'Iowa et a terminé une bourse en transplantation rénale."
                    : "Dr. Prerna has Bachelor of Medicine and Surgery degree and MD- Nephrology and a Transplant Expert, with over 16 years of experience. She has a certification from the American Board of Internal Medicine. She has taught extensively in University of Illinois, University of Iowa Hospitals and Clinic and completed a fellowship in Transplant Nephrology.",
            additional: locale === "ar"
                ? "لديها أيضًا خبرة بحثية واسعة ونشرت عددًا من الأوراق في المجلات الطبية. وهي أيضًا في علاج الريكي والطب بالطاقة."
                : locale === "fr"
                    ? "Elle a également une vaste expérience en recherche et a publié plusieurs articles dans des revues médicales. Elle pratique également la guérison Reiki et la médecine énergétique."
                    : "She has extensive Research experience and has published number of Papers in Medical Journals. She is also into Reiki healing and Energy Medicine."
        },
        {
            id: "dr-deepika",
            name: locale === "ar" ? "الدكتورة ديبيكا" : locale === "fr" ? "Dr. Deepika" : "Dr. Deepika",
            title: locale === "ar" ? "الطب الأيورفيدي والطب الشمولي" : locale === "fr" ? "Ayurveda et Médecine Holistique" : "Ayurveda and Holistic Medicine",
            image: "https://images.unsplash.com/photo-1594824476968-48fd8d5c07a3?w=400&h=500&fit=crop",
            description: locale === "ar"
                ? "الدكتورة ديبيكا لديها أكثر من 22 عامًا من الخبرة في مجال الأيورفيدا مع درجة في الطب الأيورفيدي. تعمل عيادة العافية الخاصة بها تحت اسم Sanovide وهي عيادة صحية طبيعية 100٪ تعتمد على علاجات وتقنيات النظام الطبي الهندي القديم."
                : locale === "fr"
                    ? "Dr. Deepika a plus de 22 ans d'expérience dans le domaine de l'Ayurveda avec un diplôme en médecine ayurvédique. Elle exploite sa clinique de bien-être sous le nom de Sanovide qui est une clinique de santé 100% naturelle basée sur les thérapies et techniques de l'ancien système médical indien."
                    : "Dr. Deepika has over 22 years of experience in the field of Ayurveda with a degree in Ayurvedic Medicine. Dr Deepika operates her Wellness Clinic under the name of Sanovide which is a 100% natural health clinic based on therapies & techniques of ancient Indian medical system.",
            treatments: locale === "ar"
                ? "نقدم علاجات مختلفة مثل: Panchakarma، Abhyanga، Shirodhara، Swedana، Udwarthanam"
                : locale === "fr"
                    ? "Nous proposons divers traitements comme : Panchakarma, Abhyanga, Shirodhara, Swedana, Udwarthanam"
                    : "We provide Various treatment like: Panchakarma - Detoxification, Abhyanga - Ayurvedic Massage, Shirodhara - Mental relaxation, Swedana - Herbal Steam Therapy, Udwarthanam - Weight loss"
        }
    ];

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="about"
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={breadcrumbItems} locale={locale} />
            </section>

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                {/* About Us Section - Enhanced UI */}
                <div className="mb-16">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-gradient-to-br from-panacea-primary to-panacea-secondary rounded-3xl p-8 md:p-12 mb-12 text-white shadow-panacea-lg">
                            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center`}>
                                {t("heading") || "About Us"}
                            </h2>
                            <p className={`text-lg md:text-xl text-white/90 leading-relaxed text-center max-w-4xl mx-auto ${isRTL ? "text-right" : "text-left"}`}>
                                {t("intro") || "Panacea Health is a premier medical tourism company with a distinguished track record spanning over 14 years. Specializing in providing world-class healthcare services to international patients, Panacea Health has established itself as a leader in the industry."}
                            </p>
                        </div>

                        <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 ${isRTL ? "flex-row-reverse" : ""}`}>
                            {/* Group Photo */}
                            <div className={`relative ${isRTL ? "md:order-2" : ""}`}>
                                <div className="relative rounded-2xl overflow-hidden shadow-panacea-lg group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-panacea-primary/20 to-panacea-secondary/20 z-10 group-hover:opacity-0 transition-opacity"></div>
                                    <Image
                                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=600&fit=crop"
                                        alt={locale === "ar" ? "فريق باناسيا هيلث" : locale === "fr" ? "Équipe Panacea Health" : "Panacea Health Team"}
                                        width={800}
                                        height={600}
                                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Key Features */}
                            <div className={`space-y-6 ${isRTL ? "md:order-1 text-right" : "text-left"}`}>
                                <h3 className="text-2xl md:text-3xl font-bold text-panacea-primary mb-6">
                                    {locale === "ar" ? "الميزات الرئيسية" : locale === "fr" ? "Caractéristiques Clés" : "Key Features of Panacea Health"}
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { title: t("feature1.title") || "Extensive Network of Accredited Hospitals", desc: t("feature1.desc") || "Panacea Health partners with top-tier hospitals and clinics worldwide, ensuring access to the latest medical technologies and highly skilled healthcare professionals." },
                                        { title: t("feature2.title") || "Patient-Centered Approach", desc: t("feature2.desc") || "The company's patient-centric philosophy emphasizes personalized care, with tailored treatment plans that address the unique needs and preferences of each patient." },
                                        { title: t("feature3.title") || "Wide Range of Medical Services", desc: t("feature3.desc") || "From elective procedures and specialized surgeries to wellness programs and preventive care, Panacea Health offers a diverse array of medical services across multiple specialties." },
                                        { title: t("feature4.title") || "Experienced Team", desc: t("feature4.desc") || "With over 14 years of experience, the Panacea Health team comprises seasoned professionals who bring a wealth of expertise and knowledge to the medical tourism sector." },
                                        { title: t("feature5.title") || "Seamless Travel and Accommodation Arrangements", desc: t("feature5.desc") || "Understanding the complexities of international travel, Panacea Health provides end-to-end support, including visa assistance, flight bookings, and accommodation arrangements to ensure a stress-free experience for patients and their families." },
                                        { title: t("feature6.title") || "Commitment to Quality and Safety", desc: t("feature6.desc") || "Patient safety and quality care are at the forefront of Panacea Health's operations. The company adheres to stringent standards and protocols to deliver the highest level of medical care." },
                                        { title: t("feature7.title") || "Post-Treatment Support", desc: t("feature7.desc") || "Panacea Health offers robust post-treatment care, including follow-up consultations and rehabilitation services, to ensure optimal recovery and patient satisfaction." }
                                    ].map((feature, idx) => (
                                        <div key={idx} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border-l-4 border-panacea-accent group hover:border-panacea-secondary relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-panacea-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative z-10">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-10 h-10 bg-panacea-light rounded-lg flex items-center justify-center group-hover:bg-panacea-primary group-hover:text-white transition-colors">
                                                        <span className="font-bold text-panacea-primary group-hover:text-white">{idx + 1}</span>
                                                    </div>
                                                    <h4 className="text-lg md:text-xl font-bold text-panacea-primary group-hover:text-panacea-secondary transition-colors">{feature.title}</h4>
                                                </div>
                                                <p className="text-gray-700 leading-relaxed">{feature.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Company Description */}
                        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-panacea-lg border border-gray-100 mb-12">
                            <p className={`text-lg text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                                {t("companyDesc") || "The company prides itself on offering comprehensive medical tourism solutions that encompass every aspect of patient care, from initial consultation and travel arrangements to post-treatment follow-ups. Panacea Health continues to build on its legacy of excellence, expanding its services and enhancing patient experiences to meet the evolving needs of the global healthcare landscape."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Core Team Section */}
                <div className="mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold text-panacea-primary mb-12 text-center`}>
                        {locale === "ar" ? "الفريق الأساسي" : locale === "fr" ? "L'Équipe Principale" : "The Core Team"}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {teamMembers.map((member) => (
                            <div
                                key={member.id}
                                className={`bg-white rounded-2xl shadow-panacea overflow-hidden border border-gray-100 hover:shadow-panacea-lg transition-all duration-300 ${isRTL ? "text-right" : "text-left"}`}
                            >
                                <div className={`grid md:grid-cols-2 gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    {/* Image */}
                                    <div className={`relative ${isRTL ? "md:order-2" : ""}`}>
                                        <div className="relative h-full min-h-[300px]">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className={`p-6 flex flex-col justify-center ${isRTL ? "md:order-1 text-right" : "text-left"}`}>
                                        <h3 className="text-2xl font-bold text-panacea-primary mb-2">{member.name}</h3>
                                        <p className="text-panacea-accent font-semibold mb-4">{member.title}</p>
                                        <p className="text-gray-700 leading-relaxed mb-3">{member.description}</p>
                                        {member.roles && (
                                            <p className="text-gray-600 text-sm leading-relaxed mb-3">{member.roles}</p>
                                        )}
                                        {member.specialties && (
                                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                                <span className="font-semibold">{locale === "ar" ? "التخصصات:" : locale === "fr" ? "Spécialités:" : "Specialties:"}</span> {member.specialties}
                                            </p>
                                        )}
                                        {member.additional && (
                                            <p className="text-gray-600 text-sm leading-relaxed">{member.additional}</p>
                                        )}
                                        {member.treatments && (
                                            <p className="text-gray-600 text-sm leading-relaxed mt-2">{member.treatments}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trust Building Section - Transparency & Accreditations */}
                <div className="mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold text-panacea-primary mb-12 text-center`}>
                        {locale === "ar" ? "الثقة والشفافية" : locale === "fr" ? "Confiance et Transparence" : "Trust & Transparency"}
                    </h2>

                    {/* Transparency in Costs */}
                    <div className="bg-gradient-to-br from-panacea-light to-white rounded-2xl p-8 md:p-12 mb-12 shadow-panacea border border-panacea-primary/10">
                        <div className={`max-w-4xl mx-auto ${isRTL ? "text-right" : "text-left"}`}>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-panacea-primary rounded-xl flex items-center justify-center flex-shrink-0">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-panacea-primary">
                                    {locale === "ar" ? "الشفافية في التكاليف والتقديرات" : locale === "fr" ? "Transparence dans les Coûts et Estimations" : "Transparency in Costs and Estimates"}
                                </h3>
                            </div>
                            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                                <p>
                                    {locale === "ar"
                                        ? "نؤمن بالشفافية الكاملة في جميع جوانب خدماتنا. نحن نقدم تقديرات تكلفة واضحة ومفصلة قبل بدء العلاج، مما يساعدك على التخطيط المالي بشكل أفضل. لا توجد تكاليف مخفية أو مفاجآت - كل شيء منصوص عليه بوضوح من البداية."
                                        : locale === "fr"
                                            ? "Nous croyons en une transparence totale dans tous les aspects de nos services. Nous fournissons des estimations de coûts claires et détaillées avant le début du traitement, vous aidant à mieux planifier financièrement. Aucun coût caché ou surprise - tout est clairement énoncé dès le début."
                                            : "We believe in complete transparency in all aspects of our services. We provide clear and detailed cost estimates before treatment begins, helping you plan financially better. There are no hidden costs or surprises - everything is clearly stated from the start."}
                                </p>
                                <ul className="space-y-3 ml-6">
                                    <li className="flex items-start gap-3">
                                        <span className="text-panacea-accent text-xl font-bold mt-1">✓</span>
                                        <span>{locale === "ar" ? "تقديرات تكلفة مفصلة قبل العلاج" : locale === "fr" ? "Estimations de coûts détaillées avant le traitement" : "Detailed cost estimates before treatment"}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-panacea-accent text-xl font-bold mt-1">✓</span>
                                        <span>{locale === "ar" ? "لا توجد تكاليف مخفية" : locale === "fr" ? "Aucun coût caché" : "No hidden costs"}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-panacea-accent text-xl font-bold mt-1">✓</span>
                                        <span>{locale === "ar" ? "تسعير شفاف ومباشر" : locale === "fr" ? "Tarification transparente et directe" : "Transparent and upfront pricing"}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-panacea-accent text-xl font-bold mt-1">✓</span>
                                        <span>{locale === "ar" ? "مساعدة في التخطيط المالي" : locale === "fr" ? "Aide à la planification financière" : "Assistance with financial planning"}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Hospital Logos and Accreditation Badges */}
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-panacea-lg border border-gray-100">
                        <h3 className={`text-2xl md:text-3xl font-bold text-panacea-primary mb-8 text-center`}>
                            {locale === "ar" ? "شبكة المستشفيات المعتمدة" : locale === "fr" ? "Réseau d'Hôpitaux Accrédités" : "Our Accredited Hospital Network"}
                        </h3>

                        {/* Accreditation Badges */}
                        <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
                            <div className="bg-panacea-light rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-20 h-20 bg-panacea-primary rounded-full flex items-center justify-center">
                                        <Award className="w-10 h-10 text-white" />
                                    </div>
                                    <span className="font-bold text-panacea-primary text-sm">JCI Accredited</span>
                                </div>
                            </div>
                            <div className="bg-panacea-light rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-20 h-20 bg-panacea-secondary rounded-full flex items-center justify-center">
                                        <Award className="w-10 h-10 text-white" />
                                    </div>
                                    <span className="font-bold text-panacea-secondary text-sm">NABH Accredited</span>
                                </div>
                            </div>
                            <div className="bg-panacea-light rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-20 h-20 bg-panacea-accent rounded-full flex items-center justify-center">
                                        <Award className="w-10 h-10 text-white" />
                                    </div>
                                    <span className="font-bold text-panacea-accent text-sm">NABL Certified</span>
                                </div>
                            </div>
                        </div>

                        {/* Hospital Logos Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {[
                                "Apollo Hospitals", "Fortis Healthcare", "Max Healthcare",
                                "Medanta", "BLK Max", "Manipal Hospitals"
                            ].map((hospital, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white border-2 border-gray-200 rounded-xl p-6 flex items-center justify-center hover:border-panacea-primary transition-all hover:shadow-md"
                                >
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-panacea-light rounded-lg mx-auto mb-2 flex items-center justify-center">
                                            <span className="text-2xl font-bold text-panacea-primary">
                                                {hospital.charAt(0)}
                                            </span>
                                        </div>
                                        <p className="text-xs font-semibold text-gray-700">{hospital}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className={`text-center text-gray-600 mt-8 ${isRTL ? "text-right" : "text-left"}`}>
                            {locale === "ar"
                                ? "نعمل فقط مع المستشفيات المعتمدة دوليًا والتي تلبي أعلى معايير الجودة والسلامة"
                                : locale === "fr"
                                    ? "Nous travaillons uniquement avec des hôpitaux accrédités internationalement qui répondent aux normes les plus élevées de qualité et de sécurité"
                                    : "We work only with internationally accredited hospitals that meet the highest standards of quality and safety"}
                        </p>
                    </div>
                </div>

                {/* Mission & Vision - Enhanced */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className={`bg-gradient-to-br from-panacea-primary to-panacea-secondary p-8 rounded-2xl text-white shadow-panacea-lg hover:shadow-panacea-xl transition-all ${isRTL ? "text-right" : "text-left"}`}>
                        <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{t("mission") || "Mission"}</h3>
                        <p className="text-white/90 leading-relaxed">{t("missionText") || "To provide unparalleled healthcare services to international patients through innovation, compassion, and a commitment to excellence."}</p>
                    </div>
                    <div className={`bg-gradient-to-br from-panacea-secondary to-panacea-primary p-8 rounded-2xl text-white shadow-panacea-lg hover:shadow-panacea-xl transition-all ${isRTL ? "text-right" : "text-left"}`}>
                        <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{t("vision") || "Vision"}</h3>
                        <p className="text-white/90 leading-relaxed">{t("visionText") || "To be the global leader in medical tourism, renowned for transforming lives through exceptional healthcare experiences."}</p>
                    </div>
                </div>

                {/* Our Values */}
                <div className="max-w-5xl mx-auto">
                    <h2 className={`text-3xl md:text-4xl font-bold text-panacea-primary mb-8 text-center`}>
                        {t("values")}
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className={`p-6 border-2 border-panacea-primary rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                            <h4 className="text-xl font-bold text-panacea-primary mb-3">{t("valuesItems.quality")}</h4>
                            <p className="text-gray-600">{t("valuesItems.qualityDesc")}</p>
                        </div>
                        <div className={`p-6 border-2 border-panacea-primary rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                            <h4 className="text-xl font-bold text-panacea-primary mb-3">{t("valuesItems.transparency")}</h4>
                            <p className="text-gray-600">{t("valuesItems.transparencyDesc")}</p>
                        </div>
                        <div className={`p-6 border-2 border-panacea-primary rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                            <h4 className="text-xl font-bold text-panacea-primary mb-3">{t("valuesItems.support")}</h4>
                            <p className="text-gray-600">{t("valuesItems.supportDesc")}</p>
                        </div>
                        <div className={`p-6 border-2 border-panacea-primary rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                            <h4 className="text-xl font-bold text-panacea-primary mb-3">{t("valuesItems.affordability")}</h4>
                            <p className="text-gray-600">{t("valuesItems.affordabilityDesc")}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
