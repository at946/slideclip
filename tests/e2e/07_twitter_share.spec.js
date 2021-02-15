describe("サービス提供者として、サービスを気に入ったユーザーにTwitterに拡散してほしい、なぜならより多くの人の目に触れてサービスを利用してほしいからだ", () => {

  const root_url = "http://localhost:3000/"
  const arrange_url = (url) => root_url + "arrange?url=" + encodeURIComponent(url)

  test("トップページで、「Share」ボタンを選択した場合、「トップページのURL」と「#slideclip」が入力されたTwitterのShareページに遷移すること", async () => {
    // トップページにアクセス
    await page.goto(root_url)

    // Shareボタンを押下
    await page.click("#btn_twitter_share")

    // 検証：別タブでTwitterシェアページが開き、「トップページのURL」と「#slideclip」が入力されていること
    await page.waitForTimeout(2000)
    const pages = await browser.pages()
    const newPage = pages[pages.length - 1]
    await expect(newPage.url()).toBe("https://twitter.com/intent/tweet?text=%23slideclip&url=" + encodeURIComponent("http://localhost:3000"))
  })

  test("Arrangeページで、「Share」ボタンを選択した場合、「閲覧中のスライドのArrangeページのURL」と「#slideclip」が入力されたTwitterのShareページに遷移すること", async () => {
    // ArrangeページにスライドありのURLでアクセス
    const access_url = arrange_url("https://speakerdeck.com/success")
    await page.goto(access_url)

    // Shareボタンを押下
    await page.waitForSelector("#loading", { hidden: true })
    await expect(await page.$("btn_twitter_share")).toBe(null)
    await page.click("#btn_menu")
    await page.click("#btn_twitter_share")

    // 検証：別タブでTwitterシェアページが開き、「ArrangeページのURL」と「#slideclip」が入力されていること
    await page.waitForTimeout(2000)
    const pages = await browser.pages()
    const newPage = pages[pages.length - 1]
    await expect(newPage.url()).toBe("https://twitter.com/intent/tweet?text=" + encodeURIComponent("\"Success SpeakerDeck\"\n#slideclip") + "&url=" + encodeURIComponent(access_url))

    // 検証：元のページのメニューが閉じていること
    await expect(await page.$("#btn_menu")).not.toBe(null)
    await expect(await page.$("#menu_buttons")).toBe(null)
    await expect(await page.$("#btn_twitter")).toBe(null)
  })

  test("Arrangeページで、スライドが表示されていない場合、「Share」ボタンが表示されないこと", async () => {
    // ArrangeページにスライドなしのURLでアクセス
    const access_url = arrange_url("https://speakerdeck.com/not_found")
    await page.goto(access_url)
    await page.waitForSelector("#loading", { hidden: true })

    // 検証：Shareボタンがない
    await expect(await page.$("btn_menu")).toBe(null)
    await expect(await page.$("#btn_twitter_share")).toBe(null)
  })

})