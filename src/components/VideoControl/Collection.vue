<template>
  <div class="collection">
    <div class="collectionBox">
      <span class="iconfont icon-shoucangxiao ctb_icon"></span>
    </div>
    <div class="collectionNum">{{this.curVideoInfo}}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Collection",
  props: ["vimsg"],
  computed: {
    ...mapState("video", ["videoInfo"]),
    //当前视频显示信息
    curVideoInfo() {
      let _len = this.videoInfo.length;
      for (let i = 0; i < _len; i++) {
        if (this.vimsg == this.videoInfo[i].videoId) {
          return this.videoInfo[i].collectionNum;
        }
      }
      return 0;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.collection {
  position: relative;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  margin-top: 1rem;
  .collectionBox {
    .ctb_icon {
      font-size: 1.5rem;
      &:hover {
        color: rgb(255, 82, 82);
      }
    }
    .collectionNum {
      font-size: 0.8rem;
    }
  }
}
</style>