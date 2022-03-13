<template>
  <div id="IdeaReq">
      <div class="iconfont icon-yijianfankui csIconStyle"></div>
  </div>
</template>

<script>
export default {
    name: "IdeaReq"
}
</script>

<style lang="scss" scoped>
#IdeaReq {
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
</style>