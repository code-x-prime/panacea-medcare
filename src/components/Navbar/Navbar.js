"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Navbar({ locale = "en" }) {
  var t = useTranslations("navbar");
  var isRTL = locale === "ar";

  // Get menu data from translations
  var navbarMenu = null;
  try {
    navbarMenu = t.raw("menu");
  } catch (e) {
    console.log("Menu data not available");
  }

  var [activeMenu, setActiveMenu] = useState(null);
  var [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  var [mobileExpandedItem, setMobileExpandedItem] = useState(null);

  // Close menus on locale change
  useEffect(() => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
    setMobileExpandedItem(null);
  }, [locale]);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest(".navbar-container")) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Early return if no menu data
  if (!navbarMenu || !navbarMenu.main || !Array.isArray(navbarMenu.main)) {
    return null;
  }

  function handleMenuClick(e, item) {
    if (item.type === "mega" || item.type === "dropdown") {
      e.preventDefault();
      setActiveMenu(activeMenu === item.key ? null : item.key);
    }
  }

  function closeMenu() {
    setActiveMenu(null);
  }

  function toggleMobileMenu() {
    setMobileMenuOpen(!mobileMenuOpen);
    setMobileExpandedItem(null);
  }

  function toggleMobileItem(key) {
    setMobileExpandedItem(mobileExpandedItem === key ? null : key);
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
    setMobileExpandedItem(null);
  }

  return (
    <nav
      className="navbar-container h-full relative sticky top-0 z-50"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Desktop Menu */}
      <ul
        className={
          "hidden lg:flex items-center gap-1 xl:gap-2 h-14 " +
          (isRTL ? "flex-row-reverse justify-end" : "")
        }
      >
        {navbarMenu.main.map((item, idx) => {
          var hasSubMenu = item.type === "mega" || item.type === "dropdown";
          var subMenuItems = item.key ? navbarMenu[item.key] : null;
          var isActive = activeMenu === item.key;

          return (
            <li
              key={idx}
              className="h-full flex items-center relative"
              onMouseEnter={() => {
                if (hasSubMenu) {
                  setActiveMenu(item.key);
                }
              }}
              onMouseLeave={() => {
                setActiveMenu(null);
              }}
            >
              <Link
                href={
                  item.slug === "/" ? "/" + locale : "/" + locale + item.slug
                }
                onClick={(e) => {
                  handleMenuClick(e, item);
                }}
                className={
                  "flex items-center gap-1.5 text-base font-semibold tracking-wide transition-all h-full px-3 border-b-2 hover:text-teal-600 cursor-pointer " +
                  (isActive
                    ? "text-teal-600 border-teal-500"
                    : "text-gray-700 border-transparent") +
                  " " +
                  (isRTL ? "flex-row-reverse" : "")
                }
              >
                <span>{item.name}</span>
                {hasSubMenu && (
                  <ChevronDown
                    className={
                      "w-4 h-4 transition-transform duration-200 " +
                      (isActive ? "rotate-180" : "")
                    }
                  />
                )}
              </Link>

              {/* Dropdown for knowledge and simple menus */}
              {item.type === "dropdown" && isActive && subMenuItems && (
                <div
                  className={
                    "absolute top-full z-50 w-auto min-w-[600px] bg-white shadow-xl rounded-lg border border-gray-100 p-5 " +
                    (isRTL ? "right-0" : "left-0")
                  }
                  dir={isRTL ? "rtl" : "ltr"}
                  style={isRTL ? { right: 0 } : { left: 0 }}
                  onMouseEnter={() => {
                    setActiveMenu(item.key);
                  }}
                  onMouseLeave={() => {
                    setActiveMenu(null);
                  }}
                >
                  <div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    {subMenuItems.map((subItem, sIdx) => (
                      <Link
                        key={sIdx}
                        href={"/" + locale + subItem.slug}
                        onClick={closeMenu}
                        className="block px-5 py-4 text-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors rounded whitespace-nowrap font-medium text-left"
                        style={{ textAlign: isRTL ? "right" : "left" }}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Dropdown for mega menus (Hospitals, Doctors, Cost) - showing as grid dropdown */}
              {item.type === "mega" && isActive && subMenuItems && (
                <div
                  className={
                    "absolute top-full z-50 w-auto min-w-[750px] max-w-[1100px] bg-white shadow-xl rounded-lg border border-gray-100 p-6 max-h-[70vh] overflow-y-auto " +
                    (isRTL ? "right-0" : "left-0")
                  }
                  dir={isRTL ? "rtl" : "ltr"}
                  style={
                    isRTL
                      ? { right: 0, transform: "translateX(0)" }
                      : { left: 0, transform: "translateX(0)" }
                  }
                  onMouseEnter={() => {
                    setActiveMenu(item.key);
                  }}
                  onMouseLeave={() => {
                    setActiveMenu(null);
                  }}
                >
                  {/* For hospitals and cost - show countries with treatments in grid */}
                  {(item.key === "hospitals" || item.key === "cost") && (
                    <div
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5"
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      {subMenuItems.map((countryItem, cIdx) => (
                        <div key={cIdx} className="space-y-3">
                          <Link
                            href={"/" + locale + countryItem.slug}
                            onClick={closeMenu}
                            className="block px-4 py-3 font-bold text-lg text-teal-600 hover:bg-teal-50 hover:text-teal-700 transition-colors rounded border-b-2 border-teal-100"
                            style={{ textAlign: isRTL ? "right" : "left" }}
                          >
                            {countryItem.country}
                          </Link>
                          {countryItem.treatments && (
                            <div className="space-y-2 mt-3">
                              {countryItem.treatments.map((treatment, tIdx) => (
                                <Link
                                  key={tIdx}
                                  href={"/" + locale + treatment.slug}
                                  onClick={closeMenu}
                                  className="block px-4 py-3 text-base text-gray-600 hover:bg-teal-50 hover:text-teal-600 transition-colors rounded"
                                  style={{ textAlign: isRTL ? "right" : "left" }}
                                >
                                  <span className="block leading-relaxed font-medium">
                                    {treatment.name}
                                  </span>
                                  {treatment.sub && (
                                    <span className="text-sm text-gray-400 block leading-relaxed mt-1.5">
                                      {treatment.sub}
                                    </span>
                                  )}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* For doctors - grid layout */}
                  {item.key === "doctors" && (
                    <div
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4"
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      {subMenuItems.map((subItem, sIdx) => (
                        <Link
                          key={sIdx}
                          href={"/" + locale + subItem.slug}
                          onClick={closeMenu}
                          className="block px-5 py-4 text-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors rounded whitespace-nowrap font-medium"
                          style={{ textAlign: isRTL ? "right" : "left" }}
                        >
                          {subItem.country || subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {mobileMenuOpen && (
        <div
          className={
            "fixed inset-0 top-0 bg-white z-[100] overflow-hidden lg:hidden " +
            (isRTL ? "rtl" : "ltr")
          }
        >
          {/* Mobile menu header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <span className="font-bold text-lg text-gray-800">Menu</span>
            <button
              onClick={closeMobileMenu}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable menu content */}
          <div className="overflow-y-auto h-[calc(100vh-60px)] pb-20">
            <ul className="flex flex-col p-4 space-y-1">
              {navbarMenu.main.map((item, idx) => {
                var hasSubMenu =
                  item.type === "mega" || item.type === "dropdown";
                var subMenuItems = item.key ? navbarMenu[item.key] : null;
                var isExpanded = mobileExpandedItem === item.key;

                return (
                  <li
                    key={idx}
                    className="border-b border-gray-100 last:border-none"
                  >
                    <div
                      className={
                        "flex items-center justify-between py-3 " +
                        (isRTL ? "flex-row-reverse" : "")
                      }
                    >
                      <Link
                        href={
                          item.slug === "/"
                            ? "/" + locale
                            : "/" + locale + item.slug
                        }
                        className="text-lg font-semibold text-gray-800 hover:text-teal-600 transition-colors flex-1"
                        onClick={() => {
                          if (!hasSubMenu) {
                            closeMobileMenu();
                          }
                        }}
                      >
                        {item.name}
                      </Link>
                      {hasSubMenu && (
                        <button
                          onClick={() => {
                            toggleMobileItem(item.key);
                          }}
                          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <ChevronDown
                            className={
                              "w-5 h-5 transition-transform duration-300 " +
                              (isExpanded ? "rotate-180" : "")
                            }
                          />
                        </button>
                      )}
                    </div>

                    {/* Mobile Submenu */}
                    {hasSubMenu && isExpanded && subMenuItems && (
                      <div
                        className={
                          "pb-3 space-y-2 bg-gray-50 rounded-lg p-3 mb-2 " +
                          (isRTL ? "mr-2" : "ml-2")
                        }
                      >
                        {/* For mega menus with countries and treatments */}
                        {(item.key === "hospitals" || item.key === "cost") &&
                          subMenuItems.map((country, cIdx) => (
                            <div key={cIdx} className="py-2">
                              <Link
                                href={"/" + locale + country.slug}
                                className="font-bold text-teal-600 block mb-2 text-sm"
                                onClick={closeMobileMenu}
                              >
                                {country.country}
                              </Link>
                              <div
                                className={
                                  "space-y-1 border-teal-200 " +
                                  (isRTL
                                    ? "pr-3 border-r-2"
                                    : "pl-3 border-l-2")
                                }
                              >
                                {country.treatments &&
                                  country.treatments.map((treatment, tIdx) => (
                                    <Link
                                      key={tIdx}
                                      href={"/" + locale + treatment.slug}
                                      className="block text-sm text-gray-600 hover:text-teal-600 py-1.5"
                                      onClick={closeMobileMenu}
                                    >
                                      <span className="block leading-snug">
                                        {treatment.name}
                                      </span>
                                      {treatment.sub && (
                                        <span className="text-xs text-gray-400 block leading-snug mt-0.5">
                                          {treatment.sub}
                                        </span>
                                      )}
                                    </Link>
                                  ))}
                              </div>
                            </div>
                          ))}

                        {/* For doctors and knowledge - simple list */}
                        {(item.key === "doctors" || item.key === "knowledge") &&
                          subMenuItems.map((sub, sIdx) => (
                            <Link
                              key={sIdx}
                              href={"/" + locale + sub.slug}
                              className="block py-2.5 text-sm font-medium text-gray-600 hover:text-teal-600 hover:bg-white rounded px-3"
                              onClick={closeMobileMenu}
                            >
                              {sub.country || sub.name}
                            </Link>
                          ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
