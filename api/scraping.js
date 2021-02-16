const puppeteer = require('puppeteer')

async function getSlides(url) {
  // 変数初期化
  const slides = {}

  // puppeteerの開始
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage'
    ]
  })
  const page = await browser.newPage()
  await page.goto(url)

  if (url.indexOf("https://speakerdeck.com/") === 0) {
    // URLがSpeakerDeckドメインの場合
    const res = await getSpeakerDeckSlides(page)
    if (res.isFound) {
      slides.sourceId = 1
      slides.title = res.title
      slides.url = url
      slides.images = res.images
    }
  } else if ( url.indexOf("https://www.slideshare.net") === 0) {
    // URLがSlideShareドメインの場合
    const res = await getSlideShareSlides(page)
    if (res.isFound) {
      slides.sourceId = 2
      slides.title = res.title
      slides.url = url
      slides.images = res.images
    }
  }

  // puppeteerの終了
  await browser.close()

  return slides
}

// SpeakerDeckの場合
async function getSpeakerDeckSlides(page) {
  return await page.evaluate(() => {
    var isFound = false, title
    const images = []

    // Transcriptからスライド画像を取得する
    const transcript = document.getElementsByClassName("transcript")[0]

    if (transcript) {
      // スライドが表示されているページの場合
      isFound = true
      title = document.getElementsByClassName("deck-header-title")[0].innerText
      const list = transcript.getElementsByTagName("li")
      for (let i = 0; i < list.length; i++) {
        images.push(
          {
            url: list[i].getElementsByTagName("a")[0].href,
            alt: list[i].innerText
          }
        )
      }
    }

    return { isFound: isFound, title: title, images: images }
  })
}

async function getSlideShareSlides(page) {
  return await page.evaluate(() => {
    var isFound = false, title
    const images = []
    
    // スライドの要素を取得
    const slide_images = document.getElementsByClassName("slide_image")

    if (slide_images.length) {
      // スライドが表示されているページの場合
      isFound = true
      title = document.getElementsByClassName("j-title-breadcrumb")[0].innerText
      // alt用にtranscriptの要素を取得
      const transcripts_wrapper = document.getElementsByClassName("transcripts")[0]
      var transcripts
      if (transcripts_wrapper) transcripts = transcripts_wrapper.getElementsByTagName("li")
      if (transcripts && slide_images.length === transcripts.length) {
        // スライドとTranscriptの数が一致している場合、imageUrlとtranscriptを取得
        for (let i = 0; i < slide_images.length; i++) {
          images.push(
            {
              url: slide_images[i].dataset.full,
              alt: transcripts[i].innerText
            }
          )
        }
      } else {
        // スライドとTranscriptの数が一致しない場合、imageUrlとaltを取得
        for (let i = 0; i < slide_images.length; i++) {
          images.push(
            {
              url: slide_images[i].dataset.full,
              alt: slide_images[i].alt
            }
          )
        }
      }
    }
  
    return { isFound: isFound, title: title, images: images }
  })
}

module.exports = {
  getSlides
}