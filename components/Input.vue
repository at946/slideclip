<template>
  <div class="input-wrap">
    <input
      :id="id"
      type="text"
      :value="value"
      :placeholder="placeholder"
      :readonly="is_readonly"
      @input="update_value"
    />
  </div>
</template>

<script>
export default {
  props: {
    id:           { type: String },
    value:        { type: String },
    placeholder:  { type: String },
    is_readonly:  { type: Boolean }
  },

  methods: {
    update_value(e) {
      this.$emit("input", e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_spacing.scss";

.input-wrap {
  @extend .mx-auto;
  max-width: 600px;

  input {
    @extend .p-1;
    width: 100%;
    background-color: white;
    border: solid 2px gray;
    box-sizing: border-box;
    border-radius: 5px;
  }
}
</style>