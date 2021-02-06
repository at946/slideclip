describe("別のURLを入力したいユーザーとして、テキストフィールドをクリアしたい、なぜならいちいち全選択したり一文字ずつ消すのは面倒だからだ", () => {

  const sd_url = "https://speakerdeck.com/success"

  test("トップページで、テキストフィールドのクリアアイコンをクリックした場合、テキストフィールドの文字列が消去されること", async () => {
    // トップページにアクセス
    await page.goto("http://localhost:3000/")

    // URLを入力
    await page.type("#input_url", sd_url)

    // 検証：URLが入力されている
    await expect(await page.$eval("#input_url", el => el.value)).toBe(sd_url)

    // テキストフィールドのクリアアイコンをクリック
    await page.click("#input_url ~ .clear")

    // 検証：URLが空白
    await expect(await page.$eval("#input_url", el => el.value)).toBe("")
  })

  test("Arrangeページで、テキストフィールドのクリアアイコンをクリックした場合、テキストフィールドの文字列が消去されること", async () => {
    // Arrangeページにアクセス
    await page.goto("http://localhost:3000/arrange?url=" + encodeURIComponent(sd_url))
    await page.waitForSelector("#loading", { hidden: true })

    // 検証：URLが入力されている
    await expect(await page.$eval("#input_url", el => el.value)).toBe(sd_url)

    // テキストフィールドのクリアアイコンをクリック
    await page.click("#input_url ~ .clear")

    // 検証：URLが空白
    await expect(await page.$eval("#input_url", el => el.value)).toBe("")
  })

})