const productName = "SlideClip"
const description = "Arrange slides vertically for easy viewing. SlideClipはスライドシェアサービス（SlideShare、SpeakerDeck）のスライドを縦読みできるように並べ替え、スライドを眺めやすくしてくれます。"
const baseUrl = process.env.BASE_URL || 'http://localhost:3000'

export default {
  env: {
    baseUrl: baseUrl
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
      { name: 'description', content: description },
      { property: 'og:site_name', content: productName },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: productName },
      { property: 'og:description', content: description },
      { property: 'og:url', content: baseUrl },
      { property: 'og:image', content: `${baseUrl}/ogp.png` },
      { name: 'twitter:card', content: 'summary' },
      {  name: 'google-site-verification', content: 'bU22upozdv2QbW2QOc8N7sC_1xD8Lu9nOOGzjIfh6rQ'}
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
