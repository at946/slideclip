export const state = () => ({
  url: ""
})

export const mutations = {
  set_url(state, url) {
    state.url = url
  }
}