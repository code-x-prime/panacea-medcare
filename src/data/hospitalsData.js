
import rawHospitals from "./detailedHospitals.json";
import { resolvePublicImageSrc } from "@/lib/publicImage";

const hospitalSEO = {
    "fortis-hospital-gurgaon": {
        seoTitle: {
            en: "Best Hospital in Gurugram | Fortis Memorial Research Institute",
            fr: "Meilleur hôpital de Gurugram | Fortis Memorial Research Institute",
            ar: "أفضل مستشفى في جيروجرام | معهد فورتيس التذكاري للأبحاث"
        },
        seoDescription: {
            en: "Fortis Memorial Research Institute (FMRI) Gurugram is a world-class multi-speciality hospital with advanced care, expert doctors and treatment support by Panacea Medcare.",
            fr: "Le Fortis Memorial Research Institute (FMRI) Gurugram est un hôpital multi-spécialités de classe mondiale offrant des soins avancés, des médecins experts et un soutien au traitement par Panacea Medcare.",
            ar: "معهد فورتيس التذكاري للأبحاث (FMRI) جيروجرام هو مستشفى متعدد التخصصات عالمي المستوى مع رعاية متقدمة وأطباء خبراء ودعم علاج من قبل باناسيا ميد كير."
        }
    },
    "max-hospital-saket": {
        seoTitle: {
            en: "Best Hospital in Saket Delhi | Max Super Speciality Hospital",
            fr: "Meilleur hôpital de Saket Delhi | Max Super Speciality Hospital",
            ar: "أفضل مستشفى في ساكيت دلهي | مستشفى ماكس سوبر سبيشاليتي"
        },
        seoDescription: {
            en: "Max Super Speciality Hospital Saket, Delhi is an accredited hospital with advanced oncology, cardiology and treatment support by Panacea Medcare.",
            fr: "L'hôpital Max Super Speciality Saket, Delhi est un hôpital accrédité avec une oncologie, une cardiologie avancée et un soutien au traitement par Panacea Medcare.",
            ar: "مستشفى ماكس سوبر سبيشاليتي ساكيت، دلهي هو مستشفى معتمد مع أورام وأمراض قلب متقدمة ودعم علاج من قبل باناسيا ميد كير."
        }
    },
    "blk-max-hospital-pusa-road": {
        seoTitle: {
            en: "Best Hospital in Delhi | BLK-Max Super Speciality Hospital | Top Cancer Care",
            fr: "Meilleur hôpital de Delhi | BLK-Max Super Speciality Hospital | Soins du cancer",
            ar: "أفضل مستشفى في دلهي | مستشفى بي إل كي ماكس سوبر سبيشاليتي | رعاية السرطان"
        },
        seoDescription: {
            en: "BLK-Max Hospital Delhi is home to Asia's largest Bone Marrow Transplant center. Leading super speciality care in Cancer, Cardiology, and Organ Transplants.",
            fr: "L'hôpital BLK-Max de Delhi abrite le plus grand centre de greffe de moelle osseuse d'Asie. Soins de pointe en oncologie, cardiologie et greffes d'organes.",
            ar: "مستشفى بي إل كي ماكس دلهي هو موطن لأكبر مركز لزراعة نخاع العظام في آسيا. رعاية تخصصية رائدة في علاج السرطان وأمراض القلب وزراعة الأعضاء."
        }
    },
    "medanta-hospital-gurgaon": {
        seoTitle: {
            en: "Best Hospital in Gurgaon | Medanta The Medicity",
            fr: "Meilleur hôpital de Gurgaon | Medanta The Medicity",
            ar: "أفضل مستشفى في جيرجاون | ميدانتا ذا ميدكيتي"
        },
        seoDescription: {
            en: "Medanta - The Medicity, Gurgaon is a world-class multi-speciality hospital with advanced heart, liver and treatment support by Panacea Medcare.",
            fr: "Medanta - The Medicity, Gurgaon est un hôpital multi-spécialités de classe mondiale avec un soutien cardiaque, hépatique et de traitement avancé par Panacea Medcare.",
            ar: "ميدانتا - ذا ميدكيتي، جيرجاون هو مستشفى متعدد التخصصات عالمي المستوى مع دعم متقدم للقلب والكبد والعلاج من قبل باناسيا ميد كير."
        }
    },
    "apollo-hospital-greams-road-chennai": {
        seoTitle: {
            en: "Best Hospital in Chennai | Apollo Hospital Greams Road",
            fr: "Meilleur hôpital de Chennai | Apollo Hospital Greams Road",
            ar: "أفضل مستشفى في تشيناي | مستشفى أبولو جريمز رود"
        },
        seoDescription: {
            en: "Apollo Hospital Greams Road, Chennai is a leading multi-speciality hospital with advanced cardiology, oncology and treatment support by Panacea Medcare.",
            fr: "L'hôpital Apollo Greams Road, Chennai est un hôpital multi-spécialités de premier plan avec une cardiologie, une oncologie avancée et un soutien au traitement par Panacea Medcare.",
            ar: "مستشفى أبولو جريمز رود، تشيناي هو مستشفى رائد متعدد التخصصات مع أمراض قلب وأورام متقدمة ودعم علاج من قبل باناسيا ميد كير."
        }
    },
    "indraprastha-apollo-hospital-new-delhi": {
        seoTitle: {
            en: "Best Multi-Specialty Hospital in Delhi | Indraprastha Apollo Hospital (JCI)",
            fr: "Meilleur hôpital multi-spécialités de Delhi | Indraprastha Apollo Hospital (JCI)",
            ar: "أفضل مستشفى متعدد التخصصات في دلهي | مستشفى إندرابراستا أبولو (JCI)"
        },
        seoDescription: {
            en: "Indraprastha Apollo Hospital Delhi is a global leader in Liver & Kidney Transplants, Cardiac Surgery & Robotic Surgery. JCI accredited flagship hospital.",
            fr: "L'hôpital Indraprastha Apollo de Delhi est un leader mondial des greffes de foie et de rein, de la chirurgie cardiaque et de la chirurgie robotique. Accrédité JCI.",
            ar: "مستشفى إندرابراستا أبولو دلهي هو قائد عالمي في زراعة الكبد والكلى وجراحة القلب والجراحة الروبوتية. مستشفى رائد معتمد من قبل JCI."
        }
    },
    "manipal-hospital-dwarka": {
        seoTitle: {
            en: "Best Hospital in Dwarka Delhi | Manipal Hospital",
            fr: "Meilleur hôpital de Dwarka Delhi | Manipal Hospital",
            ar: "أفضل مستشفى في دواركا دلهي | مستشفى مانيبال"
        },
        seoDescription: {
            en: "Manipal Hospital Dwarka, New Delhi is a world-class multi-speciality hospital with advanced oncology, orthopedics and treatment support by Panacea Medcare.",
            fr: "L'hôpital Manipal Dwarka, New Delhi est un hôpital multi-spécialités de classe mondiale avec une oncologie, une orthopédie avancée et un soutien au traitement par Panacea Medcare.",
            ar: "مستشفى مانيبال دواركا، نيودلهي هو مستشفى متعدد التخصصات عالمي المستوى مع أورام وجراحة عظام متقدمة ودعم علاج من قبل باناسيا ميد كير."
        }
    },
    "marengo-asia-hospital-gurgaon": {
        seoTitle: {
            en: "Best Hospital in Gurgaon | Marengo Asia Hospital",
            fr: "Meilleur hôpital de Gurgaon | Marengo Asia Hospital",
            ar: "أفضل مستشفى في جيرجاون | مستشفى مارينجو آسيا"
        },
        seoDescription: {
            en: "Marengo Asia Hospital Gurgaon is an accredited multi-speciality hospital with advanced cardiac, neuro and treatment support by Panacea Medcare.",
            fr: "L'hôpital Marengo Asia Gurgaon est un hôpital multi-spécialités accrédité avec un soutien cardiaque, neurologique et de traitement avancé par Panacea Medcare.",
            ar: "مستشفى مارينجو آسيا جيرجاون هو مستشفى معتمد متعدد التخصصات مع دعم متقدم للقلب والأعصاب والعلاج من قبل باناسيا ميد كير."
        }
    },
    "metro-hospital-faridabad": {
        seoTitle: {
            en: "Best Hospital in Faridabad | Metro Hospital & Heart Institute",
            fr: "Meilleur hôpital de Faridabad | Metro Hospital & Heart Institute",
            ar: "أفضل مستشفى في فريد آباد | مستشفى مترو ومعهد القلب"
        },
        seoDescription: {
            en: "Metro Hospital Faridabad is a NABH-accredited 400-bed multi-speciality hospital with centres of excellence in cardiac sciences, oncology, neurosciences and organ transplant.",
            fr: "Metro Hospital Faridabad est un hôpital multi-spécialités de 400 lits accrédité NABH avec des centres d'excellence en sciences cardiaques, oncologie, neurosciences et greffe d'organes.",
            ar: "مستشفى مترو فريد آباد هو مستشفى متعدد التخصصات بسعة 400 سرير معتمد من NABH مع مراكز تميز في علوم القلب والأورام وعلوم الأعصاب وزراعة الأعضاء."
        }
    },
    "yatharth-hospital-greater-noida": {
        seoTitle: {
            en: "Best Hospital in Greater Noida | Yatharth Super Speciality Hospital",
            fr: "Meilleur hôpital de Greater Noida | Yatharth Super Speciality Hospital",
            ar: "أفضل مستشفى في جريتر نويدا | مستشفى ياثارث سوبر التخصصي"
        },
        seoDescription: {
            en: "Yatharth Super Speciality Hospital Greater Noida is a NABH-accredited 400-bed tertiary care hospital with robotic surgery, cancer care, cardiac sciences, neurosciences and organ transplant.",
            fr: "Yatharth Super Speciality Hospital Greater Noida est un hôpital tertiaire de 400 lits accrédité NABH avec chirurgie robotique, oncologie, sciences cardiaques, neurosciences et greffe d'organes.",
            ar: "مستشفى ياثارث سوبر التخصصي جريتر نويدا هو مستشفى رعاية ثالثية بسعة 400 سرير معتمد من NABH مع جراحة روبوتية ورعاية السرطان وعلوم القلب وعلوم الأعصاب وزراعة الأعضاء."
        }
    },
    "rashi-dental-clinic-gurgaon": {
        seoTitle: {
            en: "Best Dental Clinic in Gurgaon | Kapoor's Safe Hands Dental",
            fr: "Meilleure clinique dentaire à Gurgaon | Kapoor's Safe Hands Dental",
            ar: "أفضل عيادة أسنان في جورجاون | مركز كابور للأسنان - الأيدي الآمنة"
        },
        seoDescription: {
            en: "Kapoor's Safe Hands Dental Gurgaon offers cosmetic dentistry, dental implants, Invisalign, root canal therapy and full mouth rehabilitation by expert specialists in Sushant Lok.",
            fr: "Kapoor's Safe Hands Dental Gurgaon propose dentisterie esthétique, implants, Invisalign, traitement de canal et réhabilitation complète à Sushant Lok.",
            ar: "يقدم مركز كابور للأسنان في جورجاون طب الأسنان التجميلي وزراعة الأسنان وإنفيسلاين وعلاج قناة الجذر وإعادة تأهيل الفم الكامل في سوشانت لوك."
        }
    },
    "asian-hospital-delhi": {
        seoTitle: {
            en: "Best Hospital in Faridabad Delhi NCR | Asian Institute of Medical Sciences",
            fr: "Meilleur hôpital de Faridabad Delhi NCR | Asian Institute of Medical Sciences",
            ar: "أفضل مستشفى في فريد آباد دلهي NCR | المعهد الآسيوي للعلوم الطبية"
        },
        seoDescription: {
            en: "Asian Institute of Medical Sciences (Asian Hospital) is a top NABH-accredited multi-specialty hospital in Faridabad. Expert care in Oncology, Orthopedics & more.",
            fr: "L'Asian Institute of Medical Sciences est un hôpital multi-spécialités de premier plan accrédité NABH à Faridabad. Soins d'experts en oncologie et orthopédie.",
            ar: "المعهد الآسيوي للعلوم الطبية (مستشفى أسيا) هو مستشفى رائد متعدد التخصصات معتمد من NABH في فريد آباد. رعاية خبيرة في علاج الأورام وجراحة العظام."
        }
    },
    "stem-rx-hospital-mumbai": {
        seoTitle: {
            en: "Best Stem Cell Treatment in India | Stem Rx Hospital Mumbai",
            fr: "Meilleur traitement par cellules souches en Inde | Hôpital Stem Rx Mumbai",
            ar: "أفضل علاج بالخلايا الجذعية في الهند | مستشفى ستيم آر إكس مومباي"
        },
        seoDescription: {
            en: "Stem Rx Bioscience Solutions Mumbai offers advanced regenerative medicine and cellular therapy with expert support by Panacea Medcare.",
            fr: "Stem Rx Bioscience Solutions Mumbai propose une médecine régénérative et une thérapie cellulaire avancées avec un soutien d'expert par Panacea Medcare.",
            ar: "تقدم ستيم آر إكس حلول العلوم الحيوية مومباي طبًا تجديديًا وعلاجًا خلويًا متقدمًا مع دعم الخبراء من قبل باناسيا ميد كير."
        }
    },
    "neelkanth-maternity-ivf-hospital-gurgaon": {
        seoTitle: {
            en: "Best IVF Center in Gurgaon | Neelkanth Maternity & IVF Hospital",
            fr: "Meilleur centre de FIV à Gurgaon | Neelkanth Maternity & IVF Hospital",
            ar: "أفضل مركز لأطفال الأنابيب في جيرجاون | مستشفى نيلكانث للأمومة وأطفال الأنابيب"
        },
        seoDescription: {
            en: "Neelkanth Maternity & IVF Hospital Gurgaon offers advanced fertility treatments and maternity care with expert support by Panacea Medcare.",
            fr: "L'hôpital Neelkanth Maternity & IVF Gurgaon propose des traitements de fertilité et des soins de maternité avancés avec un soutien d'expert par Panacea Medcare.",
            ar: "يقدم مستشفى نيلكانث للأمومة وأطفال الأنابيب جيرجاون علاجات خصوبة متقدمة ورعاية أمومة مع دعم الخبراء من قبل باناسيا ميد كير."
        }
    },
    "sight-avenue-hospital-gurgaon": {
        seoTitle: {
            en: "Best Eye Hospital in Gurgaon | Sight Avenue Eye Hospital",
            fr: "Meilleur hôpital ophtalmologique de Gurgaon | Sight Avenue Eye Hospital",
            ar: "أفضل مستشفى للعيون في جيرجاون | مستشفى سايت أفينيو للعيون"
        },
        seoDescription: {
            en: "Sight Avenue Eye Hospital Gurgaon offers advanced eye care, cataract, LASIK and vision treatments with expert support by Panacea Medcare.",
            fr: "Sight Avenue Eye Hospital Gurgaon propose des soins oculaires avancés, des traitements de la cataracte, du LASIK et de la vision avec un soutien d'expert par Panacea Medcare.",
            ar: "يقدم مستشفى سايت أفينيو للعيون جيرجاون رعاية متقدمة للعيون وعلاجات المياه البيضاء والليزر والرؤية مع دعم الخبراء من قبل باناسيا ميد كير."
        }
    },
    "tx-hospital-hyderabad": {
        seoTitle: {
            en: "Best Hospital in Hyderabad | TX Hospital",
            fr: "Meilleur hôpital de Hyderabad | TX Hospital",
            ar: "أفضل مستشفى في حيدر آباد | مستشفى TX"
        },
        seoDescription: {
            en: "TX Hospital Hyderabad is a leading multi-speciality hospital with advanced medical care and treatment support by Panacea Medcare.",
            fr: "L'hôpital TX Hyderabad est un hôpital multi-spécialités de premier plan avec un soutien aux soins médicaux et au traitement avancé par Panacea Medcare.",
            ar: "مستشفى TX حيدر آباد هو مستشفى رائد متعدد التخصصات مع دعم رعاية طبية وعلاج متقدم من قبل باناسيا ميد كير."
        }
    },
    "bumrungrad-hospital-thailand": {
        seoTitle: {
            en: "Best Hospital in Thailand | Bumrungrad International Hospital",
            fr: "Meilleur hôpital de Thaïlande | Bumrungrad International Hospital",
            ar: "أفضل مستشفى في تايلاند | مستشفى بومرونغراد الدولي"
        },
        seoDescription: {
            en: "Bumrungrad International Hospital Bangkok is a world-renowned multi-speciality hospital with advanced medical care support by Panacea Medcare.",
            fr: "L'hôpital Bumrungrad International Bangkok est un hôpital multi-spécialités de renommée mondiale avec un soutien aux soins médicaux avancé par Panacea Medcare.",
            ar: "مستشفى بومرونغراد الدولي بانكوك هو مستشفى متعدد التخصصات مشهور عالميًا مع دعم رعاية طبية متقدم من قبل باناسيا ميد كير."
        }
    },
    "memorial-hospital-turkey": {
        seoTitle: {
            en: "Best Hospital in Turkey | Memorial Hospital Group",
            fr: "Meilleur hôpital de Turquie | Memorial Hospital Group",
            ar: "أفضل مستشفى في تركيا | مجموعة مستشفيات ميموريال"
        },
        seoDescription: {
            en: "Memorial Health Group Turkey offers advanced medical treatments and surgeries with world-class care support by Panacea Medcare.",
            fr: "Memorial Health Group Turquie propose des traitements médicaux et des chirurgies avancés avec un soutien aux soins de classe mondiale par Panacea Medcare.",
            ar: "تقدم مجموعة ميموريال الصحية تركيا علاجات طبية وجراحات متقدمة مع دعم رعاية عالمي المستوى من قبل باناسيا ميد كير."
        }
    },
    "nepal-mediciti": {
        seoTitle: {
            en: "Best Hospital in Nepal | Nepal Mediciti Hospital",
            fr: "Meilleur hôpital du Népal | Nepal Mediciti Hospital",
            ar: "أفضل مستشفى في نيبال | مستشفى نيبال ميديسيتي"
        },
        seoDescription: {
            en: "Nepal Mediciti Hospital is a leading multi-speciality hospital in Nepal with advanced medical care support by Panacea Medcare.",
            fr: "L'hôpital Nepal Mediciti est un hôpital multi-spécialités de premier plan au Népal avec un soutien aux soins médicaux avancé par Panacea Medcare.",
            ar: "مستشفى نيبال ميديسيتي هو مستشفى رائد متعدد التخصصات في نيبال مع دعم رعاية طبية متقدم من قبل باناسيا ميد كير."
        }
    },
    "apollo-hospital-mumbai": {
        seoTitle: {
            en: "Best Hospital in Mumbai | Apollo Hospital Navi Mumbai",
            fr: "Meilleur hôpital de Mumbai | Apollo Hospital Navi Mumbai",
            ar: "أفضل مستشفى في مومباي | مستشفى أبولو نافي مومباي"
        },
        seoDescription: {
            en: "Apollo Hospital Navi Mumbai is a leading multi-speciality hospital with advanced tertiary care and treatment support by Panacea Medcare.",
            fr: "L'hôpital Apollo Navi Mumbai est un hôpital multi-spécialités de premier plan avec un soutien aux soins tertiaires et au traitement avancé par Panacea Medcare.",
            ar: "مستشفى أبولو نافي مومباي هو مستشفى رائد متعدد التخصصات مع دعم رعاية ثالثية وعلاج متقدم من قبل باناسيا ميد كير."
        }
    },
    "fortis-hospital-mumbai": {
        seoTitle: {
            en: "Best Hospital in Mumbai | Fortis Hospital Mulund",
            fr: "Meilleur hôpital de Mumbai | Fortis Hospital Mulund",
            ar: "أفضل مستشفى في مومباي | مستشفى فورتيس مولوند"
        },
        seoDescription: {
            en: "Fortis Hospital Mulund, Mumbai is a renowned multi-speciality hospital with advanced cardiac care and treatment support by Panacea Medcare.",
            fr: "L'hôpital Fortis Mulund, Mumbai est un hôpital multi-spécialités de renommée avec un soutien aux soins cardiaques et au traitement avancé par Panacea Medcare.",
            ar: "مستشفى فورتيس مولوند، مومباي هو مستشفى متعدد التخصصات مشهور مع دعم رعاية القلب والعلاج المتقدم من قبل باناسيا ميد كير."
        }
    },
    "apollo-hospital-hyderabad": {
        seoTitle: {
            en: "Best Hospital in Hyderabad | Apollo Hospital Jubilee Hills",
            fr: "Meilleur hôpital de Hyderabad | Apollo Hospital Jubilee Hills",
            ar: "أفضل مستشفى في حيدر آباد | مستشفى أبولو جوبيلي هيلز"
        },
        seoDescription: {
            en: "Apollo Hospital Jubilee Hills, Hyderabad is a world-class multi-speciality hospital with advanced medical care and treatment support by Panacea Medcare.",
            fr: "L'hôpital Apollo Jubilee Hills, Hyderabad est un hôpital multi-spécialités de classe mondiale avec un soutien aux soins médicaux et au traitement avancé par Panacea Medcare.",
            ar: "مستشفى أبولو جوبيلي هيلز، حيدر آباد هو مستشفى متعدد التخصصات عالمي المستوى مع دعم رعاية طبية وعلاج متقدم من قبل باناسيا ميد كير."
        }
    }
};

// Flatten data for easy lookup
const hospitalsMap = {};

if (rawHospitals && rawHospitals.countries) {
    rawHospitals.countries.forEach(country => {
        if (country.cities) {
            country.cities.forEach(city => {
                if (city.hospitals) {
                    city.hospitals.forEach(hospital => {
                        const seo = hospitalSEO[hospital.slug] || {};
                        hospitalsMap[hospital.slug] = {
                            ...hospital,
                            ...seo,
                            city: city.city,
                            country: country.country
                        };
                    });
                }
            });
        }
    });
}

export const hospitalsData = hospitalsMap;

export function getHospitalBySlug(slug) {
    return hospitalsMap[slug] || null;
}

export function getHospitalImage(slug) {
    const hospital = hospitalsMap[slug];
    if (hospital && hospital.images && hospital.images.length > 0) {
        return resolvePublicImageSrc(hospital.images[0]);
    }
    return "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop&auto=format";
}

// Navigation Lists (Maintained structure for UI compatibility)
export const indiaHospitals = {
    "delhi-ncr": [
        { name: "Asian Hospital", slug: "asian-hospital-delhi" },
        { name: "Marengo Asia Hospital, Gurgaon", slug: "marengo-asia-hospital-gurgaon" },
        { name: "Indraprastha Apollo Hospital", slug: "indraprastha-apollo-hospital-new-delhi" },
        { name: "Fortis Hospital Gurgaon", slug: "fortis-hospital-gurgaon" },
        { name: "Max Hospital Saket", slug: "max-hospital-saket" },
        { name: "BLK Max Hospital Pusa Road", slug: "blk-max-hospital-pusa-road" },
        { name: "Medanta Hospital, Gurgaon", slug: "medanta-hospital-gurgaon" },
        { name: "Neelkanth Maternity & IVF Hospital Gurgaon", slug: "neelkanth-maternity-ivf-hospital-gurgaon" },
        { name: "Sight Avenue Hospital Gurgaon", slug: "sight-avenue-hospital-gurgaon" },
        { name: "Manipal Hospital Dwarka", slug: "manipal-hospital-dwarka" },
        { name: "Metro Hospital Faridabad", slug: "metro-hospital-faridabad" },
        { name: "Kapoor's Safe Hands Dental", slug: "rashi-dental-clinic-gurgaon" },
        { name: "Yatharth Hospital Greater Noida", slug: "yatharth-hospital-greater-noida" },
    ],
    "chennai": [
        { name: "Apollo Hospital Greams Road", slug: "apollo-hospital-greams-road-chennai" },
    ],
    "mumbai": [
        { name: "Stem Rx Hospital", slug: "stem-rx-hospital-mumbai" },
        { name: "Apollo Hospital", slug: "apollo-hospital-mumbai" },
        { name: "Fortis Hospital", slug: "fortis-hospital-mumbai" },
        { name: "Lilavati Hospital", slug: "lilavati-hospital-mumbai" },
        { name: "KIMS Hospital", slug: "kims-hospital-mumbai" },
        { name: "Dr. L H Hiranandani Hospital", slug: "hiranandani-hospital-mumbai" },
    ],
    "hyderabad": [
        { name: "TX Hospital", slug: "tx-hospital-hyderabad" },
        { name: "Apollo Hospital", slug: "apollo-hospital-hyderabad" },
        { name: "KIMS Hospital Kondapur", slug: "kims-hospital-hyderabad" },
    ],
};

export const internationalHospitals = {
    "turkey": [
        { name: "Memorial Hospital", slug: "memorial-hospital-turkey" },
    ],
    "thailand": [
        { name: "Bumrungrad Hospital", slug: "bumrungrad-hospital-thailand" },
    ],
    "nepal": [
        { name: "Nepal Mediciti", slug: "nepal-mediciti" },
    ],
    "israel": [
        { name: "Sheba Medical Center", slug: "sheba-medical-center-israel" },
    ],
};
