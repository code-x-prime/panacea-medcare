"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { resolvePublicImageSrc } from "@/lib/publicImage";

const FALLBACK =
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=450&fit=crop&auto=format";

/** Public assets from /public — optimized using Next.js Image component */
export default function PublicImage({ src, alt, fill, className = "", loading, priority, onError, sizes, ...rest }) {
    const resolved = resolvePublicImageSrc(src);
    const [imgSrc, setImgSrc] = useState(resolved || FALLBACK);

    useEffect(() => {
        setImgSrc(resolved || FALLBACK);
    }, [resolved]);

    const handleError = (e) => {
        setImgSrc(FALLBACK);
        if (onError) onError(e);
    };

    // Default sizes for responsive scaling when fill is used
    const defaultSizes = fill 
        ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" 
        : undefined;

    return (
        <Image
            src={imgSrc}
            alt={alt || ""}
            fill={fill}
            className={className}
            loading={priority ? undefined : (loading || "lazy")}
            priority={priority}
            onError={handleError}
            sizes={sizes || defaultSizes}
            {...rest}
        />
    );
}
