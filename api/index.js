const express = require('express')
const app = express()
const scraping = require('./scraping')

app.get('/slides', async(req, res) => {
  const url = req.query.url
  const data = await scraping.slides(url)
  res.json(data)
})

module.exports = {
  path: '/api',
  handler: app
}