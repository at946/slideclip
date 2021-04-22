<template>
  <div>
    <transition name="fade">
      <Loading v-if="isLoading" />
    </transition>

    <div v-if="!isLoading">
      <section class="pt-6 px-2 text-center">
        <Input
          id="input_url"
          class="mb-2"
          v-model="searchUrl"
          :hasClear="true"
          @keydown.enter.exact="inputEnter($event)"
          placeholder="https://speakerdeck.com/kishiyyyyy/gke-case-study"
        />
        <ErrorMessage
          msg="The slides cannot be found..."
          class="mb-2 err_msg"
          v-if="!Object.keys(displaySlides).length"
        />
        <Button
          id="btn_arrange"
          :isDisabled="!searchUrl.trim().length"
          @click="getSlides"
        >
          Arrange
        </Button>
      </section>

      <section class="mx-auto py-4" v-if="Object.keys(displaySlides).length">
        <div v-for="(slide, index) in displaySlides.images" :key="index" id="sec_slides" class="wrap-slide text-center mx-2">
          <img :src="slide.url" :alt="slide.alt" :id="'slide_' + index" class="slide" tabindex=0>
        </div>
      </section>

    </div>

    <transition
      name="fade"
      v-if="Object.keys(displaySlides).length"
    >
      <CircleButton
        id="btn_menu"
        v-if="!openMenu"
        @click="toggleMenu"
      >
        <fa :icon="faBars" />
      </CircleButton>

      <div
        id="menu_buttons"
        v-if="openMenu"
      >
        <transition name="fade">
          <CircleButton
            id="btn_scroll_top"
            bottom="13rem"
            v-if="coordY > 200"
            @click="smoothScroll(0); toggleMenu();"
          >
            <fa :icon="faArrowUp" />
          </CircleButton>
        </transition>

        <CircleButton
          id="btn_source"
          :isSpeakerDeck="displaySlides.sourceId === 1"
          :isSlideShare="displaySlides.sourceId === 2"
          bottom="9rem"
          @click="goToSource(); toggleMenu();"
        >
          <fa :icon="faSpeakerDeck" id="icon_sd" v-if="displaySlides.sourceId === 1" />
          <fa :icon="faSlideshare" id="icon_ss" v-if="displaySlides.sourceId === 2" />
        </CircleButton>

        <CircleButton
          id="btn_twitter_share"
          :isTwitter="true"
          bottom="5rem"
          @click="shareToTwitter(); toggleMenu();"
        >
          <fa :icon="faTwitter" />
        </CircleButton>

        <CircleButton
          id="btn_close_menu"
          @click="toggleMenu"
        >
          <fa :icon="faTimes" />
        </CircleButton>
      </div>
    </transition>
  </div>
</template>

<script>
import { faTwitter, faSpeakerDeck, faSlideshare } from "@fortawesome/free-brands-svg-icons"
import { faArrowUp, faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import Loading from "@/components/Loading.vue"
import Input from "@/components/Input.vue"
import CircleButton from "@/components/CircleButton.vue"

export default {
  components: {
    Loading,
    Input,
    CircleButton
  },

  data() {
    return {
      isLoading: false,
      coordY: 0,
      openMenu: false,
    }
  },

  async asyncData({ query, $axios, redirect, store, env }) {
    var displaySlides = {}
    // displaySlidesの構造
    // {
    //   source_id: Integer (1: SpeakerDeck, 2: SlideShare),
    //   url: String,
    //   title: String,
    //   images: [{
    //     url: String,
    //     alt: String
    //   }]
    // }

    // Query parameterにurlがセットされていない場合、トップページにリダイレクトする
    if (!query.url) redirect("/")

    // Query parameterからsearchUrlをセット
    store.state.search.url = query.url.trim()

    // SpeakerDeck or SlideShareのURLの場合、スライドをスクレイピングする
    if (store.state.search.url.match(new RegExp(env.urlRegExp, 'g'))) {
      displaySlides = await $axios.$get('/api/slides', { params: { url: store.state.search.url } })
    }

    return { displaySlides: displaySlides }
  },

  head() {
    var ogTitle = !!this.displaySlides.title ? `${this.displaySlides.title} - ${process.env.productName}` : process.env.productName
    return {
      meta: [
        { hid: 'og:title', property: 'og:title', content: ogTitle},
        { hid: 'og:description', property: 'og:description', content: this.displaySlides.title }
      ]
    }
  },

  computed: {
    searchUrl: {
      get () { return this.$store.state.search.url },
      set (value) { this.$store.commit("search/set_url", value) }
    },
    faTwitter     ()  { return faTwitter },
    faSpeakerDeck ()  { return faSpeakerDeck },
    faSlideshare  ()  { return faSlideshare },
    faArrowUp     ()  { return faArrowUp },
    faBars        ()  { return faBars },
    faTimes       ()  { return faTimes }
  },
  
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("scroll", this.handleScroll)
      window.addEventListener("keydown", this.handleKeydown)
    })
  },

  destroy() {
    window.removeEventListener("scroll", this.handleScroll)
    window.removeEventListener("keydown", this.handleKeydown)
  },

  beforeRouteLeave(to, from, next) {
    window.removeEventListener("scroll", this.handleScroll)
    window.removeEventListener("keydown", this.handleKeydown)
    next()
  },

  methods: {
    async getSlides() {
      // ローディングアニメーションを開始
      this.isLoading = true

      // searchUrlの前後のスペースを削除し、searchUrlが空白なら処理を中断
      this.searchUrl = this.searchUrl.trim()
      if (!this.searchUrl) { this.isLoading = false; return; }

      // Query parameterを更新
      this.$router.push({ query: { url: this.searchUrl } })
      this.displaySlides = {}

      // SpeakerDeck、SlideShareのURLの場合、スライドをスクレイピング
      if ( this.searchUrl.match(new RegExp(process.env.urlRegExp, 'g')) ) {
        this.displaySlides = await this.$axios.$get("/api/slides", { params: { url: this.searchUrl } })
      }

      // ローディングアニメーションを終了する
      this.isLoading = false
    },

    inputEnter(event) {
      if (event.keyCode !== 13) return // 日本語変換の確定時は発火しない
      this.getSlides()
    },

    shareToTwitter() {
      window.open(
        "https://twitter.com/intent/tweet?text=" 
        + encodeURIComponent(`\"${this.displaySlides.title}\"\n#slideclip`)
        + "&url="
        + encodeURIComponent(window.location.origin + this.$route.fullPath),
        "_blank"
      )
    },

    goToSource() {
      window.open(
        this.displaySlides.url,
        "_blank"
      )
    },

    handleScroll() {
      this.coordY = window.scrollY
    },

    smoothScroll(top) {
      window.scrollTo({ top: top, behavior: "smooth" })
    },

    handleKeydown(e) {
      // 「→」「←」がタイプされたときにスライドをスクロールする

      if (e.target.tagName === "INPUT") return // いずれかの要素がfocusされている場合は動かない
      if (!Object.keys(this.displaySlides).length) return // スライドが取得できていない場合は動かない

      switch (e.key) {
        case "ArrowLeft":
          // 「→」がタイプされた場合
          this.scrollToPrev()
          break
        case "ArrowRight":
          // 「←」がタイプされた場合
          this.scrollToNext()
          break
      }
    },

    scrollToPrev() {
      // 後ろのスライドから順に中心座標を取得し、今の画面の中心座標より上部に表示されているスライドが現れたらそのスライドにスクロールする
      const displayCoordY = this.displayCoordY()  // 表示画面の中心座標
      var slide
      for (let i = this.displaySlides.images.length; i > 0; i--) {
        slide = document.getElementById('slide_' + (i - 1))
        if (displayCoordY - this.slideCoordY(slide) > 1) break
      }
      setTimeout(() => { this.smoothScroll(this.coordYForCenteringSlide(slide)) }, 0)
    },

    scrollToNext() {
      // 前のスライドから順に中心座標を取得し、今の画面の中心座標より下部に表示されているスライドが現れたらそのスライドにスクロールする
      const displayCoordY = this.displayCoordY() // 表示画面の中心座標
      var slide
      for (let i = 0; i < this.displaySlides.images.length; i++) {
        slide = document.getElementById('slide_' + i)
        if (this.slideCoordY(slide) - displayCoordY > 1) break
      }
      setTimeout(() => { this.smoothScroll(this.coordYForCenteringSlide(slide)) }, 0)
    },

    displayCoordY() {
      // 表示画面の中心座標を計算する
      return window.innerHeight / 2
    },

    slideCoordY(el_slide) {
      // slideの表示画面から見た相対の中心座標を計算する
      return el_slide.getBoundingClientRect().y + (el_slide.height / 2)
    },

    coordYForCenteringSlide(el_slide) {
      // slideを画面中央に表示するためのスクロール位置（top）を計算する
      return el_slide.getBoundingClientRect().y + window.pageYOffset - (window.innerHeight / 2) + (el_slide.height / 2)
    },

    toggleMenu() {
      this.openMenu = !this.openMenu
    }

  }
}
</script>

<style lang="scss" scoped>
.wrap-slide {
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