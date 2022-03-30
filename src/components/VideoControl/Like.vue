<template>
  <div class="like">
    <div class="likeBox">
      <span class="iconfont icon-xihuan lb_icon"></span>
    </div>
    <div class="likeNum">{{ this.curVideoInfo }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Like",
  props: ["vimsg"],
  computed: {
    ...mapState("video", ["videoInfo"]),
    //当前视频显示信息
    curVideoInfo() {
      let _len = this.videoInfo.length;
      for (let i = 0; i < _len; i++) {
        if (this.vimsg == this.videoInfo[i].videoId) {
          return this.videoInfo[i].goodNum;
        }
      }
      return 0;
    },
  },
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