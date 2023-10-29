/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        darkestBaseGray: '#010508',
        darkBaseGray: '#0D1117',
        baseGray: '#161B22',
        lightestGray: '#41474F',
        customCyan: '#1FB2A6',
        customPurple: '#6419E6',
        customPink: '#D926A9',
        customBlue: '#204881',

        baseWhite: `#EDEDEC`,
        darkBaseWhite: `#EDEDEC`,
        darkestBaseWhite: '#D1CBCE',
        lightModeGray: '#8F8E93 '
      },
    },
  },
  plugins: [],
}

