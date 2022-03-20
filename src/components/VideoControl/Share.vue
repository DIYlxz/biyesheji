<template>
  <div class="share">
    <div class="shareBox">
      <span class="iconfont icon-fenxiang sb_icon"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Share",
};
</script>

<style lang="scss" scoped>
.share {
  position: relative;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  margin-top: 1rem;
  .shareBox {
    .sb_icon {
      font-size: 1.5rem;
      &:hover {
        color: rgb(255, 82, 82);
      }
    }
  }
}
</style>