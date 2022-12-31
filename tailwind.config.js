/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const { colors } = require('tailwindcss/defaultTheme')
module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      fontSize: {
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      colors: {
        orange: {
          ...colors.orange,
          100: '#fcf8f7',
          200: '#fef5ec',
          500: '#f99e42',
        },
        blue: {
          ...colors.blue,
          100: '#f2fcff',
          200: '#e1f7fe',
          300: '#e1f7fe',
          400: '#0797ce',
          500: '#0396c2',
          600: '#006696',
          800: '#08305f',
        },
        green: {
          ...colors.green,
          200: '#d0ffe6',
        },
        red: {
          200: '#ffdada',
        },
      },
    },
  },
  variants: {},
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
    options: {
      safelist: [
        'bg-blue-200',
        'bg-blue-600',
        'text-blue-500',
        'text-blue-600',
        'border-blue-500',
        'bg-green-200',
        'bg-green-600',
        'text-green-500',
        'text-green-600',
        'border-green-500',
        'bg-orange-200',
        'bg-orange-600',
        'text-orange-500',
        'text-orange-600',
        'border-orange-500',
        'bg-red-200',
        'bg-red-600',
        'text-red-500',
        'text-red-600',
        'border-red-500',
      ],
    },
  },
}
