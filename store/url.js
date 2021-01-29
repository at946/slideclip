export const state = () => ({
  err_flg: false,
  url: ""
})

export const mutations = {
  set_err_flg(state, flg) {
    state.err_flg = flg
  },

  set_url(state, url) {
    state.url = url
  }
}