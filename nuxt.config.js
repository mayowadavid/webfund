import webpack from 'webpack'
require('dotenv').config()
export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'Wefundx',
    titleTemplate: (title) => {
      return title ? `${title} - Wefundx` : 'crowdfunding'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/WFXSingleSingle.png' }],
  },
  publicRuntimeConfig: {
    isLive: ['live', 'prod', 'production'].includes(process.env.ENV),
    apiUrl: process.env.API_URL || process.env.APP_URL + '/api',
    appUrl: process.env.APP_URL,
    appName: process.env.APP_NAME || 'Wefundx',
    appLocale: process.env.APP_LOCALE || 'en',
    githubAuth: !!process.env.GITHUB_CLIENT_ID,
    testkey: process.env.KEY,
    paystackLive: process.env.PAYSTACK_LIVE === 'true',
    paystackTestKey: process.env.PAYSTACK_TEST_KEY,
    paystackLiveKey: process.env.PAYSTACK_LIVE_KEY,
  },

  privateRuntimeConfig: {},
  loading: {
    color: '#0396c2',
    height: '3px',
  },
  router: {
    middleware: ['check-auth', 'change-password'],
    // linkActiveClass: 'active',
    // linkExactActiveClass: 'exact-active'
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~plugins/axios',
    '~plugins/vue2-filters',
    { src: '~/plugins/persistedState.js' },
    { src: '~/plugins/persistedState.client.js' },
    { src: '~components/global/run' },
    { src: '~/plugins/directives', mode: 'client' },
    { src: '~plugins/validate', mode: 'client' },
    { src: '~plugins/datepicker', mode: 'client' },
    { src: '~plugins/paystack', mode: 'client' },
    { src: '~plugins/vue-chart', mode: 'client' },
    { src: '@/plugins/vue-awesome-swiper', mode: 'client' },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/device',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-sweetalert2',
    '@nuxtjs/svg',
    '@nuxtjs/dotenv',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: (process.env.API_URL || process.env.APP_URL) + '/api',
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        _: 'lodash',
        moment: 'moment',
      }),
    ],
  },
}
