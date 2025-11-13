/** @type {import('tailwindcss').Config} */
const config = {
  // ESTA LINHA É A MAIS IMPORTANTE DE TODAS:
  darkMode: 'class', 

  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;