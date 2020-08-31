const express = require('express')
const app = express()
const scraping = require('./scraping')

app.get('/slides', async(req, res) => {
  // クエリパラメータから入力されたURLを取得。
  // 取得したURLのクエリパラメータ以降は削除（speakerdeckはページ数をクエリパラメータで表すが1ページ目を取得したいので。
  const url = req.query.url.replace(/\?.*$/, '')

  const slide_urls = await scraping.get_slides(url)
  
  res.send(slide_urls)
  // transcriptを使うようになったら
  // var slide_urls, transcripts = []
  // [slide_urls, transcripts] = await scraping.get_slides(url)
  // res.json([slide_urls, transcripts])
})

module.exports = {
  path: '/api',
  handler: app
}