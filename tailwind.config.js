/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f0',
          100: '#dcf1dc',
          200: '#bbe3bc',
          300: '#8ecc8f',
          400: '#5ba95d',
          500: '#3e8c40',
          600: '#2e7030',
          700: '#265928',
          800: '#214723',
          900: '#1c3b1e',
          950: '#0e2010',
        },
        earthy: {
          50: '#f7f6f3',
          100: '#eceae2',
          200: '#d9d5c5',
          300: '#c0b89f',
          400: '#a79a7a',
          500: '#948461',
          600: '#7f6f52',
          700: '#6a5b46',
          800: '#584c3c',
          900: '#4a4135',
          950: '#27221b',
        }
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
