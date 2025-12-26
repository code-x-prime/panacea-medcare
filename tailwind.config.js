/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-raleway)", "sans-serif"],
      },
      colors: {
        // Panacea Brand Colors (New Color Scheme)
        panacea: {
          // Primary Brand Colors (MAIN)
          primary: "#066F89",       // Logo Teal - Main primary color
          secondary: "#066F89",    // Logo Teal - AI + tech feel

          // Secondary / Accent Colors
          accent: "#FF6B35",       // Vitality Orange - Action & warmth
          green: "#0BA35A",        // Fresh Green - Health & success

          // Text & Background Colors
          dark: "#003459",         // Midnight Navy - Headers, footer, dark sections
          light: "#F5F7FA",        // Soft Gray - Page background, cards
          gray: "#6D7A8A",         // Slate Gray - Body text, secondary text
          yellow: "#FFD166",        // Warm Yellow - Highlights, icons, testimonial accents

          // Teal Scale (Logo Teal #066F89)
          blue: {
            DEFAULT: "#066F89",
            50: "#E6F4F7",
            100: "#CCE9EF",
            200: "#99D3DF",
            300: "#66BDCF",
            400: "#33A7BF",
            500: "#066F89",
            600: "#05596D",
            700: "#044351",
            800: "#022D35",
            900: "#01171A",
          },

          // Teal Scale (Logo Teal #066F89)
          cyan: {
            DEFAULT: "#066F89",
            50: "#E6F4F7",
            100: "#CCE9EF",
            200: "#99D3DF",
            300: "#66BDCF",
            400: "#33A7BF",
            500: "#066F89",
            600: "#05596D",
            700: "#044351",
            800: "#022D35",
            900: "#01171A",
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
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      backgroundImage: {
        // AI Healthcare Glow Gradient
        'panacea-gradient': 'linear-gradient(135deg, #066F89 0%, #066F89 100%)',
        'panacea-gradient-ai': 'linear-gradient(135deg, #066F89 0%, #066F89 100%)',

        // Human Touch Warmth Gradient
        'panacea-gradient-warmth': 'linear-gradient(135deg, #FF6B35 0%, #FFD166 100%)',

        // Med-Tech Futuristic Gradient
        'panacea-gradient-futuristic': 'linear-gradient(135deg, #0BA35A 0%, #066F89 100%)',

        // Dark variants
        'panacea-gradient-dark': 'linear-gradient(135deg, #003459 0%, #066F89 100%)',
        'panacea-gradient-light': 'linear-gradient(135deg, #E6F4F7 0%, #F5F7FA 100%)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'panacea': '0 4px 14px 0 rgba(6, 111, 137, 0.15)',
        'panacea-lg': '0 10px 40px 0 rgba(6, 111, 137, 0.2)',
        'panacea-orange': '0 4px 14px 0 rgba(255, 107, 53, 0.3)',
        'panacea-cyan': '0 4px 14px 0 rgba(6, 111, 137, 0.2)',
        'panacea-green': '0 4px 14px 0 rgba(11, 163, 90, 0.2)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
