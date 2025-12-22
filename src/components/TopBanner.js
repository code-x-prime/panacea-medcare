"use client";

import React from "react";
import { useTranslations } from "next-intl";

/**
 * TopBanner Component
 * 
 * A reusable banner component for all pages that displays page headings
 * with a distinct background color, following Panacea design system.
 * 
 * @param {Object} props
 * @param {string} props.locale - Current locale (en/ar/fr)
 * @param {string} props.namespace - Translation namespace (e.g., "about", "services")
 * @param {string} [props.title] - Optional title override (uses translation if not provided)
 * @param {string} [props.subtitle] - Optional subtitle override
 * @param {string} [props.variant] - Banner variant: "gradient" (default) | "primary" | "secondary" | "light"
 * @param {string} [props.size] - Banner size: "sm" | "md" (default) | "lg"
 */
export default function TopBanner({
    locale,
    namespace,
    title,
    subtitle,
    variant = "gradient",
    size = "md",
}) {
    const t = useTranslations(namespace);
    const isRTL = locale === "ar";

    // Get title and subtitle from props or translations
    let displayTitle = title;
    let displaySubtitle = subtitle;

    try {
        if (!displayTitle) {
            displayTitle = t("title");
        }
        if (!displaySubtitle) {
            displaySubtitle = t("subtitle");
        }
    } catch (e) {
        // If translation fails, use empty string
        displayTitle = displayTitle || "";
        displaySubtitle = displaySubtitle || "";
    }

    // Variant styles
    const variantStyles = {
        gradient: "bg-panacea-gradient",
        primary: "bg-panacea-primary",
        secondary: "bg-panacea-secondary",
        light: "bg-panacea-light",
    };

    // Size styles
    const sizeStyles = {
        sm: "py-8 md:py-10",
        md: "py-12 md:py-16",
        lg: "py-16 md:py-20",
    };

    // Text color based on variant
    const textColor =
        variant === "light"
            ? "text-panacea-dark"
            : "text-white";

    return (
        <section
            className={`relative w-full ${variantStyles[variant]} ${sizeStyles[size]} overflow-hidden`}
            dir={isRTL ? "rtl" : "ltr"}
            role="banner"
            aria-label={displayTitle || "Page Banner"}
        >
            {/* Subtle decorative pattern overlay */}
            {variant !== "light" && (
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                        backgroundSize: "40px 40px",
                    }}
                />
            )}

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div
                    className={`max-w-4xl ${isRTL ? "text-right mr-0 ml-auto" : "text-left ml-0 mr-auto"}`}
                >
                    {/* Decorative accent line */}
                    {variant !== "light" && (
                        <div
                            className={`w-16 h-1 bg-panacea-accent rounded-full mb-6 ${isRTL ? "mr-0 ml-auto" : "ml-0 mr-auto"
                                }`}
                            style={{
                                boxShadow: "0 0 12px rgba(243, 112, 33, 0.5)",
                            }}
                        />
                    )}

                    {/* Title */}
                    {displayTitle && (
                        <h1
                            className={`${textColor} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 ${isRTL ? "font-arabic" : ""
                                }`}
                            style={{
                                fontFamily:
                                    variant === "light"
                                        ? "var(--font-raleway), Raleway, sans-serif"
                                        : "var(--font-raleway), Raleway, sans-serif",
                                textShadow:
                                    variant !== "light"
                                        ? "2px 2px 8px rgba(0,0,0,0.3)"
                                        : "none",
                            }}
                        >
                            {displayTitle}
                        </h1>
                    )}

                    {/* Subtitle */}
                    {displaySubtitle && (
                        <p
                            className={`${variant === "light"
                                ? "text-panacea-dark/80"
                                : "text-white/90"
                                } text-lg sm:text-xl md:text-2xl font-medium leading-relaxed max-w-3xl ${isRTL ? "font-arabic" : ""
                                }`}
                            style={{
                                textShadow:
                                    variant !== "light"
                                        ? "1px 1px 4px rgba(0,0,0,0.2)"
                                        : "none",
                            }}
                        >
                            {displaySubtitle}
                        </p>
                    )}
                </div>
            </div>

            {/* Bottom border accent (for light variant) */}
            {variant === "light" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-panacea-gradient" />
            )}
        </section>
    );
}

