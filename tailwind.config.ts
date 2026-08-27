import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "menu-bg": "#F5EFE3",
        "blue-dark": "#0a1628",
        "blue-caneta": "#1a4f8a",
        "blue-vivo": "#2a7bd4",
        "blue-claro": "#4a9ff5",
        "cinza-azulado": "#8aa3c9",
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
