<template>
  <div class="ideaReq" :class="{ ideaReqBack: this.backColor == `black` }">
    <div class="iconfont icon-yijianfankui csIconStyle" @click="drawer = true"></div>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <div class="iq_help">
        <div class="iqh_title">帮助中心</div>
        <div class="iqh_text">
          <div class="iqh_small_text">视频切换操作：鼠标滚轮下滑</div>
          <div class="iqh_small_text">右边导航：点击进入各项功能</div>
          <div class="iqh_small_text">开发者邮箱：1327990317@qq.com</div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "IdeaReq",
  data() {
    return {
      drawer: false,
    }
  },
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
  .iq_help {
    padding: 1rem 0.5rem;
    .iqh_title {
      font-weight: bold;
      text-align: left;
    }
    .iqh_text {
      text-align: left;
      .iqh_small_text {
        margin-top: 1rem;
      }
    }
  }
}

.ideaReqBack {
  background-color: #2e2f3b;
  .csIconStyle:hover {
    color: rgb(232, 232, 255);
  }
}
</style>