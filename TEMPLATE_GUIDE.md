# Panacea MedCare - Multi-Language Template System Guide

## Overview

This guide documents the multi-language template system for Panacea MedCare, featuring full EN/AR/FR support with RTL capabilities, reusable components, and a comprehensive page structure.

## Color Scheme

The Panacea brand colors are defined in `tailwind.config.js`:

```javascript
colors: {
  panacea: {
    primary: "#046d8a",    // Primary teal
    accent: "#c82d33",     // Accent red
    light: "#f0f9ff",      // Light blue
    dark: "#0a4a5e",       // Dark teal
  }
}
```

Use these colors consistently across all components and pages.

## Project Structure

```
panacea-medcare/
├── src/
│   ├── app/
│   │   └── [locale]/           # Locale-based routing
│   │       ├── page.tsx        # Home page
│   │       ├── about/
│   │       ├── services/
│   │       ├── doctors/
│   │       ├── testimonials/
│   │       └── ...
│   ├── components/
│   │   ├── HeroSection.tsx     # Reusable hero component
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── ...
│   └── i18n/
│       └── request.js          # Translation loader
├── messages/
│   ├── en/                     # English translations
│   ├── ar/                     # Arabic translations
│   └── fr/                     # French translations
└── data/
    ├── testimonials.json
    ├── doctors.json
    └── equipment.json
```

## HeroSection Component

### Usage

The `HeroSection` component is a reusable hero section with full RTL support and translation capabilities.

```tsx
import HeroSection from "@/components/HeroSection";

export default function Page({ params }) {
  const { locale } = params;
  
  return (
    <HeroSection
      locale={locale}
      namespace="pageName"
      backgroundImage="/images/hero-bg.jpg"
      fallbackImage="/images/hero-fallback.jpg"
    />
  );
}
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `locale` | string | Yes | Current locale (en/ar/fr) |
| `namespace` | string | Yes | Translation namespace to use |
| `title` | string | No | Override title (uses translation if not provided) |
| `subtitle` | string | No | Override subtitle (uses translation if not provided) |
| `backgroundImage` | string | No | Custom background image path |
| `fallbackImage` | string | No | Fallback image if backgroundImage not provided |
| `customContent` | ReactNode | No | Custom content to replace default title/subtitle |

### Features

- ✅ Full RTL support for Arabic
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark overlay with gradient
- ✅ Auto-height background image
- ✅ Translation support via next-intl
- ✅ Panacea brand colors

## Translation System

### Adding a New Page

1. **Create translation files** for all three languages:

```bash
messages/en/yourPage.json
messages/ar/yourPage.json
messages/fr/yourPage.json
```

2. **Translation file structure**:

```json
{
  "title": "Page Title",
  "subtitle": "Page subtitle",
  "content": "Page content"
}
```

3. **Update `src/i18n/request.js`**:

```javascript
const messages = {
  // ... existing namespaces
  yourPage: (await import(`../../messages/${validLocale}/yourPage.json`)).default,
};
```

4. **Use translations in your page**:

```tsx
import { useTranslations } from "next-intl";

export default function YourPage() {
  const t = useTranslations("yourPage");
  
  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("subtitle")}</p>
    </div>
  );
}
```

## RTL Support Patterns

### Text Direction

```tsx
const isRTL = locale === "ar";

<div dir={isRTL ? "rtl" : "ltr"}>
  {/* Content */}
</div>
```

### Text Alignment

```tsx
<div className={isRTL ? "text-right" : "text-left"}>
  {/* Content */}
</div>
```

### Flexbox Direction

```tsx
<div className={`flex ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
  {/* Content */}
</div>
```

### Icon Rotation

```tsx
<svg className={isRTL ? "rotate-180" : ""}>
  {/* Icon */}
</svg>
```

### Spacing (Logical Properties)

```tsx
// Use logical properties for RTL-aware spacing
<div className={isRTL ? "pr-4" : "pl-4"}>  // Padding start
<div className={isRTL ? "pl-4" : "pr-4"}>  // Padding end
<div className={isRTL ? "mr-4" : "ml-4"}>  // Margin start
<div className={isRTL ? "ml-4" : "mr-4"}>  // Margin end
```

## Page Templates

### Static Page Template

```tsx
import HeroSection from "@/components/HeroSection";
import { useTranslations } from "next-intl";

export default function StaticPage({ params }) {
  const { locale } = params;
  const t = useTranslations("pageName");
  const isRTL = locale === "ar";

  return (
    <main dir={isRTL ? "rtl" : "ltr"}>
      <HeroSection
        locale={locale}
        namespace="pageName"
        backgroundImage="/images/page-bg.jpg"
      />
      
      <section className="container mx-auto px-4 py-12">
        <h2 className={`text-3xl font-bold mb-6 ${isRTL ? "text-right" : "text-left"}`}>
          {t("heading")}
        </h2>
        <p className={isRTL ? "text-right" : "text-left"}>
          {t("content")}
        </p>
      </section>
    </main>
  );
}
```

### Dynamic Page Template

```tsx
import HeroSection from "@/components/HeroSection";
import { notFound } from "next/navigation";
import data from "@/data/items.json";

export default function DynamicPage({ params }) {
  const { locale, id } = params;
  const isRTL = locale === "ar";
  
  // Find item by ID
  const item = data.find(item => item.id === id);
  
  if (!item) {
    notFound();
  }
  
  // Get localized content
  const title = locale === "ar" ? item.nameAr : locale === "fr" ? item.nameFr : item.name;
  const description = locale === "ar" ? item.descriptionAr : locale === "fr" ? item.descriptionFr : item.description;

  return (
    <main dir={isRTL ? "rtl" : "ltr"}>
      <HeroSection
        locale={locale}
        namespace="heroSection"
        title={title}
        subtitle={description}
      />
      
      <section className="container mx-auto px-4 py-12">
        {/* Dynamic content */}
      </section>
    </main>
  );
}
```

## Dynamic Routes with JSON Data

### Data File Structure

Create JSON files in the `data/` directory:

```json
[
  {
    "id": "1",
    "name": "English Name",
    "nameAr": "الاسم العربي",
    "nameFr": "Nom français",
    "description": "English description",
    "descriptionAr": "الوصف العربي",
    "descriptionFr": "Description française"
  }
]
```

### Loading Data

```tsx
import data from "@/data/items.json";

// Find specific item
const item = data.find(item => item.id === params.id);

// Get localized field
const localizedName = locale === "ar" ? item.nameAr : locale === "fr" ? item.nameFr : item.name;
```

## Development Rules

### Server vs Client Components

- **Server Components** (default): Use for static content, data fetching
- **Client Components** (`"use client"`): Use only when needed for interactivity

```tsx
// Server Component (default)
export default function Page() {
  return <div>Static content</div>;
}

// Client Component (when needed)
"use client";
export default function InteractivePage() {
  const [state, setState] = useState();
  return <div>Interactive content</div>;
}
```

### No Hardcoded Text

❌ **Wrong:**
```tsx
<h1>Welcome to Panacea</h1>
```

✅ **Correct:**
```tsx
const t = useTranslations("home");
<h1>{t("welcome")}</h1>
```

### Locale Switching

Users can switch locales via the language switcher. All content automatically updates based on the current locale.

## Navbar Structure

The navbar includes the following menu items:

- Home
- About
- International Patients
- Services (Dropdown)
  - Teleconsultation
  - Tele-radiology
  - Tele-pathology
  - AI Solutions
  - Medical Tourism
- Doctors
- Hospitals
- Equipment
- Testimonials
- Blog
- Contact

## Available Pages

### Static Pages
- `/[locale]` - Home
- `/[locale]/about` - About Us
- `/[locale]/international-patients` - International Patients
- `/[locale]/contact` - Contact
- `/[locale]/blog` - Blog
- `/[locale]/privacy` - Privacy Policy
- `/[locale]/terms` - Terms & Conditions
- `/[locale]/consent` - Consent Information
- `/[locale]/hospitals` - Hospitals
- `/[locale]/services` - Services Overview
- `/[locale]/services/teleconsultation` - Teleconsultation
- `/[locale]/services/tele-radiology` - Tele-radiology
- `/[locale]/services/tele-pathology` - Tele-pathology
- `/[locale]/services/ai-solutions` - AI Solutions
- `/[locale]/services/medical-tourism` - Medical Tourism

### Dynamic Pages
- `/[locale]/testimonials` - Testimonials Listing
- `/[locale]/testimonials/[id]` - Testimonial Detail
- `/[locale]/doctors` - Doctors Listing
- `/[locale]/doctors/[id]` - Doctor Profile
- `/[locale]/equipment` - Equipment Listing
- `/[locale]/equipment/[id]` - Equipment Detail

## Best Practices

1. **Always use translations** - Never hardcode text
2. **Test all three languages** - EN, AR, FR
3. **Verify RTL layout** - Check Arabic pages for proper alignment
4. **Use HeroSection consistently** - Every page should have a hero section
5. **Follow color scheme** - Use Panacea brand colors
6. **Optimize images** - Use Next.js Image component
7. **Mobile-first design** - Ensure responsive layouts
8. **Semantic HTML** - Use proper heading hierarchy
9. **Accessibility** - Include alt text, ARIA labels
10. **Performance** - Lazy load images, minimize bundle size

## Common Issues & Solutions

### Issue: Translation not loading
**Solution:** Ensure the namespace is added to `src/i18n/request.js`

### Issue: RTL layout broken
**Solution:** Check `dir` attribute and use RTL-aware classes

### Issue: Image not displaying
**Solution:** Verify image path and use Next.js Image component

### Issue: Dynamic route 404
**Solution:** Ensure data file exists and ID matches

## Support

For questions or issues, contact the development team or refer to the Next.js and next-intl documentation.

---

**Last Updated:** December 2024  
**Version:** 1.0.0
