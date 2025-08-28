import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        // ✅ keep Inter as your base font
        sans: ["Inter", "system-ui", "sans-serif"],

        // ✅ add your custom font here
        bytebounce: ["Bytebounce", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          hover: "hsl(var(--card-hover))",
        },
        hero: {
          bg: "hsl(var(--hero-bg))",
          glow: "hsl(var(--hero-glow))",
        },
        section: {
          bg: "hsl(var(--section-bg))",
        },
      },
      backgroundImage: {
        "gradient-hero": "var(--gradient-hero)",
        "gradient-crimson": "var(--gradient-crimson)",
        "gradient-glow": "var(--gradient-glow)",
      },
      boxShadow: {
        crimson: "var(--shadow-crimson)",
        elegant: "var(--shadow-elegant)",
        card: "var(--shadow-card)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        /* your keyframes stay the same */
      },
      animation: {
        /* your animations stay the same */
      },
      transitionProperty: {
        glow: "filter, box-shadow, transform",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
