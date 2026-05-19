"use client";
import { localePath } from "@/lib/locale/routing";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import GlobalSearch from "@/components/GlobalSearch";

export default function Navbar({ locale = "en" }) {
  var t = useTranslations("navbar");
  var router = useRouter();
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
  var [isSticky, setIsSticky] = useState(false);
  var [dropdownTimeout, setDropdownTimeout] = useState(null);

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

  // Handle sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

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

  function handleSubMenuClick(e, href) {
    e.preventDefault();
    router.push(href);
    // Delay closing to allow navigation to start
    setTimeout(() => {
      closeMenu();
      closeMobileMenu();
    }, 300);
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
      className={`navbar-container bg-white shadow-sm transition-all duration-300 ${isSticky ? 'sticky top-0 z-50 shadow-lg' : 'relative'
        }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Desktop Menu */}
      <div className="relative hidden lg:block bg-gradient-to-r from-panacea-primary/10 via-panacea-secondary/10 to-panacea-primary/10">
        <div className=" mx-auto xl:max-w-7xl">
          {/* All menu items in one row */}
          <ul
            className={
              "flex items-center justify-center gap-4 px-1 py-2 w-full " +
              (isRTL ? "flex-row-reverse" : "")
            }
          >
            {navbarMenu.main.map((item, idx) => {
              var hasSubMenu = item.type === "mega" || item.type === "dropdown";
              var subMenuItems = item.key ? navbarMenu[item.key] : null;
              var isActive = activeMenu === item.key;
              // Only wrap long menu names (3+ words)
              var shouldWrap = item.name.split(" ").length >= 3;

              return (
                <li
                  key={idx}
                  className="relative"
                  onMouseEnter={() => {
                    if (dropdownTimeout) {
                      clearTimeout(dropdownTimeout);
                      setDropdownTimeout(null);
                    }
                    if (hasSubMenu) setActiveMenu(item.key);
                  }}
                  onMouseLeave={() => {
                    const timeout = setTimeout(() => {
                      setActiveMenu(null);
                    }, 200);
                    setDropdownTimeout(timeout);
                  }}
                >
                  <Link
                    href={item.slug === "/" ? localePath(locale, '/') : localePath(locale, item.slug)}
                    className={
                      "flex items-center text-sm font-semibold px-2 py-1 rounded-md transition-all duration-200 " +
                      (shouldWrap ? "max-w-[150px] " : "") +
                      (isActive
                        ? "text-panacea-primary bg-gradient-to-r from-panacea-primary/20 to-panacea-secondary/20"
                        : "text-gray-700 hover:text-panacea-primary hover:bg-gradient-to-r hover:from-panacea-primary/10 hover:to-panacea-secondary/10")
                    }
                  >
                    <span className={shouldWrap ? "text-center leading-tight" : "whitespace-nowrap"}>{item.name}</span>
                    {hasSubMenu && (
                      <ChevronDown
                        className={
                          "w-3 h-3 ml-1 transition-transform duration-200 " +
                          (isActive ? "rotate-180" : "")
                        }
                      />
                    )}
                  </Link>

                  {/* Dropdown - responsive grid, contained within viewport */}
                  {hasSubMenu && isActive && subMenuItems && (
                    <div
                      className="fixed z-[100] bg-white shadow-2xl rounded-xl border border-gray-200 p-3 lg:p-4"
                      style={{
                        top: isSticky ? "55px" : "155px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "min(560px, calc(100vw - 32px))",
                        maxHeight: "50vh",
                        overflowY: "auto"
                      }}
                      onMouseEnter={() => {
                        if (dropdownTimeout) {
                          clearTimeout(dropdownTimeout);
                          setDropdownTimeout(null);
                        }
                        setActiveMenu(item.key);
                      }}
                      onMouseLeave={() => {
                        const timeout = setTimeout(() => {
                          setActiveMenu(null);
                        }, 200);
                        setDropdownTimeout(timeout);
                      }}
                    >
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
                        {subMenuItems.map((subItem, sIdx) => (
                          <a
                            key={sIdx}
                            href={localePath(locale, (subItem.slug) || "")}
                            onClick={(e) => handleSubMenuClick(e, localePath(locale, (subItem.slug) || ""))}
                            className="block px-2 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm text-gray-700 hover:bg-gradient-to-r hover:from-panacea-primary/10 hover:to-panacea-secondary/10 hover:text-panacea-primary rounded-lg transition-all duration-200 font-medium cursor-pointer"
                          >
                            {subItem.name || subItem.country}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className={`lg:hidden bg-white border-b border-gray-100 transition-all duration-300 ${isSticky ? 'sticky top-0 z-50 shadow-md' : ''
        }`}>
        <div className="container mx-auto px-4 xl:max-w-7xl flex items-end gap-3 py-2">
          {isSticky && (
            <Link href={localePath(locale, '/')} className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Panacea Medcare Logo"
                width={150}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>
          )}
          {/* Mobile Search - Expands in remaining space */}
          <div className="flex-1 min-w-0 mx-2">
            <GlobalSearch locale={locale} />
          </div>
          <button
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
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
                        <Link
                          href={
                            item.slug === "/"
                              ? localePath(locale, '/')
                              : localePath(locale, item.slug)
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

                        {/* JCI Badge in Mobile Menu - Attached to Hospitals */}
                        {isHospitals && (
                          <Link
                            href={localePath(locale, item.slug)}
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
                          "pb-3 space-y-1 sm:space-y-2 bg-panacea-light rounded-lg p-2 sm:p-3 mb-2 " +
                          (isRTL ? "mr-2" : "ml-2")
                        }
                      >
                        {/* Simple list for all dropdown items */}
                        {subMenuItems.map((sub, sIdx) => (
                          <a
                            key={sIdx}
                            href={localePath(locale, sub.slug)}
                            className="block py-2 sm:py-2.5 text-xs sm:text-sm md:text-base font-medium text-panacea-dark hover:text-panacea-accent hover:bg-white rounded px-2 sm:px-3 transition-colors break-words cursor-pointer"
                            style={{
                              wordBreak: 'break-word',
                              hyphens: 'auto',
                              lineHeight: '1.4'
                            }}
                            onClick={(e) => handleSubMenuClick(e, localePath(locale, sub.slug))}
                          >
                            {sub.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )
      }
    </nav >
  );
}