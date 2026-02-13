export const treatmentsData = {
    "cardiac": {
        id: "cardiac",
        slug: "cardiac",
        namespace: "treatmentsCardiac",
        icon: "/icons/cardiac.svg",
        color: "text-rose-600",
        borderColor: "border-rose-200",
        subTreatmentKeys: ["cabg", "angiography", "valve", "robotic", "pediatric", "pacemaker", "heartFailure", "tavi"]
    },
    "neurosurgery": {
        id: "neurosurgery",
        slug: "neurosurgery",
        namespace: "treatmentsNeurosurgery",
        icon: "/icons/neuro.svg",
        color: "text-blue-600",
        borderColor: "border-blue-200",
        subTreatmentKeys: ["brainTumor", "spine", "stroke", "dbs", "pediatric"]
    },
    "orthopedics": {
        id: "orthopedics",
        slug: "orthopedics",
        namespace: "treatmentsOrthopedics",
        icon: "/icons/ortho.svg",
        color: "text-amber-600",
        borderColor: "border-amber-200",
        subTreatmentKeys: ["knee", "hip", "robotic", "spine", "sports"]
    },
    "oncology": {
        id: "oncology",
        slug: "oncology",
        namespace: "treatmentsOncology",
        icon: "/icons/oncology.svg",
        color: "text-purple-600",
        borderColor: "border-purple-200",
        subTreatmentKeys: ["medical", "surgical", "radiation", "breast", "headNeck"]
    },
    "bmt": {
        id: "bmt",
        slug: "bmt",
        namespace: "treatmentsBMT",
        icon: "/icons/bmt.svg",
        color: "text-red-500",
        borderColor: "border-red-200",
        subTreatmentKeys: ["autologous", "allogeneic", "haploidentical", "pediatric"]
    },
    "organ-transplant": {
        id: "transplant",
        slug: "organ-transplant",
        namespace: "treatmentsOrganTransplant",
        icon: "/icons/transplant.svg",
        color: "text-emerald-600",
        borderColor: "border-emerald-200",
        subTreatmentKeys: ["liver", "kidney", "heart", "lung", "pancreas", "combined"]
    },
    "gastroenterology": {
        id: "gastroenterology",
        slug: "gastroenterology",
        namespace: "treatmentsGastroenterology",
        icon: "/icons/gastro.svg",
        color: "text-orange-500",
        borderColor: "border-orange-200",
        subTreatmentKeys: ["liver", "endoscopy", "ercp", "ibd", "cancer", "bariatric", "pancreas"]
    },
    "gynecology": {
        id: "gynecology",
        slug: "gynecology",
        namespace: "treatmentsGynecology",
        icon: "/icons/gynae.svg",
        color: "text-pink-500",
        borderColor: "border-pink-200",
        subTreatmentKeys: ["fibroid", "endometriosis", "laparoscopic", "oncology", "hormonal", "pregnancy", "ivf"]
    },
    "pediatrics": {
        id: "pediatrics",
        slug: "pediatrics",
        namespace: "treatmentsPediatrics",
        icon: "/icons/pediatric.svg",
        color: "text-sky-500",
        borderColor: "border-sky-200",
        subTreatmentKeys: ["cardiac", "oncology", "nicu", "congenital", "neurology", "growth"]
    },
    "laparoscopic": {
        id: "laparoscopic",
        slug: "laparoscopic",
        namespace: "treatmentsLaparoscopic",
        icon: "/icons/laparoscopic.svg",
        color: "text-teal-600",
        borderColor: "border-teal-200",
        subTreatmentKeys: ["gallbladder", "hernia", "appendix", "hysterectomy", "colorectal", "bariatric", "urology", "cancer"]
    },
    "robotic": {
        id: "robotic",
        slug: "robotic",
        namespace: "treatmentsRobotic",
        icon: "/icons/robotic.svg",
        color: "text-indigo-600",
        borderColor: "border-indigo-200",
        subTreatmentKeys: ["cancer", "urology", "gynecology", "cardiac", "gi"]
    },
    "ophthalmology": {
        id: "ophthalmology",
        slug: "ophthalmology",
        namespace: "treatmentsOphthalmology",
        icon: "/icons/eye.svg",
        color: "text-cyan-600",
        borderColor: "border-cyan-200",
        subTreatmentKeys: ["cataract", "lasik", "cornea", "retina", "glaucoma", "pediatric"]
    },
    "dental": {
        id: "dental",
        slug: "dental",
        namespace: "treatmentsDental",
        icon: "/icons/dental.svg",
        color: "text-blue-500",
        borderColor: "border-blue-200",
        subTreatmentKeys: ["implants", "rehabilitation", "smile", "crowns", "rootCanal", "whitening", "pediatric", "oral"]
    },
    "aesthetic": {
        id: "aesthetic",
        slug: "aesthetic",
        namespace: "treatmentsAesthetic",
        icon: "/icons/aesthetic.svg",
        color: "text-violet-500",
        borderColor: "border-violet-200",
        subTreatmentKeys: ["rhinoplasty", "liposuction", "tummyTuck", "breast", "gynecomastia", "facelift", "botox", "hair"]
    },
    "mental-health": {
        id: "mentalHealth",
        slug: "mental-health",
        namespace: "treatmentsMentalHealth",
        icon: "/icons/mental-health.svg",
        color: "text-green-600",
        borderColor: "border-green-200",
        subTreatmentKeys: ["psychiatry", "depression", "addiction", "stress", "sleep"]
    },
    "diagnostics": {
        id: "diagnostics",
        slug: "diagnostics",
        namespace: "treatmentsDiagnostics",
        icon: "/icons/diagnostics.svg",
        color: "text-gray-600",
        borderColor: "border-gray-200",
        subTreatmentKeys: ["teleradiology", "imaging", "mammography", "cardiac", "interventional", "pathology"]
    },
    "rehabilitation": {
        id: "rehabilitation",
        slug: "rehabilitation",
        namespace: "treatmentsRehabilitation",
        icon: "/icons/rehab.svg",
        color: "text-lime-600",
        borderColor: "border-lime-200",
        subTreatmentKeys: ["physiotherapy", "neuro", "postSurgical", "pain", "sports"]
    },
    "ayurveda": {
        id: "ayurveda",
        slug: "ayurveda",
        namespace: "treatmentsAyurveda",
        icon: "/icons/ayurveda.svg",
        color: "text-green-700",
        borderColor: "border-green-200",
        subTreatmentKeys: ["panchakarma", "arthritis", "chronicPain", "digestive", "diabetes", "stress", "integrative", "wellness"]
    }
};

export const getTreatmentBySlug = (slug) => {
    return Object.values(treatmentsData).find(t => t.slug === slug);
};
