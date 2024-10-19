/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sfpro: ['SF Pro Display', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};

