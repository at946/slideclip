<template>
  <header class="header">
    <nuxt-link id="logo" to="/">SlideClip</nuxt-link>
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/css/_spacing.scss";

.header {
  @extend .p-2;
  border-bottom: solid 1px lightgray;
}

#logo {
  font-weight: bold;
}
</style>