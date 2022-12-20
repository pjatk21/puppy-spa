const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{tsx,jsx}', 'index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Playfair Display', ...defaultTheme.fontFamily.serif],
      },
      borderRadius: {
        DEFAULT: '.6rem',
        lg: '.9rem',
      },
    },
  },
  darkMode: 'media',
}
