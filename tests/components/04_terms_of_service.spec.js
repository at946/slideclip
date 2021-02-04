import { mount, config, RouterLinkStub } from '@vue/test-utils'
import Footer from '@/components/Footer.vue'
import DefaultPage from '@/layouts/default.vue'

describe("サービス提供者として、利用規約を伝えたい、なぜならユーザーに利用規約に同意した上で利用してほしいからだ", () => {

  test("フッターの「terms of service」リンクを選択した場合、TermsOfServiceページに遷移すること", () => {
    const wrapper = mount(Footer, { stubs: { NuxtLink: RouterLinkStub } })
    const target = wrapper.find("#link_footer_tos")
    expect(target.text()).toBe("terms of service")
    expect(target.props().to).toBe("tos")
  })

  test("default.vueにFooter Componentが表示されること", () => {
    config.stubs["nuxt"] = { template: "<div><slot /></div>" }
    const wrapper = mount(DefaultPage, { stubs: { NuxtLink: RouterLinkStub} })
    expect(wrapper.findComponent(Footer).exists()).toBe(true)
  })
})