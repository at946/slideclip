describe("サービス提供者として、利用規約を伝えたい、なぜならユーザーに利用規約に同意した上で利用してほしいからだ", () => {

  const root_url = "http://localhost:3000/"
  const tos_url = root_url + "tos"

  test("トップページで、フッターの「terms of service」リンクを選択した場合、TermsOfServiceページに遷移すること", async () => {    
    // トップページにアクセス
    await page.goto(root_url)

    // フッターの「terms of service」リンクをクリック
    await page.click("#link_footer_tos")
    await page.waitForSelector(".tos")

    // 検証：TermsOfServiceページに遷移する
    await expect(page.url()).toBe(tos_url)
  })

  test("Arrangeページで、フッターの「terms of service」リンクを選択した場合、TermsOfServiceページに遷移すること", async () => {
    jest.setTimeout(10000) // timeout値を5000->10000に変更

    // Arrangeページにアクセス
    await page.goto(root_url + "arrange?url=" + encodeURIComponent("https://speakerdeck.com/kishiyyyyy/gke-case-study"))
    await page.waitForSelector('#sec_slides')

    // フッターの「terms of service」リンクをクリック
    await page.click("#link_footer_tos")
    await page.waitForSelector(".tos")

    // 検証：TermsOfServiceページに遷移する
    await expect(page.url()).toBe(tos_url)
  })

  test("TermsOfServiceページで、フッターの「terms of service」リンクが単なるテキストであること", async () => {
    // TermsOfServiceページにアクセス
    await page.goto(tos_url)

    // フッターの「terms of service」リンクをクリック
    await page.click("#link_footer_tos")
    await page.waitForSelector(".tos")

    // 検証：TermsOfServiceページのまま
    await expect(page.url()).toBe(tos_url)
  })
})