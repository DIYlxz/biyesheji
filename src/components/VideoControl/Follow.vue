<template>
  <div class="follow">
    <div class="followBox">
      <img :src="curVideoInfo" class="follow_img" />
      <div class="followBtn">
        <span class="iconfont icon-jia fb_icon"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Follow",
  props: ["vimsg"],
  computed: {
    ...mapState("video", ["videoInfo"]),
    //当前视频显示信息
    curVideoInfo() {
      let _len = this.videoInfo.length;
      for (let i = 0; i < _len; i++) {
        if (this.vimsg == this.videoInfo[i].videoId) {
          return this.videoInfo[i].headPortrait;
        }
      }
      return 0;
    },
  },
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