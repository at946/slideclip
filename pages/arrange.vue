<template>
  <div style="background-color: whitesmoke; height: 100%;">
    <Loading v-if="is_loading" />

    <div v-if="!is_loading">
      <section class="pt-6" style="text-align: center;">
        <Input
          id="input_url"
          class="mb-2"
          v-model="url"
          placeholder="https://speakerdeck.com/kishiyyyyy/gke-case-study"
        />
        <ErrorMessage
          msg="The slides cannot be found..."
          class="mb-2 err_msg"
          v-if="err_flg"
        />
        <div style="text-align: center;">
          <Button
            id="btn_arrange"
            :is_disabled="!url.length || url == display_slide_url"
            @click="get_slides"
          >
            Arrange
          </Button>
        </div>
      </section>

      <section class="mx-auto py-4">
        <div v-for="(url, index) in slide_urls" :key="index" id="sec_slides" class="wrap-slide px-2 my-2">
          <img :src="url" :alt="index" class="slide">
        </div>
      </section>

      <section class="pb-6" style="text-align: center;">
        <Button id="btn_twitter_share" :is_twitter="true" @click="share_to_twitter">
          <fa :icon="faTwitter" class="mr-1" />Share
        </Button>
      </section>
    </div>

  </div>
</template>

<script>
import { mapMutations } from "vuex"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import Loading from "@/components/Loading.vue"
import Input from "@/components/Input.vue"

export default {
  data() {
    return {
      slide_urls: [],
      display_slide_url: '',
      is_loading: true
    }
  },

  components: {
    Loading,
    Input
  },

  computed: {
    url: {
      get () { return this.$store.state.url.url },
      set (value) { this.$store.commit("url/set_url", value) }
    },
    err_flg: {
      get () { return this.$store.state.url.err_flg }
    },
    faTwitter () { return faTwitter }
  },
  
  mounted() {
    // query parameterのurlからURLをセットする
    this.$store.commit("url/set_url", this.$route.query.url)
    this.display_slide_url = this.url
    this.get_slides()
  },

  methods: {
    async get_slides() {
      // ローディングアニメーションを開始する
      this.is_loading = true
      // パラメータ設定
      this.slide_urls = []
      this.url = this.url.trim()
      this.$router.push({ query: { url: this.url } })

      if ( this.url.indexOf("https://speakerdeck.com/") === 0 || this.url.indexOf("https://www.slideshare.net/") === 0) {
        // SpeakerDeck or SlideShareのURLの場合、スライドをスクレイピングする
        const slide_urls = await this.$axios.$get("/api/slides", { params: { url: this.url } })
        if (slide_urls.length) {
          // スライドが取得できた場合、スライドを表示する
          this.$store.commit("url/set_err_flg", false)
          this.slide_urls = slide_urls
        } else {
          // スライドが取得できなかった場合、エラーメッセージを表示する
          this.$store.commit("url/set_err_flg", true)
        }
      } else {
        // SpeakerDeck or SlideShareのURLでない場合、エラーメッセージを表示する
        this.$store.commit("url/set_err_flg", true)
      }
      // ローディングアニメーションを終了する
      this.is_loading = false
    },

    share_to_twitter() {
      window.open(
        "https://twitter.com/intent/tweet?url=" + encodeURIComponent(window.location.origin + this.$route.fullPath) + "&hashtags=slideclip",
        "_blank"
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap-slide {
  text-align: center;
  
  .slide {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .5);
    display: inline-block;
    text-align: center;
    width: 100%;
    max-width: 800px;
  }
}
</style>