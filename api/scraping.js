const puppeteer = require('puppeteer')

async function get_slides(url) {
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
  var result　= []
  if (url.indexOf("https://speakerdeck.com/") === 0) {
    // URLがSpeakerDeckドメインの場合
    result = await get_speakerdeck_slides(page)
  } else if ( url.indexOf("https://www.slideshare.net") === 0) {
    // URLがSlideShareドメインの場合
    result = await get_slideshare_slides(page)
  }

  // puppeteerの終了
  await browser.close()

  return result
}

// SpeakerDeckの場合
async function get_speakerdeck_slides(page) {
  return await page.evaluate(() => {
    const slides = []

    // Transcriptからスライド画像を取得する
    const transcript = document.getElementsByClassName("transcript")[0]

    if (transcript) {
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

    // スライドがある場合はスライド画像のURLの配列、ない場合は空の配列を返却する
    return slides
  })
}

async function get_slideshare_slides(page) {
  return await page.evaluate(() => {
    const slides = []
    
    // スライドの要素を取得
    const el_slide_images = document.getElementsByClassName("slide_image")

    if (el_slide_images.length) {
      // スライドが存在するページの場合
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
    return slides
  })
}

module.exports = {
  get_slides
}