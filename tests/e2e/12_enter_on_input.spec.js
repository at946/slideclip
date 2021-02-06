describe("#input_urlでEnterでArrangeできる", () => {

  const root_url = "http://localhost:3000/"
  const arrange_url = (url) => root_url + "arrange?url=" + encodeURIComponent(url)
  const sd_url = "https://speakerdeck.com/success"
  const ss_url = "https://www.slideshare.net/success"

  test("トップページで、#input_url入力中にEnterを押した場合、Arrangeがスタートすること", async () => {
    // トップページへアクセス
    await page.goto(root_url)

    // URLを入力
    await page.type("#input_url", sd_url)

    // Enterを押す
    await page.keyboard.press("Enter")

    // 検証：Arrangeページに遷移している
    await page.waitForSelector("#loading")
    await page.waitForSelector("#loading", { hidden: true })
    await expect(page.url()).toBe(arrange_url(sd_url))

    // 検証：スライドが表示されている
    const slidesLength = await page.$$eval(".slide", nodes => nodes.length)
    await page.screenshot({ path: "tests/a.png"})
    await expect(slidesLength).toBe(3)
  })

  test("Arrangeページで、#input_url入力中にEnterを押した場合、Arrangeがスタートすること", async () => {
    // Arrangeページへアクセス
    await page.goto(arrange_url(sd_url))
    await page.waitForSelector("#loading", { hidden: true })

    // 検証：Arrangeページが表示されている
    await expect(page.url()).toBe(arrange_url(sd_url))

    // 検証：スライドが表示されている
    var slidesLength = await page.$$eval(".slide", nodes => nodes.length)
    await expect(slidesLength).toBe(3)

    // 別のURLを入力
    await page.click(".clear")
    await page.type("#input_url", ss_url)

    // Enterを押す
    await page.keyboard.press("Enter")

    // 検証：Arrangeページが表示されている
    await page.waitForSelector("#loading")
    await page.waitForSelector("#loading", { hidden: true })
    await expect(page.url()).toBe(arrange_url(ss_url))

    // 検証：スライドが表示されている
    slidesLength = await page.$$eval(".slide", nodes => nodes.length)
    await expect(slidesLength).toBe(2)
  })

})