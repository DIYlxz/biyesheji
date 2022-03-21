<template>
  <div class="uploadVideoTop">
    <div class="uvtBox">
      <div class="uvtb_first">
        <span class="iconfont icon-shipin1 uvtb_f_icon"></span>
        <span class="uvtb_dy_title">灯音创作中心</span>
      </div>
      <div class=""></div>
    </div>
  </div>
</template>

<script>
export default {
    name: "uploadVideoTop"
}
</script>

<style lang="scss" scoped>
.uploadVideoTop {
  width: 100%;
  height: 5rem;
  background-color: #fff;
  .uvtBox {
    .uvtb_first {
      .uvtb_f_icon {
        font-size: 1.5rem;
      }
      .uvtb_dy_title {
        font-family: SimSun;
        margin-left: 0.5rem;
        font-weight: bold;
      }
    }
  }
}
</style>