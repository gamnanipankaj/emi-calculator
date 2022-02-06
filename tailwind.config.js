// eslint-disable-next-line import/no-extraneous-dependencies
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      ...defaultTheme.fontFamily,
      lato: ['Lato', 'sans-serif'],
      opensans: ['Open Sans', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
