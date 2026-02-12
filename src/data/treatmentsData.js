
export const treatmentsData = {
    "cardiac": {
        id: "cardiac",
        slug: "cardiac",
        namespace: "treatmentsCardiac",
        icon: "/treatment/cardiac-sciences.svg",
        color: "from-red-50 to-red-100",
        borderColor: "border-red-200 hover:border-red-400",
        subTreatmentKeys: ["cabg", "angiography", "valve", "robotic", "pediatric", "pacemaker", "heartFailure", "tavi"]
    },
    "neurosurgery": {
        id: "neurosurgery",
        slug: "neurosurgery",
        namespace: "treatmentsNeurosurgery",
        icon: "/treatment/neurosciences.svg",
        color: "from-purple-50 to-purple-100",
        borderColor: "border-purple-200 hover:border-purple-400",
        subTreatmentKeys: ["brainTumor", "spine", "stroke", "dbs", "pediatric"]
    },
    "orthopedics": {
        id: "orthopedics",
        slug: "orthopedics",
        namespace: "treatmentsOrthopedics",
        icon: "/treatment/orthopedics-joint-replacement.svg",
        color: "from-panacea-blue-50 to-panacea-blue-100",
        borderColor: "border-panacea-blue-200 hover:border-panacea-blue-400",
        subTreatmentKeys: ["replacement", "arthroscopy", "spine", "trauma", "pediatric"] // Generic/Predicted keys
    },
    "oncology": {
        id: "oncology",
        slug: "oncology",
        namespace: "treatmentsOncology",
        icon: "/treatment/oncology-cancer-care.svg",
        color: "from-pink-50 to-pink-100",
        borderColor: "border-pink-200 hover:border-pink-400",
        subTreatmentKeys: ["medical", "surgical", "radiation", "immunotherapy", "targeted"]
    },
    "bmt": {
        id: "bmt",
        slug: "bmt",
        namespace: "treatmentsBMT",
        icon: "/treatment/bone-marrow-transplant.svg",
        color: "from-cyan-50 to-cyan-100",
        borderColor: "border-cyan-200 hover:border-cyan-400",
        subTreatmentKeys: ["autologous", "allogeneic", "haploidentical", "pediatric", "sickleCell"]
    },
    "organ-transplant": {
        id: "transplant",
        slug: "organ-transplant",
        namespace: "treatmentsOrganTransplant",
        icon: "/treatment/organ-transplantation.svg",
        color: "from-green-50 to-green-100",
        borderColor: "border-green-200 hover:border-green-400",
        subTreatmentKeys: ["liver", "kidney", "heart", "lung", "pancreas"]
    },
    "gastroenterology": {
        id: "gastroenterology",
        slug: "gastroenterology",
        namespace: "treatmentsGastroenterology",
        icon: "/treatment/gastroenterology-hepatology.svg",
        color: "from-yellow-50 to-yellow-100",
        borderColor: "border-yellow-200 hover:border-yellow-400",
        subTreatmentKeys: ["bariatric", "liver", "pancreas", "endoscopy", "colorectal"]
    },
    "gynecology": {
        id: "gynecology",
        slug: "gynecology",
        namespace: "treatmentsGynecology",
        icon: "/treatment/gynecology-women-health.svg",
        color: "from-rose-50 to-rose-100",
        borderColor: "border-rose-200 hover:border-rose-400",
        subTreatmentKeys: ["fibroids", "endometriosis", "infertility", "oncology", "laparoscopy"]
    },
    "pediatrics": {
        id: "pediatrics",
        slug: "pediatrics",
        namespace: "treatmentsPediatrics",
        icon: "/treatment/paediatrics-paediatric-surgery.svg",
        color: "from-indigo-50 to-indigo-100",
        borderColor: "border-indigo-200 hover:border-indigo-400",
        subTreatmentKeys: ["cardiac", "neuro", "ortho", "surgery", "neonatology"]
    },
    "laparoscopic": {
        id: "laparoscopic",
        slug: "laparoscopic",
        namespace: "treatmentsLaparoscopic",
        icon: "/treatment/laparoscopic-surgery.svg",
        color: "from-teal-50 to-teal-100",
        borderColor: "border-teal-200 hover:border-teal-400",
        subTreatmentKeys: ["gallbladder", "hernia", "appendix", "bariatric", "gynae"]
    },
    "robotic": {
        id: "robotic",
        slug: "robotic",
        namespace: "treatmentsRobotic",
        icon: "/treatment/robotic-surgery.svg",
        color: "from-orange-50 to-orange-100",
        borderColor: "border-orange-200 hover:border-orange-400",
        subTreatmentKeys: ["urology", "gynae", "cardiac", "general", "colorectal"]
    },
    "ophthalmology": {
        id: "ophthalmology",
        slug: "ophthalmology",
        namespace: "treatmentsOphthalmology",
        icon: "/treatment/ophthalmology.svg",
        color: "from-violet-50 to-violet-100",
        borderColor: "border-violet-200 hover:border-violet-400",
        subTreatmentKeys: ["cataract", "lasik", "retina", "glaucoma", "cornea"]
    },
    "dental": {
        id: "dental",
        slug: "dental",
        namespace: "treatmentsDental",
        icon: "/treatment/dental-care-cosmetic-dentistry.svg",
        color: "from-sky-50 to-sky-100",
        borderColor: "border-sky-200 hover:border-sky-400",
        subTreatmentKeys: ["implants", "veneers", "rootCanal", "orthodontics", "whitening"]
    },
    "aesthetic": {
        id: "aesthetic",
        slug: "aesthetic",
        namespace: "treatmentsAesthetic",
        icon: "/treatment/aesthetic-cosmetic-plastic-surgery.svg",
        color: "from-fuchsia-50 to-fuchsia-100",
        borderColor: "border-fuchsia-200 hover:border-fuchsia-400",
        subTreatmentKeys: ["liposuction", "rhinoplasty", "breast", "tummyTuck", "hairTransplant"]
    },
    "mental-health": {
        id: "mentalHealth",
        slug: "mental-health",
        namespace: "treatmentsMentalHealth",
        icon: "/treatment/mental-health-wellness.svg",
        color: "from-emerald-50 to-emerald-100",
        borderColor: "border-emerald-200 hover:border-emerald-400",
        subTreatmentKeys: ["depression", "anxiety", "addiction", "rehab", "counseling"]
    },
    "diagnostics": {
        id: "diagnostics",
        slug: "diagnostics",
        namespace: "treatmentsDiagnostics",
        icon: "/treatment/diagnostics-advanced-imaging.svg",
        color: "from-slate-50 to-slate-100",
        borderColor: "border-slate-200 hover:border-slate-400",
        subTreatmentKeys: ["petCt", "mri", "ct", "genetics", "pathology"]
    },
    "rehabilitation": {
        id: "rehabilitation",
        slug: "rehabilitation",
        namespace: "treatmentsRehabilitation",
        icon: "/treatment/rehabilitation-recovery.svg",
        color: "from-amber-50 to-amber-100",
        borderColor: "border-amber-200 hover:border-amber-400",
        subTreatmentKeys: ["neuro", "cardiac", "ortho", "sports", "postOp"]
    },
    "ayurveda": {
        id: "ayurveda",
        slug: "ayurveda",
        namespace: "treatmentsAyurveda",
        icon: "/treatment/ayurveda-holistic-wellness.svg",
        color: "from-lime-50 to-lime-100",
        borderColor: "border-lime-200 hover:border-lime-400",
        subTreatmentKeys: ["panchakarma", "rejuvenation", "weightLoss", "stress", "detox"]
    }
};

export const getTreatmentBySlug = (slug) => {
    return Object.values(treatmentsData).find(t => t.slug === slug);
};

export const getAllTreatmentSlugs = () => {
    return Object.values(treatmentsData).map(t => t.slug);
};
