/**
 * ISO-style country list with phone codes for forms (Quote, Contact, Booking, Prescreen).
 */
export const COUNTRIES = [
    { value: "afghanistan", label: "Afghanistan", code: "+93" },
    { value: "albania", label: "Albania", code: "+355" },
    { value: "algeria", label: "Algeria", code: "+213" },
    { value: "argentina", label: "Argentina", code: "+54" },
    { value: "australia", label: "Australia", code: "+61" },
    { value: "austria", label: "Austria", code: "+43" },
    { value: "bahrain", label: "Bahrain", code: "+973" },
    { value: "bangladesh", label: "Bangladesh", code: "+880" },
    { value: "belgium", label: "Belgium", code: "+32" },
    { value: "brazil", label: "Brazil", code: "+55" },
    { value: "canada", label: "Canada", code: "+1" },
    { value: "china", label: "China", code: "+86" },
    { value: "denmark", label: "Denmark", code: "+45" },
    { value: "egypt", label: "Egypt", code: "+20" },
    { value: "ethiopia", label: "Ethiopia", code: "+251" },
    { value: "france", label: "France", code: "+33" },
    { value: "germany", label: "Germany", code: "+49" },
    { value: "greece", label: "Greece", code: "+30" },
    { value: "india", label: "India", code: "+91" },
    { value: "indonesia", label: "Indonesia", code: "+62" },
    { value: "iran", label: "Iran", code: "+98" },
    { value: "iraq", label: "Iraq", code: "+964" },
    { value: "ireland", label: "Ireland", code: "+353" },
    { value: "israel", label: "Israel", code: "+972" },
    { value: "italy", label: "Italy", code: "+39" },
    { value: "japan", label: "Japan", code: "+81" },
    { value: "jordan", label: "Jordan", code: "+962" },
    { value: "kenya", label: "Kenya", code: "+254" },
    { value: "kuwait", label: "Kuwait", code: "+965" },
    { value: "lebanon", label: "Lebanon", code: "+961" },
    { value: "malaysia", label: "Malaysia", code: "+60" },
    { value: "mexico", label: "Mexico", code: "+52" },
    { value: "morocco", label: "Morocco", code: "+212" },
    { value: "mozambique", label: "Mozambique", code: "+258" },
    { value: "netherlands", label: "Netherlands", code: "+31" },
    { value: "newzealand", label: "New Zealand", code: "+64" },
    { value: "nigeria", label: "Nigeria", code: "+234" },
    { value: "norway", label: "Norway", code: "+47" },
    { value: "oman", label: "Oman", code: "+968" },
    { value: "pakistan", label: "Pakistan", code: "+92" },
    { value: "philippines", label: "Philippines", code: "+63" },
    { value: "poland", label: "Poland", code: "+48" },
    { value: "portugal", label: "Portugal", code: "+351" },
    { value: "qatar", label: "Qatar", code: "+974" },
    { value: "russia", label: "Russia", code: "+7" },
    { value: "rwanda", label: "Rwanda", code: "+250" },
    { value: "saudiarabia", label: "Saudi Arabia", code: "+966" },
    { value: "singapore", label: "Singapore", code: "+65" },
    { value: "southafrica", label: "South Africa", code: "+27" },
    { value: "southkorea", label: "South Korea", code: "+82" },
    { value: "spain", label: "Spain", code: "+34" },
    { value: "srilanka", label: "Sri Lanka", code: "+94" },
    { value: "sweden", label: "Sweden", code: "+46" },
    { value: "switzerland", label: "Switzerland", code: "+41" },
    { value: "thailand", label: "Thailand", code: "+66" },
    { value: "turkey", label: "Turkey", code: "+90" },
    { value: "uae", label: "UAE", code: "+971" },
    { value: "uk", label: "UK", code: "+44" },
    { value: "usa", label: "USA", code: "+1" },
    { value: "vietnam", label: "Vietnam", code: "+84" },
];

const _byCode = new Map();
export function getPhoneCodes() {
    if (_byCode.size) return [..._byCode.values()];
    for (const c of COUNTRIES) {
        if (!_byCode.has(c.code)) _byCode.set(c.code, { value: c.code, label: `${c.code} ${c.label}` });
    }
    return [..._byCode.values()];
}
