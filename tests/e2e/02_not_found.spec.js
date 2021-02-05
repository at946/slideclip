describe("ユーザーとして、スライドが見つからないことを知りたい、なぜなら表示されない原因がわからないと次の行動に移れないからだ", () => {

  const root_url = "http://localhost:3000/"
  const arrange_url = (url) => root_url + "arrange?url=" + encodeURIComponent(url)
  const speakerdeck_notfound_url = "https://speakerdeck.com/a"
  const slideshare_notfound_url = "https://www.slideshare.net/a"
  const google_url = "https://google.com"
  const err_msg = "The slides cannot be found..."

  test("トップページで、SpeakerDeckドメインだがNotFoundのURLを入力してArrangeボタンを選択した場合、エラーメッセージが表示されること", async () => {
    // トップページにアクセス
    await page.goto(root_url)
    await expect(page.url()).toBe(root_url)

    // URLを入力
    await page.type("#input_url", speakerdeck_notfound_url)

    // Arrangeボタンを押下
    await page.click("#btn_arrange")

    // 検証：Arrangeページに遷移する
    await page.waitForSelector(".err_msg")
    await expect(page.url()).toBe(arrange_url(speakerdeck_notfound_url))

    // 検証：スライドは表示されない
    await expect(await page.$(".slide")).toBe(null)

    // 検証：エラーメッセージが表示される
    const msg = await page.$eval(".err_msg", el => el.textContent)
    await expect(msg).toBe(err_msg)
  })

  test("トップページで、SlideShareドメインだがNotFoundのURLを入力してArrangeボタンを選択した場合、エラーメッセージが表示されること", async () => {
    // トップページにアクセス
    await page.goto(root_url)
    await expect(page.url()).toBe(root_url)

    // URLを入力
    await page.type("#input_url", slideshare_notfound_url)

    // Arrangeボタンを押下
    await page.click("#btn_arrange")

    // 検証：Arrangeページに遷移する
    await page.waitForSelector(".err_msg")
    await expect(page.url()).toBe(arrange_url(slideshare_notfound_url))

    // 検証：スライドは表示されない
    await expect(await page.$(".slide")).toBe(null)

    // 検証：エラーメッセージが表示される
    const msg = await page.$eval(".err_msg", el => el.textContent)
    await expect(msg).toBe(err_msg)
  })

  test("トップページで、SpeakerDeckまたはSlideShareドメイン以外のURLを入力してArrangeボタンを選択した場合、エラーメッセージが表示されること", async () => {
    // トップページにアクセス
    await page.goto(root_url)
    await expect(page.url()).toBe(root_url)

    // URLを入力
    await page.type("#input_url", google_url)

    // Arrangeボタンを押下
    await page.click("#btn_arrange")

    // 検証：Arrangeページに遷移する
    await page.waitForSelector(".err_msg")
    await expect(page.url()).toBe(arrange_url(google_url))
    
    // 検証：スライドは表示されない
    await expect(await page.$(".slide")).toBe(null)

    // 検証：エラーメッセージが表示される
    const msg = await page.$eval(".err_msg", el => el.textContent)
    await expect(msg).toBe(err_msg)
  })
})