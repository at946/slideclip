<template>
  <button
    :class="{
      'btn-twitter'     : isTwitter,
      'btn-speaker-deck': isSpeakerDeck,
      'btn-slide-share' : isSlideShare
    }"
    :style="styles"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'circleButton',
  
  props: {
    bottom:         { type: String, require: false, default: "1rem" },
    right:          { type: String, require: false, default: "1rem" },
    isTwitter:      { type: Boolean, require: false, default: false },
    isSpeakerDeck:  { type: Boolean, require: false, default: false },
    isSlideShare:   { type: Boolean, require: false, default: false }
  },

  computed: {
    styles () {
      return {
        '--bottom': this.bottom,
        '--right':  this.right,
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_color.scss";

button {
  position: fixed;
  bottom: var(--bottom);
  right: var(--right);
  height: 3rem;
  width: 3rem;
  border-radius: 3rem;
  z-index: 10;
  background-color: $primary;
  color: white;
  text-align: center;
  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, .5);
}

.btn-twitter {
  background-color: $twitter;
}

.btn-speaker-deck {
  background-color: $speakerDeck;
}

.btn-slide-share {
  background-color: $slideShare;
}

</style>