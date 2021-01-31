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
  @extend .p-5;
  position: relative;
  
  &::before {
    content: "";
    display: block;
    padding-top: 50%;
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
    }
  }
}
</style>