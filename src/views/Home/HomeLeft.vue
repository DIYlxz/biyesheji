<template>
  <div id="homeLeft">
    <div class="iconfont icon-shipinbofang shipin"></div>
    <div class="iconfont icon-shouye hliconSty">
      <div class="hl_text">首页</div>
    </div>
    <div class="iconfont icon-12paizhao-1 hliconSty" @click="gotoRecord">
      <div class="hl_text">拍照</div>
    </div>
    <div class="iconfont icon-zhibo hliconSty" @click="gotoLuxiang">
      <div class="hl_text">录像</div>
    </div>
    <div class="iconfont icon-liuyan hliconSty" @click="gotoChartRoom">
      <div class="hl_text">聊天</div>
    </div>
    <div class="iconfont icon-shipinjianji hliconSty" @click="gotoEditorVideo">
      <div class="hl_text">编辑</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeLeft",
  methods: {
    gotoChartRoom() {
      this.$router.push("/chartRoom");
    },
    gotoRecord() {
      this.$router.push("/record");
    },
    gotoLuxiang() {
      this.$router.push("/luxiang");
    },
    gotoEditorVideo() {
      window.open("http://localhost:8081/");
    },
  },
};
</script>

<style lang="scss" scoped>
#homeLeft {
  padding-top: 1rem;
  .shipin {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  .hliconSty {
    font-size: 1.2rem;
    font-weight: bold;
    padding-top: 1rem;
  }
}

.hl_text {
  font-weight: normal;
  font-size: 1rem;
  font-family: SimSun;
  padding-top: 0.3rem;
}
</style>