# Panacea MedCare - Multi-Language Template System Guide

## Overview

This guide documents the multi-language template system for Panacea MedCare, featuring full EN/AR/FR support with RTL capabilities, reusable components, and a comprehensive page structure.

---

## 🎨 Color Scheme (Brand Design)

### 🔵 Primary Brand Colors (MAIN)

These colors will be the base everywhere (buttons, links, CTAs):

| Color Name       | Hex Code  | Usage                                                                                      |
| ---------------- | --------- | ------------------------------------------------------------------------------------------ |
| **Panacea Blue** | `#0066CC` | Main primary color - Trust, medical professionalism. Primary buttons, links, headings, CTA |
| **Healing Cyan** | `#00C2D1` | AI + tech feel. Icons, highlights, gradients, chatbot, AI sections                         |

### 🟠 Secondary / Accent Colors

| Color Name          | Hex Code  | Usage                                                             |
| ------------------- | --------- | ----------------------------------------------------------------- |
| **Vitality Orange** | `#FF6B35` | Action & warmth. Book Teleconsult, WhatsApp button, important CTA |
| **Fresh Green**     | `#0BA35A` | Health & success. Success messages, confirmation states           |

### ⚫ Text & Background Colors

| Color Name        | Hex Code  | Usage                                             |
| ----------------- | --------- | ------------------------------------------------- |
| **Midnight Navy** | `#003459` | Headers, footer, dark sections, video lightbox    |
| **Soft Gray**     | `#F5F7FA` | Page background, cards background (white se soft) |
| **Slate Gray**    | `#6D7A8A` | Body text, secondary text                         |
| **Warm Yellow**   | `#FFD166` | Small highlights, icons, testimonial accents      |

### Tailwind Config Colors

```javascript
colors: {
  panacea: {
    // Primary Brand Colors (MAIN)
    primary: "#0066CC",       // Panacea Blue - Main primary color
    secondary: "#00C2D1",    // Healing Cyan - AI + tech feel

    // Secondary / Accent Colors
    accent: "#FF6B35",       // Vitality Orange - Action & warmth
    green: "#0BA35A",        // Fresh Green - Health & success

    // Text & Background Colors
    dark: "#003459",         // Midnight Navy - Headers, footer, dark sections
    light: "#F5F7FA",        // Soft Gray - Page background, cards
    gray: "#6D7A8A",         // Slate Gray - Body text, secondary text
    yellow: "#FFD166",       // Warm Yellow - Highlights, icons, testimonial accents

    // Blue Scale (Panacea Blue)
    blue: {
      DEFAULT: "#0066CC",
      50: "#E6F2FF",
      100: "#CCE5FF",
      200: "#99CBFF",
      300: "#66B1FF",
      400: "#3397FF",
      500: "#0066CC",
      600: "#0052A3",
      700: "#003D7A",
      800: "#002952",
      900: "#001429",
    },

    // Cyan Scale (Healing Cyan)
    cyan: {
      DEFAULT: "#00C2D1",
      50: "#E6F9FB",
      100: "#CCF3F7",
      200: "#99E7EF",
      300: "#66DBE7",
      400: "#33CFDF",
      500: "#00C2D1",
      600: "#009BA7",
      700: "#00747D",
      800: "#004D53",
      900: "#002629",
    },

    // Orange Scale (Vitality Orange)
    orange: {
      DEFAULT: "#FF6B35",
      50: "#FFF4F0",
      100: "#FFE9E1",
      200: "#FFD3C3",
      300: "#FFBDA5",
      400: "#FFA787",
      500: "#FF6B35",
      600: "#CC562A",
      700: "#994020",
      800: "#662B15",
      900: "#33150B",
    },

    // Green Scale (Fresh Green)
    green: {
      DEFAULT: "#0BA35A",
      50: "#E6F7F0",
      100: "#CCEFE1",
      200: "#99DFC3",
      300: "#66CFA5",
      400: "#33BF87",
      500: "#0BA35A",
      600: "#088248",
      700: "#066236",
      800: "#044124",
      900: "#022112",
    },

    // Navy Scale (Midnight Navy)
    navy: {
      DEFAULT: "#003459",
      50: "#E6EDF2",
      100: "#CCDBE5",
      200: "#99B7CB",
      300: "#6693B1",
      400: "#336F97",
      500: "#003459",
      600: "#002A47",
      700: "#001F35",
      800: "#001523",
      900: "#000A12",
    },

    // Yellow Scale (Warm Yellow)
    yellow: {
      DEFAULT: "#FFD166",
      50: "#FFFBF0",
      100: "#FFF7E1",
      200: "#FFEFC3",
      300: "#FFE7A5",
      400: "#FFDF87",
      500: "#FFD166",
      600: "#CCA752",
      700: "#997D3D",
      800: "#665429",
      900: "#332A14",
    },
  }
}
```

### CSS Custom Properties (globals.css)

```css
:root {
  /* Primary Brand Colors */
  --panacea-primary: #0066cc; /* Panacea Blue */
  --panacea-secondary: #00c2d1; /* Healing Cyan */

  /* Secondary / Accent Colors */
  --panacea-accent: #ff6b35; /* Vitality Orange */
  --panacea-green: #0ba35a; /* Fresh Green */

  /* Text & Background Colors */
  --panacea-dark: #003459; /* Midnight Navy */
  --panacea-light: #f5f7fa; /* Soft Gray */
  --panacea-gray: #6d7a8a; /* Slate Gray */
  --panacea-yellow: #ffd166; /* Warm Yellow */

  /* Gradients */
  --panacea-gradient: linear-gradient(
    135deg,
    #00c2d1 0%,
    #0066cc 100%
  ); /* AI Healthcare Glow */
  --panacea-gradient-ai: linear-gradient(135deg, #00c2d1 0%, #0066cc 100%);
  --panacea-gradient-warmth: linear-gradient(
    135deg,
    #ff6b35 0%,
    #ffd166 100%
  ); /* Human Touch Warmth */
  --panacea-gradient-futuristic: linear-gradient(
    135deg,
    #0ba35a 0%,
    #00c2d1 100%
  ); /* Med-Tech Futuristic */
  --panacea-gradient-dark: linear-gradient(135deg, #003459 0%, #0066cc 100%);
}
```

### 🌈 Gradients (IMPORTANT – client ko ye pasand hai)

1️⃣ **AI Healthcare Glow**

```css
linear-gradient(135deg, #00C2D1 → #0066CC)
```

👉 Hero section, AI services, Tech sections

2️⃣ **Human Touch Warmth**

```css
linear-gradient(135deg, #FF6B35 → #FFD166)
```

👉 Testimonials, Emotional CTAs, Patient stories

3️⃣ **Med-Tech Futuristic**

```css
linear-gradient(135deg, #0BA35A → #00C2D1)
```

👉 Health + AI mix sections

### Tailwind Gradient Classes

```javascript
backgroundImage: {
  'panacea-gradient': 'linear-gradient(135deg, #00C2D1 0%, #0066CC 100%)',        // AI Healthcare Glow
  'panacea-gradient-ai': 'linear-gradient(135deg, #00C2D1 0%, #0066CC 100%)',
  'panacea-gradient-warmth': 'linear-gradient(135deg, #FF6B35 0%, #FFD166 100%)', // Human Touch Warmth
  'panacea-gradient-futuristic': 'linear-gradient(135deg, #0BA35A 0%, #00C2D1 100%)', // Med-Tech Futuristic
  'panacea-gradient-dark': 'linear-gradient(135deg, #003459 0%, #0066CC 100%)',
  'panacea-gradient-light': 'linear-gradient(135deg, #E6F2FF 0%, #F5F7FA 100%)',
}
```

### Box Shadows

```javascript
boxShadow: {
  'panacea': '0 4px 14px 0 rgba(0, 102, 204, 0.15)',
  'panacea-lg': '0 10px 40px 0 rgba(0, 102, 204, 0.2)',
  'panacea-orange': '0 4px 14px 0 rgba(255, 107, 53, 0.3)',
  'panacea-cyan': '0 4px 14px 0 rgba(0, 194, 209, 0.2)',
  'panacea-green': '0 4px 14px 0 rgba(11, 163, 90, 0.2)',
}
```

---

## 🎯 Color Usage Examples

### 🏠 Home Page

**Hero Section:**

```jsx
<div className="bg-panacea-gradient-ai text-white">
  <h1 className="text-4xl font-bold">Transforming Healthcare</h1>
  <button className="bg-panacea-primary hover:bg-panacea-blue-600 text-white px-6 py-3 rounded-lg">
    Get Started
  </button>
  <button className="bg-panacea-accent hover:bg-panacea-orange-600 text-white px-6 py-3 rounded-lg">
    Book Teleconsult
  </button>
</div>
```

**Background:** White / Soft Gray (`bg-white` or `bg-panacea-light`)

### 🤖 AI / Services Pages

**Background:** White / Soft Gray (`bg-white` or `bg-panacea-light`)

**Icons & highlights:** Cyan (`text-panacea-secondary`, `bg-panacea-cyan-50`)

**Section headers:** Navy (`text-panacea-dark`)

```jsx
<div className="bg-white rounded-xl shadow-panacea p-6 hover:shadow-panacea-lg transition-all">
  <div className="w-16 h-16 bg-panacea-light rounded-full flex items-center justify-center mb-4">
    <Icon className="w-8 h-8 text-panacea-secondary" />
  </div>
  <h3 className="text-xl font-bold text-panacea-dark mb-2">AI Services</h3>
  <p className="text-panacea-gray">Description text here</p>
</div>
```

### 🩺 Teleconsult / Booking

**Main CTA:** Panacea Blue (`bg-panacea-primary`)

**WhatsApp / urgent:** Orange (`bg-panacea-accent`)

**Success:** Green (`bg-panacea-green`, `text-panacea-green`)

```jsx
<button className="bg-panacea-primary hover:bg-panacea-blue-600 text-white px-6 py-3 rounded-lg">
  Book Appointment
</button>
<button className="bg-panacea-accent hover:bg-panacea-orange-600 text-white px-6 py-3 rounded-lg">
  WhatsApp Us
</button>
```

### 💬 Testimonials

**Cards:** White (`bg-white`)

**Border & play icon:** Cyan (`border-panacea-secondary`, `text-panacea-secondary`)

**Accent:** Orange / Yellow (`bg-panacea-gradient-warmth`)

**Video popup:** Dark Navy (`bg-panacea-dark`)

```jsx
<div className="bg-white rounded-xl shadow-panacea p-6 border-2 border-panacea-secondary">
  <div className="w-16 h-16 bg-panacea-gradient-warmth rounded-full flex items-center justify-center">
    <PlayIcon className="w-8 h-8 text-white" />
  </div>
</div>
```

### 🧾 Footer

**Background:** Midnight Navy (`bg-panacea-dark`)

**Text:** White (`text-white`)

**Accent links/icons:** Cyan (`text-panacea-secondary hover:text-panacea-cyan-300`)

```jsx
<footer className="bg-panacea-dark text-white">
  <a href="#" className="text-panacea-secondary hover:text-panacea-cyan-300">
    Link
  </a>
</footer>
```

### ❌ Kya NAHI karna (important)

❌ Black heavy background  
❌ Dark fintech-style UI  
❌ Red aggressive colors  
❌ Overly colorful / neon UI

👉 Site medical + human + AI feel wali honi chahiye, Sheba Online type vibe.

### Testimonials Section (Warmth Gradient Background)

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

### 🎯 Hero Section (Home Page) - High-Impact Medical Tourism Design

**Objective:**

- Instantly communicate global medical care with Indian compassion
- Create emotional trust for international patients
- Highlight medical tourism + treatment journey
- Encourage users to contact / book consultation

**🎨 Visual Style & Background (MANDATORY):**

- **Full-width background image** with warm, hopeful, human theme:

  - Smiling, happy patients
  - Doctors interacting compassionately with patients
  - Hospital or treatment environment
  - Must feel warm, hopeful, and human (similar to Sheba Medical Center)

- **Soft overlay gradient** for text readability:

  ```css
  linear-gradient(
    rgba(0, 102, 204, 0.65),
    rgba(0, 194, 209, 0.65)
  )
  ```

- **Text color:** White (`text-white`)

**📝 Hero Content (MANDATORY – client provided):**

**Headline (H1 – bold & prominent):**

```
"Global Care – Indian Compassion – Redefining Medical Tourism"
```

**Supporting text (1–2 short lines only):**

```
"World-class treatments, expert doctors, and personalized care — guiding you at every step of your healing journey."
```

**🎯 CTA Buttons:**

**Primary CTA (main):**

- "Get a Free Teleconsultation" or "Contact Us Now"
- White background (`bg-white`) with blue text (`text-panacea-primary`)
- Large, prominent button

**Secondary CTA (optional, subtle):**

- WhatsApp icon + "Chat on WhatsApp"
- Orange background (`bg-panacea-accent`)
- Opens WhatsApp chat

**❌ Maximum 2 CTAs only**

**📱 Layout & Responsiveness:**

**Mobile-first design:**

- Background image cropped carefully (faces visible)
- Text centered
- CTA buttons full-width on mobile

**Desktop:**

- Center-aligned or left-aligned text
- Image stays immersive and emotional
- Maintain enough padding so content never touches edges

**⚡ Performance Rules:**

- Background image must be:
  - Highly optimized (WebP / AVIF)
  - Lazy-loaded (except hero - use `priority`)
  - Max visual quality with low file size
- **No video background**
- **No slider in hero**
- **No heavy animation**

**🎬 Subtle Enhancements (Allowed):**

- Soft fade-in text animation
- Slight CTA hover animation
- Gentle zoom/parallax effect on background image (VERY subtle)

**♿ Accessibility:**

- High contrast overlay for readability
- Clear button labels
- Keyboard accessible CTAs
- `role="banner"` and `aria-label` on section
- Meaningful alt text on images

**❌ Explicitly Avoid:**

- Dark black hero
- Aggressive fintech look
- Too many texts
- Stock-photo looking cheap images

**Code Example:**

```jsx
<section
  className="relative min-h-[85vh] md:min-h-[90vh] overflow-hidden"
  role="banner"
  aria-label="Hero Section"
>
  {/* Full-width Background Image */}
  <div className="absolute inset-0">
    <Image
      src="/images/hero-medical-care.webp"
      alt="World-class medical care with compassionate doctors and happy patients"
      fill
      className="object-cover object-center"
      priority
      quality={90}
      sizes="100vw"
    />

    {/* Soft Overlay Gradient */}
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(
          rgba(0, 102, 204, 0.65),
          rgba(0, 194, 209, 0.65)
        )`,
      }}
    />
  </div>

  {/* Content */}
  <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-[85vh] md:min-h-[90vh] flex items-center">
    <div className="w-full max-w-4xl">
      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
        Global Care – Indian Compassion – Redefining Medical Tourism
      </h1>

      {/* Supporting Text */}
      <p className="text-lg sm:text-xl md:text-2xl text-white/95 font-medium mb-10 max-w-3xl leading-relaxed">
        World-class treatments, expert doctors, and personalized care — guiding
        you at every step of your healing journey.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Primary CTA */}
        <Link
          href="/services/teleconsultation"
          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-panacea-primary rounded-lg font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
        >
          Get a Free Teleconsultation
          <ArrowRight className="w-5 h-5" />
        </Link>

        {/* Secondary CTA - WhatsApp */}
        <a
          href="https://wa.me/919958800961"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-panacea-accent text-white rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <MessageCircle className="w-5 h-5" />
          Chat on WhatsApp
        </a>
      </div>
    </div>
  </div>
</section>
```

**🧩 Tech Stack:**

- Next.js
- Tailwind CSS
- Optimized responsive images (Next.js Image component)
- WebP/AVIF format for performance

**Design Philosophy:**

The Hero section should feel **premium, emotional, trustworthy, and human**, clearly positioning Panacea Medcare as a global medical tourism brand with Indian compassion, similar in warmth and credibility to Sheba Medical Center.

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
/* Hero Gradient Background - AI Healthcare Glow */
.bg-panacea-hero {
  background: linear-gradient(135deg, #00c2d1 0%, #0066cc 100%);
}

/* Orange CTA Button - Vitality Orange */
.btn-panacea-cta {
  @apply bg-panacea-accent hover:bg-panacea-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-panacea-orange hover:shadow-lg;
}

/* Primary Blue Button - Panacea Blue */
.btn-panacea-primary {
  @apply bg-panacea-primary hover:bg-panacea-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-panacea hover:shadow-panacea-lg;
}

/* Secondary Cyan Button - Healing Cyan */
.btn-panacea-secondary {
  @apply bg-panacea-secondary hover:bg-panacea-cyan-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-panacea-cyan hover:shadow-lg;
}

/* Secondary Outline Button */
.btn-panacea-outline {
  @apply border-2 border-panacea-primary text-panacea-primary hover:bg-panacea-primary hover:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300;
}

/* Card with Panacea styling */
.card-panacea {
  @apply bg-white rounded-xl shadow-panacea hover:shadow-panacea-lg transition-all duration-300;
}

/* Section with soft gray background */
.section-light {
  @apply bg-panacea-light;
}

/* Section with white background */
.section-white {
  @apply bg-white;
}

/* Heading with navy color */
.heading-panacea {
  @apply text-panacea-dark font-bold;
}

/* Icon container - Cyan for AI/Tech */
.icon-panacea {
  @apply w-16 h-16 rounded-full bg-panacea-light flex items-center justify-center text-panacea-secondary;
}

/* Icon container - Blue for primary */
.icon-panacea-primary {
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

## TopBanner Component

### Usage

The `TopBanner` component is a reusable banner component for all pages that displays page headings with a distinct background color, following Panacea design system. It's simpler and more compact than the HeroSection component, perfect for internal pages.

```jsx
import TopBanner from "@/components/TopBanner";

export default function Page({ params }) {
  const { locale } = params;

  return (
    <main dir={isRTL ? "rtl" : "ltr"}>
      <TopBanner
        locale={locale}
        namespace="pageName"
        variant="gradient"
        size="md"
      />

      <section className="container mx-auto px-4 py-12">
        {/* Page content */}
      </section>
    </main>
  );
}
```

### Props

| Prop        | Type   | Required | Default      | Description                                                               |
| ----------- | ------ | -------- | ------------ | ------------------------------------------------------------------------- |
| `locale`    | string | Yes      | -            | Current locale (en/ar/fr)                                                 |
| `namespace` | string | Yes      | -            | Translation namespace to use (e.g., "about", "services")                  |
| `title`     | string | No       | -            | Optional title override (uses translation if not provided)                |
| `subtitle`  | string | No       | -            | Optional subtitle override                                                |
| `variant`   | string | No       | `"gradient"` | Banner variant: `"gradient"` \| `"primary"` \| `"secondary"` \| `"light"` |
| `size`      | string | No       | `"md"`       | Banner size: `"sm"` \| `"md"` \| `"lg"`                                   |

### Variants

- **`gradient`** (default): Uses Panacea gradient (`bg-panacea-gradient`) with white text
- **`primary`**: Uses primary teal (`bg-panacea-primary`) with white text
- **`secondary`**: Uses secondary teal (`bg-panacea-secondary`) with white text
- **`light`**: Uses light teal (`bg-panacea-light`) with dark text

### Sizes

- **`sm`**: Compact banner (`py-8 md:py-10`)
- **`md`** (default): Standard banner (`py-12 md:py-16`)
- **`lg`**: Large banner (`py-16 md:py-20`)

### Features

- ✅ Full RTL support for Arabic
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Distinct background color (different from page body)
- ✅ Clear page heading display
- ✅ Follows Panacea spacing, typography, and color tokens
- ✅ Translation support via next-intl
- ✅ Consistent across all pages
- ✅ Accessible (semantic HTML, ARIA labels)

### Example Usage

```jsx
// Basic usage with translations
<TopBanner locale={locale} namespace="about" />

// With custom title
<TopBanner
  locale={locale}
  namespace="about"
  title="About Panacea Medcare"
  subtitle="Your trusted healthcare partner"
/>

// Light variant for pages with light backgrounds
<TopBanner
  locale={locale}
  namespace="services"
  variant="light"
  size="sm"
/>

// Large banner for important pages
<TopBanner
  locale={locale}
  namespace="contact"
  variant="gradient"
  size="lg"
/>
```

### Translation File Structure

Ensure your translation files include `title` and optionally `subtitle`:

```json
{
  "title": "About Us",
  "subtitle": "Your trusted healthcare partner"
}
```

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
