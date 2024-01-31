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
        "black-rgb": "rgb(var(--black-rgb))",
        "gray-rgb": "rgb(var(--gray-rgb))",
        "white-rgb": "rgb(var(--white-rgb))",
        "orange-rgb": "rgb(var(--orange-rgb))",
      },
    },
  },
  plugins: [],
};
export default config;
