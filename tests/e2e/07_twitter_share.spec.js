describe("サービス提供者として、サービスを気に入ったユーザーにTwitterに拡散してほしい、なぜならより多くの人の目に触れてサービスを利用してほしいからだ", () => {

  const root_url = "http://localhost:3000/"
  const arrange_url = (url) => root_url + "arrange?url=" + encodeURIComponent(url)
  const twitter_share_url = (url) => "https://twitter.com/intent/tweet?url=" + encodeURIComponent(url) + "&hashtags=slideclip"

  test("トップページで、「Share」ボタンを選択した場合、「トップページのURL」と「#slideclip」が入力されたTwitterのShareページに遷移すること", async () => {
    // トップページにアクセス
    await page.goto(root_url)

    // Shareボタンを押下
    await page.click("#btn_twitter_share")

    // 検証：別タブでTwitterシェアページが開き、「トップページのURL」と「#slideclip」が入力されていること
    await page.waitForTimeout(2000)
    const pages = await browser.pages()
    const newPage = pages[pages.length - 1]
    await expect(newPage.url()).toBe(twitter_share_url("http://localhost:3000"))
  })

  test("Arrangeページで、「Share」ボタンを選択した場合、「閲覧中のスライドのArrangeページのURL」と「#slideclip」が入力されたTwitterのShareページに遷移すること", async () => {
    // ArrangeページにスライドありのURLでアクセス
    const access_url = arrange_url("https://speakerdeck.com/success")
    await page.goto(access_url)

    // Shareボタンを押下
    await page.waitForSelector("#loading", { hidden: true })
    await page.click("#btn_twitter_share")

    // 検証：別タブでTwitterシェアページが開き、「ArrangeページのURL」と「#slideclip」が入力されていること
    await page.waitForTimeout(2000)
    const pages = await browser.pages()
    const newPage = pages[pages.length - 1]
    await expect(newPage.url()).toBe(twitter_share_url(access_url))
  })

  test("Arrangeページで、スライドが表示されていない場合、「Share」ボタンが表示されないこと", async () => {
    // ArrangeページにスライドなしのURLでアクセス
    const access_url = arrange_url("https://speakerdeck.com/not_found")
    await page.goto(access_url)
    await page.waitForSelector("#loading", { hidden: true })

    // 検証：Shareボタンがない
    await expect(await page.$("#btn_twitter_share")).toBeNull()
  })
})