describe("サービス提供者として、利用規約を伝えたい、なぜならユーザーに利用規約に同意した上で利用してほしいからだ", () => {

  const root_url = "http://localhost:3000/"
  const tos_url = root_url + "tos"

  test("トップページで、フッターの「terms of service」リンクを選択した場合、TermsOfServiceページに遷移すること", async () => {
    // トップページにアクセス
    await page.goto(root_url)

    // フッターの「terms of service」リンクをクリック
    await expect(await page.$eval("#link_footer_tos", el => el.textContent)).toBe("terms of service")
    await page.click("#link_footer_tos")

    // 検証：TermsOfServiceページに遷移している
    await page.waitForSelector(".tos")
    await expect(page.url()).toBe(tos_url)
  })

  test("Arrangeページで、フッターの「terms of service」リンクを選択した場合、TermsOfServiceページに遷移すること", async () => {
    // Arrangeページにアクセス
    await page.goto(root_url + "arrange?url=" + encodeURIComponent("https://speakerdeck.com/success"))

    // フッターの「terms of service」リンクをクリック
    await expect(await page.$eval("#link_footer_tos", el => el.textContent)).toBe("terms of service")
    await page.click("#link_footer_tos")

    // 検証：TermsOfServiceページに遷移している
    await page.waitForSelector(".tos")
    await expect(page.url()).toBe(tos_url)
  })

  test("PrivacyPolicyページで、フッターの「terms of service」リンクを選択した場合、TermsOfServiceページに遷移すること", async () => {
    // PrivacyPolicyページにアクセス
    await page.goto(root_url + "pp")

    // フッターの「terms of service」リンクをクリック
    await expect(await page.$eval("#link_footer_tos", el => el.textContent)).toBe("terms of service")
    await page.click("#link_footer_tos")

    // 検証：TermsOfServiceページに遷移している
    await page.waitForSelector(".tos")
    await expect(page.url()).toBe(tos_url)
  })

  test("TermsOfServiceページで、フッターの「terms of service」リンクが単なるテキストであること", async () => {
    // TermsOfServiceページにアクセス
    await page.goto(tos_url)

    // フッターの「terms of service」リンクをクリック
    await expect(await page.$eval("#link_footer_tos", el => el.textContent)).toBe("terms of service")
    await page.click("#link_footer_tos")

    // 検証：TermsOfServiceページに遷移している
    await page.waitForTimeout(100)
    await expect(page.url()).toBe(tos_url)
  })

})