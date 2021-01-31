<template>
  <div>
    <div class="hero py-10">
      <h1 class="hero-title mb-2">Arrange slides vertically for easy viewing.</h1>
      <p class="hero-description mb-4">
        The slides of the slide-sharing service can be displayed vertically side by side.<br>
        Enter the URL of SlideShare or SpeakerDeck.
      </p>
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

      <Button
        id="btn_arrange"
        :is_disabled="!url.length"
        @click="goto_arrange"
      >
        Arrange
      </Button>
    </div>

    <section class="my-10 mx-10">
      <Card class="my-6">
        <h1 class="card-title mb-1">How to use</h1>
        <p class="mb-3">Just enter the URL and click !</p>
        <Input
          class="mb-3"
          value="https://speakerdeck.com/kishiyyyyy/gke-case-study"
          :is_readonly="true"
        />
        <div class="touch-button-wrap">
          <Button :is_demo="true">Arrange</Button>
          <img src="@/assets/images/touch_icon.png" alt="touch icon">
        </div>
      </Card>

      <Card class="my-6 backimage-slide">
        <h1 class="card-title mb-1">Then, arrange slides vertically</h1>
      </Card>

      <Card class="my-6">
        <h1 class="card-title mb-1">Like this <fa :icon="faHandPeace" /></h1>
      </Card>

      <Card class="my-6">
        <h1 class="card-title mb-4">Developers</h1>
        <ul class="list-developers">
          <li>
            <fa :icon="faUserCircle" class="developer-icon" />
            <a href="https://twitter.com/at_946" target="_blank" class="developer-twitter-link">at_946</a>
          </li>
          <li>
            <fa :icon="faUserCircle"  class="developer-icon" />
            <a href="https://twitter.com/kishiyyyyy" target="_blank" class="developer-twitter-link">kishiyyyyy</a>
          </li>
        </ul>
      </Card>

      <Card>
        <h1 class="card-title mb-3">Share if you like !!</h1>
        <Button id="btn_twitter_share" :is_twitter="true" @click="share_to_twitter">
          <fa :icon="faTwitter" class="mr-1" />Share
        </Button>
      </Card>
    </section>
  </div>
</template>

<script>
import { mapMutations } from "vuex"
import Input from "@/components/Input.vue"
import Button from "@/components/Button.vue"
import Card from "@/components/Card.vue"
import ErrorMessage from "@/components/ErrorMessage.vue"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faUserCircle } from "@fortawesome/free-regular-svg-icons"
import { faHandPeace } from "@fortawesome/free-regular-svg-icons"

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
    },
    faTwitter () { return faTwitter },
    faUserCircle () { return faUserCircle },
    faHandPeace () { return faHandPeace }
  },

  components: {
    Input,
    Button,
    Card,
    ErrorMessage
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
    },

    share_to_twitter() {
      window.open(
        "https://twitter.com/intent/tweet?url=" + encodeURIComponent(window.location.origin) + "&hashtags=slideclip",
        "_blank"
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_spacing.scss";
@import "@/assets/css/_color.scss";

.hero {
  padding: 1rem;
  text-align: center;
  background-color: whitesmoke;

  .hero-title {
    font-size: 2rem;
    font-weight: bold;
  }

  .hero-description {
    line-height: 1.4rem;
  }
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
}

.touch-button-wrap {
  position: relative;

  img {
    position: absolute;
    height: 40px;
    bottom: -32px;
    display: inline;
    left: 50%;
  }
}

.list-developers {
  display: flex;
  justify-content: center;

  li {
    @extend .mx-5;
  }

  .developer-icon {
    font-size: 5rem;
    display: block;
    @extend .mb-2;
  }

  .developer-twitter-link {
    text-decoration: underline;
    color: $twitter;
  }
}

.backimage-slide {
  background-image: url('~@/assets/images/slide_image.png');
  background-repeat: repeat-y;
  background-position: center;
}

</style>