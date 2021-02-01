<template>
  <footer>
    <ul class="mb-2">
      <li class="footer-menu"><nuxt-link to="tos" id="link_footer_tos">terms of service</nuxt-link></li>
      <li class="footer-menu"><nuxt-link to="pp" id="link_footer_pp">privacy policy</nuxt-link></li>
    </ul>
    <p class="copyright">(c) seiei</p>
  </footer>
</template>

<style lang="scss" scoped>
@import "@/assets/css/_spacing.scss";

footer {
  @extend .p-4;
  background-color: gray;
  color: white;
  text-align: center;
}

.footer-menu {
  @extend .mx-1;
  @extend .mb-1;
  display: inline-block;

  a:hover {
    text-decoration: underline;
  }

  .nuxt-link-active {
    font-weight: bold;
    &:hover {
      text-decoration: none;
      cursor: not-allowed;
    }
  }
}

.copyright {
  color: lightgray;
}
</style>