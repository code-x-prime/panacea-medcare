export const destinations = {
    agra: {
        title: {
            ar: "أجرا - موطن تاج محل الشهير",
            fr: "Agra - Maison du célèbre Taj Mahal",
            en: "Agra - Home of the iconic Taj Mahal"
        },
        description: {
            ar: "استكشف جمال تاج محل، أحد عجائب الدنيا السبع، واستمتع بالتراث الثقافي الغني لأجرا.",
            fr: "Explorez la beauté du Taj Mahal, l'une des sept merveilles du monde, et profitez du riche patrimoine culturel d'Agra.",
            en: "Explore the beauty of the Taj Mahal, one of the Seven Wonders of the World, and enjoy the rich cultural heritage of Agra."
        },
        highlights: {
            ar: ["تاج محل", "قلعة أجرا", "فاتحبور سيكري", "جولات ثقافية"],
            fr: ["Taj Mahal", "Fort d'Agra", "Fatehpur Sikri", "Visites culturelles"],
            en: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri", "Cultural Tours"]
        },
        image: "/agra.jpg"
    },
    kerala: {
        title: {
            ar: "كيرالا - الممرات المائية والرفاهية الأيورفيدية",
            fr: "Kerala - Backwaters et bien-être ayurvédique",
            en: "Kerala - Backwaters and Ayurvedic wellness"
        },
        description: {
            ar: "استرخ في الممرات المائية الهادئة واستمتع بعلاجات الأيورفيدا التقليدية في ولاية كيرالا الخضراء.",
            fr: "Détendez-vous dans les backwaters paisibles et profitez des traitements ayurvédiques traditionnels dans le Kerala verdoyant.",
            en: "Relax in the serene backwaters and enjoy traditional Ayurvedic treatments in the lush state of Kerala."
        },
        highlights: {
            ar: ["الممرات المائية", "علاجات الأيورفيدا", "الشواطئ", "الطبيعة الخضراء"],
            fr: ["Backwaters", "Traitements ayurvédiques", "Plages", "Nature luxuriante"],
            en: ["Backwaters", "Ayurvedic Treatments", "Beaches", "Lush Nature"]
        },
        image: "/kerala.jpg"
    },
    goa: {
        title: {
            ar: "غوا - الشواطئ الجميلة والتراث البرتغالي",
            fr: "Goa - Belles plages et patrimoine portugais",
            en: "Goa - Beautiful beaches and Portuguese heritage"
        },
        description: {
            ar: "استمتع بالشواطئ الذهبية والهندسة المعمارية البرتغالية الفريدة في غوا.",
            fr: "Profitez des plages dorées et de l'architecture portugaise unique à Goa.",
            en: "Enjoy the golden beaches and unique Portuguese architecture in Goa."
        },
        highlights: {
            ar: ["الشواطئ", "التراث البرتغالي", "المأكولات البحرية", "الحياة الليلية"],
            fr: ["Plages", "Patrimoine portugais", "Fruits de mer", "Vie nocturne"],
            en: ["Beaches", "Portuguese Heritage", "Seafood", "Nightlife"]
        },
        image: "/goa.jpg"
    },
    rajasthan: {
        title: {
            ar: "راجستان - القصور الملكية وتجارب الصحراء",
            fr: "Rajasthan - Palais royaux et expériences désertiques",
            en: "Rajasthan - Royal palaces and desert experiences"
        },
        description: {
            ar: "اكتشف القصور الملكية الفخمة وتجارب الصحراء السحرية في راجستان.",
            fr: "Découvrez les palais royaux majestueux et les expériences désertiques magiques au Rajasthan.",
            en: "Discover the majestic royal palaces and magical desert experiences in Rajasthan."
        },
        highlights: {
            ar: ["القصور الملكية", "تجارب الصحراء", "الثقافة الملكية", "المهرجانات"],
            fr: ["Palais royaux", "Expériences désertiques", "Culture royale", "Festivals"],
            en: ["Royal Palaces", "Desert Experiences", "Royal Culture", "Festivals"]
        },
        image: "/rajasthan.jpg"
    }
};

export const getDestinationData = (destination, locale) => {
    const data = destinations[destination] || destinations.agra;
    const lang = locale === "ar" || locale === "fr" ? locale : "en";

    return {
        title: data.title[lang],
        description: data.description[lang],
        highlights: data.highlights[lang],
        image: data.image
    };
};
