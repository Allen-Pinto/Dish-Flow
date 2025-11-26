/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        'light-gray': '#F5F5F5',
        'charcoal': '#1C1C1C',
        'soft-mint': '#B7E4C7',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};