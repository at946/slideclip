const express = require('express')
const app = express()
const scraping = require('./scraping')

app.get('/slides', async(req, res) => {
  // クエリパラメータのurlを取得し、取得したurlのクエリパラメータを削除
  const url = req.query.url.replace(/\?.*$/, '')
  var slides = {}
 
  if (process.env.NODE_ENV == "production") {
    // 本番環境
    slides = await scraping.getSlides(url)
  } else {
    // テスト環境
    switch (url) {
      case "https://speakerdeck.com/success":
        slides = {
          sourceId: 1,
          title: "Success SpeakerDeck",
          url: url,
          images: [
            { url: "/_nuxt/assets/images/slide_image.png", alt: 1 },
            { url: "/_nuxt/assets/images/slide_image.png", alt: 2 },
            { url: "/_nuxt/assets/images/slide_image.png", alt: 3 }
          ]
        }
        break
      case "https://www.slideshare.net/success":
        slides = {
          sourceId: 2,
          title: "Success SlideShare",
          url: url,
          images: [
            { url: "/_nuxt/assets/images/slide_image.png", alt: 1 },
            { url: "/_nuxt/assets/images/slide_image.png", alt: 2 }
          ]
        }
        break
      case "https://speakerdeck.com/not_found":
      case "https://www.slideshare.net/not_found":
        break
      default:
        slides = await scraping.getSlides(url)
    }
  }
  
  res.send(slides)
})

module.exports = {
  path: '/api',
  handler: app
}