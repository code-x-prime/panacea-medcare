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
      className="navbar-container bg-white sticky top-0 z-50"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Desktop Menu */}
      <div className="bg-white">
        <div className="container mx-auto">
          <ul
            className={
              "hidden lg:flex items-center justify-center gap-1 xl:gap-2 2xl:gap-3 px-2 py-3 " +
              (isRTL ? "flex-row-reverse" : "")
            }
            style={{ flexWrap: 'nowrap' }}
          >
            {navbarMenu.main.map((item, idx) => {
              var hasSubMenu = item.type === "mega" || item.type === "dropdown";
              var subMenuItems = item.key ? navbarMenu[item.key] : null;
              var isActive = activeMenu === item.key;
              var isHospitals = item.slug === "/hospitals" && item.highlight;

              return (
                <li
                  key={idx}
                  className="h-full flex items-center relative flex-shrink-0"
                  onMouseEnter={() => {
                    if (hasSubMenu) {
                      setActiveMenu(item.key);
                    }
                  }}
                  onMouseLeave={() => {
                    setActiveMenu(null);
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={
                        item.slug === "/" ? "/" + locale : "/" + locale + item.slug
                      }
                      onClick={(e) => {
                        handleMenuClick(e, item);
                      }}
                      className={
                        "flex items-center justify-center text-xs lg:text-sm xl:text-base font-semibold text-gray-700 hover:text-panacea-primary transition-all h-full px-1.5 xl:px-2 py-2 cursor-pointer " +
                        (isActive ? "text-panacea-primary" : "")
                      }
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <span className="block leading-tight whitespace-nowrap">{item.name}</span>
                      {hasSubMenu && (
                        <ChevronDown
                          className={
                            "w-3 h-3 transition-transform duration-200 ml-1 " +
                            (isActive ? "rotate-180" : "")
                          }
                        />
                      )}
                    </Link>

                    {/* JCI Accredited Badge/Tag - Attached to Hospitals */}
                    {isHospitals && (
                      <Link
                        href={"/" + locale + item.slug}
                        className="bg-panacea-primary text-white px-2 xl:px-3 py-1 xl:py-1.5 rounded-lg font-bold text-[9px] xl:text-[10px] leading-tight hover:bg-panacea-teal-700 transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md whitespace-nowrap"
                      >
                        <span>JCI Accredited</span>
                      </Link>
                    )}
                  </div>

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

          {/* Gradient Bar Below Navigation */}
          <div className="hidden lg:block h-0.5 bg-gradient-to-r from-panacea-primary via-panacea-secondary to-panacea-secondary/50"></div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 flex items-end gap-3 py-2">
          <button
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 ml-auto"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

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
                var isHospitals = item.slug === "/hospitals" && item.highlight;

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
                      <div className="flex items-center gap-2 flex-1">
                        {hasSubMenu ? (
                          <button
                            onClick={() => toggleMobileItem(item.key)}
                            className="text-lg font-semibold text-gray-800 hover:text-panacea-primary transition-colors text-left"
                          >
                            {item.name}
                          </button>
                        ) : (
                          <Link
                            href={
                              item.slug === "/"
                                ? "/" + locale
                                : "/" + locale + item.slug
                            }
                            className={
                              "text-lg font-semibold transition-colors " +
                              (item.color === "teal"
                                ? "text-panacea-primary hover:text-panacea-dark"
                                : "text-gray-800 hover:text-panacea-primary")
                            }
                            onClick={closeMobileMenu}
                          >
                            {item.name}
                          </Link>
                        )}

                        {/* JCI Badge in Mobile Menu - Attached to Hospitals */}
                        {isHospitals && (
                          <Link
                            href={"/" + locale + item.slug}
                            className="bg-panacea-primary text-white px-3 py-1.5 rounded-lg font-bold text-xs leading-tight flex flex-col items-center justify-center shadow-sm"
                            onClick={closeMobileMenu}
                            style={{ lineHeight: '1.1', minWidth: '70px' }}
                          >
                            <span className="block whitespace-nowrap">JCI</span>
                            <span className="block whitespace-nowrap">Accredited</span>
                          </Link>
                        )}
                      </div>

                      {hasSubMenu && (
                        <button
                          onClick={() => {
                            toggleMobileItem(item.key);
                          }}
                          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
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
                          "pb-3 space-y-2 bg-panacea-light rounded-lg p-3 mb-2 " +
                          (isRTL ? "mr-2" : "ml-2")
                        }
                      >
                        {/* Simple list for all dropdown items */}
                        {subMenuItems.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            href={"/" + locale + sub.slug}
                            className="block py-2.5 text-base font-medium text-panacea-dark hover:text-panacea-accent hover:bg-white rounded px-3 transition-colors"
                            onClick={closeMobileMenu}
                          >
                            {sub.name}
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