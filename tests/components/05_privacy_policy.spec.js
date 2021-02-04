import { mount, config, RouterLinkStub } from '@vue/test-utils'
import Footer from '@/components/Footer.vue'
import DefaultPage from '@/layouts/default.vue'

describe("サービス提供者として、プライバシーポリシーを伝えたい、なぜならユーザーにプライバシーポリシーに同意した上で利用してほしいからだ", () => {

  test("フッターの「privacy policy」リンクを選択した場合、PrivacyPolicyページに遷移すること", () => {
    const wrapper = mount(Footer, { stubs: { NuxtLink: RouterLinkStub } })
    const target = wrapper.find("#link_footer_pp")
    expect(target.text()).toBe("privacy policy")
    expect(target.props().to).toBe("pp")
  })

  test("default.vueにFooter Componentが表示されること", () => {
    config.stubs["nuxt"] = { template: "<div><slot /></div>" }
    const wrapper = mount(DefaultPage, { stubs: { NuxtLink: RouterLinkStub} })
    expect(wrapper.findComponent(Footer).exists()).toBe(true)
  })
})