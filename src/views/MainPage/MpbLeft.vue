<template>
  <div class="mpbLeft" :class="{ mpbLeftBack: this.backColor == 'black' }">
    <div class="mpbl_tleft"></div>
    <div class="mpbl_tt">
      <div class="mpbl_top">
        <div class="mpbl_top_img">
          <img src="../../assets/images/LoginImg/01.jpg" class="mpbltiSty" />
        </div>
        <div class="mpbl_top_part">
          <p>关注</p>
          <p class="mpbltp_num">0</p>
        </div>
        <div class="mpbl_top_part_border"></div>
        <div class="mpbl_top_part">
          <p>粉丝</p>
          <p class="mpbltp_num">0</p>
        </div>
        <div class="mpbl_top_part_border"></div>
        <div class="mpbl_top_part">
          <p>获赞</p>
          <p class="mpbltp_num">0</p>
        </div>
      </div>
      <div class="mpbl_info">
        <div class="mpbl_info_title">{{ user.infoName || null }}</div>
        <div class="mpbl_info_title">灯音号:{{ user.dyNumber || null }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MpbLeft",
  computed: {
    ...mapState("appSet", ["backColor"]),
    ...mapState("login", ["user"]),
  },
};
</script>

<style lang="scss" scoped>
.mpbLeft {
  color: #ababad;
  padding: 3rem 0;
  display: flex;
  .mpbl_tleft {
    margin-left: 2rem;
    flex: 2 1 auto;
  }
  .mpbl_tt {
    flex: 1 1 auto;
    .mpbl_top {
      display: flex;
      .mpbl_top_img {
        .mpbltiSty {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
        }
      }
      .mpbl_top_part {
        width: 7rem;
        .mpbltp_num {
          color: #000;
          padding: 0.2rem;
        }
      }
      .mpbl_top_part_border {
        width: 0.05rem;
        height: 1rem;
        background-color: #ebebeb;
        margin-top: 0.5rem;
      }
    }
    .mpbl_info {
      margin-top: 1rem;
      text-align: left;
      .mpbl_info_title {
        margin-top: 0.5rem;
      }
      .mpbl_info_title:nth-child(2) {
        font-size: 0.8rem;
      }
    }
  }
}

.mpbLeftBack {
  color: #8f9095;
  .mpbl_tt {
    .mpbl_top {
      .mpbl_top_part {
        .mpbltp_num {
          color: #fff;
        }
      }
    }
  }
}
</style>