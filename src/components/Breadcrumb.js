"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

/**
 * Breadcrumb Component
 * 
 * SEO-friendly breadcrumb navigation component with structured data support.
 * 
 * @param {Object} props
 * @param {Array} props.items - Array of breadcrumb items { label, href }
 * @param {string} props.locale - Current locale (en/ar/fr)
 */
export default function Breadcrumb({ items = [], locale = "en" }) {
  const isRTL = locale === "ar";

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": typeof window !== "undefined" ? `${window.location.origin}${item.href}` : item.href
    }))
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumb Navigation */}
      <nav
        className="flex items-center space-x-2 text-sm"
        aria-label="Breadcrumb"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <ol className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;

            return (
              <li
                key={index}
                className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {isFirst ? (
                  <Link
                    href={item.href}
                    className="text-gray-500 hover:text-panacea-primary transition-colors"
                    aria-label="Home"
                  >
                    <Home className="w-4 h-4" />
                  </Link>
                ) : (
                  <>
                    <ChevronRight
                      className={`w-4 h-4 text-gray-400 mx-2 ${isRTL ? "rotate-180" : ""}`}
                    />
                    {isLast ? (
                      <span
                        className="text-panacea-primary font-medium"
                        aria-current="page"
                        itemProp="name"
                      >
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-gray-500 hover:text-panacea-primary transition-colors"
                        itemProp="item"
                      >
                        <span itemProp="name">{item.label}</span>
                      </Link>
                    )}
                  </>
                )}
                <meta itemProp="position" content={index + 1} />
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}


