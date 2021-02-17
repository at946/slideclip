<template>
  <div class="input-wrap">
    <input
      :id="id"
      type="text"
      :value="value"
      :placeholder="placeholder"
      :autofocus="isAutoFocus"
      :readonly="isReadonly"
      @input="updateValue"
      @keydown.enter="$emit('keydown', $event)"
    />
    <fa
      :icon="faTimes"
      v-if="hasClear"
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
    isAutoFocus:  { type: Boolean },
    isReadonly:   { type: Boolean },
    hasClear:     { type: Boolean }
  },

  computed: {
    faTimes () { return faTimes }
  },

  methods: {
    updateValue(e) {
      this.$emit("input", e.target.value)
    },

    clear() {
      this.$emit("input", "")
      document.getElementById(this.id).focus()
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
    margin-right: -1rem;
    margin-left: -1rem;
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