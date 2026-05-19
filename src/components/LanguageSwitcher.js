"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";

var languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

export default function LanguageSwitcher({ currentLocale }) {
  var router = useRouter();
  var pathname = usePathname();
  var [isOpen, setIsOpen] = useState(false);
  var dropdownRef = useRef(null);

  var currentLang =
    languages.find((l) => l.code === currentLocale) || languages[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleLanguageChange(newLocale) {
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-locale", newLocale);
      const maxAge = 60 * 60 * 24 * 365;
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${maxAge}; SameSite=Lax`;
      document.cookie = `locale_manual=1; path=/; max-age=${maxAge}; SameSite=Lax`;
      sessionStorage.removeItem("pm_geo_country");
      sessionStorage.removeItem("pm_geo_checked_at");
    }

    var segments = pathname.split("/").filter((s) => s !== "");

    // Check if first segment is a valid locale
    var localeList = languages.map((l) => l.code);
    var firstSegment = segments[0];
    var isFirstSegmentLocale = localeList.indexOf(firstSegment) !== -1;

    var newPath = "";

    if (isFirstSegmentLocale) {
      // Replace existing locale
      segments[0] = newLocale;
      newPath = "/" + segments.join("/");
    } else {
      // Add new locale at start
      newPath = "/" + newLocale + pathname;
    }

    // Clean path
    newPath = newPath.replace(/\/+/g, "/");
    if (newPath.length > 1 && newPath.endsWith("/")) {
      newPath = newPath.slice(0, -1);
    }

    if (newPath === "" || newPath === "/") {
      newPath = "/" + newLocale;
    }

    setIsOpen(false);
    router.push(newPath);
    router.refresh();
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4 text-gray-500" />
        <span className="hidden sm:inline">{currentLang.flag}</span>
        <span className="hidden md:inline">{currentLang.name}</span>
        <ChevronDown
          className={
            "w-4 h-4 transition-transform duration-200 " +
            (isOpen ? "rotate-180" : "")
          }
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-44 bg-white border border-gray-200 rounded-lg shadow-xl z-[100] overflow-hidden">
          {languages.map((lang) => {
            var isActive = lang.code === currentLocale;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  handleLanguageChange(lang.code);
                }}
                className={
                  "w-full flex items-center gap-3 px-4 py-3 text-xs transition-colors " +
                  (isActive
                    ? "bg-teal-50 text-teal-700"
                    : "text-gray-700 hover:bg-gray-50")
                }
              >
                <span className="text-xs">{lang.flag}</span>
                <span>{lang.name}</span>
                {isActive && (
                  <span className="ml-auto w-2 h-2 bg-teal-500 rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
