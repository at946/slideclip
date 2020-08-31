<template>
  <section class="section">
    <b-field label="URL">
      <b-input
        v-model="url"
        @keypress.native.enter.exact="get_slide"
      ></b-input>
    </b-field>

    <div v-for="(url, index) in slide_urls" :key="index">
      <img :src="url" :alt="index">
    </div>
  </section>
</template>

<script>
import Card from '~/components/Card'

export default {
  data() {
    return {
      url: "",
      slide_urls: [],
      transcripts: []
    }
  },

  methods:  {
    async get_slide() {
      this.url = this.url.trim()
      if ( this.url.indexOf("https://speakerdeck.com/") === 0 || this.url.indexOf("https://www.slideshare.net/") === 0 ) {
        this.slide_urls = await this.$axios.$get(`/api/slides?url=${this.url}`)
        // transcriptを使うようになったら
        // const res = await this.$axios.$get(`/api/slides?url=${this.url}`)
        // this.slide_urls = res[1][0]
        // this.transcripts = res[1][1]
      } else {
        // ToDo: エラーメッセージ出したい
        console.log("Bad")
      }
    }
  }
}
</script>
