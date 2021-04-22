describe("サービス提供者として、プライバシーポリシーを伝えたい、なぜならユーザーにプライバシーポリシーに同意した上で利用してほしいからだ", () => {

  const root_url = "http://localhost:3000/"
  const pp_url = root_url + "pp"

  test("トップページで、フッターの「privacy policy」リンクを選択した場合、PrivacyPolicyページに遷移すること", async () => {
    // トップページにアクセス
    await page.goto(root_url)

    // フッターの「privacy policy」リンクをクリック
    await expect(await page.$eval("#link_footer_pp", el => el.innerText)).toBe("privacy policy")
    await page.click("#link_footer_pp")

    // 検証：PrivacyPolicyページに遷移している
    await page.waitForSelector(".pp")
    await expect(page.url()).toBe(pp_url)
  })

  test("Arrangeページで、フッターの「privacy policy」リンクを選択した場合、PrivacyPolicyページに遷移すること", async () => {
    // Arrangeページにアクセス
    await page.goto(root_url + "arrange?url=" + encodeURIComponent("https://speakerdeck.com/success"))
    await page.waitForSelector("#loading", { hidden: true })

    // フッターの「privacy policy」リンクをクリック
    await expect(await page.$eval("#link_footer_pp", el => el.innerText)).toBe("privacy policy")
    await page.click("#link_footer_pp")

    // 検証：PrivacyPolicyページに遷移している
    await page.waitForSelector(".pp")
    await expect(page.url()).toBe(pp_url)
  })

  test("TermsOfServiceページで、フッターの「privacy policy」リンクを選択した場合、PrivacyPolicyページに遷移すること", async () => {
    // TermsOfServiceページにアクセス
    await page.goto(root_url + "tos")

    // フッターの「privacy policy」リンクをクリック
    await expect(await page.$eval("#link_footer_pp", el => el.innerText)).toBe("privacy policy")
    await page.click("#link_footer_pp")

    // 検証：PrivacyPolicyページに遷移している
    await page.waitForSelector(".pp")
    await expect(page.url()).toBe(pp_url)
  })

  test("PrivacyPolicyページで、フッターの「privacy policy」リンクが単なるテキストであること", async () => {
    // PrivacyPolicyページにアクセス
    await page.goto(pp_url)

    // フッターの「privacy policy」リンクをクリック
    await expect(await page.$eval("#link_footer_pp", el => el.innerText)).toBe("privacy policy")
    await page.click("#link_footer_pp")

    // 検証：PrivacyPolicyページに遷移している
    await page.waitForTimeout(100)
    await expect(page.url()).toBe(pp_url)
  })

})