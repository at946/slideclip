describe("色々なスライドを見たいユーザーとして、Arrangeページで別のスライドを再表示したい、なぜならいちいちトップページに戻るのは面倒だからだ", () => {

  const speakerdeck_url = "https://speakerdeck.com/kishiyyyyy/gke-case-study"
  const slideshare_url = "https://www.slideshare.net/Slideshare/slideshare-is-joining-scribd-237760779"
  const err_msg = "The slides cannot be found..."

  // inputのvalueをclearするfunction
  async function clear_input (target) {
    await target.focus()
    await target.click({ clickCount: 3 })
    await target.press("Backspace")
  }
  
  test("Arrangeページで表示中のスライドのソースURLがInputに入力されていること", async () => {
    // Arrangeページにアクセス
    await page.goto("http://localhost:3000/arrange?url=" + encodeURIComponent(speakerdeck_url))
    await page.waitForSelector("#sec_slides")
    var slides = await page.$$eval('.slide', nodes => nodes.map(n => n.src))
    await expect(slides.length).toBe(38)

    // 検証：#input_urlに表示中のスライドのURLが入力されている
    await expect(await page.$eval("#input_url", el => el.value)).toBe(speakerdeck_url)

    // US：Arrangeページで表示中のスライドのソースURLとInputに入力されているURLが同じ場合、Arrangeボタンを押下できないこと    
    // 検証：#input_urlの入力と表示中のスライドのURLが同じなのでArrangeボタンはdisabled
    await expect(await page.$eval("#btn_arrange", el => el.disabled)).toBe(true)

    // US：ArrangeページでInputが未入力の場合、Arrangeボタンを押下できないこと
    // #input_urlをclear
    await clear_input(await page.$("#input_url"))

    // 検証：#input_urlが未入力なのでArrangeボタンはdisabled
    await expect(await page.$eval("#btn_arrange", el => el.disabled)).toBe(true)

    // US：ArrangeページでSpeakerDeckまたはSlideShare以外のURLをInputに入力した状態でArrangeボタンを押下した場合、エラーメッセージが表示されること
    // #input_urlに"https://google.com"を入力
    await page.type("#input_url", "https://google.com")

    // Arrangeボタンを押下
    await page.click("#btn_arrange")

    // 検証：Arrangeページでエラーメッセージが表示される
    await page.waitForSelector(".err_msg")
    await expect(await page.$eval(".err_msg", el => el.textContent)).toBe(err_msg)

    // US：Arrangeページで存在しないSpeakerDeckまたはSlideShareのURLをInputに入力した状態でArrangeボタンを押下した場合、エラーメッセージが表示されること
    // #input_urlに存在しないSlideShareまたはSpeakerDeckのURLを入力
    await clear_input(await page.$("#input_url"))
    await page.type("#input_url", speakerdeck_url.slice(0, -1))

    // Arrangeボタンを押下
    await page.click("#btn_arrange")

    // 検証：Arrangeページでエラーメッセージが表示される
    await page.waitForTimeout(100)
    await page.waitForSelector(".err_msg")
    await expect(await page.$eval(".err_msg", el => el.textContent)).toBe(err_msg)

    // US：Arrangeページで存在するSpeakerDeckまたはSlideShareのURLをInputに入力した状態でArrangeボタンを押下した場合、入力されたスライドが表示されること
    // #input_urlにSlideShareまたはSpeakerDeckのURLを入力
    await clear_input(await page.$("#input_url"))
    await page.type("#input_url", slideshare_url)

    // // Arrangeボタンを押下
    await page.click("#btn_arrange")

    // // 検証：スライドが表示される
    await page.waitForSelector("#sec_slides")
    var slides = await page.$$eval('.slide', nodes => nodes.map(n => n.src))
    await expect(slides.length).toBe(9)
  })

})