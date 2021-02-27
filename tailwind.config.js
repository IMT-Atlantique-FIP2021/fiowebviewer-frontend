module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          'ovh-dark': '#010E9B',
          'ovh-light': '#2563EB',
        },
        custom: {
          'ovh-sec-dark': '#9B8E01',
          'ovh-sec-light': '#EBAD25',
        },
        pink: {
          'fip': '#FFD1DC'
        }
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover'],
      backgroundColor: ['odd', 'disabled'],
      opacity: ['disabled'],
    }
  },
  plugins: [
    require('@tailwindcss/forms'), 
    require('tailwind-scrollbar'),
  ],
}