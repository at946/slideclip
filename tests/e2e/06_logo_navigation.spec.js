describe("ナビゲーション（ヘッダーロゴ）", () => {

  const root_url = "http://localhost:3000/"

  test("トップページで、ヘッダーのロゴを選択してもトップページから遷移しないこと", async () => {
    // トップページにアクセス
    await page.goto(root_url)

    // ヘッダーのロゴをクリック
    await page.click("#logo")
    await page.waitForTimeout(500)

    // 検証：トップページが表示されている
    await expect(page.url()).toBe(root_url)
  })

  test("Arrangeページで、ヘッダーのロゴを選択した場合、トップページに遷移すること", async () => {
    // Arrangeページにアクセス
    await page.goto(root_url + "arrange?url=" + encodeURIComponent("https://www.slideshare.net/Slideshare/slideshare-is-joining-scribd-237760779"))
    await page.waitForSelector("#sec_slides")

    // ヘッダーのロゴをクリック
    await page.click("#logo")
    await page.waitForSelector(".hero")

    // 検証：トップページが表示されている
    await expect(page.url()).toBe(root_url)
  })

  test("TermsOfServiceページで、ヘッダーのロゴを選択した場合、トップページに遷移すること", async () => {
    // TermsOfServiceページにアクセス
    await page.goto(root_url + "tos")

    // ヘッダーのロゴをクリック
    await page.click("#logo")
    await page.waitForSelector(".hero")

    // 検証：トップページが表示されている
    await expect(page.url()).toBe(root_url)
  })

  test("PrivacyPolicyページで、ヘッダーのロゴを選択した場合、トップページに遷移すること", async () => {
    // PrivacyPolicyページにアクセス
    await page.goto(root_url + "pp")

    // ヘッダーのロゴをクリック
    await page.click("#logo")
    await page.waitForSelector(".hero")

    // 検証：トップページが表示されている
    await expect(page.url()).toBe(root_url)
  })

})