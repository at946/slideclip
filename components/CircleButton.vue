<template>
  <button @click="$emit('click')">
    <slot />
  </button>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_color.scss";

button {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  height: 3rem;
  width: 3rem;
  border-radius: 3rem;
  z-index: 10;
  background-color: $primary;
  color: white;
  text-align: center;
  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, .5);
}
</style>