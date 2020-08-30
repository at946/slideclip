const puppeteer = require('puppeteer')

async function slides(url) {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage'
    ]
  })

  const page = await browser.newPage()
  
  await page.goto(url)

  const page_num = await page.evaluate(() => {
    return document.getElementsByClassName("transcript")[0].getElementsByTagName("li").length
  })

  const image_url = await page.evaluate(() => {
      const element = document.getElementsByClassName("deck-background")[0]
    return element.style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '').replace(/\?.*$/, "")
  })

  await browser.close()

  return {
    page_num: page_num,
    image_url: image_url
  }
}

module.exports = {
  slides
}