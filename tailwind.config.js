/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      colors: {
        white: '#FFFFFF',
        black: '#0A1425',
        yellow: '#FEBF00',
        red: '#BD1F17'
      }
    },
  },
  plugins: [],
}

