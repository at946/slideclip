<template>
  <div class="input-wrap">
    <input
      :id="id"
      type="text"
      :value="value"
      :placeholder="placeholder"
      :readonly="is_readonly"
      @input="update_value"
      @keydown.enter="$emit('keydown', $event)"
    />
    <fa
      :icon="faTimes"
      v-if="has_clear"
      class="clear"
      @click="clear"
    />
  </div>
</template>

<script>
import { faTimes } from "@fortawesome/free-solid-svg-icons"

export default {
  props: {
    id:           { type: String },
    value:        { type: String },
    placeholder:  { type: String },
    is_readonly:  { type: Boolean },
    has_clear:    { type: Boolean }
  },

  computed: {
    faTimes () { return faTimes }
  },

  methods: {
    update_value(e) {
      this.$emit("input", e.target.value)
    },

    clear() {
      this.$emit("input", "")
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_spacing.scss";

.input-wrap {
  @extend .mx-auto;
  position: relative;
  max-width: 800px;
  text-align: center;

  input {
    @extend .p-1;
    width: 100%;
    background-color: white;
    border: solid 2px gray;
    box-sizing: border-box;
    border-radius: 5px;

    &::after {
      content: "a"
    }
  }

  .clear {
    position: absolute;
    right: 1rem;
    height: 100%;
    cursor: pointer;
    z-index: 5;
  }
}
</style>