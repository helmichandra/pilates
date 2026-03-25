import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // font-sans untuk Plus Jakarta Sans (Body & UI)
        sans: ["var(--font-plus-jakarta)", "sans-serif"],
        // font-serif untuk Cormorant Garamond (Headings & Italic)
        serif: ["var(--font-cormorant)", "serif"],
      },
      colors: {
        primary: "#640D14", // Maroon khas Fixclub
        secondary: "#38040E",
      },
    },
  },
  plugins: [],
};
export default config;