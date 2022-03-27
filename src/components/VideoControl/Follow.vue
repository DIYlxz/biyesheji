<template>
  <div class="follow">
    <div class="followBox">
      <img src="https://p6-passport.byteacctimg.com/img/user-avatar/75402678e113515a279ab9be0a8d993c~200x200.image" class="follow_img" />
      <div class="followBtn">
        <span class="iconfont icon-jia fb_icon"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Follow",
};
</script>

<style lang="scss" scoped>
.follow {
  position: relative;
  pointer-events: auto;
  .followBox {
    .follow_img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
    .followBtn {
      .fb_icon {
        position: absolute;
        color: #fe2c55;
        bottom: 0;
        left: 1rem;
        z-index: 3;
        cursor: pointer;
      }
      .fb_icon:hover {
        transform: scale(1.2);
      }
    }
  }
}
</style>