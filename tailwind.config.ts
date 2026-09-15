import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef5fb", 100: "#d6e6f5", 200: "#aecceb", 300: "#79a9d9",
          400: "#4f89c6", 500: "#356eae", 600: "#27568c", 700: "#1f4470",
          800: "#1a3a5f", 900: "#14304d", 950: "#0c1f33",
        },
        accent: { 500: "#c08a2d", 600: "#a87320" },
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", '"Helvetica Neue"', "Arial", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
