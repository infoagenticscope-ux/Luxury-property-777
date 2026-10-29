import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08090C",
        surface: "#0F1117",
        "surface-card": "rgba(18, 20, 29, 0.65)",
        "surface-card-hover": "rgba(26, 29, 42, 0.8)",
        "surface-border": "rgba(212, 175, 55, 0.18)",
        "surface-border-hover": "rgba(212, 175, 55, 0.45)",
        gold: {
          50: "#FCF9EE",
          100: "#F7F0D6",
          200: "#EEDFAC",
          300: "#E2C97D",
          400: "#D4AF37", // Primary luxury champagne gold
          500: "#B89628",
          600: "#92741B",
          700: "#6B5315",
          800: "#4D3B12",
          900: "#2B2109",
        },
        champagne: {
          light: "#F5E6CC",
          DEFAULT: "#D8C3A5",
          dark: "#B89F7D",
        },
        luxury: {
          black: "#060709",
          charcoal: "#12141A",
          graphite: "#1A1D24",
          silver: "#C4C8D4",
          cream: "#FAF8F5",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Cinzel", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F5E6CC 0%, #D4AF37 50%, #A7833A 100%)",
        "gold-gradient-soft": "linear-gradient(135deg, rgba(245, 230, 204, 0.15) 0%, rgba(212, 175, 55, 0.25) 50%, rgba(167, 131, 58, 0.1) 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)",
        "dark-radial": "radial-gradient(circle at 50% 20%, rgba(30, 34, 48, 0.5) 0%, rgba(8, 9, 12, 1) 75%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)",
        "glass-gold": "0 12px 40px 0 rgba(0, 0, 0, 0.6), 0 0 20px 0 rgba(212, 175, 55, 0.15), inset 0 1px 1px 0 rgba(212, 175, 55, 0.25)",
        "glass-hover": "0 20px 50px 0 rgba(0, 0, 0, 0.75), 0 0 30px 0 rgba(212, 175, 55, 0.25), inset 0 1px 2px 0 rgba(255, 255, 255, 0.2)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 35s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
