describe("ユーザーとして、スライドを縦読みしたい、なぜなら横読みより全体を把握して見やすいからだ", () => {

  const rootUrl = "http://localhost:3000/"
  const arrangeUrl = (url) => rootUrl + "arrange?url=" + encodeURIComponent(url)
  const speakerDeckUrl = "https://speakerdeck.com/kishiyyyyy/gke-case-study"
  const slideShareUrl = "https://www.slideshare.net/Slideshare/slideshare-is-joining-scribd-237760779"
  const slideShareUrl2 = "https://www.slideshare.net/rochellekopp/rsgt2021-bilingual-crosscultural-discussion-how-to-accelerate-the-adoption-of-agile-and-scrum-in-japan" // スライドとTranscriptの数が不一致
  const slideShareUrl3 = "https://www.slideshare.net/aratafuji/ss-241035965" // transcriptsがない

  jest.setTimeout(20000)

  test("トップページで、SpeakerDeckのURLを入力し、Arrangeボタンを選択した場合、入力したURL先のスライドがすべて縦方向に表示されること", async () => {
    // トップページにアクセス
    await page.goto(rootUrl)
    await expect(page.url()).toBe(rootUrl)

    // URLを入力
    await page.type("#input_url", speakerDeckUrl)

    // Arrangeボタンを押下
    await page.click("#btn_arrange")

    // 検証：スライドが表示されるまではローディングアニメーションが表示される
    await page.waitForTimeout(100)
    await expect(await page.$("#loading")).not.toBe(null)

    // 検証：スライドが表示されたらローディングアニメーションが消える
    await page.waitForSelector("#loading", { hidden: true })
    await expect(await page.$("#loading")).toBe(null)

    // 検証：Arrangeページに遷移している
    await expect(page.url()).toBe(arrangeUrl(speakerDeckUrl))

    // 検証：表示されているスライドの枚数が正しい
    const slides = await page.$$eval(".slide", nodes => nodes.map(n => { return { src: n.src, alt: n.alt } } ))
    await expect(slides.length).toBe(38)

    // 検証：表示されているスライドの順番が正しい
    await expect(slides[0].src).toBe("https://files.speakerdeck.com/presentations/33642807c6da4dc1a6b888f85f2ce307/slide_0.jpg")
    await expect(slides[0].alt).toBe('Google Cloud Anthos Day NTTドコモ情報システム部におけるGKE導入事例 ～パーソナルダッシュボード開発～ 株式会社NTTドコモ プロダクトマネージャ 岸 祐太 Google Cloud Japan, Hawk Yasuhara')

    await expect(slides[slides.length - 1].src).toBe("https://files.speakerdeck.com/presentations/33642807c6da4dc1a6b888f85f2ce307/slide_37.jpg")
    await expect(slides[slides.length - 1].alt).toBe("Thank you")

    // 検証：Twitterシェア時にタイトルがフィルインされる
    await page.click("#btn_menu")
    await page.click("#btn_twitter_share")
    await page.waitForTimeout(2000)
    const pages = await browser.pages()
    const newPage = pages[pages.length - 1]
    await expect(newPage.url()).toBe("https://twitter.com/intent/tweet?text=" + encodeURIComponent("\"NTTドコモ情報システム部におけるGKE導入事例～パーソナルダッシュボード開発～ / GKE case study\"\n#slideclip") + "&url=" + encodeURIComponent(arrangeUrl(speakerDeckUrl)))
  })

  test("トップページで、SlideShareのURLを入力し、Arrangeボタンを選択した場合、入力したURL先のスライドがすべて縦方向に表示されること", async () => {
    // トップページにアクセス
    await page.goto(rootUrl)
    await expect(page.url()).toBe(rootUrl)

    // URLを入力
    await page.type("#input_url", slideShareUrl)

    // Arrangeボタンを押下
    await page.click("#btn_arrange")

    // 検証：スライドが表示されるまではローディングアニメーションが表示される
    await page.waitForTimeout(100)
    await expect(await page.$("#loading")).not.toBe(null)

    // 検証：スライドが表示されたらローディングアニメーションが消える
    await page.waitForSelector("#loading", { hidden: true })
    await expect(await page.$("#loading")).toBe(null)

    // 検証：Arrangeページに遷移している
    await expect(page.url()).toBe(arrangeUrl(slideShareUrl))

    // 検証：表示されているスライドの枚数が正しい
    const slides = await page.$$eval(".slide", nodes => nodes.map(n => { return { src: n.src, alt: n.alt } } ))
    await expect(slides.length).toBe(9)

    // 検証：表示されているスライドの順番が正しい
    await expect(slides[0].src).toBe("https://image.slidesharecdn.com/slideshareisjoiningscribd-200811191829/95/slideshare-is-joining-scribd-1-1024.jpg?cb=1597174152")
    await expect(slides[0].alt).toBe("SlideShare is joining Scribd! Based in San Francisco with employees across 20 countries, Scribd is committed to helping its one million readers and authors flourish. August 2020")
    await expect(slides[slides.length - 1].src).toBe("https://image.slidesharecdn.com/slideshareisjoiningscribd-200811191829/95/slideshare-is-joining-scribd-9-1024.jpg?cb=1597174152")
    await expect(slides[slides.length - 1].alt).toBe("Thank you")
  })

  test("トップページで、スライドとTranscriptの数が異なるSlideShareのURLを入力し、Arrangeボタンを選択した場合、入力したURL先のスライドがすべて縦方向に表示されること", async () => {
    // トップページにアクセス
    await page.goto(rootUrl)
    await expect(page.url()).toBe(rootUrl)

    // URLを入力
    await page.type("#input_url", slideShareUrl2)

    // Arrangeボタンを押下
    await page.click("#btn_arrange")

    // 検証：スライドが表示されるまではローディングアニメーションが表示される
    await page.waitForTimeout(100)
    await expect(await page.$("#loading")).not.toBe(null)

    // 検証：スライドが表示されたらローディングアニメーションが消える
    await page.waitForSelector("#loading", { hidden: true })
    await expect(await page.$("#loading")).toBe(null)

    // 検証：Arrangeページに遷移している
    await expect(page.url()).toBe(arrangeUrl(slideShareUrl2))

    // 検証：表示されているスライドの枚数が正しい
    const slides = await page.$$eval(".slide", nodes => nodes.map(n => { return { src: n.src, alt: n.alt } } ))
    await expect(slides.length).toBe(12)

    // 検証：表示されているスライドの順番が正しい
    await expect(slides[0].src).toBe("https://image.slidesharecdn.com/rsgt2021finalwithnotes-210107112540/95/rsgt2021-bilingual-crosscultural-discussion-how-to-accelerate-the-adoption-of-agile-and-scrum-in-japan-1-1024.jpg?cb=1610018852")
    await expect(slides[0].alt).toBe("How to accelerate\nthe adoption of agile\nand scrum in Japan?\n日本でのアジャイルと\nスクラムの導入をどう\n加速すれば良いか？\nBILINGUAL CROSS-\nCULTURAL DISC...")
    await expect(slides[slides.length - 1].src).toBe("https://image.slidesharecdn.com/rsgt2021finalwithnotes-210107112540/95/rsgt2021-bilingual-crosscultural-discussion-how-to-accelerate-the-adoption-of-agile-and-scrum-in-japan-12-1024.jpg?cb=1610018852")
    await expect(slides[slides.length - 1].alt).toBe("RSGT2021 Bilingual cross-cultural discussion 日本人と外国人のディスカッション： How to accelerate the adoption of agile and scrum in Japan?...")
  })

  test("トップページで、TranscriptがないSlideShareのURLを入力し、Arrangeボタンを選択した場合、入力したURL先のスライドがすべて縦方向に表示されること", async () => {
    // トップページにアクセス
    await page.goto(rootUrl)
    await expect(page.url()).toBe(rootUrl)

    // URLを入力
    await page.type("#input_url", slideShareUrl3)

    // Arrangeボタンを押下
    await page.click("#btn_arrange")

    // 検証：スライドが表示されるまではローディングアニメーションが表示される
    await page.waitForTimeout(100)
    await expect(await page.$("#loading")).not.toBe(null)

    // 検証：スライドが表示されたらローディングアニメーションが消える
    await page.waitForSelector("#loading", { hidden: true })
    await expect(await page.$("#loading")).toBe(null)

    // 検証：Arrangeページに遷移している
    await expect(page.url()).toBe(arrangeUrl(slideShareUrl3))

    // 検証：表示されているスライドの枚数が正しい
    const slides = await page.$$eval(".slide", nodes => nodes.map(n => { return { src: n.src, alt: n.alt } } ))
    await expect(slides.length).toBe(135)

    // 検証：表示されているスライドの順番が正しい
    await expect(slides[0].src).toBe("https://image.slidesharecdn.com/modernoffshoredevelopment-210107112737/95/-1-1024.jpg?cb=1610018962")
    await expect(slides[0].alt).toBe("モダンオフショア開発のすすめ")
    await expect(slides[slides.length - 1].src).toBe("https://image.slidesharecdn.com/modernoffshoredevelopment-210107112737/95/-135-1024.jpg?cb=1610018962")
    await expect(slides[slides.length - 1].alt).toBe("モダンオフショア開発のすすめ")
  })
})