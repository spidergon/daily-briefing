const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  theme: {
    colors: {
      white: colors.white,
      blue: {
        200: colors.teal['200'],
        400: colors.teal['400']
      },
      gray: {
        100: colors.gray['100'],
        300: colors.gray['300'],
        600: colors.gray['600'],
        900: colors.gray['900']
      },
      'hot-pink': '#fd2d78'
    },
    extend: {}
  },
  variants: {},
  plugins: []
}
