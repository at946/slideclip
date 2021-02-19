describe("Twitterでシェアを見かけたユーザーとして、OGPでスライドタイトルを見たい、なぜならその方がより興味が出るからだ", () => {

  const title = "SlideClip"
  const description = process.env.npm_package_description
  const root_url = "http://localhost:3000"

  test("トップページのOGPは、デスクリプションが説明文になっていること", async () => {
    // トップページにアクセス
    await page.goto(root_url)

    // 検証：OGPのタイトルが「SlideClip」であること
    await expect(await page.$eval("meta[property='og:title']", el => el.content)).toBe(title)

    // 検証：OGPのデスクリプションが説明文であること
    await expect(await page.$eval("meta[property='og:description']", el => el.content)).toBe(description)

    // 検証：OGPのURLがトップページのURLであること
    await expect(await page.$eval("meta[property='og:url']", el => el.content)).toBe(root_url)
  })

  test("スライドが表示されるArrangeページのOGPは、デスクリプションが表示するスライドタイトルであること", async () => {
    // Arrangeページにアクセス（スライドが表示される）
    await page.goto(`${root_url}/arrange?url=${decodeURIComponent('https://speakerdeck.com/success')}`)
    
    // 検証：OGPのタイトルが「SlideClip」であること
    await expect(await page.$eval("meta[property='og:title']", el => el.content)).toBe(title)

    // 検証：OGPのデスクリプションが表示するスライドのタイトルであること
    await expect(await page.$eval("meta[property='og:description", el => el.content)).toBe("Success SpeakerDeck")

    // 検証：OGPのURLがトップページのURLであること
    await expect(await page.$eval("meta[property='og:url']", el => el.content)).toBe(root_url)
  })

  test("スライドが表示されないArrangeページのOGPは、デスクリプションが説明文になっていること", async () => {
    // Arrangeページにアクセス（スライドが表示されない）
    await page.goto(`${root_url}/arrange?url=${decodeURIComponent('https://speakerdeck.com/not_found')}`)

    // 検証：OGPのタイトルが「SlideClip」であること
    await expect(await page.$eval("meta[property='og:title']", el => el.content)).toBe(title)

    // 検証：OGPのデスクリプションが説明文であること
    await expect(await page.$eval("meta[property='og:description']", el => el.content)).toBe(description)

    // 検証：OGPのURLがトップページのURLであること
    await expect(await page.$eval("meta[property='og:url']", el => el.content)).toBe(root_url)
  })

  test("TermsOfServiceページのOGPは、デスクリプションが説明文になっていること", async () => {
    // TermsOfServiceページにアクセス
    await page.goto(`${root_url}/tos`)

    // 検証：OGPのタイトルが「SlideClip」であること
    await expect(await page.$eval("meta[property='og:title']", el => el.content)).toBe(title)

    // 検証：OGPのデスクリプションが説明文であること
    await expect(await page.$eval("meta[property='og:description']", el => el.content)).toBe(description)

    // 検証：OGPのURLがトップページのURLであること
    await expect(await page.$eval("meta[property='og:url']", el => el.content)).toBe(root_url)
  })

  test("PrivacyPolicyページのOGPは、デスクリプションが説明文になっていること", async () => {
    // PrivacyPolicyページにアクセス
    await page.goto(`${root_url}/pp`)

    // 検証：OGPのタイトルが「SlideClip」であること
    await expect(await page.$eval("meta[property='og:title']", el => el.content)).toBe(title)

    // 検証：OGPのデスクリプションが説明文であること
    await expect(await page.$eval("meta[property='og:description']", el => el.content)).toBe(description)

    // 検証：OGPのURLがトップページのURLであること
    await expect(await page.$eval("meta[property='og:url']", el => el.content)).toBe(root_url)
  })

})