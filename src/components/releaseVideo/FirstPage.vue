<template>
  <div class="firstPage">
    <div class="fp_fp">
      <div class="fp_hi">
        <img src="../../assets/images/LoginImg/01.jpg" class="fp_hi_img" />
      </div>
      <div class="fp_hi_data">
        <div class="fp_hi_name">{{ user.userName }}</div>
        <div class="fp_hi_info">
          <div class="fp_hi_info_part">
            <span>0</span>
            <span class="fp_hi_info_part_text">获赞</span>
          </div>
          <div class="fp_hi_info_part">
            <span>0</span>
            <span class="fp_hi_info_part_text">关注</span>
          </div>
          <div class="fp_hi_info_part">
            <span>0</span>
            <span class="fp_hi_info_part_text">粉丝</span>
          </div>
          <span class="fp_hi_info_border"></span>
          <div class="fp_hi_info_part">
            <span class="fp_hi_info_part_text">灯音号：</span>
            <span>{{ user.dyNumber }}</span>
          </div>
          <span class="fp_hi_info_border"></span>
          <div class="fp_hi_info_part">
            <span class="fp_hi_info_part_text">发起授权</span>
          </div>
        </div>
        <div class="fp_hi_synopsis">你还没有填写个人简介</div>
      </div>
    </div>
    <div class="fp_advert">
      <img
        src="../../assets/images/advertImg/firstPage.png"
        class="fp_advert_img"
      />
    </div>
    <div class="fp_profit">
      <div class="fp_profit_title">钱包</div>
      <div class="fp_pt_part">
        <div>0元</div>
        <div class="fP_pt_yue">余额</div>
      </div>
      <div class="fp_pt_border"></div>
      <div class="fp_pt_part">
        <div>0元</div>
        <div class="fP_pt_yue">视频收益</div>
      </div>
    </div>
    <div class="fp_ranking">
      <div class="fp_ranking_title">灯音排行榜</div>
      <div></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "firstPage",
  data() {
    return {
      dateValue: "",
    };
  },
  computed: {
    ...mapState("login", ["user"]),
  },
};
</script>

<style lang="scss" scoped>
.firstPage {
  .fp_fp {
    display: flex;
    border-bottom: 0.01rem solid #a8aaa6;
    padding-bottom: 1rem;
    .fp_hi {
      .fp_hi_img {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
      }
    }
    .fp_hi_data {
      margin-left: 1rem;
      text-align: left;
      .fp_hi_name {
        font-size: 1.25rem;
      }
      .fp_hi_info {
        font-size: 0.8rem;
        display: flex;
        margin: 0.5rem 0;
        .fp_hi_info_part {
          margin-right: 1rem;
          .fp_hi_info_part_text {
            color: #a8aaa6;
            margin-left: 0.2rem;
          }
        }
        .fp_hi_info_border {
          width: 0.05rem;
          height: 0.8rem;
          background-color: #a8aaa6;
          margin-right: 1rem;
        }
      }
      .fp_hi_synopsis {
        font-size: 0.8rem;
        color: #a8aaa6;
      }
    }
  }
  .fp_advert {
    margin-top: 1rem;
    .fp_advert_img {
      width: 100%;
      height: 5rem;
    }
  }
  .fp_profit {
    margin-top: 1rem;
    display: flex;
    text-align: center;
    padding-bottom: 1rem;
    border-bottom: 0.01rem solid #a8aaa6;
    .fp_profit_title {
      width: 5rem;
      font-size: 1.25rem;
      font-weight: bold;
      text-align: left;
    }
    .fp_pt_part {
      width: 4rem;
      color: #a8aaa6;
      .fP_pt_yue {
        margin-top: 0.5rem;
        font-size: 0.8rem;
      }
    }
    .fp_pt_border {
      width: 0.1rem;
      height: 2rem;
      background-color: #a8aaa6;
      margin: {
        top: 0.25rem;
        left: 1rem;
        right: 2rem;
      };
    }
  }
  .fp_ranking {
    text-align: left;
    margin-top: 1rem;
    .fp_ranking_title {
      font-size: 1.25rem;
      font-weight: bold;
    }
  }
}
</style>