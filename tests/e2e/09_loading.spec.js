describe("ユーザーとして、スライドが出るまでロード中であることを知りたい、なぜなら止まっているか動いているか判断できないからだ", () => {

  test("Arrangeページで、スライドが表示されるまでローディングアニメーションが表示されること", async () => {
    // Arrangeページにアクセス
    await page.goto("http://localhost:3000/arrange?url=" + encodeURIComponent("https://speakerdeck.com/kishiyyyyy/gke-case-study"))

    // 検証：スライドが表示されるまでローディングアニメーションが表示される
    await expect(await page.$("#loading")).not.toBe(null)

    // 検証：スライドが表示されたらローディングアニメーションが表示されない
    await page.waitForSelector("#sec_slides")
    await expect(await page.$("#loading")).toBe(null)
  })

})