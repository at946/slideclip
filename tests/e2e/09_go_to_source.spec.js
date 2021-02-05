describe("スライドをDLしたくなったユーザーとして、Originalページ（SlideShare, SpeakerDeck）に戻りたい、なぜならOriginalページでしかできない操作だからだ", () => {

  const arrange_url = (url) => "http://localhost:3000/arrange?url=" + encodeURIComponent(url)
  const sd_url = "https://speakerdeck.com/success"
  const ss_url = "https://www.slideshare.net/success"
  const sd_404_url = "https://speakerdeck.com/not_found"

  test("Arrangeページで、SpeakerDeckのスライドが表示されている場合、GoTo SDボタンが表示され、押下するとSpeakerDeckのスライドのページに別タブで遷移すること", async () => {
    // SDのURLでArrangeページにアクセス
    await page.goto(arrange_url(sd_url))
    await page.waitForSelector("#sec_slides")

    // 検証：GoToSouceボタンのアイコンがSD
    await expect(await page.$("#btn_source > #icon_sd")).not.toBe(null)
    await expect(await page.$("#btn_source > #icon_ss")).toBe(null)

    // GoToSourceボタンをクリック
    await page.click("#btn_source")
    
    // 検証：別タブでSDのURLが開く
    await page.waitForTimeout(2000)
    const pages = await browser.pages()
    const newPage = pages[pages.length - 1]
    await expect(newPage.url()).toBe(sd_url)
  })

  test("Arrangeページで、SlideShareのスライドが表示されている場合、GoTo SSボタンが表示され、押下するとSlideShareのスライドのページに別タブで遷移すること", async () => {
    // SSのURLでArrangeページにアクセス
    await page.goto(arrange_url(ss_url))
    await page.waitForSelector("#sec_slides")

    // 検証：GoToSouceボタンのアイコンがSS
    await expect(await page.$("#btn_source > #icon_ss")).not.toBe(null)
    await expect(await page.$("#btn_source > #icon_sd")).toBe(null)

    // GoToSourceボタンをクリック
    await page.click("#btn_source")
    
    // 検証：別タブでSSのURLが開く
    await page.waitForTimeout(2000)
    const pages = await browser.pages()
    const newPage = pages[pages.length - 1]
    await expect(newPage.url()).toBe(ss_url)
  })

  test("Arrangeページで、スライドが表示されていない場合、GoTo SDまたはGoTo SSボタンは表示されないこと", async () => {
    // SD NotFoundのURLでArrangeページにアクセス
    await page.goto(arrange_url(sd_404_url))
    await page.waitForSelector(".err_msg")

    // 検証：GoToSourceボタンが表示されない
    await expect(await page.$("#btn_source")).toBe(null)
  })

})