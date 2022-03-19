<template>
  <div class="mbsLeft" :class="{ mbsLeftBack: this.backColor == 'black' }">
    <div class="mbsl_top">
      <div class="mbsl_top_img">
        <img src="../../assets/images/LoginImg/01.jpg" class="mbsltiSty" />
      </div>
      <div class="mbsl_top_part">
        <p>关注</p>
        <p class="mbsltp_num">0</p>
      </div>
      <div class="mbsl_top_part_border"></div>
      <div class="mbsl_top_part">
        <p>粉丝</p>
        <p class="mbsltp_num">0</p>
      </div>
      <div class="mbsl_top_part_border"></div>
      <div class="mbsl_top_part">
        <p>获赞</p>
        <p class="mbsltp_num">0</p>
      </div>
    </div>
    <div class="mbsl_info">
        <div class="mbsl_info_title">{{user.infoName}}</div>
        <div class="mbsl_info_title">灯音:{{user.dyNumber}}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MbsLeft",
  computed: {
    ...mapState("appSet", ["backColor"]),
    ...mapState("login", ["user"]),
  },
};
</script>

<style lang="scss" scoped>
.mbsLeft {
  color: #ababad;
  padding: 3rem 0;
  .mbsl_top {
    display: flex;
    .mbsl_top_img {
      .mbsltiSty {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }
    }
    .mbsl_top_part {
      width: 7rem;
      .mbsltp_num {
        color: #000;
        padding: 0.2rem;
      }
    }
    .mbsl_top_part_border {
      width: 0.05rem;
      height: 1rem;
      background-color: #ebebeb;
      margin-top: 0.5rem;
    }
  }
  .mbsl_info {
      margin-top: 1rem;
      text-align: left;
  }
}

.mbsLeftBack {
  color: #8f9095;
  .mbsl_top {
    .mbsl_top_part {
      .mbsltp_num {
        color: #fff;
      }
    }
  }
}
</style>