describe("logo navigation", () => {
  
  const root_url = "http://localhost:3000/"

  test("トップページで、ヘッダーのロゴを選択してもトップページから遷移しないこと", async () => {
    // トップページにアクセス
    await page.goto(root_url)

    // ヘッダーロゴをクリック
    await page.click("#logo")

    // 検証：トップページのままであること
    await page.waitForTimeout(100)
    await expect(page.url()).toBe(root_url)
  })

  test("Arrangeページで、ヘッダーのロゴを選択した場合、トップページに遷移すること", async () => {
    // Arrangeページにアクセス
    await page.goto(root_url + "arrange?url=" + encodeURIComponent("https://speakerdeck.com/success"))
    await page.waitForSelector("#loading", { hidden: true })

    // ヘッダーロゴをクリック
    await page.click("#logo")

    // 検証：トップページに遷移する
    await expect(page.url()).toBe(root_url)
  })

  test("TermsOfServiceページで、ヘッダーのロゴを選択した場合、トップページに遷移すること", async () => {
    // TermsOfServiceページにアクセス
    await page.goto(root_url + "tos")

    // ヘッダーロゴをクリック
    await page.click("#logo")

    // 検証：トップページに遷移する
    await expect(page.url()).toBe(root_url)
  })

  test("PrivacyPolicyページで、ヘッダーのロゴを選択した場合、トップページに遷移すること", async () => {
    // PrivacyPolicyページにアクセス
    await page.goto(root_url + "pp")

    // ヘッダーロゴをクリック
    await page.click("#logo")

    // 検証：トップページに遷移する
    await expect(page.url()).toBe(root_url)
  })
})