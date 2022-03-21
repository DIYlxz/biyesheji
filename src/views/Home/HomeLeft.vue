<template>
  <div id="homeLeft">
    <div class="iconfont icon-shipinbofang shipin"></div>
    <div class="iconfont icon-shouye hliconSty">
      <div class="hl_text">首页</div>
    </div>
    <div class="iconfont icon-tuijian hliconSty">
      <div class="hl_text">推荐</div>
    </div>
    <div class="iconfont icon-zhibo hliconSty">
      <div class="hl_text">直播</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeLeft",
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