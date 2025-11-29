"use client";

import Link from "next/link";

export default function MegaMenu({ items, type, locale, onClose }) {
  var isRTL = locale === "ar";

  if (!items || items.length === 0) {
    return null;
  }

  // Hospitals menu
  if (type === "hospitals") {
    return (
      <div
        className={
          "fixed left-0 right-0 top-[150px] w-screen bg-white shadow-2xl border-t-2 border-teal-500 z-50"
        }
        onClick={(e) => {
          e.stopPropagation();
        }}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="max-w-5xl mx-auto p-3 sm:p-4 max-h-[50vh] overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
            {items.map((countryItem, idx) => (
              <div key={idx} className="space-y-1.5">
                <Link
                  href={"/" + locale + countryItem.slug}
                  onClick={onClose}
                  className="block font-bold text-teal-600 text-sm border-b border-teal-100 pb-1 hover:text-teal-700 transition-colors"
                  style={{ textAlign: isRTL ? "right" : "left" }}
                >
                  {countryItem.country}
                </Link>
                <ul className="space-y-0.5">
                  {countryItem.treatments &&
                    countryItem.treatments.map((treatment, tIdx) => (
                      <li key={tIdx}>
                        <Link
                          href={"/" + locale + treatment.slug}
                          onClick={onClose}
                          className="block text-gray-600 hover:text-teal-600 transition-colors text-xs font-medium py-0.5 px-1.5 rounded hover:bg-teal-50"
                        >
                          <span className="block leading-tight">
                            {treatment.name}
                          </span>
                          {treatment.sub && (
                            <span className="text-[10px] text-gray-400 block leading-tight">
                              {treatment.sub}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Doctors menu
  if (type === "doctors") {
    return (
      <div
        className={
          "fixed left-0 right-0 top-[150px] w-screen bg-white shadow-2xl border-t-2 border-teal-500 z-50"
        }
        onClick={(e) => {
          e.stopPropagation();
        }}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="max-w-5xl mx-auto p-3 sm:p-4 max-h-[50vh] overflow-y-auto">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2">
            {items.map((item, idx) => (
              <Link
                key={idx}
                href={"/" + locale + item.slug}
                onClick={onClose}
                className="block p-2 rounded-lg border border-gray-100 hover:border-teal-200 hover:bg-teal-50 transition-all group"
              >
                <span className="font-semibold text-xs text-gray-700 group-hover:text-teal-600 leading-tight">
                  {item.country || item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Cost menu
  if (type === "cost") {
    return (
      <div
        className={
          "fixed left-0 right-0 top-[150px] w-screen bg-white shadow-2xl border-t-2 border-teal-500 z-50"
        }
        onClick={(e) => {
          e.stopPropagation();
        }}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="max-w-5xl mx-auto p-3 sm:p-4 max-h-[50vh] overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
            {items.map((countryItem, idx) => (
              <div key={idx} className="space-y-1.5">
                <Link
                  href={"/" + locale + countryItem.slug}
                  onClick={onClose}
                  className="block font-bold text-teal-600 text-sm border-b border-teal-100 pb-1 hover:text-teal-700 transition-colors"
                >
                  {countryItem.country}
                </Link>
                <ul className="space-y-0.5">
                  {countryItem.treatments &&
                    countryItem.treatments.map((treatment, tIdx) => (
                      <li key={tIdx}>
                        <Link
                          href={"/" + locale + treatment.slug}
                          onClick={onClose}
                          className="block text-gray-600 hover:text-teal-600 transition-colors text-xs font-medium py-0.5 px-1.5 rounded hover:bg-teal-50"
                        >
                          <span className="block leading-tight">
                            {treatment.name}
                          </span>
                          {treatment.sub && (
                            <span className="text-[10px] text-gray-400 block leading-tight">
                              {treatment.sub}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
