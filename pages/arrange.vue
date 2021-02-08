<template>
  <div style="background-color: whitesmoke; height: 100%;">
    <transition name="fade">
      <Loading v-if="is_loading" />
    </transition>

    <div v-if="!is_loading">
      <section class="pt-6 px-2" style="text-align: center;">
        <Input
          id="input_url"
          class="mb-2"
          v-model="search_url"
          :has_clear="true"
          @keydown.enter="inputEnter($event)"
          placeholder="https://speakerdeck.com/kishiyyyyy/gke-case-study"
        />
        <ErrorMessage
          msg="The slides cannot be found..."
          class="mb-2 err_msg"
          v-if="has_error"
        />
        <div style="text-align: center;">
          <Button
            id="btn_arrange"
            :is_disabled="!search_url.trim().length"
            @click="get_slides"
          >
            Arrange
          </Button>
        </div>
      </section>

      <section class="mx-auto py-4">
        <div v-for="(slide, index) in display_slides" :key="index" id="sec_slides" class="wrap-slide">
          <img :src="slide.url" :alt="slide.transcript" class="slide">
        </div>
      </section>

      <section class="pb-6" style="text-align: center;">
        <Button
          id="btn_twitter_share"
          v-if="display_slides.length"
          :is_twitter="true"
          @click="share_to_twitter"
          class="mb-2"
        >
          <fa :icon="faTwitter" class="mr-1" />Share
        </Button>
        <br />
        <Button
          id="btn_source"
          v-if="display_slide_source_id"
          :is_speaker_deck="display_slide_source_id === 1"
          :is_slide_share="display_slide_source_id === 2"
          @click="goToSource"
        >
          <fa :icon="faSpeakerDeck" id="icon_sd" class="mr-1" v-if="display_slide_source_id === 1" />
          <fa :icon="faSlideshare" id="icon_ss" class="mr-1" v-if="display_slide_source_id === 2" />
          Go to source
        </Button>
      </section>
    </div>

    <transition name="fade">
      <CircleButton
        id="btn_scroll_top"
        @click="scrollToTop"
        v-if="coordY > 200"
      >
        <fa :icon="faArrowUp" />
      </CircleButton>
    </transition>

  </div>
</template>

<script>
import { mapMutations } from "vuex"
import { faTwitter, faSpeakerDeck, faSlideshare } from "@fortawesome/free-brands-svg-icons"
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"
import Loading from "@/components/Loading.vue"
import Input from "@/components/Input.vue"
import CircleButton from "@/components/CircleButton.vue"

export default {
  data() {
    return {
      display_slides: [],
      display_slide_url: '',
      display_slide_title: '',
      display_slide_source_id: 0,  // 1: speakerdeck, 2: slideshare
      is_loading: true,
      has_error: false,
      coordY: 0
    }
  },

  components: {
    Loading,
    Input,
    CircleButton
  },

  computed: {
    search_url: {
      get () { return this.$store.state.search.url },
      set (value) { this.$store.commit("search/set_url", value) }
    },
    faTwitter () { return faTwitter },
    faSpeakerDeck () { return faSpeakerDeck },
    faSlideshare () { return faSlideshare },
    faArrowUp () { return faArrowUp }
  },
  
  mounted() {
    // query parameterのurlからURLをセットする
    if (this.$route.query.url) {
      this.search_url = this.$route.query.url.trim()
      this.get_slides()
      this.$nextTick(() => {
        window.addEventListener("scroll", this.handleScroll)
      })
    } else {
      this.$router.push("/")
    }
  },

  methods: {
    async get_slides() {
      // ローディングアニメーションを開始する
      this.is_loading = true
      // パラメータ初期化
      this.display_slides = []
      this.display_slide_url = ''
      this.display_slide_source_id = 0

      this.search_url = this.search_url.trim()
      this.$router.push({ query: { url: this.search_url } })

      if (
        this.search_url.indexOf("https://speakerdeck.com/") === 0 ||
        this.search_url.indexOf("https://www.slideshare.net/") === 0
      ) {
        // SpeakerDeck or SlideShareのURLの場合、スライドをスクレイピングする
        const res = await this.$axios.$get("/api/slides", { params: { url: this.search_url } })

        if (res && res.slides.length) {
          // スライドが取得できた場合、スライドを表示する
          this.has_error = false
          this.display_slide_url = this.search_url
          this.display_slide_title = res.title
          this.display_slide_source_id = res.source_id
          this.display_slides = res.slides
        } else {
          // スライドが取得できなかった場合、エラーメッセージを表示する
          this.has_error = true
        }
      } else {
        // SpeakerDeck or SlideShareのURLでない場合、エラーメッセージを表示する
        this.has_error = true
      }
      // ローディングアニメーションを終了する
      this.is_loading = false
    },

    inputEnter(event) {
      if (event.keyCode !== 13) return
      if (!this.search_url.trim().length) return
      this.get_slides()
    },

    share_to_twitter() {
      window.open(
        "https://twitter.com/intent/tweet?text=" + encodeURIComponent("\"" + this.display_slide_title + "\"\n#slideclip") +  "&url=" + encodeURIComponent(window.location.origin + this.$route.fullPath),
        "_blank"
      )
    },

    goToSource() {
      window.open(
        this.display_slide_url,
        "_blank"
      )
    },

    handleScroll() {
      this.coordY = window.scrollY
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_spacing.scss";

.wrap-slide {
  text-align: center;
  @extend .px-2;
  @media screen and (max-width: 896px) {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  @media screen and (min-width: 896px) {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  
  .slide {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .5);
    display: inline-block;
    text-align: center;
    width: 100%;
    max-width: 800px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>