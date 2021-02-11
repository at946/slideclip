describe("PCユーザーとして、キーボードで左右を入力したら前後のスライドに移動してほしい、なぜならキーボード操作に慣れている人はスクロールをあまり使わないからだ", () => {

  const arrange_ss_url = "http://localhost:3000/arrange?url=" + encodeURIComponent("https://www.slideshare.net/success")
  const arrange_ss_404_url = "http://localhost:3000/arrange?url=" + encodeURIComponent("https://www.slideshare.net/not_found")

  test("Arrangeページで、スライドが表示されているとき、「→」をタイプした場合、次のスライドまでスクロールされること", async () => {
    // Arrangeページにアクセス（SlideShare（スライド2枚））
    await page.goto(arrange_ss_url)
    await page.waitForSelector("#loading")
    await page.waitForSelector("#loading",  { hidden: true })

    // 検証：表示y座標が0であること
    await expect(await page.evaluate(() => window.scrollY )).toBe(0)

    // スライドの中心の位置を取得
    const coordYOfSlide0 = await page.$eval("#slide_0", el => el.getBoundingClientRect().y + window.pageYOffset + (el.height / 2))
    const coordYOfSlide1 = await page.$eval("#slide_1", el => el.getBoundingClientRect().y + window.pageYOffset + (el.height / 2))

    // 「→」をタイプ
    await page.keyboard.press("ArrowRight")
    await page.waitForTimeout(500)

    // 検証：画面中心に1枚目のスライドの中心が表示されている
    await expect(await page.evaluate(() => window.scrollY + (window.innerHeight / 2))).toBe(coordYOfSlide0)

    // 「→」をタイプ
    await page.keyboard.press("ArrowRight")
    await page.waitForTimeout(500)

    // 検証：画面中心に2枚目のスライドの中心が表示されている
    await expect(await page.evaluate(() => window.scrollY + (window.innerHeight / 2))).toBe(coordYOfSlide1)

    // 「→」をタイプ
    await page.keyboard.press("ArrowRight")
    await page.waitForTimeout(500)

    // 検証：画面中心に2枚目のスライドの中心が表示されている
    await expect(await page.evaluate(() => window.scrollY + (window.innerHeight / 2))).toBe(coordYOfSlide1)
  })

  test("Arrangeページで、スライドが表示されているとき、「←」をタイプした場合、前のスライドまでスクロールされること", async () => {
    // Arrangeページにアクセス（SlideShare（スライド2枚））
    await page.goto(arrange_ss_url)
    await page.waitForSelector("#loading")
    await page.waitForSelector("#loading",  { hidden: true })

    // スライドの位置を取得
    const coordYOfSlide0 = await page.$eval("#slide_0", el => el.getBoundingClientRect().y + window.pageYOffset + (el.height / 2))
    const coordYOfSlide1 = await page.$eval("#slide_1", el => el.getBoundingClientRect().y + window.pageYOffset + (el.height / 2))

    // 「→」を2回タイプ
    await page.keyboard.press("ArrowRight")
    await page.waitForTimeout(500)
    await page.keyboard.press("ArrowRight")
    await page.waitForTimeout(500)

    // 検証：画面中心に2枚目のスライドの中心が表示されている
    await expect(await page.evaluate(() =>  window.scrollY + (window.innerHeight / 2))).toBe(coordYOfSlide1)

    // 「←」をタイプ
    await page.keyboard.press("ArrowLeft")
    await page.waitForTimeout(500)

    // 検証：画面中心に1枚目のスライドの中心が表示されている
    await expect(await page.evaluate(() => window.scrollY + (window.innerHeight / 2))).toBe(coordYOfSlide0)

    // 「←」をタイプ
    await page.keyboard.press("ArrowLeft")
    await page.waitForTimeout(500)

    // 検証：画面中心に1枚目のスライドの中心が表示されている
    await expect(await page.evaluate(() => window.scrollY + (window.innerHeight / 2))).toBe(coordYOfSlide0)
  })

  test("Arrangeページで、スライドが表示され、URLのINPUTにフォーカスしているとき、「→」「←」をタイプした場合、スライドのスクロールはされないこと", async () => {
    // Arrangeページにアクセス（SlideShare（スライド2枚））
    await page.goto(arrange_ss_url)
    await page.waitForSelector("#loading")
    await page.waitForSelector("#loading",  { hidden: true })

    // #input_urlをフォーカス
    await page.focus("#input_url")

    // 「→」をタイプ
    await page.keyboard.press("ArrowRight")
    await page.waitForTimeout(500)

    // 検証：表示位置が変わらない
    await expect(await page.evaluate(() => window.scrollY)).toBe(0)

    // 「←」をタイプ
    await page.keyboard.press("ArrowLeft")
    await page.waitForTimeout(500)

    // 検証：表示位置が変わらない
    await expect(await page.evaluate(() => window.scrollY)).toBe(0)
  })

  test("Arrangeページで、スライドが表示されていないとき、「→」「←」をタイプした場合、スクロールはされないこと", async () => {
    // Arrangeページにアクセス（NOT FOUND）
    await page.goto(arrange_ss_404_url)
    await page.waitForSelector("#loading")
    await page.waitForSelector("#loading",  { hidden: true })

    // 「→」をタイプ
    await page.keyboard.press("ArrowRight")
    await page.waitForTimeout(500)

    // 検証：表示位置が変わらない
    await expect(await page.evaluate(() => window.scrollY)).toBe(0)

    // 「←」をタイプ
    await page.keyboard.press("ArrowLeft")
    await page.waitForTimeout(500)

    // 検証：表示位置が変わらない
    await expect(await page.evaluate(() => window.scrollY)).toBe(0)
  })

})