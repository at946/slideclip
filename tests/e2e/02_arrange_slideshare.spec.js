describe("ユーザーとして、SlideShareのスライドを縦読みしたい、なぜなら横スライドより全体が把握しやすく見やすいからだ", () => {

  const root_url = "http://localhost:3000/"
  const slideshare_url = "https://www.slideshare.net/Slideshare/slideshare-is-joining-scribd-237760779"
  
  test("トップページでSlideShareのURLを入力して「Arrange」ボタンを選択した場合、URL先のスライドがすべて縦方向に表示されること", async () => {
    // jest.setTimeout(10000) // timeout値を5000->10000に変更

    // トップページにアクセス
    await page.goto(root_url)

    // URLにSlideShareにアップされているスライドのURLを入力
    await page.type('#input_url', slideshare_url)

    // Arrangeボタンを押下
    await page.click('#btn_arrange')

    // 画面遷移を待つ
    await page.waitForNavigation()

    // 検証：Arrangeページに遷移した
    await expect(page.url()).toBe(root_url + "arrange?url=" + encodeURIComponent(slideshare_url))

    // 検証：スライドが9枚表示されている
    await page.waitForSelector("#sec_slides") // #sec_slidesが表示されるまで検証を待つ
    const slides = await page.$$eval('.slide', nodes => nodes.map(n => n.src))
    await expect(slides.length).toBe(9)

    // 検証：一番上のスライドはトップページ
    await expect(slides[0]).toBe("https://image.slidesharecdn.com/slideshareisjoiningscribd-200811191829/95/slideshare-is-joining-scribd-1-638.jpg?cb=1597174152")

    // 検証：一番下のスライドはラストページ
    await expect(slides.slice(-1)[0]).toBe("https://image.slidesharecdn.com/slideshareisjoiningscribd-200811191829/95/slideshare-is-joining-scribd-9-638.jpg?cb=1597174152")
  })

})