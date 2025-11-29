import Link from "next/link";

export default function Dropdown({ items, locale }) {
  const isRTL = locale === "ar";
  if (!items) return null;

  return (
    <div
      className={`absolute top-full ${
        isRTL ? "right-0" : "left-0"
      } w-56 bg-white shadow-2xl rounded-b-xl border-t-2 border-panacea-primary py-3 z-50 animate-in fade-in slide-in-from-top-1 duration-200 max-h-[70vh] overflow-y-auto`}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item, idx) => (
        <Link
          key={idx}
          href={`/${locale}${item.slug}`}
          className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-panacea-primary/5 hover:text-panacea-primary transition-colors cursor-pointer"
          dir={isRTL ? "rtl" : "ltr"}
          style={{
            wordBreak: isRTL ? "break-word" : "normal",
            lineHeight: isRTL ? "1.6" : "1.5",
          }}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
