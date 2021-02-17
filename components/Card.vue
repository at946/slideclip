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
  background-color: white;
  @extend .mx-auto;
  position: relative;
  max-width: 600px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .5);
  
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