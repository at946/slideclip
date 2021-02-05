describe("色々なスライドを見たいユーザーとして、Arrangeページで別のスライドを再表示したい、なぜならいちいちトップページに戻るのは面倒だからだ", () => {

  const arrange_url = (url) => "http://localhost:3000/arrange?url=" + encodeURIComponent(url)
  const speakerdeck_url = "https://speakerdeck.com/success"
  const sd_404_url = "https://speakerdeck.com/not_found"
  const slideshare_url = "https://www.slideshare.net/success"
  const google_url = "https://google.com"
  const err_msg = "The slides cannot be found..."

  // inputのvalueをclearするfunction
  async function clear_input (target) {
    await target.click({ clickCount: 3 })
    await target.press("Backspace")
  }

  test("Arrangeページで表示中のスライドのソースURLがInputに入力されていること", async () => {
    // Arrangeページにアクセス
    await page.goto(arrange_url(speakerdeck_url))
    await page.waitForSelector("#sec_slides")

    // 検証：表示中のスライドのURLがテキストボックスに入力されていること
    await expect(await page.$eval("#input_url", el => el.value)).toBe(speakerdeck_url)
  })

  test("ArrangeページでInputが未入力の場合、Arrangeボタンを押下できないこと", async () => {
    // Arrangeページにアクセス
    await page.goto(arrange_url(speakerdeck_url))
    await page.waitForSelector("#loading", { hidden: true })

    // 検証：Arrangeボタンはdisabledではない
    await expect(await page.$eval("#btn_arrange", el => el.disabled)).toBe(false)

    // INPUTをクリアする
    await clear_input(await page.$("#input_url"))

    // 検証：Arrangeボタンがdisabled
    await expect(await page.$eval("#btn_arrange", el => el.disabled)).toBe(true)
  })

  test("Arrangeページで存在するSpeakerDeckまたはSlideShareのURLをInputに入力した状態でArrangeボタンを押下した場合、入力されたスライドが表示されること", async () => {
    // Arrangeページにspeakerdeck_urlでアクセス
    await page.goto(arrange_url(speakerdeck_url))
    await page.waitForSelector("#loading", { hidden: true })

    // 検証：スライドが３枚表示される
    var slides = await page.$$eval(".slide", nodes => nodes.map(n => n.src))
    await expect(slides.length).toBe(3)

    // Arrangeページでslideshare_urlを入力
    await clear_input(await page.$("#input_url"))
    await page.type("#input_url", slideshare_url)

    // Arrangeボタンを押下
    await page.click("#btn_arrange")

    // 検証：スライドが２枚表示される
    await page.waitForSelector("#sec_slides")
    slides = await page.$$eval(".slide", nodes => nodes.map(n => n.src))
    await expect(slides.length).toBe(2)
  })

  test("Arrangeページで存在しないSpeakerDeckまたはSlideShareのURLをInputに入力した状態でArrangeボタンを押下した場合、エラーメッセージが表示されること", async () => {
    // Arrangeページにアクセス
    await page.goto(arrange_url(speakerdeck_url))
    await page.waitForSelector("#loading", { hidden: true })

    // 検証：スライドが表示される
    const slides = await page.$$eval(".slide", nodes => nodes.map(n => n.src))
    await expect(slides.length).toBe(3)

    // NotFoundのURLを入力
    await clear_input(await page.$("#input_url"))
    await page.type("#input_url", sd_404_url)

    // Arrangeボタンを押下
    await page.click("#btn_arrange")

    // 検証：エラーメッセージが表示される
    await page.waitForSelector(".err_msg")
    const msg = await page.$eval(".err_msg", el => el.textContent)
    await expect(msg).toBe(err_msg)

    // 検証：スライドが表示されない
    await expect(await page.$(".slide")).toBe(null)
  })

  test("ArrangeページでSpeakerDeckまたはSlideShare以外のURLをInputに入力した状態でArrangeボタンを押下した場合、エラーメッセージが表示されること", async () => {
    // Arrangeページにアクセス
    await page.goto(arrange_url(speakerdeck_url))
    await page.waitForSelector("#loading", { hidden: true })

    // 検証：スライドが表示される
    const slides = await page.$$eval(".slide", nodes => nodes.map(n => n.src))
    await expect(slides.length).toBe(3)

    // GoogleのURLを入力
    await clear_input(await page.$("#input_url"))
    await page.type("#input_url", google_url)

    // Arrangeボタンを押下
    await page.click("#btn_arrange")

    // 検証：エラーメッセージが表示される
    await page.waitForSelector(".err_msg")
    const msg = await page.$eval(".err_msg", el => el.textContent)
    await expect(msg).toBe(err_msg)

    // 検証：スライドが表示されない
    await expect(await page.$(".slide")).toBe(null)
  })

})