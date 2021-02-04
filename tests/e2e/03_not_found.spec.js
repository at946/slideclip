describe("ユーザーとして、存在しないURLを検索したときそのことを知りたい、なぜならスライドが表示されないだけだと次の行動がわからないからだ", () => {

  const root_url = "http://localhost:3000/"
  const speakerdeck_not_found_url = "https://speakerdeck.com/kishiyyyyy/gke-case-stud"
  const slideshare_not_found_url = "https://www.slideshare.net/a"
  const err_msg = "The slides cannot be found..."

  test("トップページで、SpeakerDeckドメインだがスライドが存在しない場合、Arrangeページでエラーメッセージが表示されること", async () => {    
    // トップページにアクセス
    await page.goto(root_url)

    // 検証：エラーメッセージが表示されていない
    await expect(await page.$eval("body", body => body.textContent)).not.toContain(err_msg)

    // speakerdeckのNotFound URLを入力
    await page.type("#input_url", speakerdeck_not_found_url)

    // Arrangeボタンを押下
    await page.click("#btn_arrange")

    // 検証：トップページから遷移しない
    await page.waitForSelector(".err_msg")
    await expect(page.url()).toBe(root_url + "arrange?url=" + encodeURIComponent(speakerdeck_not_found_url))

    // 検証：エラーメッセージが表示されている
    await expect(await page.$eval("body", el => el.textContent)).toContain(err_msg)

    // 検証：入力したURLがinputに入力されている
    await expect(await page.$eval("#input_url", el => el.value)).toBe(speakerdeck_not_found_url)
  })

  test("トップページで、SlideShareドメインだがスライドが存在しない場合、Arrangeページでエラーメッセージが表示されること", async () => {
    // トップページにアクセス
    await page.goto(root_url)

    // 検証：エラーメッセージが表示されていない
    await expect(await page.$eval("body", el => el.textContent)).not.toContain(err_msg)

    // slideshareのNotFound URLを入力
    await page.type("#input_url", slideshare_not_found_url)

    // Arrangeボタンを押下
    await page.click("#btn_arrange")

    // 検証：Arrangeページに遷移する
    await page.waitForSelector(".err_msg")
    await expect(page.url()).toBe(root_url + "arrange?url=" + encodeURIComponent(slideshare_not_found_url))

    // 検証：エラーメッセージが表示されている
    await expect(await page.$eval("body", el => el.textContent)).toContain(err_msg)

    // 検証：入力したURLがinputに入力されている
    await expect(await page.$eval("#input_url", el => el.value)).toBe(slideshare_not_found_url)
  })

})