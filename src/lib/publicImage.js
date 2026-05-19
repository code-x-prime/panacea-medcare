
export function resolvePublicImageSrc(src) {
    if (!src || typeof src !== "string") return "";
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    return src.startsWith("/") ? src : `/${src}`;
}
