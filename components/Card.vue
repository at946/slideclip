<template>
  <div class="card">
    <div class="card-content-wrap">
      <div class="card-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/_spacing.scss";

.card {
  background-color: whitesmoke;
  @extend .mx-auto;
  position: relative;
  max-width: 600px;
  min-height: 240px;
  
  &::before {
    content: "";
    display: block;
    padding-top: 56.25%;
  }

  .card-content-wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right:  0;
    display: flex;
    justify-content: center;
    align-items: center;

    .card-content {
      width: 100%;
      text-align: center;
      @extend .p-2;
    }
  }
}
</style>