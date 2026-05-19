"use client";

import { useEffect, useState } from "react";
import { resolvePublicImageSrc } from "@/lib/publicImage";

const FALLBACK =
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=450&fit=crop&auto=format";

/** Public assets from /public — fill mode uses CSS background so paths stay /hospitals/... not /en/hospitals/... */
export default function PublicImage({ src, alt, fill, className = "", loading, priority, onError, ...rest }) {
    const resolved = resolvePublicImageSrc(src);
    const [url, setUrl] = useState(resolved || FALLBACK);

    useEffect(() => {
        if (!resolved) {
            setUrl(FALLBACK);
            return;
        }
        const probe = new window.Image();
        probe.onload = () => setUrl(resolved);
        probe.onerror = () => setUrl(FALLBACK);
        probe.src = resolved;
    }, [resolved]);

    if (!resolved && !fill) return null;

    if (fill) {
        return (
            <div
                role="img"
                aria-label={alt || ""}
                className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${className}`.trim()}
                style={{ backgroundImage: `url("${url}")` }}
                {...rest}
            />
        );
    }

    const handleError = (e) => {
        if (e.currentTarget.src !== FALLBACK) e.currentTarget.src = FALLBACK;
        onError?.(e);
    };

    return (
        <img
            src={url}
            alt={alt || ""}
            className={className}
            loading={priority ? "eager" : loading}
            onError={handleError}
            {...rest}
        />
    );
}
