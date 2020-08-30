const puppeteer = require('puppeteer')

async function get_sd_slides(url) {
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

async function get_ss_slides(url) {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage'
    ]
  })

  const page = await browser.newPage()

  await page.goto(url)

  const image_urls = await page.evaluate(() => {
    const parents = document.getElementsByClassName("slide_container")[0].getElementsByTagName("section")
    const result = []
    for (var i = 0; i < parents.length; i++) {
      result.push(parents[i].getElementsByTagName("img")[0].dataset.normal)
    }
    return result
  })

  await browser.close()

  return image_urls
}

module.exports = {
  get_sd_slides,
  get_ss_slides
}