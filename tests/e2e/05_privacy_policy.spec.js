describe("サービス提供者として、プライバシーポリシーを伝えたい、なぜならユーザーにプライバシーポリシーに同意した上で利用してほしいからだ", () =>  {

  const root_url = "http://localhost:3000/"
  const arrange_url = root_url + "arrange?url=" + encodeURIComponent("https://www.slideshare.net/Slideshare/slideshare-is-joining-scribd-237760779")
  const pp_url = root_url + "pp"

  test("トップページで、フッターの「privacy policy」リンクを選択した場合、PrivacyPolicyページに遷移すること", async () => {
    // トップページにアクセス
    await page.goto(root_url)

    // フッターの「privacy policy」リンクをクリック
    await page.click("#link_footer_pp")
    await page.waitForSelector(".pp")

    // 検証：PrivacyPolicyページが表示されている
    await expect(page.url()).toBe(pp_url)
  })

  test("Arrangeページで、フッターの「privacy policy」リンクを選択した場合、PrivacyPolicyページに遷移すること", async () => {
    jest.setTimeout(10000)

    // Arrangeページにアクセス
    await page.goto(arrange_url)
    await page.waitForSelector("#sec_slides")

    // フッターの「privacy policy」リンクをクリック
    await page.click("#link_footer_pp")
    await page.waitForSelector(".pp")

    // 検証：PrivacyPolicyページが表示されている
    await  expect(page.url()).toBe(pp_url)
  })

  test("TermsOfServiceページで、フッターの「privacy policy」リンクを選択した場合、PrivacyPolicyページに遷移すること", async () => {
    // TermsOfServiceページにアクセス
    await page.goto(root_url + "tos")
    
    // フッターの「privacy policy」リンクをクリック
    await page.click("#link_footer_pp")
    await page.waitForSelector(".pp")
    
    // 検証：PrivacyPolicyページが表示されている
    await expect(page.url()).toBe(pp_url)
  })

  test("PrivacyPolicyページで、フッターの「terms of service」リンクを選択した場合、TermsOfServiceページに遷移すること", async () => {
    // PrivacyPolicyページにアクセス
    await page.goto(root_url + "pp")

    // フッターの「terms of service」リンクをクリック
    await page.click("#link_footer_tos")
    await page.waitForSelector(".tos")

    // 検証：TermsOfServiceページが表示されている
    await expect(page.url()).toBe(root_url + "tos")
  })

  test("PrivacyPolicyページで、フッターの「privacy policy」リンクが単なるテキストであること", async () => {
    // PrivacyPolicyページにアクセス
    await page.goto(root_url + "pp")

    // フッターの「privacy policy」リンクをクリック
    await page.click("#link_footer_pp")
    await page.waitForTimeout(500)

    // 検証：PrivacyPolicyページが表示されている
    await expect(page.url()).toBe(pp_url)
  })
})