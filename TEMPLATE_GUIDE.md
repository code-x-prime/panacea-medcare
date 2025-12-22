# Panacea MedCare - Multi-Language Template System Guide

## Overview

This guide documents the multi-language template system for Panacea MedCare, featuring full EN/AR/FR support with RTL capabilities, reusable components, and a comprehensive page structure.

---

## 🎨 Color Scheme (Brand Design)

### Primary Colors

| Color Name                 | Hex Code  | Usage                                       |
| -------------------------- | --------- | ------------------------------------------- |
| **Primary Teal (Dark)**    | `#0B4D5E` | Hero backgrounds, primary buttons, headings |
| **Secondary Teal (Light)** | `#14919B` | Gradient end, hover states, icons           |
| **Accent Orange**          | `#F37021` | CTA buttons, highlights, important links    |
| **Navy Dark**              | `#1A365D` | Body text, headings                         |

### Background Colors

| Color Name      | Hex Code  | Usage                                    |
| --------------- | --------- | ---------------------------------------- |
| **White**       | `#FFFFFF` | Main content, cards                      |
| **Light Teal**  | `#E6F4F5` | Card backgrounds, subtle sections        |
| **Cream/Beige** | `#FFF8E7` | Testimonials section, alternate sections |
| **Light Blue**  | `#F0F9FF` | Very light backgrounds                   |

### Tailwind Config Colors

```javascript
colors: {
  panacea: {
    // Primary Teal Colors
    primary: "#0B4D5E",      // Dark Teal - Main primary
    secondary: "#14919B",    // Light Teal - Gradient end

    // Accent Orange (Buttons)
    accent: "#F37021",       // Bright Orange - CTA buttons

    // Dark Navy (Text)
    dark: "#1A365D",         // Navy - Headings

    // Light Backgrounds
    light: "#E6F4F5",        // Light teal bg for cards
    cream: "#FFF8E7",        // Cream/Beige for sections
    lightBlue: "#F0F9FF",    // Very light blue

    // Teal Scale
    teal: {
      50: "#E6F4F5",
      100: "#CCE9EB",
      200: "#99D3D7",
      300: "#66BDC3",
      400: "#33A7AF",
      500: "#14919B",
      600: "#0B4D5E",
      700: "#083D4B",
      800: "#062D38",
      900: "#041D25",
    },

    // Orange Scale
    orange: {
      50: "#FEF3E9",
      100: "#FDE7D3",
      200: "#FBCFA7",
      300: "#F9B77B",
      400: "#F79F4F",
      500: "#F37021",
      600: "#D45E15",
      700: "#A54910",
      800: "#76340B",
      900: "#471F07",
    },

    // Navy Scale
    navy: {
      50: "#E8EDF3",
      100: "#D1DBE7",
      200: "#A3B7CF",
      300: "#7593B7",
      400: "#476F9F",
      500: "#2C5282",
      600: "#1A365D",
      700: "#142B4A",
      800: "#0F2037",
      900: "#0A1524",
    },
  }
}
```

### CSS Custom Properties (globals.css)

```css
:root {
  --panacea-primary: #0b4d5e;
  --panacea-secondary: #14919b;
  --panacea-accent: #f37021;
  --panacea-dark: #1a365d;
  --panacea-light: #e6f4f5;
  --panacea-cream: #fff8e7;
  --panacea-light-blue: #f0f9ff;

  /* Gradients */
  --panacea-gradient: linear-gradient(135deg, #0b4d5e 0%, #14919b 100%);
}
```

### Gradients

```javascript
backgroundImage: {
  'panacea-gradient': 'linear-gradient(135deg, #0B4D5E 0%, #14919B 100%)',
  'panacea-gradient-dark': 'linear-gradient(135deg, #041D25 0%, #0B4D5E 100%)',
  'panacea-gradient-light': 'linear-gradient(135deg, #14919B 0%, #66BDC3 100%)',
}
```

### Box Shadows

```javascript
boxShadow: {
  'panacea': '0 4px 14px 0 rgba(11, 77, 94, 0.15)',
  'panacea-lg': '0 10px 40px 0 rgba(11, 77, 94, 0.2)',
  'panacea-orange': '0 4px 14px 0 rgba(243, 112, 33, 0.3)',
}
```

---

## 🎯 Color Usage Examples

### Hero Section

```jsx
<div className="bg-panacea-gradient text-white">
  <h1 className="text-4xl font-bold">Transforming Healthcare</h1>
  <button className="bg-panacea-accent hover:bg-panacea-orange-600 text-white px-6 py-3 rounded-lg">
    Get Started
  </button>
</div>
```

### Service Cards (White Background)

```jsx
<div className="bg-white rounded-xl shadow-panacea p-6 hover:shadow-panacea-lg transition-all">
  <div className="w-16 h-16 bg-panacea-light rounded-full flex items-center justify-center mb-4">
    <Icon className="w-8 h-8 text-panacea-primary" />
  </div>
  <h3 className="text-xl font-bold text-panacea-dark mb-2">Medical Tourism</h3>
  <p className="text-gray-600">Description text here</p>
</div>
```

### Testimonials Section (Cream Background)

```jsx
<section className="bg-panacea-cream py-16">
  <h2 className="text-3xl font-bold text-panacea-dark">
    Real Patients. Real Stories.
  </h2>
</section>
```

### Buttons

```jsx
{
  /* Orange CTA Button (Primary Action) */
}
<button className="bg-panacea-accent hover:bg-panacea-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-panacea-orange hover:shadow-lg transition-all">
  Book Teleconsultation
</button>;

{
  /* Teal Primary Button */
}
<button className="bg-panacea-primary hover:bg-panacea-teal-700 text-white font-semibold px-6 py-3 rounded-lg shadow-panacea hover:shadow-panacea-lg transition-all">
  Learn More
</button>;

{
  /* Outline Button */
}
<button className="border-2 border-panacea-primary text-panacea-primary hover:bg-panacea-primary hover:text-white font-semibold px-6 py-3 rounded-lg transition-all">
  Contact Us
</button>;
```

### Icons

```jsx
<div className="w-16 h-16 bg-panacea-light rounded-full flex items-center justify-center">
  <Plane className="w-8 h-8 text-panacea-secondary" />
</div>
```

---

## 📁 Project Structure

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

---

## 🧩 Component Color Guide

### Header/Navbar

- Background: `bg-white` or `bg-panacea-gradient`
- Logo: Uses brand colors
- CTA Button: `bg-panacea-accent` (Orange)
- Links: `text-panacea-dark hover:text-panacea-primary`

### Hero Section (Home Page) - Sheeba Style

**Main Heading:** `"World-Class Medicine with a Personal Touch"`

**Tagline:** `"Global Care – Indian Compassion – Redefining Medical Tourism"`

**Font:** Raleway (same as logo) - `var(--font-raleway)`

**Design (Like Sheeba Medical Tourism):**

```
┌─────────────────────────────────────────────────────────┐
│  ┌─────────────┐                                        │
│  │ WORLD'S     │ 2025                                   │
│  │ BEST        │ Newsweek                               │
│  │ HOSPITALS   │ statista                               │
│  └─────────────┘                                        │
│                                                         │
│  World-Class Medicine                                   │
│  with a Personal Touch                                  │
│                                                         │
│  Global Care – Indian Compassion –                      │
│  Redefining Medical Tourism                             │
│                                        • • • • • •      │
│  [🟢 About us →]  [🔴 Patient Stories →]  • • • • •    │
│                                        • • • • • •      │
│  ▶ Get Free Consultation                                │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Structure:**

- Clean medical/surgery background image
- Solid teal overlay (`bg-panacea-primary/75`)
- Decorative dot pattern in center
- World's Best Hospitals 2025 badge (Newsweek/Statista)
- Main heading in light font weight + italic second line
- Two rounded CTA buttons (teal + accent outline)

**Colors:**

- Background Overlay: `bg-panacea-primary/75`
- Primary CTA: `bg-panacea-secondary` (Teal button)
- Secondary CTA: `border-panacea-accent` (Orange outline)
- Text: `text-white`

**Accessibility:**

- `role="banner"` and `aria-label` on section
- Meaningful alt text on images
- Focus-visible states on buttons

```jsx
// Main Heading Style
<h1 className="font-light text-white">
  <span>World-Class Medicine</span>
  <span className="italic">with a Personal Touch</span>
</h1>

// Tagline
<p style={{ fontFamily: "var(--font-raleway)" }}>
  Global Care – Indian Compassion – Redefining Medical Tourism
</p>
```

### Service/Feature Cards

- Background: `bg-white`
- Shadow: `shadow-panacea`
- Icon Background: `bg-panacea-light`
- Icon Color: `text-panacea-primary` or `text-panacea-secondary`
- Title: `text-panacea-dark`

### Testimonials

- Section Background: `bg-panacea-cream`
- Card Background: `bg-white`
- Heading: `text-panacea-dark`

### Footer

- Background: `bg-panacea-primary` or `bg-panacea-gradient-dark`
- Text: `text-white`
- Links: `text-gray-300 hover:text-white`

### Forms

- Input Border: `border-gray-300 focus:border-panacea-primary`
- Submit Button: `bg-panacea-accent`
- Labels: `text-panacea-dark`

---

## 🎨 Utility Classes (Pre-defined in globals.css)

```css
/* Hero Gradient Background */
.bg-panacea-hero {
  background: linear-gradient(135deg, #0b4d5e 0%, #14919b 100%);
}

/* Orange CTA Button */
.btn-panacea-cta {
  @apply bg-panacea-accent hover:bg-panacea-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-panacea-orange hover:shadow-lg;
}

/* Primary Teal Button */
.btn-panacea-primary {
  @apply bg-panacea-primary hover:bg-panacea-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-panacea hover:shadow-panacea-lg;
}

/* Secondary Outline Button */
.btn-panacea-outline {
  @apply border-2 border-panacea-primary text-panacea-primary hover:bg-panacea-primary hover:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300;
}

/* Card with Panacea styling */
.card-panacea {
  @apply bg-white rounded-xl shadow-panacea hover:shadow-panacea-lg transition-all duration-300;
}

/* Section with cream background */
.section-cream {
  @apply bg-panacea-cream;
}

/* Section with light teal background */
.section-light {
  @apply bg-panacea-light;
}

/* Heading with navy color */
.heading-panacea {
  @apply text-panacea-dark font-bold;
}

/* Icon container */
.icon-panacea {
  @apply w-16 h-16 rounded-full bg-panacea-light flex items-center justify-center text-panacea-primary;
}
```

---

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

| Prop              | Type      | Required | Description                                          |
| ----------------- | --------- | -------- | ---------------------------------------------------- |
| `locale`          | string    | Yes      | Current locale (en/ar/fr)                            |
| `namespace`       | string    | Yes      | Translation namespace to use                         |
| `title`           | string    | No       | Override title (uses translation if not provided)    |
| `subtitle`        | string    | No       | Override subtitle (uses translation if not provided) |
| `backgroundImage` | string    | No       | Custom background image path                         |
| `fallbackImage`   | string    | No       | Fallback image if backgroundImage not provided       |
| `customContent`   | ReactNode | No       | Custom content to replace default title/subtitle     |

### Features

- ✅ Full RTL support for Arabic
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Teal gradient overlay
- ✅ Auto-height background image
- ✅ Translation support via next-intl
- ✅ Panacea brand colors

---

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
  yourPage: (await import(`../../messages/${validLocale}/yourPage.json`))
    .default,
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

---

## RTL Support Patterns

### Text Direction

```tsx
const isRTL = locale === "ar";

<div dir={isRTL ? "rtl" : "ltr"}>{/* Content */}</div>;
```

### Text Alignment

```tsx
<div className={isRTL ? "text-right" : "text-left"}>{/* Content */}</div>
```

### Flexbox Direction

```tsx
<div className={`flex ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
  {/* Content */}
</div>
```

### Icon Rotation

```tsx
<svg className={isRTL ? "rotate-180" : ""}>{/* Icon */}</svg>
```

### Spacing (Logical Properties)

```tsx
// Use logical properties for RTL-aware spacing
<div className={isRTL ? "pr-4" : "pl-4"}>  // Padding start
<div className={isRTL ? "pl-4" : "pr-4"}>  // Padding end
<div className={isRTL ? "mr-4" : "ml-4"}>  // Margin start
<div className={isRTL ? "ml-4" : "mr-4"}>  // Margin end
```

---

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
        <h2
          className={`text-3xl font-bold text-panacea-dark mb-6 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {t("heading")}
        </h2>
        <p className={`text-gray-600 ${isRTL ? "text-right" : "text-left"}`}>
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

  const item = data.find((item) => item.id === id);

  if (!item) {
    notFound();
  }

  const title =
    locale === "ar" ? item.nameAr : locale === "fr" ? item.nameFr : item.name;

  return (
    <main dir={isRTL ? "rtl" : "ltr"}>
      <HeroSection locale={locale} namespace="heroSection" title={title} />

      <section className="container mx-auto px-4 py-12">
        {/* Dynamic content */}
      </section>
    </main>
  );
}
```

---

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

---

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

---

## Best Practices

1. **Always use translations** - Never hardcode text
2. **Test all three languages** - EN, AR, FR
3. **Verify RTL layout** - Check Arabic pages for proper alignment
4. **Use HeroSection consistently** - Every page should have a hero section
5. **Follow color scheme** - Use Panacea brand colors as defined above
6. **Optimize images** - Use Next.js Image component
7. **Mobile-first design** - Ensure responsive layouts
8. **Semantic HTML** - Use proper heading hierarchy
9. **Accessibility** - Include alt text, ARIA labels
10. **Performance** - Lazy load images, minimize bundle size

---

## Common Issues & Solutions

### Issue: Translation not loading

**Solution:** Ensure the namespace is added to `src/i18n/request.js`

### Issue: RTL layout broken

**Solution:** Check `dir` attribute and use RTL-aware classes

### Issue: Image not displaying

**Solution:** Verify image path and use Next.js Image component

### Issue: Dynamic route 404

**Solution:** Ensure data file exists and ID matches

### Issue: Colors not matching design

**Solution:** Use the exact color codes from this guide:

- Primary: `#0B4D5E`
- Secondary: `#14919B`
- Accent: `#F37021`
- Dark: `#1A365D`
- Cream: `#FFF8E7`
- Light: `#E6F4F5`

---

## 💬 AI Chatbot (Sheeba-Style)

The Panacea Medcare chatbot is a compact, floating widget that auto-opens with a greeting message.

### Features

- ✅ **Auto-greeting** - Shows friendly bubble after 2 seconds
- ✅ **Compact size** - 320x450px, doesn't hide homepage content
- ✅ **Minimizable** - Can minimize to header only
- ✅ **Quick actions** - Pre-defined buttons for common queries
- ✅ **Multi-language** - Supports EN/AR/FR with RTL
- ✅ **Lead capture** - Auto-detects contact info and creates leads

### Chatbot Behavior

```
1. User lands on website
2. After 2 seconds → Greeting bubble appears
3. User clicks bubble → Chat opens with welcome message
4. Quick action buttons shown for first-time users
5. User can minimize or close anytime
```

### Styling

The chatbot uses Panacea brand colors:

- **Header**: `bg-panacea-gradient` (Teal gradient)
- **User messages**: `bg-panacea-gradient` (Teal gradient)
- **Bot messages**: `bg-white` with border
- **Send button**: `bg-panacea-gradient`
- **Quick actions**: `bg-panacea-light` → `hover:bg-panacea-primary`
- **Notification badge**: `bg-panacea-accent` (Orange)

### Size Specifications

| State               | Width     | Height    |
| ------------------- | --------- | --------- |
| **Normal**          | 320-360px | 450-480px |
| **Minimized**       | 280px     | 60px      |
| **Floating Button** | 56px      | 56px      |
| **Greeting Bubble** | 280px max | Auto      |

### Quick Actions (Customizable)

```javascript
const quickActions = [
  { label: "Free Consultation", message: "I want a free medical consultation" },
  { label: "Treatment Cost", message: "What is the treatment cost?" },
  { label: "Hospitals", message: "Tell me about hospitals" },
];
```

### Position

- **LTR (English/French)**: Bottom-right corner
- **RTL (Arabic)**: Bottom-left corner

---

## Support

For questions or issues, contact the development team or refer to the Next.js and next-intl documentation.

---

**Last Updated:** December 2024  
**Version:** 2.1.0
