<template>
  <div class="body">
    <Header />
    <main>
      <nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"

export default {
  components: {
    Header,
    Footer
  }  
}
</script>

<style lang="scss">
.body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  background-color: whitesmoke;
}
</style>