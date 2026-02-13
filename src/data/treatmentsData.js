export const treatmentsData = {
    "cardiac": {
        id: "cardiac",
        slug: "cardiac",
        namespace: "treatmentsCardiac",
        icon: "/treatment/cardiac-sciences.svg",
        color: "text-rose-600",
        borderColor: "border-rose-200",
        subTreatmentKeys: ["cabg", "angiography", "valve", "robotic", "pediatric", "pacemaker", "heartFailure", "tavi"]
    },
    "neurosurgery": {
        id: "neurosurgery",
        slug: "neurosurgery",
        namespace: "treatmentsNeurosurgery",
        icon: "/treatment/neurosciences.svg",
        color: "text-blue-600",
        borderColor: "border-blue-200",
        subTreatmentKeys: ["brainTumor", "spine", "stroke", "dbs", "pediatric"]
    },
    "orthopedics": {
        id: "orthopedics",
        slug: "orthopedics",
        namespace: "treatmentsOrthopedics",
        icon: "/treatment/orthopedics-joint-replacement.svg",
        color: "text-amber-600",
        borderColor: "border-amber-200",
        subTreatmentKeys: ["knee", "hip", "robotic", "spine", "sports"]
    },
    "oncology": {
        id: "oncology",
        slug: "oncology",
        namespace: "treatmentsOncology",
        icon: "/treatment/oncology-cancer-care.svg",
        color: "text-purple-600",
        borderColor: "border-purple-200",
        subTreatmentKeys: ["medical", "surgical", "radiation", "breast", "headNeck"]
    },
    "bmt": {
        id: "bmt",
        slug: "bmt",
        namespace: "treatmentsBMT",
        icon: "/treatment/bone-marrow-transplant.svg",
        color: "text-red-500",
        borderColor: "border-red-200",
        subTreatmentKeys: ["autologous", "allogeneic", "haploidentical", "pediatric"]
    },
    "organ-transplant": {
        id: "transplant",
        slug: "organ-transplant",
        namespace: "treatmentsOrganTransplant",
        icon: "/treatment/organ-transplantation.svg",
        color: "text-emerald-600",
        borderColor: "border-emerald-200",
        subTreatmentKeys: ["liver", "kidney", "heart", "lung", "pancreas", "combined"]
    },
    "gastroenterology": {
        id: "gastroenterology",
        slug: "gastroenterology",
        namespace: "treatmentsGastroenterology",
        icon: "/treatment/gastroenterology-hepatology.svg",
        color: "text-orange-500",
        borderColor: "border-orange-200",
        subTreatmentKeys: ["liver", "endoscopy", "ercp", "ibd", "cancer", "bariatric", "pancreas"]
    },
    "gynecology": {
        id: "gynecology",
        slug: "gynecology",
        namespace: "treatmentsGynecology",
        icon: "/treatment/gynecology-women-health.svg",
        color: "text-pink-500",
        borderColor: "border-pink-200",
        subTreatmentKeys: ["fibroid", "endometriosis", "laparoscopic", "oncology", "hormonal", "pregnancy", "ivf"]
    },
    "pediatrics": {
        id: "pediatrics",
        slug: "pediatrics",
        namespace: "treatmentsPediatrics",
        icon: "/treatment/paediatrics-paediatric-surgery.svg",
        color: "text-sky-500",
        borderColor: "border-sky-200",
        subTreatmentKeys: ["cardiac", "oncology", "nicu", "congenital", "neurology", "growth"]
    },
    "laparoscopic": {
        id: "laparoscopic",
        slug: "laparoscopic",
        namespace: "treatmentsLaparoscopic",
        icon: "/treatment/laparoscopic-surgery.svg",
        color: "text-teal-600",
        borderColor: "border-teal-200",
        subTreatmentKeys: ["gallbladder", "hernia", "appendix", "hysterectomy", "colorectal", "bariatric", "urology", "cancer"]
    },
    "robotic": {
        id: "robotic",
        slug: "robotic",
        namespace: "treatmentsRobotic",
        icon: "/treatment/robotic-surgery.svg",
        color: "text-indigo-600",
        borderColor: "border-indigo-200",
        subTreatmentKeys: ["cancer", "urology", "gynecology", "cardiac", "gi"]
    },
    "ophthalmology": {
        id: "ophthalmology",
        slug: "ophthalmology",
        namespace: "treatmentsOphthalmology",
        icon: "/treatment/ophthalmology.svg",
        color: "text-cyan-600",
        borderColor: "border-cyan-200",
        subTreatmentKeys: ["cataract", "lasik", "cornea", "retina", "glaucoma", "pediatric"]
    },
    "dental": {
        id: "dental",
        slug: "dental",
        namespace: "treatmentsDental",
        icon: "/treatment/dental-care-cosmetic-dentistry.svg",
        color: "text-blue-500",
        borderColor: "border-blue-200",
        subTreatmentKeys: ["implants", "rehabilitation", "smile", "crowns", "rootCanal", "whitening", "pediatric", "oral"]
    },
    "aesthetic": {
        id: "aesthetic",
        slug: "aesthetic",
        namespace: "treatmentsAesthetic",
        icon: "/treatment/aesthetic-cosmetic-plastic-surgery.svg",
        color: "text-violet-500",
        borderColor: "border-violet-200",
        subTreatmentKeys: ["rhinoplasty", "liposuction", "tummyTuck", "breast", "gynecomastia", "facelift", "botox", "hair"]
    },
    "mental-health": {
        id: "mentalHealth",
        slug: "mental-health",
        namespace: "treatmentsMentalHealth",
        icon: "/treatment/mental-health-wellness.svg",
        color: "text-green-600",
        borderColor: "border-green-200",
        subTreatmentKeys: ["psychiatry", "depression", "addiction", "stress", "sleep"]
    },
    "diagnostics": {
        id: "diagnostics",
        slug: "diagnostics",
        namespace: "treatmentsDiagnostics",
        icon: "/treatment/diagnostics-advanced-imaging.svg",
        color: "text-gray-600",
        borderColor: "border-gray-200",
        subTreatmentKeys: ["teleradiology", "imaging", "mammography", "cardiac", "interventional", "pathology"]
    },
    "rehabilitation": {
        id: "rehabilitation",
        slug: "rehabilitation",
        namespace: "treatmentsRehabilitation",
        icon: "/treatment/rehabilitation-recovery.svg",
        color: "text-lime-600",
        borderColor: "border-lime-200",
        subTreatmentKeys: ["physiotherapy", "neuro", "postSurgical", "pain", "sports"]
    },
    "ayurveda": {
        id: "ayurveda",
        slug: "ayurveda",
        namespace: "treatmentsAyurveda",
        icon: "/treatment/ayurveda-holistic-wellness.svg",
        color: "text-green-700",
        borderColor: "border-green-200",
        subTreatmentKeys: ["panchakarma", "arthritis", "chronicPain", "digestive", "diabetes", "stress", "integrative", "wellness"]
    }
};

export const getTreatmentBySlug = (slug) => {
    return Object.values(treatmentsData).find(t => t.slug === slug);
};
