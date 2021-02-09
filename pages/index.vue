<template>
  <div>
    <section class="hero pt-10 pb-4 text-center mx-2">
      <h1 class="hero-title mb-2">Arrange slides vertically for easy viewing.</h1>
      <p class="hero-description mb-4">
        The slides of the slide-sharing service can be displayed vertically side by side.
        <br />
        Enter the URL of <a href="https://www.slideshare.net/" target="_blank" class="text-slide-share">SlideShare</a> or <a href="https://speakerdeck.com/" target="_blank" class="text-speaker-deck">SpeakerDeck</a>.
      </p>
      <Input
        id="input_url"
        class="mb-2 hero-input"
        :hasClear="true"
        v-model="searchUrl"
        @keydown.enter="inputEnter($event)"
        placeholder="https://speakerdeck.com/kishiyyyyy/gke-case-study"
      />
      <Button
        id="btn_arrange"
        :isDisabled="!searchUrl.trim().length"
        @click="startArrange"
      >
        Arrange
      </Button>
    </section>

    <section class="mt-6 mb-4 mx-2">
      <Card class="card">
        <h2 class="card-title">How to use</h2>
      </Card>

      <Card class="card">
        <h1 class="card-title mb-3">Just enter the URL and click !</h1>
        <Input
          class="mb-3"
          id="input_url_demo"
          value="https://speakerdeck.com/kishiyyyyy/gke-case-study"
          :isReadonly="true"
        />
        <div class="touch-button-wrap">
          <Button :isDemo="true">Arrange</Button>
          <img src="@/assets/images/touch_icon.png" alt="touch icon">
        </div>
      </Card>

      <Card class="card backimage-slide">
        <h1 class="card-title">Then, arrange slides vertically</h1>
      </Card>

      <Card class="card">
        <h1 class="card-title">Like this <fa :icon="faHandPeace" /></h1>
      </Card>

      <Card class="card">
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

      <Card class="card">
        <h1 class="card-title mb-3">Share if you like !!</h1>
        <Button id="btn_twitter_share" :isTwitter="true" @click="shareToTwitter">
          <fa :icon="faTwitter" class="mr-1" />Share
        </Button>
      </Card>
    </section>
  </div>
</template>

<script>
import Input from "@/components/Input.vue"
import Button from "@/components/Button.vue"
import Card from "@/components/Card.vue"
import ErrorMessage from "@/components/ErrorMessage.vue"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faUserCircle } from "@fortawesome/free-regular-svg-icons"
import { faHandPeace } from "@fortawesome/free-regular-svg-icons"

export default {
  computed: {
    searchUrl: {
      get () { return this.$store.state.search.url },
      set (value) { this.$store.commit("search/set_url", value) }
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

  
  methods: {
    inputEnter (event) {
      if (event.keyCode !== 13) return
      this.searchUrl = this.searchUrl.trim()
      if (!this.searchUrl.length) return
      this.startArrange()
    },

    startArrange () {
      this.searchUrl = this.searchUrl.trim()
      this.$router.push({
        path: '/arrange',
        query: { url: this.searchUrl }
      })
    },

    shareToTwitter() {
      window.open(
        "https://twitter.com/intent/tweet?text=" + encodeURIComponent("#slideclip") + "&url=" + encodeURIComponent(window.location.origin),
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

  .hero-title {
    font-size: 2rem;
    font-weight: bold;
  }

  .hero-description {
    line-height: 1.4rem;
  }

  .hero-input {
    max-width: 600px;
  }
}

.card {
  @media screen and (max-width: 896px) {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  @media screen and (min-width: 896px) {
    margin-top: 2rem;
    margin-bottom: 2rem;
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
    @media screen and (max-width: 896px) {
      font-size: 2.5rem;
    }
    display: block;
    @extend .mb-2;
    @extend .mx-auto;
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