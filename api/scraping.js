const puppeteer = require('puppeteer')

async function get_slides(url) {
  var service_id = 0 // 0: speaker deck, 1: slideshare // データ取得の分岐に利用
  if      ( url.indexOf("https://speakerdeck.com/") === 0 )     { service_id = 0 }
  else if ( url.indexOf("https://www.slideshare.net/") === 0 )  { service_id = 1 }
  else    { return 0 }

  // puppeteerの開始
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage'
    ]
  })
  const page = await browser.newPage()
  await page.goto(url)

  // サービスで分岐させてサービスごとに情報取得する // slide_urls, 
  var result　= []
  switch (service_id) {
    case 0:
      // speaker deck
      result = await get_speakerdeck_slides(page)
      break
    case 1:
      // slideshare
      result = await get_slideshare_slides(page)
      break
  }

  // puppeteerの終了
  await browser.close()

  return result
}

// speaker deckの場合
async function get_speakerdeck_slides(page) {
  return await page.evaluate(() => {
    const slide_urls = []

    // スライドの要素を取得
    const el_slide = document.getElementsByClassName("deck-background")[0]

    // スライド要素が存在する（NOT FOUNDでない）場合、スライド画像を取得する
    if (el_slide) {
      // スライド画像は[background_image: url("~")]の形式になっているので、「url("」「")」を削除してスライド画像のベースURLを取得
      const base_image_url = el_slide.style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '')
      
      // transcriptsの親要素を取得（=ページ数として利用）
      const transcript_elements = document.getElementsByClassName("transcript")[0].getElementsByTagName("li")
      for (var i = 0; i < transcript_elements.length; i++) {
        // speakerdeckは１つのスライドに対してほぼ同じURL。"slide_${ページ数}.jpg"となっているので全てのページ数分の画像URLを取ってくる
        slide_urls.push(base_image_url.replace("slide_0", `slide_${i}`))
      }
    }

    // スライドがある場合はスライド画像のURLの配列、ない場合は空の配列を返却する
    return slide_urls
  })
}

async function get_slideshare_slides(page) {
  return await page.evaluate(() => {
    const slide_urls = []
    
    // スライドの要素を取得
    const el_slide = document.getElementsByClassName("slide_container")[0]

    // スライド要素が存在する（NotFoundでない）場合、スライド画像を取得する
    if (el_slide) {
      // slide_urlsの親要素を取得
      const slide_url_elements = el_slide.getElementsByTagName("section")
      for (var i = 0; i < slide_url_elements.length; i++) {
        // slide_url_elements配下のimageタグの data-normal 属性のURLを取得
        slide_urls.push(slide_url_elements[i].getElementsByTagName("img")[0].dataset.normal)
      }
    }
  
    // スライドがある場合はスライド画像のURLの配列、ない場合は空の配列を返却する
    return slide_urls
  })
}

module.exports = {
  get_slides
}