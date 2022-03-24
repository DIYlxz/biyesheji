<template>
  <div class="contentMessage">
    <div class="cm_title">视频管理</div>
    <div class="cm_tab">
      <div class="cm_tab_item" @click="changeBorder($event, 0)">全部作品</div>
      <div class="cm_tab_item" @click="changeBorder($event, 1)">已发布</div>
      <div class="cm_tab_item" @click="changeBorder($event, 2)">审核中</div>
      <div class="cm_tab_item" @click="changeBorder($event, 3)">未通过</div>
      <div class="cm_border cm_border_hover"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentMessage",
  methods: {
    //改变border位置
    changeBorder(e, n) {
      let bor = document.querySelector(".cm_border_hover");
      bor.style.width = "3rem";
      if(n == 0) {
        bor.style.width = "4rem";
        bor.style.transform = `translateX(0px)`
      }else if(n == 1) {
        bor.style.transform = `translateX(${96}px)`
      }else if(n == 2) {
        bor.style.transform = `translateX(${96 + 80}px)`
      }else if(n == 3) {
        bor.style.transform = `translateX(${96 * 2 + 64}px)`
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.contentMessage {
  user-select: none;
  position: relative;
  .cm_title {
    font-weight: bold;
    font-size: 1.5rem;
    text-align: left;
  }
  .cm_tab {
    display: flex;
    position: relative;
    margin: {
      top: 1rem;
    };
    padding: {
      bottom: 1rem;
    }
    border: {
      bottom: 0.01rem solid #b2b2b2;
    }
    .cm_tab_item {
      margin-right: 2rem;
      font-weight: bold;
      cursor: pointer;
    }
    .cm_border {
      position: absolute;
      width: 4rem;
      height: 0.1rem;
      background-color: red;
      bottom: 0;
      transition: all 0.5s ease-in-out;
    }
  }
}
</style>

<style lang="scss">
.cm_border_hover {
  width: 4rem;
  transform: translateX(0);
}
</style>