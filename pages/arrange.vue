<template>
  <div>
    <Loading v-if="!slide_urls.length" />
    <section class="px-10 py-6 mx-auto">
      <div v-for="(url, index) in slide_urls" :key="index" id="sec_slides" class="wrap-slide">
        <img :src="url" :alt="index" class="slide my-3">
      </div>
    </section>

    <section class="py-6" style="text-align: center;">
      <Button id="btn_twitter_share" :is_twitter="true" @click="share_to_twitter">
        <fa :icon="faTwitter" class="mr-1" />Share
      </Button>
    </section>

  </div>
</template>

<script>
import { mapMutations } from "vuex"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import Loading from "@/components/Loading.vue"

export default {
  data() {
    return {
      slide_urls: []
    }
  },

  components: {
    Loading
  },

  computed: {
    url: {
      get () { return this.$store.state.url.url }
    },
    faTwitter () { return faTwitter }
  },
  
  mounted() {
    this.$store.commit("url/set_url", this.$route.query.url)
    this.get_slides()
  },

  methods: {
    async get_slides() {
      // クエリパラメーターからターゲットスライドのURLを取得
      const url = this.$route.query.url

      if (
        url.indexOf("https://speakerdeck.com/") === 0 ||
        url.indexOf("https://www.slideshare.net/") === 0
      ) {
        // /api/index.jsの/slides APIを使ってスライドの画像のURLを取得し、slide_urlsに格納
        this.slide_urls = await this.$axios.$get(`/api/slides?url=${url}`)
        // スライドを取得できない（NOT FOUND）の場合、トップページにリダイレクトする
        if (!this.slide_urls.length) {
          this.$store.commit("url/set_err_flg", true)
          this.$router.push('/')
        }
      } else {
        this.$store.commit("url/set_err_flg", true)
        this.$router.push("/")
      }
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
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .5);
    display: inline-block;
    text-align: center;
    max-width: 100%;
  }
}
</style>