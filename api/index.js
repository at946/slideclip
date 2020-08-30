const express = require('express')
const app = express()
const scraping = require('./scraping')

app.get('/sd/slides', async(req, res) => {
  const url = req.query.url
  const data = await scraping.get_sd_slides(url)
  res.json(data)
})

app.get('/ss/slides', async(req, res) => {
  const url = req.query.url
  const data = await scraping.get_ss_slides(url)
  res.send(data)
})

module.exports = {
  path: '/api',
  handler: app
}