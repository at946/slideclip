const productName = "SlideClip"
const baseUrl = process.env.BASE_URL || 'http://localhost:3000'

export default {
  env: {
    baseUrl: baseUrl,
    productName: productName,
    urlRegExp: "^https:\/\/(www.slideshare.net|speakerdeck.com)\/.*"
  },
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
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#'
    },
    title: productName,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: process.env.npm_package_description },
      { property: 'og:site_name', content: productName },
      { property: 'og:type', content: 'website' },
      { hid: 'og:title', property: 'og:title', content: productName },
      { hid: "og:description", property: 'og:description', content: process.env.npm_package_description },
      { property: 'og:url', content: baseUrl },
      { property: 'og:image', content: `${baseUrl}/ogp.png` },
      { name: 'twitter:card', content: 'summary' },
      { name: 'google-site-verification', content: process.env.GOOGLE_SITE_VERIFICATION }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/destyle.css',
    '~/assets/css/common.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
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
  ],
  /* 
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-fontawesome',
    '@nuxtjs/google-analytics',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: baseUrl
  },
  /*
  ** Fontawesome
  */
  fontawesome: {
    component: 'fa'
  },
  /*
  **
  */
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID
  },
  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },

  serverMiddleware: {
    '/api': '~/api'
  }
}
