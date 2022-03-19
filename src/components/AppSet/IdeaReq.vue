<template>
  <div class="ideaReq" :class="{ ideaReqBack: this.backColor == `black` }">
    <div class="iconfont icon-yijianfankui csIconStyle"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "IdeaReq",
  computed: {
    ...mapState("appSet", ["backColor"]),
  },
};
</script>

<style lang="scss" scoped>
.ideaReq {
  position: absolute;
  width: 2rem;
  height: 2rem;
  background-color: rgb(209, 209, 209);
  border-radius: 50%;
  bottom: 1.5rem;
  right: 1rem;
  text-align: center;
  .csIconStyle {
    line-height: 1.8rem;
    cursor: pointer;
  }
  .csIconStyle:hover {
    color: rgb(232, 232, 255);
  }
}

.ideaReqBack {
  background-color: #2e2f3b;
  .csIconStyle:hover {
    color: rgb(232, 232, 255);
  }
}
</style>