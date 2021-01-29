describe('ユーザーとして、SpeakerDeckのスライドを縦読みしたい、なぜなら横スライドより全体が把握しやすく見やすいからだ', () => {

  const root_url = 'http://localhost:3000/'
  const speakerdeck_url = 'https://speakerdeck.com/kishiyyyyy/gke-case-study'

  test('トップページでSpeakerDeckのURLを入力して「Arrange」ボタンを選択した場合、URL先のスライドがすべて縦方向に表示されること', async () => {
    jest.setTimeout(10000) // timeout値を5000->10000に変更

    // トップページへアクセス
    await page.goto(root_url)
    
    // URLを入力
    await page.type('#input_url', speakerdeck_url)
    
    // Arrangeボタンを押下
    await page.click('#btn_arrange')
    
    // 画面遷移を待つ
    await page.waitForSelector('#sec_slides')
    
    // 検証：Arrangeページに遷移した
    await expect(page.url()).toBe(root_url + 'arrange?url=https%3A%2F%2Fspeakerdeck.com%2Fkishiyyyyy%2Fgke-case-study')
    
    // 検証：スライドが38枚表示されている
    const slides = await page.$$eval('.slide', nodes => nodes.map(n => n.src))
    await expect(slides.length).toBe(38)

    // 検証：一番上のスライドはトップページ
    await expect(slides[0]).toBe('https://files.speakerdeck.com/presentations/33642807c6da4dc1a6b888f85f2ce307/slide_0.jpg?14821707')
    
    // 検証：一番下のスライドはラストページ
    await expect(slides.slice(-1)[0]).toBe('https://files.speakerdeck.com/presentations/33642807c6da4dc1a6b888f85f2ce307/slide_37.jpg?14821707')
  })

  test('トップページでGoogleのURLを入力して「Arrange」ボタンを選択した場合、「The slides cannot be found...」とエラーメッセージが表示されること', async () => {
    const err_msg = 'The slides cannot be found...'

    // トップページへアクセス
    await page.goto(root_url)
    
    // 検証：エラーメッセージが表示されていない
    var text = await page.$eval('body', body => body.textContent)
    await expect(text).not.toContain(err_msg)
    
    // GoogleのURLを入力
    await page.type('#input_url', 'https://google.com')

    // Arrangeボタンを押下
    await page.click('#btn_arrange')

    // 検証：ページ遷移しない
    await page.waitForTimeout(1000)
    await expect(page.url()).toBe(root_url)

    // 検証：エラーメッセージが表示される
    text = await page.$eval('body', body => body.textContent)
    await expect(text).toContain(err_msg)
  })

  test('トップページでURLを入力せずに「Arrange」ボタンを選択できないこと', async () => {
    // トップページへアクセス
    await page.goto(root_url)

    // 検証：Arrangeボタンが押下不可
    await expect(await page.$eval("#btn_arrange", btn => btn.disabled)).toBe(true)

    // URLを入力
    await page.type("#input_url", speakerdeck_url)

    // 検証：Arrangeボタンが押下可
    await expect(await page.$eval("#btn_arrange", btn => btn.disabled)).toBe(false)

    // URLを削除
    for (let i = 0; i < speakerdeck_url.length; i++) {
      await page.keyboard.press('Backspace')
    }

    // 検証：Arrangeボタンが押下不可
    await expect(await page.$eval('#btn_arrange', btn => btn.disabled)).toBe(true)
  })
})