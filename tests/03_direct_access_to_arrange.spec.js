describe("スライドをおすすめされたユーザーとして、ダイレクトアクセスでスライドを見たい、なぜならいちいちトップページから再検索するのは面倒だからだ", () => {

  const root_url = "http://localhost:3000/"
  const arrange_url = (url) => root_url + "arrange?url=" + encodeURIComponent(url)
  const speakerdeck_url = "https://speakerdeck.com/success"
  const speakerdeck_notfound_url = "https://speakerdeck.com/not_found"
  const slideshare_url = "https://www.slideshare.net/success"
  const slideshare_notfound_url = "https://www.slideshare.net/not_found"
  const google_url = "https://google.com"
  const err_msg = "The slides cannot be found..."

  test("Arrangeページで、SpeakerDeckのURLありでダイレクトアクセスした場合、スライドが正しく表示されること", async () => {
    // Arrangeページにアクセス
    await page.goto(arrange_url(speakerdeck_url))

    // 検証：スライドが表示されること
    await page.waitForSelector("#loading", { hidden: true })
    const slides = await page.$$eval(".slide", nodes => nodes.map(n => n.src))
    await expect(slides.length).toBe(3)

    // 検証：エラーメッセージが表示されないこと
    await expect(await page.$(".err_msg")).toBe(null)
  })

  test("Arrangeページで、SlideShareのURLありでダイレクトアクセスした場合、スライドが正しく表示されること", async () => {
    // Arrangeページにアクセス
    await page.goto(arrange_url(slideshare_url))

    // 検証：スライドが表示されること
    await page.waitForSelector("#loading", { hidden: true })
    const slides = await page.$$eval(".slide", nodes => nodes.map(n => n.src))
    await expect(slides.length).toBe(2)

    // 検証：エラーメッセージが表示されないこと
    await expect(await page.$(".err_msg")).toBe(null)
  })

  test("Arrangeページで、SpeakerDeckのNotFoundのURLありでダイレクトアクセスした場合、エラーメッセージが表示されること", async () => {
    // Arrangeページにアクセス
    await page.goto(arrange_url(speakerdeck_notfound_url))

    // 検証：エラーメッセージが表示されること
    await page.waitForSelector("#loading", { hidden: true })
    const msg = await page.$eval(".err_msg", el => el.textContent)
    await expect(msg).toBe(err_msg)

    // 検証：スライドが表示されないこと
    await expect(await page.$(".slide")).toBe(null)
  })

  test("Arrangeページで、SlideShareのNotFoundのURLありでダイレクトアクセスした場合、エラーメッセージが表示されること", async () => {
    // Arrangeページにアクセス
    await page.goto(arrange_url(slideshare_notfound_url))

    // 検証：エラーメッセージが表示されること
    await page.waitForSelector("#loading", { hidden: true })
    const msg = await page.$eval(".err_msg", el => el.textContent)
    await expect(msg).toBe(err_msg)

    // 検証：スライドが表示されないこと
    await expect(await page.$(".slide")).toBe(null)
  })

  test("Arrangeページで、SpeakerDeckまたはSlideShare以外のURLありでダイレクトアクセスした場合、エラーメッセージが表示されること", async () => {
    // Arrangeページにアクセス
    await page.goto(arrange_url(google_url))

    // 検証：エラーメッセージが表示されること
    await page.waitForSelector("#loading", { hidden: true })
    const msg = await page.$eval(".err_msg", el => el.textContent)
    await expect(msg).toBe(err_msg)

    // 検証：スライドが表示されないこと
    await expect(await page.$(".slide")).toBe(null)
  })

  test("Arrangeページで、URLなしでダイレクトアクセスした場合、トップページにリダイレクトされること", async () => {
    // Arrangeページにアクセス
    await page.goto("http://localhost:3000/arrange")
    
    // 検証：トップページにリダイレクトされる
    await expect(page.url()).toBe(root_url)
  })

})