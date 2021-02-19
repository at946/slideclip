describe("ユーザーとして、Arrangeページでトップまで戻りたい、なぜなら最初から見直したりInputに入力し直したりするときにスクロールは面倒だからだ", () => {

  const arrange_url = "http://localhost:3000/arrange?url=" + encodeURIComponent("https://speakerdeck.com/success")
  const arrange_404_url = "http://localhost:3000/arrange?url=" + encodeURIComponent("https://speakerdeck.com/not_found")

  test("Arrangeページで、スクロールトップボタンをクリックした場合、ページ上部にスクロールされること", async () => {
    // Arrangeページにアクセス
    await page.goto(arrange_url)
    await page.waitForSelector("#loading", { hidden: true })

    // 下にスクロール
    await page.evaluate(() => { window.scrollTo({ top: 2000 }) })
    var coordY = await page.evaluate(() => { return window.pageYOffset })
    await expect(coordY).toBe(2000)

    // スクロールトップボタンをクリック
    await expect(await page.$("#btn_scroll_top")).toBe(null)
    await page.click("#btn_menu")
    await page.click("#btn_scroll_top")
    await page.waitForTimeout(1000)

    // 検証：ページ最上部にいること
    coordY = await page.evaluate(() => { return window.pageYOffset })
    await expect(coordY).toBe(0)
  })

  test("Arrangeページで、スライドが表示されていない場合、スクロールトップボタンが表示されないこと", async () => {
    // Arrangeページにアクセス
    await page.goto(arrange_404_url)
    await page.waitForSelector("#loading", { hidden: true })

    // 検証：スクロールトップボタンが表示されないこと
    await expect(await page.$("btn_menu")).toBe(null)
    await expect(await page.$("btn_scroll_top")).toBe(null)
  })

  test("Arrangeページで、メニュークローズボタンをクリックした場合、メニューアイコンたちが非表示になること", async () => {
    // Arrangeページにアクセス
    await page.goto(arrange_url)
    await page.waitForSelector("#loading", { hidden: true })

    // ページをスクロール
    await page.evaluate(() => { window.scrollTo({ top: 2000 }) })

    // メニューボタンをクリック
    await page.click("#btn_menu")
    
    // 検証：メニューが表示されている
    await page.waitForSelector("#btn_menu", { hidden: true })
    await expect(await page.$("#btn_menu")).toBe(null)
    await expect(await page.$("#menu_buttons")).not.toBe(null)
    await expect(await page.$("#btn_twitter_share")).not.toBe(null)
    await expect(await page.$("#btn_source")).not.toBe(null)
    await expect(await page.$("#btn_scroll_top")).not.toBe(null)
    await expect(await page.$("#btn_close_menu")).not.toBe(null)

    // メニュークローズボタンをクリック
    await page.click("#btn_close_menu")

    // 検証：メニューが閉じる
    await page.waitForSelector("#menu_buttons", { hidden: true })
    await expect(await page.$("#btn_menu")).not.toBe(null)
    await expect(await page.$("#menu_buttons")).toBe(null)
    await expect(await page.$("#btn_twitter_share")).toBe(null)
    await expect(await page.$("#btn_source")).toBe(null)
    await expect(await page.$("#btn_scroll_top")).toBe(null)
    await expect(await page.$("#btn_close_menu")).toBe(null)
  })

  test("Arrangeページで、スクロール位置がトップの場合、スクロールトップボタンが表示されないこと", async () => {
    // Arrangeページにアクセス
    await page.goto(arrange_url)
    await page.evaluate(() => { window.scrollTo({ top: 0}) })

    // メニューボタンをクリック
    await page.click("#btn_menu")

    // 検証：スクロールトップボタンが表示されていないこと
    await expect(await page.$("#btn_scroll_top")).toBe(null)

    // 検証：スクロールしたらスクロールトップボタンが表示される
    await page.evaluate(() => { window.scrollTo({ top: 2000 }) })
    await page.waitForSelector("#btn_scroll_top")
    await expect(await page.$("#btn_scroll_top")).not.toBe(null)
  })

})