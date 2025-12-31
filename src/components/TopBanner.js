"use client";

import React from "react";
import { useTranslations } from "next-intl";


export default function TopBanner({
    locale,
    namespace,
    title,
    subtitle,
    variant = "secondary",
    size = "sm",
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

    // Size styles - reduced for smaller banner
    const sizeStyles = {
        sm: "py-8 md:py-10",
        md: "py-10 md:py-12",
        lg: "py-12 md:py-16",
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

            {/* Content Container - Centered 2-Line Layout */}
            <div className="relative z-10 container mx-auto px-4 xl:max-w-7xl sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Decorative accent line - centered */}
                    {variant !== "light" && (
                        <div
                            className="w-16 h-1 bg-panacea-accent rounded-full mb-4 mx-auto"
                            style={{
                                boxShadow: "0 0 12px rgba(243, 112, 33, 0.5)",
                            }}
                        />
                    )}

                    {/* Title - Line 1 */}
                    {displayTitle && (
                        <h1
                            className={`${textColor} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${isRTL ? "font-arabic" : ""}`}
                            style={{
                                fontFamily: "var(--font-raleway), Raleway, sans-serif",
                                textShadow:
                                    variant !== "light"
                                        ? "2px 2px 8px rgba(0,0,0,0.3)"
                                        : "none",
                            }}
                        >
                            {displayTitle}
                        </h1>
                    )}

                    {/* Subtitle - Line 2 */}
                    {displaySubtitle && (
                        <p
                            className={`${variant === "light"
                                ? "text-panacea-dark/80"
                                : "text-white/90"
                                } text-base sm:text-lg md:text-xl font-medium leading-relaxed mt-3 ${isRTL ? "font-arabic" : ""}`}
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

                    {/* Bottom decorative line - centered */}
                    {variant !== "light" && (
                        <div
                            className="w-24 h-0.5 bg-white/30 rounded-full mt-4 mx-auto"
                        />
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

