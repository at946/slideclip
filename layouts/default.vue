<template>
  <div class="body">
    <header class="header">
      <span class="title">SlideClip</span>
    </header>

    <main>
      <nuxt />
    </main>

    <footer class="footer p-4">
      <p class="copyright">(c) seiei</p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

.header {
  padding: 1rem;
  border-bottom: solid 1px lightgray;

  .title {
    font-weight: bold;
  }
}

.footer {
  background-color: gray;

  .copyright {
    color: lightgray;
    text-align: center;
  }
}
</style>