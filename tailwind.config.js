/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FE8C00",
        orange: {
          DEFAULT: "#FE8C00", // hsl(28 95% 55%) ~ brand primary
          dark: "#C24A0A", // hsl(21 90% 40%)
        },
        "green-dark": "#155135", // hsl(152 58% 20%)
        burrito: "#A5360D", // hsl(16 85% 35%)
        background: "#F7F7F7", // hsl(0 0% 97%)
        border: "#E0E0E0", // hsl(0 0% 88%)
        muted: {
          DEFAULT: "#F0F0F0", // hsl(0 0% 94%)
          foreground: "#737373", // hsl(0 0% 45%)
        },
        white: {
          DEFAULT: "#ffffff",
          100: "#fafafa",
          200: "#f5f5f5",
        },
        gray: {
          100: "#878787",
          200: "#878787",
        },
        dark: {
          100: "#181C2E",
        },
        error: "#F14141",
        success: "#2F9B65",
      },
      fontFamily: {
        quicksand: ["Quicksand-Regular", "sans-serif"],
        "quicksand-bold": ["Quicksand-Bold", "sans-serif"],
        "quicksand-semibold": ["Quicksand-SemiBold", "sans-serif"],
        "quicksand-light": ["Quicksand-Light", "sans-serif"],
        "quicksand-medium": ["Quicksand-Medium", "sans-serif"],
        // Inter — keys match useFonts registration in app/_layout.tsx
        inter: ["Inter_400Regular", "sans-serif"],
        "inter-medium": ["Inter_500Medium", "sans-serif"],
        "inter-semibold": ["Inter_600SemiBold", "sans-serif"],
        "inter-bold": ["Inter_700Bold", "sans-serif"],
        "inter-extrabold": ["Inter_800ExtraBold", "sans-serif"],
        "inter-black": ["Inter_900Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
