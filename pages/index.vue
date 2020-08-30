<template>
  <section class="section">
    <b-field label="URL">
      <b-input
        v-model="url"
        @keypress.native.enter.exact="get_slide"
      ></b-input>
    </b-field>

    <div v-for="(url, index) in urls" :key="index">
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
      urls: {}
    }
  },

  methods:  {
    async get_slide() {
      this.url = this.url.trim()
      if (this.url.indexOf("https://speakerdeck.com/") === 0) {
        const res = await this.$axios.$get(`/api/slides?url=${this.url}`)
        for (var i = 0; i < res.page_num; i++) {
          this.$set(this.urls, i, res.image_url.replace("slide_0", `slide_${i}`))
        }
      } else {
        console.log("Bad")
      }
    }
  }
}
</script>
