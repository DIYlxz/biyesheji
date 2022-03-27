<template>
  <div class="uploadVideoTop">
    <div class="uvtBox">
      <div class="uvtb_first" @click="backHome">
        <span class="iconfont icon-shipin1 uvtb_f_icon"></span>
        <span class="uvtb_dy_title">灯音创作中心</span>
      </div>
      <div class="uvtb_second">
        <span class="iconfont icon-xiaoxi1 uvtb_s_icon"></span>
        <span class="uvtb_s_border"></span>
        <span class="uvtb_s_imgBox">
          <img src="../../assets/images/LoginImg/01.jpg" class="uvtb_s_img" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "uploadVideoTop",
  methods: {
    backHome() {
      this.$router.push("/home");
    },
  },
};
</script>

<style lang="scss" scoped>
.uploadVideoTop {
  width: 100%;
  height: 5rem;
  background-color: #fff;
  .uvtBox {
    display: flex;
    justify-content: space-around;
    height: 100%;
    align-items: center;
    .uvtb_first {
      cursor: pointer;
      .uvtb_f_icon {
        font-size: 2rem;
      }
      .uvtb_dy_title {
        font-family: SimSun;
        margin-left: 0.5rem;
        font-weight: bold;
      }
    }
    .uvtb_second {
      .uvtb_s_icon {
        font-size: 1.5rem;
        color: #b2b2b2;
      }
      .uvtb_s_border {
        width: 0.05rem;
        height: 1rem;
        display: inline-block;
        background-color: #b2b2b2;
        margin: 0 1rem;
      }
      .uvtb_s_imgBox {
        .uvtb_s_img {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }
  }
}
</style>