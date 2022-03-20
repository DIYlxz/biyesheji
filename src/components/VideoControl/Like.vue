<template>
  <div class="like">
    <div class="likeBox">
      <span class="iconfont icon-xihuan lb_icon"></span>
    </div>
    <div class="likeNum">1.1w</div>
  </div>
</template>

<script>
export default {
  name: "Like",
};
</script>

<style lang="scss" scoped>
.like {
  position: relative;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  margin-top: 1rem;
  .likeBox {
    .lb_icon {
      font-size: 1.5rem;
      &:hover {
        color: rgb(255, 82, 82);
      }
    }
  }
  .likeNum {
    font-size: 0.8rem;
  }
}
</style>