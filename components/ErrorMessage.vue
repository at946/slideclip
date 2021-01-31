<template>
  <p>{{ msg }}</p>
</template>

<script>
export default {
  props: {
    msg: { type: String }
  }
}
</script>

<style lang="scss" scoped>
p {
  color: red;
}
</style>