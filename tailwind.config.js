/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Literata : '"Literata", serif',
        noto : '"Noto Serif Display", serif',
      }
    
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

