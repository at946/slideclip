const puppeteer = require('puppeteer')

async function get_slides(url) {
  var service_id = 0 // 0: speaker deck, 1: slideshare // データ取得の分岐に利用
  if      ( url.indexOf("https://speakerdeck.com/") === 0 ) { service_id = 0 }
  else if ( url.indexOf("https://www.slideshare.net/") === 0 ) { service_id = 1 }
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
    // const transcripts = []

    // base_image_urlとしてclass="deck-background" 要素の style="background-image" を取得
    // url("~")の形式になっているので、「url("」「")」を削除
    const base_image_url = document.getElementsByClassName("deck-background")[0].style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '')
    
    // transcriptsの親要素を取得（=ページ数として利用）
    const transcript_elements = document.getElementsByClassName("transcript")[0].getElementsByTagName("li")
    for (var i = 0; i < transcript_elements.length; i++) {
      // speakerdeckは１つのスライドに対してほぼ同じURL。"slide_${ページ数}.jpg"となっているので全てのページ数分の画像URLを取ってくる
      slide_urls.push(base_image_url.replace("slide_0", `slide_${i}`))
      // transcripts.push(transcript_elements[i].innerText)
    }

    // return [slide_urls, transcripts]
    return slide_urls
  })
}

async function get_slideshare_slides(page) {
  return await page.evaluate(() => {
    const slide_urls = []
    // const transcripts = []
    
    // slide_urlsの親要素を取得
    const slide_url_elements = document.getElementsByClassName("slide_container")[0].getElementsByTagName("section")
    // const transcript_elements = document.getElementsByClassName("transcripts")[0].getElementsByTagName("li")
    
    for (var i = 0; i < slide_url_elements.length; i++) {
      // slide_url_elements配下のimageタグの data-normal 属性のURLを取得
      slide_urls.push(slide_url_elements[i].getElementsByTagName("img")[0].dataset.normal)
      // transcripts.push(transcript_elements[i].innerText)
    }
  
    // return [slide_urls, transcripts]
    return slide_urls
  })
}

module.exports = {
  get_slides
}