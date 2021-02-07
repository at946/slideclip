const express = require('express')
const app = express()
const scraping = require('./scraping')

app.get('/slides', async(req, res) => {
  // クエリパラメータのurlを取得し、取得したurlのクエリパラメータを削除
  const url = req.query.url.replace(/\?.*$/, '')
  var slides = []

  if (process.env.NODE_ENV == "production") {
    // 本番環境
    slides = await scraping.get_slides(url)
  } else {
    // テスト環境
    switch (url) {
      case "https://speakerdeck.com/success":
        slides = [
          { url: "/_nuxt/assets/images/slide_image.png", alt: 1 },
          { url: "/_nuxt/assets/images/slide_image.png", alt: 2 },
          { url: "/_nuxt/assets/images/slide_image.png", alt: 3 }
        ]
        break
      case "https://speakerdeck.com/not_found":
        break
      case "https://www.slideshare.net/success":
        slides = [
          { url: "/_nuxt/assets/images/slide_image.png", alt: 1 },
          { url: "/_nuxt/assets/images/slide_image.png", alt: 2 }
        ]
        break
      case "https:/www.slideshare.net/not_found":
        break
      default:
        slides = await scraping.get_slides(url)
    }
  }
  
  res.send(slides)
})

module.exports = {
  path: '/api',
  handler: app
}