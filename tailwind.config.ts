import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#323437",
        secondary: "#6B4E86",
        menu: "#2c2e31",
        textColor: "#A9A9A9"
      },
      fontFamily: {
        "sourceCode": "var(--sourceCode)"
      },
      fontSize: {
        xl: '4rem',
        lg: "3.3rem",
        md: "1.5rem",
        sm: "1.110rem",
        p: "0.825rem",
      }
    },
  },
  plugins: [],
};
export default config;
