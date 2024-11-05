import type { Config } from "tailwindcss";


const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    
    extend: {
      screens:{
          's': '340px',
          'xs': '450px',
          'm': '690px',
          'l': '880px',
      },
    },
  },
  plugins: [],
};
export default config;
