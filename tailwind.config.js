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
        // Panacea Brand Colors (as per design image)
        panacea: {
          // Primary Teal Colors (Hero Gradient)
          primary: "#0B4D5E",      // Dark Teal - Main primary
          secondary: "#14919B",    // Light Teal - Gradient end
          teal: {
            DEFAULT: "#0B4D5E",
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
          // Accent Orange (Buttons)
          accent: "#F37021",       // Bright Orange - CTA buttons
          orange: {
            DEFAULT: "#F37021",
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
          // Dark Navy (Text)
          dark: "#1A365D",         // Navy - Headings
          navy: {
            DEFAULT: "#1A365D",
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
          // Light Backgrounds
          light: "#E6F4F5",        // Light teal bg for cards
          cream: "#FFF8E7",        // Cream/Beige for sections
          lightBlue: "#F0F9FF",    // Very light blue
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
        // Hero Gradient (Teal gradient from image)
        'panacea-gradient': 'linear-gradient(135deg, #0B4D5E 0%, #14919B 100%)',
        'panacea-gradient-dark': 'linear-gradient(135deg, #041D25 0%, #0B4D5E 100%)',
        'panacea-gradient-light': 'linear-gradient(135deg, #14919B 0%, #66BDC3 100%)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'panacea': '0 4px 14px 0 rgba(11, 77, 94, 0.15)',
        'panacea-lg': '0 10px 40px 0 rgba(11, 77, 94, 0.2)',
        'panacea-orange': '0 4px 14px 0 rgba(243, 112, 33, 0.3)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
