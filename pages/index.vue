<template>
  <div>
    <div class="hero py-10">
      <h1 class="hero-title mb-2">Arrange slides vertically for easy viewing.</h1>
      <p class="hero-description mb-4">
        The slides of the slide-sharing service can be displayed vertically side by side.<br>
        Enter the URL of SlideShare or SpeakerDeck.
      </p>
      <div class="input-field mx-auto mb-2">
        <input
          id="input_url"
          class="input"
          v-model="url"
          placeholder="https://speakerdeck.com/kishiyyyyy/gke-case-study" />
      </div>
      <p class="err_msg my-2" v-if="err_flg">
        The slides cannot be found...
      </p>

      <button
        id="btn_arrange"
        class="button"
        @click="goto_arrange"
        v-bind:disabled="!url.length">
        Arrange
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex"

export default {
  data() {
    return {
      slide_urls: []
    }
  },

  computed: {
    url: {
      get () { return this.$store.state.url.url },
      set (value) { this.$store.commit("url/set_url", value) }
    },
    err_flg: {
      get () { return this.$store.state.url.err_flg },
    }
  },

  methods:  {
    goto_arrange() {
      this.url = this.url.trim()
      if (
        this.url.indexOf("https://speakerdeck.com/") === 0 ||
        this.url.indexOf("https://www.slideshare.net/") === 0
      ) {
        this.$store.commit("url/set_err_flg", false)
        this.$router.push('/arrange?url=' + this.url)
      } else {
        this.$store.commit("url/set_err_flg", true)
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