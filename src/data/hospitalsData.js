
import rawHospitals from "./detailedHospitals.json";

// Flatten data for easy lookup
const hospitalsMap = {};

if (rawHospitals && rawHospitals.countries) {
    rawHospitals.countries.forEach(country => {
        if (country.cities) {
            country.cities.forEach(city => {
                if (city.hospitals) {
                    city.hospitals.forEach(hospital => {
                        hospitalsMap[hospital.slug] = {
                            ...hospital,
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
        return hospital.images[0];
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
    ],
    "chennai": [
        { name: "Apollo Hospital Greams Road", slug: "apollo-hospital-greams-road-chennai" },
    ],
    "mumbai": [
        { name: "Stem Rx Hospital", slug: "stem-rx-hospital-mumbai" },
        { name: "Apollo Hospital", slug: "apollo-hospital-mumbai" },
        { name: "Fortis Hospital", slug: "fortis-hospital-mumbai" },
    ],
    "hyderabad": [
        { name: "TX Hospital", slug: "tx-hospital-hyderabad" },
        { name: "Apollo Hospital", slug: "apollo-hospital-hyderabad" },
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
};
