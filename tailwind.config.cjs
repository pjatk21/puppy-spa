/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/**/*.{tsx,jsx}',
    'index.html',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
  darkMode: 'media',
}
