"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, X, User, Building2 } from "lucide-react";
import doctors from "@/data/doctors.json";
import hospitalsData from "@/data/hospitals.json";

// Get hospitals array from the translations structure
const getHospitals = () => {
    try {
        const hospitals = hospitalsData?.translations?.en?.hospitals || [];
        return hospitals;
    } catch (e) {
        return [];
    }
};

// Translations for search
const translations = {
    en: {
        placeholder: "Search doctors, hospitals...",
        noResults: "No results found",
        doctors: "Doctors",
        hospitals: "Hospitals",
    },
    ar: {
        placeholder: "ابحث عن الأطباء والمستشفيات...",
        noResults: "لا توجد نتائج",
        doctors: "الأطباء",
        hospitals: "المستشفيات",
    },
    fr: {
        placeholder: "Rechercher médecins, hôpitaux...",
        noResults: "Aucun résultat",
        doctors: "Médecins",
        hospitals: "Hôpitaux",
    },
    de: {
        placeholder: "Ärzte, Krankenhäuser suchen...",
        noResults: "Keine Ergebnisse",
        doctors: "Ärzte",
        hospitals: "Krankenhäuser",
    },
    es: {
        placeholder: "Buscar médicos, hospitales...",
        noResults: "Sin resultados",
        doctors: "Médicos",
        hospitals: "Hospitales",
    },
    zh: {
        placeholder: "搜索医生、医院...",
        noResults: "未找到结果",
        doctors: "医生",
        hospitals: "医院",
    },
    ja: {
        placeholder: "医師、病院を検索...",
        noResults: "結果なし",
        doctors: "医師",
        hospitals: "病院",
    },
    hi: {
        placeholder: "डॉक्टर, अस्पताल खोजें...",
        noResults: "कोई परिणाम नहीं",
        doctors: "डॉक्टर",
        hospitals: "अस्पताल",
    },
};

export default function GlobalSearch({ locale = "en" }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState({ doctors: [], hospitals: [] });
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const searchRef = useRef(null);
    const inputRef = useRef(null);
    const router = useRouter();

    const t = translations[locale] || translations.en;
    const isRTL = locale === "ar";

    // Debounced search function
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    // Search function
    const performSearch = useCallback((searchQuery) => {
        if (!searchQuery || searchQuery.length < 2) {
            setResults({ doctors: [], hospitals: [] });
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        const lowerQuery = searchQuery.toLowerCase();

        // Search doctors
        const matchedDoctors = doctors
            .filter(doc =>
                doc.name?.toLowerCase().includes(lowerQuery) ||
                doc.specialty?.toLowerCase().includes(lowerQuery) ||
                doc.hospital?.toLowerCase().includes(lowerQuery)
            )
            .slice(0, 5);

        // Search hospitals
        const hospitals = getHospitals();
        const matchedHospitals = hospitals
            .filter(hosp =>
                hosp.name?.toLowerCase().includes(lowerQuery) ||
                hosp.location?.toLowerCase().includes(lowerQuery)
            )
            .slice(0, 5);

        setResults({
            doctors: matchedDoctors,
            hospitals: matchedHospitals
        });
        setIsLoading(false);
    }, []);

    // Debounced search
    const debouncedSearch = useCallback(
        debounce((q) => performSearch(q), 300),
        [performSearch]
    );

    // Handle input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setIsOpen(true);
        debouncedSearch(value);
    };

    // Handle result click
    const handleResultClick = (type, item) => {
        setIsOpen(false);
        setQuery("");
        if (type === "doctor") {
            router.push(`/${locale}/doctors/${item.id}`);
        } else if (type === "hospital") {
            router.push(`/${locale}/hospitals/${item.slug}`);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Clear search
    const clearSearch = () => {
        setQuery("");
        setResults({ doctors: [], hospitals: [] });
        setIsOpen(false);
        inputRef.current?.focus();
    };

    const hasResults = results.doctors.length > 0 || results.hospitals.length > 0;

    return (
        <div ref={searchRef} className="relative w-full" dir={isRTL ? "rtl" : "ltr"}>
            {/* Search Input */}
            <div className="relative">
                <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 ${isRTL ? "right-3" : "left-3"}`} />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => query.length >= 2 && setIsOpen(true)}
                    placeholder={t.placeholder}
                    className={`w-full sm:w-40 md:w-52 lg:w-64 py-2 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#066F89]/50 focus:border-[#066F89] transition-all ${isRTL ? "pr-9 pl-8" : "pl-9 pr-8"}`}
                />
                {query && (
                    <button
                        onClick={clearSearch}
                        className={`absolute top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 ${isRTL ? "left-2" : "right-2"}`}
                    >
                        <X className="w-3 h-3" />
                    </button>
                )}
            </div>

            {/* Results Dropdown */}
            {isOpen && query.length >= 2 && (
                <div className={`absolute top-full mt-2 w-80 max-h-96 overflow-y-auto bg-white rounded-xl shadow-2xl border border-gray-100 z-50 ${isRTL ? "right-0" : "left-0"}`}>
                    {isLoading ? (
                        <div className="p-4 text-center text-gray-500 text-sm">
                            <div className="animate-spin w-5 h-5 border-2 border-[#066F89] border-t-transparent rounded-full mx-auto"></div>
                        </div>
                    ) : !hasResults ? (
                        <div className="p-4 text-center text-gray-500 text-sm">
                            {t.noResults}
                        </div>
                    ) : (
                        <div className="py-2">
                            {/* Doctors */}
                            {results.doctors.length > 0 && (
                                <div>
                                    <div className={`px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t.doctors}
                                    </div>
                                    {results.doctors.map((doctor) => (
                                        <button
                                            key={doctor.id}
                                            onClick={() => handleResultClick("doctor", doctor)}
                                            className={`w-full px-4 py-3 hover:bg-[#066F89]/5 transition-colors flex items-center gap-3 ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}
                                        >
                                            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 relative">
                                                {doctor.image ? (
                                                    <Image
                                                        src={doctor.image}
                                                        alt={doctor.name}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-[#066F89]/10">
                                                        <User className="w-6 h-6 text-[#066F89]" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">{doctor.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{doctor.specialty} • {doctor.hospital}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Hospitals */}
                            {results.hospitals.length > 0 && (
                                <div>
                                    <div className={`px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t.hospitals}
                                    </div>
                                    {results.hospitals.map((hospital) => (
                                        <button
                                            key={hospital.slug}
                                            onClick={() => handleResultClick("hospital", hospital)}
                                            className={`w-full px-4 py-3 hover:bg-[#066F89]/5 transition-colors flex items-center gap-3 ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}
                                        >
                                            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 relative">
                                                {hospital.image ? (
                                                    <Image
                                                        src={hospital.image}
                                                        alt={hospital.name}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-green-100">
                                                        <Building2 className="w-6 h-6 text-green-600" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">{hospital.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{hospital.location}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
