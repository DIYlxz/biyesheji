<template>
  <div class="home" :class="{ homeBack: this.backColor == `black` }">
    <div class="home_left_func">
      <home-left></home-left>
    </div>
    <div class="home_right">
      <div class="home_top_func">
        <home-top></home-top>
      </div>
      <div class="hr_show">
        <home-video></home-video>
      </div>
    </div>
  </div>
</template>

<script>
import HomeLeft from "./HomeLeft";
import HomeTop from "./HomeTop";
import HomeVideo from "./HomeVideo";
import { mapState,mapMutations } from "vuex";
import { sendGet, sendPost } from '../../api/reqWay';

export default {
  name: "Home",
  computed: {
    ...mapState({
      backColor: (state) => state.appSet.backColor,
      user: (state) => state.login.user,
    }),
  },
  created() {
    this.removeVideoInfo();
    this.getVideoData();
    this.getLoveNum();
  },
  methods: {
    ...mapMutations("video",["setVideoInfo", "removeVideoInfo"]),
    ...mapMutations("login",["setUserGoodNum"]),
    //请求获取视频资源
    getVideoData() {
      sendGet("/videoData").then(data=>{
        this.setVideoInfo(data.info);
      })
    },
    //获取喜爱数量
    getLoveNum() {
      sendPost("/getGoodNum", {
        dyNumber: this.user.dyNumber,
      }).then(data=>{
        this.setUserGoodNum(data.loveNum);
      })
    },
  },
  components: {
    HomeLeft,
    HomeTop,
    HomeVideo,
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  height: 100%;
  position: relative;
  .home_left_func {
    background: #e7e7e7;
    width: 5%;
    height: 100vh;
  }
  .home_right {
    width: 95%;
    .home_top_func {
      width: 100%;
      border-bottom: 0.01rem solid #e6e6e6;
      box-sizing: border-box;
    }
    .hr_show {
      width: 100%;
    }
  }
}

.homeBack {
  color: #898790;
  .home_left_func {
    background-color: #060716;
  }
  .home_right {
    background-color: #161722;
    .home_top_func {
      box-sizing: border-box;
      border-bottom: 0.01rem solid #23242e;
    }
  }
}
</style>