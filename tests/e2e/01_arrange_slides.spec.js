describe("ユーザーとして、スライドを縦読みしたい、なぜなら横読みより全体を把握して見やすいからだ", () => {

  const root_url = "http://localhost:3000/"
  const arrange_url = (url) => root_url + "arrange?url=" + encodeURIComponent(url)
  const speakerdeck_url = "https://speakerdeck.com/kishiyyyyy/gke-case-study"
  const slideshare_url = "https://www.slideshare.net/Slideshare/slideshare-is-joining-scribd-237760779"

  test("トップページで、SpeakerDeckのURLを入力し、Arrangeボタンを選択した場合、入力したURL先のスライドがすべて縦方向に表示されること", async () => {
    // トップページにアクセス
    await page.goto(root_url)
    await expect(page.url()).toBe(root_url)

    // URLを入力
    await page.type("#input_url", speakerdeck_url)

    // Arrangeボタンを押下
    await page.click("#btn_arrange")

    // 検証：スライドが表示されるまではローディングアニメーションが表示される
    await page.waitForTimeout(100)
    await expect(await page.$("#loading")).not.toBe(null)

    // 検証：スライドが表示されたらローディングアニメーションが消える
    await page.waitForSelector("#loading", { hidden: true })
    await expect(await page.$("#loading")).toBe(null)

    // 検証：Arrangeページに遷移している
    await expect(page.url()).toBe(arrange_url(speakerdeck_url))

    // 検証：表示されているスライドの枚数が正しい
    const slides = await page.$$eval(".slide", nodes => nodes.map(n => n.src))
    await expect(slides.length).toBe(38)

    // 検証：表示されているスライドの順番が正しい
    await expect(slides[0]).toBe("https://files.speakerdeck.com/presentations/33642807c6da4dc1a6b888f85f2ce307/slide_0.jpg?14821707")
    await expect(slides[slides.length - 1]).toBe("https://files.speakerdeck.com/presentations/33642807c6da4dc1a6b888f85f2ce307/slide_37.jpg?14821707")
  })

  test("トップページで、SlideShareのURLを入力し、Arrangeボタンを選択した場合、入力したURL先のスライドがすべて縦方向に表示されること", async () => {
    // トップページにアクセス
    await page.goto(root_url)
    await expect(page.url()).toBe(root_url)

    // URLを入力
    await page.type("#input_url", slideshare_url)

    // Arrangeボタンを押下
    await page.click("#btn_arrange")

    // 検証：スライドが表示されるまではローディングアニメーションが表示される
    await page.waitForTimeout(100)
    await expect(await page.$("#loading")).not.toBe(null)

    // 検証：スライドが表示されたらローディングアニメーションが消える
    await page.waitForSelector("#loading", { hidden: true })
    await expect(await page.$("#loading")).toBe(null)

    // 検証：Arrangeページに遷移している
    await expect(page.url()).toBe(arrange_url(slideshare_url))

    // 検証：表示されているスライドの枚数が正しい
    const slides = await page.$$eval(".slide", nodes => nodes.map(n => n.src))
    await expect(slides.length).toBe(9)

    // 検証：表示されているスライドの順番が正しい
    await expect(slides[0]).toBe("https://image.slidesharecdn.com/slideshareisjoiningscribd-200811191829/95/slideshare-is-joining-scribd-1-638.jpg?cb=1597174152")
    await expect(slides[slides.length - 1]).toBe("https://image.slidesharecdn.com/slideshareisjoiningscribd-200811191829/95/slideshare-is-joining-scribd-9-638.jpg?cb=1597174152")
  })

})