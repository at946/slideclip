const puppeteer = require('puppeteer')

async function get_slides(url) {
  // 変数初期化
  var title = null
  var source_id = null // 0: speakerdeck, 1: slideshare
  var slides = null

  // puppeteerの開始
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage'
    ]
  })
  const page = await browser.newPage()
  await page.goto(url)

  // サービスごとにスライドを取得
  var title = ''
  var slides = []
  if (url.indexOf("https://speakerdeck.com/") === 0) {
    // URLがSpeakerDeckドメインの場合
    [ title, slides ] = await get_speakerdeck_slides(page)
    source_id = 1
  } else if ( url.indexOf("https://www.slideshare.net") === 0) {
    // URLがSlideShareドメインの場合
    [ title, slides ] = await get_slideshare_slides(page)
    source_id = 2
  }

  // puppeteerの終了
  await browser.close()
  // console.log("title: " + title)
  return { title: title, source_id: source_id, slides: slides }
}

// SpeakerDeckの場合
async function get_speakerdeck_slides(page) {
  return await page.evaluate(() => {
    var title = ''
    const slides = []

    // Transcriptからスライド画像を取得する
    const transcript = document.getElementsByClassName("transcript")[0]

    if (transcript) {
      title = document.getElementsByClassName("deck-header-title")[0].innerText
      console.log("title: " + title)
      const list = transcript.getElementsByTagName("li")
      for (let i = 0; i < list.length; i++) {
        slides.push(
          {
            url: list[i].getElementsByTagName("a")[0].href,
            transcript: list[i].innerText
          }
        )
      }
    }
    console.log("slides: " + slides)
    // スライドがある場合はスライド画像のURLの配列、ない場合は空の配列を返却する
    return [ title, slides ]
  })
}

async function get_slideshare_slides(page) {
  return await page.evaluate(() => {
    var title = ''
    const slides = []
    
    // スライドの要素を取得
    const el_slide_images = document.getElementsByClassName("slide_image")

    if (el_slide_images.length) {
      // スライドが存在するページの場合
      // titleを取得
      title = document.getElementsByClassName("j-title-breadcrumb")[0].innerText
      // transcriptの要素を取得
      const el_transcripts = document.getElementsByClassName("transcripts")[0].getElementsByTagName("li")
      if (el_slide_images.length === el_transcripts.length) {
        // スライドとTranscriptの数が一致している場合、imageUrlとtranscriptを取得
        for (let i = 0; i < el_slide_images.length; i++) {
          slides.push(
            {
              url: el_slide_images[i].dataset.full,
              transcript: el_transcripts[i].innerText
            }
          )
        }
      } else {
        // スライドとTranscriptの数が一致しない場合、imageUrlとaltを取得
        for (let i = 0; i < el_slide_images.length; i++) {
          slides.push(
            {
              url: el_slide_images[i].dataset.full,
              transcript: el_slide_images[i].alt
            }
          )
        }
      }
    }
  
    // スライドがある場合はスライド画像のURLの配列、ない場合は空の配列を返却する
    return [ title, slides ]
  })
}

module.exports = {
  get_slides
}