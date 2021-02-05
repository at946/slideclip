const express = require('express')
const app = express()
const scraping = require('./scraping')

app.get('/slides', async(req, res) => {
  // クエリパラメータのurlを取得し、取得したurlのクエリパラメータを削除
  const url = req.query.url.replace(/\?.*$/, '')
  var slide_urls = []

  if (process.env.NODE_ENV == "production") {
    // 本番環境
    slide_urls = await scraping.get_slides(url)
  } else {
    // テスト環境
    switch (url) {
      case "https://speakerdeck.com/success":
        slide_urls = [
          "/_nuxt/assets/images/slide_image.png",
          "/_nuxt/assets/images/slide_image.png",
          "/_nuxt/assets/images/slide_image.png"
        ]
        break
      case "https://speakerdeck.com/not_found":
        break
      case "https://www.slideshare.net/success":
        slide_urls = [
          "/_nuxt/assets/images/slide_image.png",
          "/_nuxt/assets/images/slide_image.png"
        ]
        break
      case "https:/www.slideshare.net/not_found":
        break
      default:
        slide_urls = await scraping.get_slides(url)
    }
  }
  
  res.send(slide_urls)
})

module.exports = {
  path: '/api',
  handler: app
}