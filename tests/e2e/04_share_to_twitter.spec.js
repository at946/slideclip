describe("サービス提供者として、サービスを気に入ったユーザーにTwitterに拡散してほしい、なぜならより多くの人の目に触れてサービスを利用してほしいからだ", () => {

  const root_url = "http://localhost:3000/"

  test("トップページで、「Share」ボタンを選択した場合、「トップページのURL」と「#slideclip」が入力されたTwitterのShareページに遷移すること", async () => {
    // トップページにアクセス
    await page.goto(root_url)

    // Shareボタンを押下
    await page.click("#btn_twitter_share")

    // 検証：Tweetページに遷移している
    // 検証：トップページのURLが入力されている
    // 検証：「#slideclip」が入力されている
    browser.once("targetcreated", async (target) => {
      const newPage = await target.page()
      await expect(newPage.url()).toContain("https://twitter.com/intent/tweet?url=" + encodeURIComponent(root_url) + "&hashtags=slideclip")
      newPage.close()
      browser.close()
    })
  })
})