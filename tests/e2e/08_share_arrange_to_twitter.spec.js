describe("サービス提供者として、サービスを気に入ったユーザーにTwitterに拡散してほしい、なぜならより多くの人の目に触れてサービスを利用してほしいからだ", () => {

  const root_url = "http://localhost:3000/"
  const arrange_url = root_url + "arrange?url=" + encodeURIComponent("https://speakerdeck.com/kishiyyyyy/gke-case-study")

  test("Arrangeページで、「Share」ボタンを選択した場合、「閲覧中のスライドのArrangeページのURL」と「#slideclip」が入力されたTwitterのShareページに遷移すること", async () => {
    jest.setTimeout(10000)
    
    // Arrangeページにアクセス
    await page.goto(arrange_url)
    await page.waitForSelector("#sec_slides")
    
    // Shareボタンを押下
    await page.click("#btn_twitter_share")

    // 検証：Tweetページに遷移している
    // 検証：表示していたスライドのArrangeページのURLが入力されている
    // 検証：「#slideclip」が入力されている
    browser.once("targetcreated", async (target) => {
      const newPage = await target.page()
      await expect(newPage.url()).toContain("https://twitter.com/intent/tweet?url=" + encodeURIComponent(arrange_url) + "&hashtags=slideclip")
      newPage.close()
    })
  })
})