<template>
  <section class="px-10 py-6 mx-auto">
    <div v-for="(url, index) in slide_urls" :key="index" id="sec_slides" class="wrap-slide">
      <img :src="url" :alt="index" class="slide my-3">
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      slide_urls: []
    }
  },

  mounted() {
    this.get_slides()
  },

  methods: {
    async get_slides() {
      // クエリパラメーターからターゲットスライドのURLを取得
      const url = this.$route.query.url
      // /api/index.jsの/slides APIを使ってスライドの画像のURLを取得し、slide_urlsに格納
      if ( url.indexOf("https://speakerdeck.com/") === 0 || url.indexOf("https://www.slideshare.net/") === 0 ) {
        this.slide_urls = await this.$axios.$get(`/api/slides?url=${url}`)
      } else {
        // ToDo: エラーメッセージ出したい
      }
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