<template>
  <button
    :id="id"
    :class="{
      'btn-twitter': isTwitter,
      'btn-demo' : isDemo
    }"
    :disabled="isDisabled"
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
</style>