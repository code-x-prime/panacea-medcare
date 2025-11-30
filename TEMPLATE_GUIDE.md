# Multi-Language Component & Page Template Guide

This guide will help you create new components and pages that work with all 3 languages (English, Arabic, French) with proper RTL support for Arabic.

---

## 📁 File Structure

For every new page/component, you need:

1. **Component/Page File** - The React component
2. **Translation Files** (3 files):
   - `messages/en/[name].json` - English
   - `messages/ar/[name].json` - Arabic  
   - `messages/fr/[name].json` - French

---

## 🎯 Template 1: Client Component (with useTranslations)

Use this for interactive components that need client-side features.

### Component File: `src/components/YourComponent.js`

```javascript
"use client";

import { useTranslations } from "next-intl";

export default function YourComponent({ locale }) {
  const t = useTranslations("yourComponent"); // Match your JSON filename
  const isRTL = locale === "ar";

  return (
    <section
      className="py-12"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 
          className={`text-3xl font-bold mb-6 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {t("title")}
        </h2>

        {/* Content with flex direction for RTL */}
        <div 
          className={`flex gap-4 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <div className="flex-1">
            <p className={isRTL ? "text-right" : "text-left"}>
              {t("description")}
            </p>
          </div>
        </div>

        {/* Button with icon - RTL support */}
        <button 
          className={`flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <span>{t("buttonText")}</span>
          <svg 
            className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
```

### Translation Files

**`messages/en/yourComponent.json`**
```json
{
  "title": "Your Component Title",
  "description": "Your component description text",
  "buttonText": "Click Here"
}
```

**`messages/ar/yourComponent.json`**
```json
{
  "title": "عنوان المكون الخاص بك",
  "description": "نص وصف المكون الخاص بك",
  "buttonText": "انقر هنا"
}
```

**`messages/fr/yourComponent.json`**
```json
{
  "title": "Titre de votre composant",
  "description": "Texte de description de votre composant",
  "buttonText": "Cliquez ici"
}
```

### Update `src/i18n/request.js`

Add your new translation namespace:

```javascript
export default getRequestConfig(async ({ locale }) => {
  var validLocale = locales.includes(locale) ? locale : "en";

  var navbarMessages = (
    await import("../../messages/" + validLocale + "/navbar.json")
  ).default;
  var quoteFormMessages = (
    await import("../../messages/" + validLocale + "/quoteForm.json")
  ).default;
  var homeMessages = (
    await import("../../messages/" + validLocale + "/home.json")
  ).default;
  // ADD YOUR NEW NAMESPACE HERE
  var yourComponentMessages = (
    await import("../../messages/" + validLocale + "/yourComponent.json")
  ).default;

  return {
    locale: validLocale,
    messages: {
      navbar: navbarMessages,
      quoteForm: quoteFormMessages,
      home: homeMessages,
      yourComponent: yourComponentMessages, // ADD HERE
    },
  };
});
```

---

## 🎯 Template 2: Server Component (Page)

Use this for pages that don't need client-side interactivity.

### Page File: `src/app/(public)/[locale]/your-page/page.js`

```javascript
import { getMessages } from '@/lib/getMessages';
import YourComponent from '@/components/YourComponent';

export default async function YourPage({ params }) {
  const locale = params.locale || 'en';
  const messages = await getMessages(locale, 'yourPage');

  return (
    <div className="bg-white">
      <YourComponent locale={locale} />
    </div>
  );
}
```

---

## 🎨 Common RTL Patterns

### 1. Text Alignment
```javascript
className={isRTL ? "text-right" : "text-left"}
```

### 2. Flex Direction (Reverse for RTL)
```javascript
className={`flex ${isRTL ? "flex-row-reverse" : ""}`}
```

### 3. Padding/Margin (Left/Right)
```javascript
// For padding-left in LTR, padding-right in RTL
className={isRTL ? "pr-4" : "pl-4"}

// For margin-left in LTR, margin-right in RTL
className={isRTL ? "mr-4" : "ml-4"}
```

### 4. Icons/Arrows (Rotate for RTL)
```javascript
className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`}
```

### 5. Grid with RTL
```javascript
<div className={`grid grid-cols-3 gap-4 ${isRTL ? "text-right" : "text-left"}`}>
  {/* Grid items will automatically flow RTL in Arabic */}
</div>
```

### 6. Absolute Positioning
```javascript
// For left positioning
className={isRTL ? "right-0" : "left-0"}

// For right positioning
className={isRTL ? "left-0" : "right-0"}
```

---

## 📝 Quick Checklist for New Component/Page

- [ ] Create component file with `locale` prop
- [ ] Add `const isRTL = locale === "ar";`
- [ ] Add `dir={isRTL ? "rtl" : "ltr"}` to main container
- [ ] Use `useTranslations("namespace")` for client components
- [ ] Create 3 translation JSON files (en, ar, fr)
- [ ] Add namespace to `src/i18n/request.js`
- [ ] Apply RTL classes for:
  - [ ] Text alignment
  - [ ] Flex direction
  - [ ] Padding/Margin
  - [ ] Icons/Arrows
  - [ ] Absolute positioning

---

## 🚀 Usage Example

```javascript
// In your page
<YourComponent locale={locale} />

// Component will automatically:
// ✅ Show correct language text
// ✅ Align text properly (right for Arabic, left for others)
// ✅ Reverse flex layouts for Arabic
// ✅ Rotate icons for Arabic
```

---

## 💡 Pro Tips

1. **Always test in all 3 languages**: `/en`, `/ar`, `/fr`
2. **Check Arabic RTL**: Make sure everything flips correctly
3. **Use Tailwind's logical properties** when possible
4. **Keep translation keys consistent** across all 3 JSON files
5. **Use descriptive translation keys**: `heroTitle` not `title1`

---

## 🔗 Common Imports

```javascript
// For client components
"use client";
import { useTranslations } from "next-intl";

// For server components/pages
import { getMessages } from '@/lib/getMessages';

// For links
import Link from "next/link";

// For images
import Image from "next/image";
```

---

## 📞 Need Help?

Refer to existing components:
- `src/components/Header.js` - Complex RTL example
- `src/components/HeroSection.js` - Translation usage
- `src/components/Navbar/Navbar.js` - Navigation with RTL

---

**Happy Coding! 🎉**
