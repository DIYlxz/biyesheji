<template>
  <div class="comment">
    <div class="commentBox">
      <span class="iconfont icon-pinglun cb_icon"></span>
    </div>
    <div class="commentNum">{{ this.curVideoInfo }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Comment",
  props: ["vimsg"],
  computed: {
    ...mapState("video", ["videoInfo"]),
    //当前视频显示信息
    curVideoInfo() {
      let _len = this.videoInfo.length;
      for (let i = 0; i < _len; i++) {
        if (this.vimsg == this.videoInfo[i].videoId) {
          return this.videoInfo[i].commentNum;
        }
      }
      return 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  position: relative;
  pointer-events: auto;
  cursor: pointer;
  margin-top: 1rem;
  color: #fff;
  .commentBox {
    .cb_icon {
      font-size: 1.5rem;
      &:hover {
        color: rgb(255, 82, 82);
      }
    }
    .commentNum {
      font-size: 0.8rem;
    }
  }
}
</style>