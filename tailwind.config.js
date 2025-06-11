/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      },
      fontFamily: {
        // poppins: ['Poppins', 'sans-serif'],
        // bebas: ['Bebas Neue', 'sans-serif'],
        // roboto: ['Roboto', 'sans-serif'],
        // raleway: ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
