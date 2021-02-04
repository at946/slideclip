import { mount, config, RouterLinkStub } from '@vue/test-utils'
import Header from '@/components/Header.vue'
import DefaultPage from '@/layouts/default.vue'

describe("ナビゲーション（ヘッダーロゴ）", () => {

  test("ヘッダーのロゴを選択した場合、トップページに遷移すること", () => {
    const wrapper = mount(Header, { stubs: { NuxtLink: RouterLinkStub } })
    const target = wrapper.find("#logo")
    expect(target.text()).toBe("SlideClip")
    expect(target.props().to).toBe("/")
  })

  test("default.vueにHeader Componentが表示されること", () => {
    config.stubs["nuxt"] = { template: "<div><slot /></div>" }
    const wrapper = mount(DefaultPage, { stubs: { NuxtLink: RouterLinkStub} })
    expect(wrapper.findComponent(Header).exists()).toBe(true)
  })
})