const express = require('express')
const app = express()
const scraping = require('./scraping')

app.get('/slides', async(req, res) => {
  // クエリパラメータのurlを取得し、取得したurlのクエリパラメータを削除
  const url = req.query.url.replace(/\?.*$/, '')
  var result = null
 
  if (process.env.NODE_ENV == "production") {
    // 本番環境
    result = await scraping.get_slides(url)
  } else {
    // テスト環境
    switch (url) {
      case "https://speakerdeck.com/success":
        result = {
          title: "Success SpeakerDeck",
          source_id: 1,
          slides: [
            { url: "/_nuxt/assets/images/slide_image.png", alt: 1 },
            { url: "/_nuxt/assets/images/slide_image.png", alt: 2 },
            { url: "/_nuxt/assets/images/slide_image.png", alt: 3 }
          ]
        }
        break
      case "https://www.slideshare.net/success":
        result = {
          title: "Success SlideShare",
          source_id: 2,
          slides: [
            { url: "/_nuxt/assets/images/slide_image.png", alt: 1 },
            { url: "/_nuxt/assets/images/slide_image.png", alt: 2 }
          ]
        }
        break
      case "https://speakerdeck.com/not_found":
        break
      case "https://www.slideshare.net/not_found":
        break
      default:
        result = await scraping.get_slides(url)
    }
  }
  
  res.send(result)
})

module.exports = {
  path: '/api',
  handler: app
}