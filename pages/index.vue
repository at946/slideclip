<template>
  <div>
    <div class="hero py-10">
      <h1 class="hero-title mb-2">Arrange slides vertically for easy viewing.</h1>
      <p class="hero-description mb-4">
        The slides of the slide-sharing service can be displayed vertically side by side.<br>
        Enter the URL of SlideShare or SpeakerDeck.
      </p>
      <div class="input-field mx-auto mb-2">
        <input v-model="url" id="input_url" class="input" placeholder="https://speakerdeck.com/kishiyyyyy/gke-case-study" />
      </div>
      <p v-if="err_flg" class="err_msg my-2">
        The slides cannot be found...
      </p>

      <button
        id="btn_arrange"
        class="button"
        @click="goto_arrange"
        v-bind:disabled="url == ''">
        Arrange
      </button>

      <div v-for="(url, index) in slide_urls" :key="index">
        <img :src="url" :alt="index">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "",
      slide_urls: [],
      err_flg: false
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
    },

    goto_arrange() {
      this.url = this.url.trim()
      if ( this.url.indexOf("https://speakerdeck.com/") === 0 ) {
        this.$router.push('/arrange?url=' + this.url)
      } else {
        this.err_flg = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  background-color: whitesmoke;
  padding: 1rem;
  text-align: center;

  .hero-title {
    font-size: 2rem;
    font-weight: bold;
  }

  .hero-description {
    line-height: 1.4rem;
  }
}

.input-field {
  max-width: 600px;

  .input {
    display: block;
    width: 100%;
    border: solid 2px gray;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 10px 15px;
    background-color: white;
  }
}

.button {
  padding: 10px 30px;
  background-color: mediumslateblue;
  color: white;
  border-radius: 25px;
  letter-spacing: 2px;
  line-height: 1.5rem;

  &:hover {
    opacity: 0.75;
  }

  &:disabled {
    background-color: darkgray;
    &:hover {
      opacity: 1.0;
      cursor: not-allowed;
    }
  }
}

.err_msg {
  color: red;
}
</style>