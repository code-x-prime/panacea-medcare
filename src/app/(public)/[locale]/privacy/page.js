"use client";

import TopBanner from "@/components/TopBanner";

export default function PrivacyPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";

    const content = {
        en: {
            title: "Privacy Policy",
            subtitle: "How we protect your information",
            companyName: "Panacea Medcare",
            effectiveDate: "Effective Date: 01-01-2026",
            intro: "Panacea Medcare (\"Panacea Medcare\", \"we\", \"our\", or \"us\") is committed to protecting the privacy, confidentiality, and security of personal and medical information shared by users of our website and services. This Privacy Policy explains how we collect, use, process, store, share, and protect your information, including information processed through AI-enabled healthcare services. By accessing or using our website and services, you agree to the terms of this Privacy Policy.",
            sections: [
                {
                    title: "1. Scope of This Privacy Policy",
                    content: "This Privacy Policy applies to:",
                    items: [
                        "Visitors to www.panaceamedcare.com",
                        "Patients using our AI Pre-Screening and healthcare facilitation services",
                        "Individuals contacting us for medical assistance or information",
                        "Partners interacting with Panacea Medcare digitally"
                    ],
                    note: "This policy applies globally and is designed to align with GDPR-style data protection principles, international healthcare privacy standards, and best practices."
                },
                {
                    title: "2. Information We Collect",
                    subsections: [
                        {
                            subtitle: "2.1 Personal Information",
                            content: "We may collect:",
                            items: [
                                "Full name",
                                "Date of birth / age",
                                "Gender",
                                "Nationality and country of residence",
                                "Email address",
                                "Phone number / WhatsApp number"
                            ]
                        },
                        {
                            subtitle: "2.2 Medical & Health Information",
                            content: "Only when voluntarily provided by you:",
                            items: [
                                "Medical condition details and symptoms",
                                "Medical history and prior treatments",
                                "Diagnostic reports (blood tests, scans, pathology, prescriptions, discharge summaries)",
                                "Current medications and allergies"
                            ]
                        },
                        {
                            subtitle: "2.3 Technical & Usage Information",
                            items: [
                                "IP address",
                                "Browser and device type",
                                "Date, time, and activity logs",
                                "Cookies and similar technologies"
                            ]
                        }
                    ]
                },
                {
                    title: "3. Purpose of Data Collection",
                    content: "Your information is collected and processed to:",
                    items: [
                        "Provide AI-based medical pre-screening",
                        "Facilitate medical consultations and care coordination",
                        "Share preliminary medical insights with partner hospitals and doctors (with consent)",
                        "Respond to inquiries and provide customer support",
                        "Improve platform performance, security, and user experience",
                        "Comply with legal and regulatory obligations"
                    ]
                },
                {
                    title: "4. AI Healthcare & Medical Data Processing",
                    subsections: [
                        {
                            subtitle: "4.1 Purpose of AI Use",
                            content: "Panacea Medcare uses Artificial Intelligence (AI) systems to support:",
                            items: [
                                "Medical pre-screening",
                                "Preliminary clinical insight generation",
                                "Treatment pathway identification",
                                "Faster and more efficient care coordination"
                            ],
                            note: "AI systems are used strictly as decision-support tools and do not replace medical professionals."
                        },
                        {
                            subtitle: "4.2 How AI Systems Use Your Data",
                            content: "AI systems may:",
                            items: [
                                "Read and structure patient-submitted medical information",
                                "Extract clinically relevant indicators from uploaded reports",
                                "Categorize medical conditions for care coordination",
                                "Support treatment feasibility and cost estimation"
                            ],
                            note: "All AI outputs are non-diagnostic and are reviewed or contextualized by trained human care coordinators before being shared."
                        },
                        {
                            subtitle: "4.3 No Automated Medical Decision-Making",
                            content: "Panacea Medcare does not use AI to:",
                            items: [
                                "Diagnose medical conditions",
                                "Prescribe treatments or medications",
                                "Make final clinical decisions"
                            ],
                            note: "Final medical decisions are made only by qualified doctors following proper consultation."
                        }
                    ]
                },
                {
                    title: "5. Legal Basis for Processing",
                    content: "We process personal and medical data based on:",
                    items: [
                        "Explicit user consent",
                        "Legitimate interest in delivering requested healthcare facilitation services",
                        "Contractual necessity where services are requested",
                        "Legal obligations where applicable"
                    ],
                    note: "You may withdraw consent at any time, subject to legal requirements."
                },
                {
                    title: "6. Data Sharing & Disclosure",
                    content: "We may securely share information only with:",
                    items: [
                        "Authorized Panacea Medcare personnel",
                        "Partner hospitals, doctors, and medical institutions (for consultation purposes)",
                        "Technology providers involved in secure AI processing (under strict confidentiality agreements)"
                    ],
                    note: "We do not sell personal or medical data and do not share it for advertising without explicit consent."
                },
                {
                    title: "7. Cross-Border Data Transfers",
                    content: "As an international healthcare facilitation platform, your data may be processed or stored in countries other than your country of residence. Where cross-border transfers occur:",
                    items: [
                        "Appropriate safeguards are implemented",
                        "GDPR-aligned data protection principles are followed",
                        "Access is restricted to authorized personnel"
                    ]
                },
                {
                    title: "8. Data Security",
                    content: "Panacea Medcare implements industry-standard safeguards, including:",
                    items: [
                        "Encrypted data transmission and storage",
                        "Secure servers and access controls",
                        "Role-based access management",
                        "Regular monitoring and security reviews"
                    ],
                    note: "While we take all reasonable measures, no digital system can be guaranteed to be completely secure."
                },
                {
                    title: "9. Data Retention",
                    content: "We retain personal and medical data:",
                    items: [
                        "Only as long as necessary to fulfill the stated purposes",
                        "In accordance with applicable laws, regulations, and contractual obligations"
                    ],
                    note: "Data may be anonymized or securely deleted upon request, subject to legal requirements."
                },
                {
                    title: "10. Your Rights",
                    content: "You have the right to:",
                    items: [
                        "Access your personal and medical data",
                        "Request correction of inaccurate information",
                        "Withdraw consent for data processing",
                        "Request deletion or restriction of data (where legally permitted)"
                    ],
                    note: "Requests can be made by contacting us using the details below."
                },
                {
                    title: "11. Cookies & Tracking Technologies",
                    content: "Our website may use cookies to:",
                    items: [
                        "Improve user experience",
                        "Analyze website traffic",
                        "Enhance security and performance"
                    ],
                    note: "You may manage cookie preferences through your browser settings."
                },
                {
                    title: "12. Children's Privacy",
                    content: "Our services are not intended for minors without the involvement and consent of a parent or legal guardian. By submitting information for a minor, you confirm that you are authorized to do so."
                },
                {
                    title: "13. Third-Party Links",
                    content: "Our website may contain links to third-party websites. Panacea Medcare is not responsible for the privacy practices or content of such websites."
                },
                {
                    title: "14. Changes to This Privacy Policy",
                    content: "We may update this Privacy Policy from time to time to reflect changes in technology, regulations, or services. Updated versions will be published on our website with a revised effective date."
                },
                {
                    title: "15. Contact Information",
                    content: "For questions, concerns, or data requests, contact:",
                    contact: {
                        name: "Panacea Medcare – Data Protection Team",
                        location: "Gurgaon, Delhi NCR, India",
                        email: "care@panaceamedcare.com"
                    }
                },
                {
                    title: "16. Important Medical Disclaimer",
                    content: "Panacea Medcare is an international patient facilitation and care coordination platform. We do not practice medicine and do not guarantee medical outcomes. If you are experiencing a medical emergency, please seek immediate medical attention locally."
                }
            ]
        },
        ar: {
            title: "سياسة الخصوصية",
            subtitle: "كيف نحمي معلوماتك",
            companyName: "باناسيا للرعاية الطبية",
            effectiveDate: "تاريخ النفاذ: 01-01-2026",
            intro: "باناسيا للرعاية الطبية (\"باناسيا للرعاية الطبية\"، \"نحن\"، \"لنا\"، أو \"نا\") ملتزمة بحماية خصوصية وسرية وأمان المعلومات الشخصية والطبية التي يشاركها مستخدمو موقعنا الإلكتروني وخدماتنا. توضح سياسة الخصوصية هذه كيفية جمع واستخدام ومعالجة وتخزين ومشاركة وحماية معلوماتك، بما في ذلك المعلومات المعالجة من خلال خدمات الرعاية الصحية المدعومة بالذكاء الاصطناعي. من خلال الوصول إلى موقعنا الإلكتروني وخدماتنا أو استخدامها، فإنك توافق على شروط سياسة الخصوصية هذه.",
            sections: [
                {
                    title: "1. نطاق سياسة الخصوصية هذه",
                    content: "تنطبق سياسة الخصوصية هذه على:",
                    items: [
                        "زوار www.panaceamedcare.com",
                        "المرضى الذين يستخدمون خدمات الفحص الطبي المسبق بالذكاء الاصطناعي وتسهيل الرعاية الصحية",
                        "الأفراد الذين يتصلون بنا للحصول على المساعدة الطبية أو المعلومات",
                        "الشركاء الذين يتفاعلون مع باناسيا للرعاية الطبية رقمياً"
                    ],
                    note: "تنطبق هذه السياسة عالمياً وهي مصممة لتتماشى مع مبادئ حماية البيانات على غرار اللائحة العامة لحماية البيانات، ومعايير خصوصية الرعاية الصحية الدولية، وأفضل الممارسات."
                },
                {
                    title: "2. المعلومات التي نجمعها",
                    subsections: [
                        {
                            subtitle: "2.1 المعلومات الشخصية",
                            content: "قد نجمع:",
                            items: [
                                "الاسم الكامل",
                                "تاريخ الميلاد / العمر",
                                "الجنس",
                                "الجنسية وبلد الإقامة",
                                "عنوان البريد الإلكتروني",
                                "رقم الهاتف / رقم واتساب"
                            ]
                        },
                        {
                            subtitle: "2.2 المعلومات الطبية والصحية",
                            content: "فقط عند تقديمها طواعية من قبلك:",
                            items: [
                                "تفاصيل الحالة الطبية والأعراض",
                                "التاريخ الطبي والعلاجات السابقة",
                                "التقارير التشخيصية (فحوصات الدم، الفحوصات، علم الأمراض، الوصفات الطبية، ملخصات الخروج)",
                                "الأدوية الحالية والحساسيات"
                            ]
                        },
                        {
                            subtitle: "2.3 المعلومات التقنية واستخدام",
                            items: [
                                "عنوان IP",
                                "نوع المتصفح والجهاز",
                                "التاريخ والوقت وسجلات النشاط",
                                "ملفات تعريف الارتباط والتقنيات المماثلة"
                            ]
                        }
                    ]
                },
                {
                    title: "3. الغرض من جمع البيانات",
                    content: "يتم جمع ومعالجة معلوماتك من أجل:",
                    items: [
                        "توفير الفحص الطبي المسبق القائم على الذكاء الاصطناعي",
                        "تسهيل الاستشارات الطبية وتنسيق الرعاية",
                        "مشاركة الرؤى الطبية الأولية مع المستشفيات والأطباء الشركاء (بموافقة)",
                        "الرد على الاستفسارات وتقديم دعم العملاء",
                        "تحسين أداء المنصة والأمان وتجربة المستخدم",
                        "الامتثال للالتزامات القانونية والتنظيمية"
                    ]
                },
                {
                    title: "4. معالجة بيانات الرعاية الصحية بالذكاء الاصطناعي والبيانات الطبية",
                    subsections: [
                        {
                            subtitle: "4.1 الغرض من استخدام الذكاء الاصطناعي",
                            content: "تستخدم باناسيا للرعاية الطبية أنظمة الذكاء الاصطناعي (AI) لدعم:",
                            items: [
                                "الفحص الطبي المسبق",
                                "توليد الرؤى السريرية الأولية",
                                "تحديد مسار العلاج",
                                "تنسيق الرعاية بشكل أسرع وأكثر كفاءة"
                            ],
                            note: "تُستخدم أنظمة الذكاء الاصطناعي بشكل صارم كأدوات دعم القرار ولا تحل محل المتخصصين الطبيين."
                        },
                        {
                            subtitle: "4.2 كيفية استخدام أنظمة الذكاء الاصطناعي لبياناتك",
                            content: "قد تقوم أنظمة الذكاء الاصطناعي بـ:",
                            items: [
                                "قراءة وتنظيم المعلومات الطبية المقدمة من المرضى",
                                "استخراج المؤشرات السريرية ذات الصلة من التقارير المرفوعة",
                                "تصنيف الحالات الطبية لتنسيق الرعاية",
                                "دعم جدوى العلاج وتقدير التكلفة"
                            ],
                            note: "جميع مخرجات الذكاء الاصطناعي غير تشخيصية ويتم مراجعتها أو وضعها في سياقها من قبل منسقي الرعاية البشرية المدربين قبل مشاركتها."
                        },
                        {
                            subtitle: "4.3 لا يوجد قرار طبي آلي",
                            content: "لا تستخدم باناسيا للرعاية الطبية الذكاء الاصطناعي لـ:",
                            items: [
                                "تشخيص الحالات الطبية",
                                "وصف العلاجات أو الأدوية",
                                "اتخاذ القرارات السريرية النهائية"
                            ],
                            note: "يتم اتخاذ القرارات الطبية النهائية فقط من قبل الأطباء المؤهلين بعد الاستشارة المناسبة."
                        }
                    ]
                },
                {
                    title: "5. الأساس القانوني للمعالجة",
                    content: "نقوم بمعالجة البيانات الشخصية والطبية بناءً على:",
                    items: [
                        "موافقة المستخدم الصريحة",
                        "المصلحة المشروعة في تقديم خدمات تسهيل الرعاية الصحية المطلوبة",
                        "الضرورة التعاقدية حيث يتم طلب الخدمات",
                        "الالتزامات القانونية حيثما ينطبق ذلك"
                    ],
                    note: "يمكنك سحب الموافقة في أي وقت، مع مراعاة المتطلبات القانونية."
                },
                {
                    title: "6. مشاركة البيانات والإفصاح",
                    content: "قد نشارك المعلومات بشكل آمن فقط مع:",
                    items: [
                        "موظفي باناسيا للرعاية الطبية المصرح لهم",
                        "المستشفيات والأطباء والمؤسسات الطبية الشريكة (لأغراض الاستشارة)",
                        "مقدمي التكنولوجيا المشاركين في معالجة الذكاء الاصطناعي الآمنة (بموجب اتفاقيات سرية صارمة)"
                    ],
                    note: "لا نبيع البيانات الشخصية أو الطبية ولا نشاركها للإعلان دون موافقة صريحة."
                },
                {
                    title: "7. نقل البيانات عبر الحدود",
                    content: "كمنصة دولية لتسهيل الرعاية الصحية، قد تتم معالجة بياناتك أو تخزينها في بلدان غير بلد إقامتك. حيثما يحدث نقل عبر الحدود:",
                    items: [
                        "يتم تنفيذ ضمانات مناسبة",
                        "يتم اتباع مبادئ حماية البيانات المتماشية مع اللائحة العامة لحماية البيانات",
                        "يقتصر الوصول على الموظفين المصرح لهم"
                    ]
                },
                {
                    title: "8. أمان البيانات",
                    content: "تنفذ باناسيا للرعاية الطبية ضمانات معيارية في الصناعة، بما في ذلك:",
                    items: [
                        "تشفير نقل وتخزين البيانات",
                        "خوادم آمنة وضوابط الوصول",
                        "إدارة الوصول القائمة على الأدوار",
                        "المراقبة المنتظمة ومراجعات الأمان"
                    ],
                    note: "بينما نتخذ جميع التدابير المعقولة، لا يمكن ضمان أن أي نظام رقمي آمن تماماً."
                },
                {
                    title: "9. الاحتفاظ بالبيانات",
                    content: "نحتفظ بالبيانات الشخصية والطبية:",
                    items: [
                        "فقط طالما كان ذلك ضرورياً لتحقيق الأغراض المذكورة",
                        "وفقاً للقوانين واللوائح والالتزامات التعاقدية المعمول بها"
                    ],
                    note: "قد يتم إخفاء هوية البيانات أو حذفها بشكل آمن عند الطلب، مع مراعاة المتطلبات القانونية."
                },
                {
                    title: "10. حقوقك",
                    content: "لديك الحق في:",
                    items: [
                        "الوصول إلى بياناتك الشخصية والطبية",
                        "طلب تصحيح المعلومات غير الدقيقة",
                        "سحب الموافقة على معالجة البيانات",
                        "طلب حذف أو تقييد البيانات (حيثما يسمح القانون بذلك)"
                    ],
                    note: "يمكن تقديم الطلبات من خلال الاتصال بنا باستخدام التفاصيل أدناه."
                },
                {
                    title: "11. ملفات تعريف الارتباط وتقنيات التتبع",
                    content: "قد يستخدم موقعنا الإلكتروني ملفات تعريف الارتباط لـ:",
                    items: [
                        "تحسين تجربة المستخدم",
                        "تحليل حركة مرور الموقع",
                        "تعزيز الأمان والأداء"
                    ],
                    note: "يمكنك إدارة تفضيلات ملفات تعريف الارتباط من خلال إعدادات المتصفح."
                },
                {
                    title: "12. خصوصية الأطفال",
                    content: "خدماتنا غير مخصصة للقاصرين دون مشاركة وموافقة الوالدين أو الوصي القانوني. من خلال تقديم معلومات لقاصر، فإنك تؤكد أنك مخول للقيام بذلك."
                },
                {
                    title: "13. روابط الطرف الثالث",
                    content: "قد يحتوي موقعنا الإلكتروني على روابط لمواقع ويب تابعة لأطراف ثالثة. باناسيا للرعاية الطبية غير مسؤولة عن ممارسات الخصوصية أو محتوى هذه المواقع."
                },
                {
                    title: "14. التغييرات على سياسة الخصوصية هذه",
                    content: "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر لتعكس التغييرات في التكنولوجيا أو اللوائح أو الخدمات. سيتم نشر الإصدارات المحدثة على موقعنا الإلكتروني مع تاريخ نفاذ محدث."
                },
                {
                    title: "15. معلومات الاتصال",
                    content: "للأسئلة أو المخاوف أو طلبات البيانات، اتصل بـ:",
                    contact: {
                        name: "باناسيا للرعاية الطبية – فريق حماية البيانات",
                        location: "جورجاون، دلهي NCR، الهند",
                        email: "care@panaceamedcare.com"
                    }
                },
                {
                    title: "16. إخلاء المسؤولية الطبية المهم",
                    content: "باناسيا للرعاية الطبية هي منصة دولية لتسهيل المرضى وتنسيق الرعاية. نحن لا نمارس الطب ولا نضمن النتائج الطبية. إذا كنت تعاني من حالة طبية طارئة، يرجى طلب الرعاية الطبية الفورية محلياً."
                }
            ]
        },
        fr: {
            title: "Politique de confidentialité",
            subtitle: "Comment nous protégeons vos informations",
            companyName: "Panacea Medcare",
            effectiveDate: "Date d'entrée en vigueur : 01-01-2026",
            intro: "Panacea Medcare (« Panacea Medcare », « nous », « notre » ou « nos ») s'engage à protéger la confidentialité, la confidentialité et la sécurité des informations personnelles et médicales partagées par les utilisateurs de notre site Web et de nos services. Cette politique de confidentialité explique comment nous collectons, utilisons, traitons, stockons, partageons et protégeons vos informations, y compris les informations traitées via les services de santé alimentés par l'IA. En accédant ou en utilisant notre site Web et nos services, vous acceptez les termes de cette politique de confidentialité.",
            sections: [
                {
                    title: "1. Portée de cette politique de confidentialité",
                    content: "Cette politique de confidentialité s'applique à :",
                    items: [
                        "Les visiteurs de www.panaceamedcare.com",
                        "Les patients utilisant nos services de pré-dépistage IA et de facilitation des soins de santé",
                        "Les personnes nous contactant pour une assistance médicale ou des informations",
                        "Les partenaires interagissant numériquement avec Panacea Medcare"
                    ],
                    note: "Cette politique s'applique à l'échelle mondiale et est conçue pour s'aligner sur les principes de protection des données de type RGPD, les normes internationales de confidentialité des soins de santé et les meilleures pratiques."
                },
                {
                    title: "2. Informations que nous collectons",
                    subsections: [
                        {
                            subtitle: "2.1 Informations personnelles",
                            content: "Nous pouvons collecter :",
                            items: [
                                "Nom complet",
                                "Date de naissance / âge",
                                "Sexe",
                                "Nationalité et pays de résidence",
                                "Adresse e-mail",
                                "Numéro de téléphone / numéro WhatsApp"
                            ]
                        },
                        {
                            subtitle: "2.2 Informations médicales et de santé",
                            content: "Uniquement lorsqu'elles sont fournies volontairement par vous :",
                            items: [
                                "Détails de l'état médical et symptômes",
                                "Antécédents médicaux et traitements antérieurs",
                                "Rapports de diagnostic (analyses sanguines, scanners, pathologie, ordonnances, résumés de sortie)",
                                "Médicaments actuels et allergies"
                            ]
                        },
                        {
                            subtitle: "2.3 Informations techniques et d'utilisation",
                            items: [
                                "Adresse IP",
                                "Type de navigateur et d'appareil",
                                "Date, heure et journaux d'activité",
                                "Cookies et technologies similaires"
                            ]
                        }
                    ]
                },
                {
                    title: "3. Objectif de la collecte de données",
                    content: "Vos informations sont collectées et traitées pour :",
                    items: [
                        "Fournir un pré-dépistage médical basé sur l'IA",
                        "Faciliter les consultations médicales et la coordination des soins",
                        "Partager des informations médicales préliminaires avec les hôpitaux et médecins partenaires (avec consentement)",
                        "Répondre aux demandes et fournir un support client",
                        "Améliorer les performances de la plateforme, la sécurité et l'expérience utilisateur",
                        "Se conformer aux obligations légales et réglementaires"
                    ]
                },
                {
                    title: "4. Traitement des données de santé par IA et données médicales",
                    subsections: [
                        {
                            subtitle: "4.1 Objectif de l'utilisation de l'IA",
                            content: "Panacea Medcare utilise des systèmes d'intelligence artificielle (IA) pour soutenir :",
                            items: [
                                "Le pré-dépistage médical",
                                "La génération d'informations cliniques préliminaires",
                                "L'identification des voies de traitement",
                                "Une coordination des soins plus rapide et plus efficace"
                            ],
                            note: "Les systèmes d'IA sont utilisés strictement comme outils d'aide à la décision et ne remplacent pas les professionnels de la santé."
                        },
                        {
                            subtitle: "4.2 Comment les systèmes d'IA utilisent vos données",
                            content: "Les systèmes d'IA peuvent :",
                            items: [
                                "Lire et structurer les informations médicales soumises par les patients",
                                "Extraire des indicateurs cliniquement pertinents des rapports téléchargés",
                                "Catégoriser les conditions médicales pour la coordination des soins",
                                "Soutenir la faisabilité du traitement et l'estimation des coûts"
                            ],
                            note: "Toutes les sorties d'IA sont non diagnostiques et sont examinées ou contextualisées par des coordinateurs de soins humains formés avant d'être partagées."
                        },
                        {
                            subtitle: "4.3 Aucune prise de décision médicale automatisée",
                            content: "Panacea Medcare n'utilise pas l'IA pour :",
                            items: [
                                "Diagnostiquer des conditions médicales",
                                "Prescrire des traitements ou des médicaments",
                                "Prendre des décisions cliniques finales"
                            ],
                            note: "Les décisions médicales finales sont prises uniquement par des médecins qualifiés après une consultation appropriée."
                        }
                    ]
                },
                {
                    title: "5. Base légale du traitement",
                    content: "Nous traitons les données personnelles et médicales sur la base de :",
                    items: [
                        "Le consentement explicite de l'utilisateur",
                        "L'intérêt légitime à fournir les services de facilitation des soins de santé demandés",
                        "La nécessité contractuelle lorsque des services sont demandés",
                        "Les obligations légales le cas échéant"
                    ],
                    note: "Vous pouvez retirer votre consentement à tout moment, sous réserve des exigences légales."
                },
                {
                    title: "6. Partage et divulgation de données",
                    content: "Nous pouvons partager des informations de manière sécurisée uniquement avec :",
                    items: [
                        "Le personnel autorisé de Panacea Medcare",
                        "Les hôpitaux partenaires, médecins et institutions médicales (à des fins de consultation)",
                        "Les fournisseurs de technologie impliqués dans le traitement sécurisé de l'IA (sous des accords de confidentialité stricts)"
                    ],
                    note: "Nous ne vendons pas de données personnelles ou médicales et ne les partageons pas à des fins publicitaires sans consentement explicite."
                },
                {
                    title: "7. Transferts de données transfrontaliers",
                    content: "En tant que plateforme internationale de facilitation des soins de santé, vos données peuvent être traitées ou stockées dans des pays autres que votre pays de résidence. Lorsque des transferts transfrontaliers se produisent :",
                    items: [
                        "Des garanties appropriées sont mises en place",
                        "Les principes de protection des données alignés sur le RGPD sont suivis",
                        "L'accès est restreint au personnel autorisé"
                    ]
                },
                {
                    title: "8. Sécurité des données",
                    content: "Panacea Medcare met en œuvre des garanties standard de l'industrie, notamment :",
                    items: [
                        "Le cryptage de la transmission et du stockage des données",
                        "Des serveurs sécurisés et des contrôles d'accès",
                        "La gestion de l'accès basée sur les rôles",
                        "La surveillance régulière et les examens de sécurité"
                    ],
                    note: "Bien que nous prenions toutes les mesures raisonnables, aucun système numérique ne peut être garanti comme étant complètement sécurisé."
                },
                {
                    title: "9. Conservation des données",
                    content: "Nous conservons les données personnelles et médicales :",
                    items: [
                        "Uniquement aussi longtemps que nécessaire pour remplir les objectifs énoncés",
                        "Conformément aux lois, réglementations et obligations contractuelles applicables"
                    ],
                    note: "Les données peuvent être anonymisées ou supprimées de manière sécurisée sur demande, sous réserve des exigences légales."
                },
                {
                    title: "10. Vos droits",
                    content: "Vous avez le droit de :",
                    items: [
                        "Accéder à vos données personnelles et médicales",
                        "Demander la correction d'informations inexactes",
                        "Retirer votre consentement au traitement des données",
                        "Demander la suppression ou la restriction des données (lorsque cela est légalement permis)"
                    ],
                    note: "Les demandes peuvent être faites en nous contactant en utilisant les coordonnées ci-dessous."
                },
                {
                    title: "11. Cookies et technologies de suivi",
                    content: "Notre site Web peut utiliser des cookies pour :",
                    items: [
                        "Améliorer l'expérience utilisateur",
                        "Analyser le trafic du site Web",
                        "Améliorer la sécurité et les performances"
                    ],
                    note: "Vous pouvez gérer les préférences de cookies via les paramètres de votre navigateur."
                },
                {
                    title: "12. Confidentialité des enfants",
                    content: "Nos services ne sont pas destinés aux mineurs sans l'implication et le consentement d'un parent ou tuteur légal. En soumettant des informations pour un mineur, vous confirmez que vous êtes autorisé à le faire."
                },
                {
                    title: "13. Liens tiers",
                    content: "Notre site Web peut contenir des liens vers des sites Web tiers. Panacea Medcare n'est pas responsable des pratiques de confidentialité ou du contenu de ces sites Web."
                },
                {
                    title: "14. Modifications de cette politique de confidentialité",
                    content: "Nous pouvons mettre à jour cette politique de confidentialité de temps à autre pour refléter les changements dans la technologie, les réglementations ou les services. Les versions mises à jour seront publiées sur notre site Web avec une date d'entrée en vigueur révisée."
                },
                {
                    title: "15. Informations de contact",
                    content: "Pour les questions, préoccupations ou demandes de données, contactez :",
                    contact: {
                        name: "Panacea Medcare – Équipe de protection des données",
                        location: "Gurgaon, Delhi NCR, Inde",
                        email: "care@panaceamedcare.com"
                    }
                },
                {
                    title: "16. Avertissement médical important",
                    content: "Panacea Medcare est une plateforme internationale de facilitation des patients et de coordination des soins. Nous ne pratiquons pas la médecine et ne garantissons pas les résultats médicaux. Si vous rencontrez une urgence médicale, veuillez consulter immédiatement un médecin localement."
                }
            ]
        }
    };

    const t = content[locale] || content.en;

    return (
        <main dir={isRTL ? "rtl" : "ltr"} className="bg-panacea-light">
            <TopBanner
                locale={locale}
                namespace="heroSection"
                title={t.title}
                subtitle={t.subtitle}
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 xl:max-w-7xl sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className={`mb-8 ${isRTL ? "text-right" : "text-left"}`}>
                        <h1 className="text-3xl md:text-4xl font-bold text-panacea-primary mb-4">
                            {t.title}
                        </h1>
                        <p className="text-xl font-semibold text-panacea-dark mb-2">
                            {t.companyName}
                        </p>
                        <p className="text-base text-panacea-gray">
                            {t.effectiveDate}
                        </p>
                    </div>

                    {/* Introduction */}
                    <div className={`bg-white p-6 md:p-8 rounded-xl shadow-panacea mb-8 ${isRTL ? "text-right" : "text-left"}`}>
                        <p className="text-lg text-panacea-gray leading-relaxed">
                            {t.intro}
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-6">
                        {t.sections.map((section, index) => (
                            <div key={index} className={`bg-white p-6 md:p-8 rounded-xl shadow-panacea hover:shadow-panacea-lg transition-all ${isRTL ? "text-right" : "text-left"}`}>
                                <h2 className="text-2xl md:text-3xl font-bold text-panacea-primary mb-4 border-b-2 border-panacea-blue-100 pb-3">
                                    {section.title}
                                </h2>
                                
                                {section.content && (
                                    <p className={`text-lg text-panacea-gray mb-4 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                                        {section.content}
                                    </p>
                                )}

                                {section.items && (
                                    <ul className={`space-y-2 mb-4 ${isRTL ? "pr-6" : "pl-6"}`}>
                                        {section.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className="text-panacea-gray flex items-start">
                                                <span className={`text-panacea-primary font-bold mr-2 ${isRTL ? "ml-2 mr-0" : ""}`}>•</span>
                                                <span className="flex-1">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {section.subsections && (
                                    <div className="space-y-6 mt-6">
                                        {section.subsections.map((subsection, subIndex) => (
                                            <div key={subIndex} className="border-l-4 border-panacea-primary pl-4 md:pl-6">
                                                <h3 className="text-xl md:text-2xl font-bold text-panacea-dark mb-3">
                                                    {subsection.subtitle}
                                                </h3>
                                                {subsection.content && (
                                                    <p className={`text-panacea-gray mb-3 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                                                        {subsection.content}
                                                    </p>
                                                )}
                                                {subsection.items && (
                                                    <ul className={`space-y-2 mb-3 ${isRTL ? "pr-6" : "pl-6"}`}>
                                                        {subsection.items.map((item, itemIndex) => (
                                                            <li key={itemIndex} className="text-panacea-gray flex items-start">
                                                                <span className={`text-panacea-primary font-bold mr-2 ${isRTL ? "ml-2 mr-0" : ""}`}>•</span>
                                                                <span className="flex-1">{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                                {subsection.note && (
                                                    <p className={`text-base text-panacea-gray italic bg-panacea-blue-50 p-4 rounded-lg mt-3 ${isRTL ? "text-right" : "text-left"}`}>
                                                        {subsection.note}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {section.note && (
                                    <p className={`text-base text-panacea-gray italic bg-panacea-blue-50 p-4 rounded-lg mt-4 ${isRTL ? "text-right" : "text-left"}`}>
                                        {section.note}
                                    </p>
                                )}

                                {section.contact && (
                                    <div className={`mt-4 p-4 bg-panacea-blue-50 rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                                        <p className="text-lg font-semibold text-panacea-dark mb-2">
                                            {section.contact.name}
                                        </p>
                                        <p className="text-panacea-gray mb-1">
                                            📍 {section.contact.location}
                                        </p>
                                        <p className="text-panacea-gray">
                                            📧 <a href={`mailto:${section.contact.email}`} className="text-panacea-primary hover:text-panacea-blue-600 underline">
                                                {section.contact.email}
                                            </a>
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
