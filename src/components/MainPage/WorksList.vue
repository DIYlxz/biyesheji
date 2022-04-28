<template>
  <div class="worksList">
    <div
      class="iconfont icon-zanwuzuopin mpbrc_icon"
      v-if="!userWorksNum"
    ></div>
    <div v-else>
      <div v-for="(item, index) of userWorks" :key="index" class="wl_form">
        <div>{{item.videoName}}：</div>
        <div class="wl_clickbtn" @click="gotoVideo($event, item.videoSrc)">点击观看</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "WorksList",
  data() {
    return {
      userWorks: [],
      userWorksNum: 0,
    };
  },
  computed: {
    ...mapState("video", ["videoInfo"]),
    ...mapState("login", ["user"]),
  },
  created() {
    this.getUserWorksNum();
    this.getUserWorks();
  },
  methods: {
    //获取使用者的作品数量
    getUserWorksNum() {
      this.userWorksNum = this.user.worksNum;
    },
    //获取使用者的作品
    getUserWorks() {
      if (this.userWorksNum) {
        let len = this.videoInfo.length;
        for (let i = 0; i < len; i++) {
          if (this.user.dyNumber == this.videoInfo[i].dyNumber) {
            this.userWorks.push({
              videoName: this.videoInfo[i].videoName,
              videoSrc: this.videoInfo[i].videoSrc,
            });
          }
        }
        console.log(this.userWorks);
      }
    },
    //观看视频
    gotoVideo(e, src) {
      window.open(`${src}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.worksList {
  margin-top: 1rem;
  margin-left: 1rem;
  .mpbrc_icon {
    font-size: 5rem;
    margin-bottom: 10rem;
  }
  .wl_form {
    display: flex;
    margin-bottom: 0.5rem; 
    .wl_clickbtn {
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
}
</style>