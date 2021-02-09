<template>
  <button
    :id="id"
    :class="{
      'btn-twitter': isTwitter,
      'btn-speaker-deck': isSpeakerDeck,
      'btn-slide-share': isSlideShare,
      'btn-demo' : isDemo
    }"
    v-bind:disabled="isDisabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    id:             { type: String },
    isDisabled:     { type: Boolean },
    isTwitter:      { type: Boolean },
    isSpeakerDeck:  { type: Boolean },
    isSlideShare:   { type: Boolean },
    isDemo:         { type: Boolean }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_spacing.scss";
@import "@/assets/css/_color.scss";

button {
  color: white;
  background-color: $primary;
  border-radius: 25px;
  letter-spacing: 2px;
  line-height: 1.5rem;
  padding: 10px 30px;

  &:hover, &:focus {
    opacity: 0.75;
  }

  &:disabled {
    background-color: darkgray;
    opacity: 1.0;
    cursor: not-allowed;
  }
}

.btn-demo {
  cursor: default;
  &:hover, &:focus {
    opacity: 1.0;
  }
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