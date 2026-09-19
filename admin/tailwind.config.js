/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        evergreen: {
          900: '#162019',
          700: '#253929',
          DEFAULT: '#253929',
          500: '#3A5647',
          200: '#AFC2B4',
        },
        milkglass: {
          100: '#FFFFFF',
          base: '#F7F6E4',
          DEFAULT: '#F7F6E4',
          300: '#EDE9D8',
        },
        driftwood: {
          300: '#E8DCC8',
          base: '#D4C4A8',
          DEFAULT: '#D4C4A8',
          600: '#B39F7E',
        },
        mahogany: {
          300: '#9C6B47',
          base: '#774D31',
          DEFAULT: '#774D31',
          700: '#5A3A24',
        },
        charcoal: '#2B2B26',
        success: '#4C6B4F',
        error: '#8C4A3A',
        warning: '#B08A3E',
      },
      fontFamily: {
        serif: ['Fraunces', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
