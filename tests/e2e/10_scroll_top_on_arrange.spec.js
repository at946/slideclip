describe("ユーザーとして、Arrangeページでトップまで戻りたい、なぜなら最初から見直したりInputに入力し直したりするときにスクロールは面倒だからだ", () => {

  const arrange_url = "http://localhost:3000/arrange?url=" + encodeURIComponent("https://speakerdeck.com/success")

  test("Arrangeページで、スクロールトップボタンをクリックした場合、ページ上部にスクロールされること", async () => {
    // Arrangeページにアクセス
    await page.goto(arrange_url)
    await page.waitForSelector("#loading", { hidden: true })

    // 最下部にスクロール
    await page.evaluate(() => { window.scrollTo({ top: 2000 }) })
    var coordY = await page.evaluate(() => { return window.pageYOffset })
    await expect(coordY).toBe(2000)

    // スクロールトップボタンをクリック
    await page.waitForSelector("#btn_scroll_top")
    await page.click("#btn_scroll_top")
    await page.waitForTimeout(1000)

    // 検証：ページ最上部にいること
    coordY = await page.evaluate(() => { return window.pageYOffset })
    await expect(coordY).toBe(0)
  })

  test("Arrangeページで、スクロール位置がトップの場合、スクロールトップボタンが表示されないこと", async () => {
    // Arrangeページにアクセス
    await page.goto(arrange_url)
    await page.waitForSelector("#loading", { hidden: true })

    // 検証：スクロールトップボタンが表示されていないこと
    await expect(await page.$("#btn_scroll_top")).toBe(null)

    // 検証：スクロールしたらスクロールトップボタンが標示される
    await page.evaluate(() => { window.scrollTo({ top: 2000 }) })
    await page.waitForSelector("#btn_scroll_top")
    await expect(await page.$("#btn_scroll_top")).not.toBe(null)
  })

})