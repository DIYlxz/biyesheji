<template>
  <div class="aggregateMessage">
    <div class="am_title">我的合集</div>
    <div class="am_tab">
      <div class="am_tab_item" @click="changeBorder($event, 0)">全部合集</div>
      <div class="am_tab_item" @click="changeBorder($event, 1)">待发布</div>
      <div class="am_tab_item" @click="changeBorder($event, 2)">已发布</div>
      <div class="am_tab_item" @click="changeBorder($event, 3)">审核中</div>
      <div class="am_tab_item" @click="changeBorder($event, 4)">未通过</div>
      <div class="am_border am_border_hover"></div>
    </div>
    <div class="am_tab_box">
      <div v-show="true" class="am_create_box">
        <div class="am_create">
          <div class="iconfont icon-tianjia am_create_icon"></div>
          <div class="am_create_lt">自定义创建合集</div>
          <div class="am_create_st">你没有合集，点击创建合集</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AggregateMessage",
  methods: {
    //改变border位置
    changeBorder(e, n) {
      let bor = document.querySelector(".am_border_hover");
      bor.style.width = "3rem";
      if (n == 0) {
        bor.style.width = "4rem";
        bor.style.transform = `translateX(0px)`;
      } else if (n == 1) {
        bor.style.transform = `translateX(${96}px)`;
      } else if (n == 2) {
        bor.style.transform = `translateX(${96 + 80}px)`;
      } else if (n == 3) {
        bor.style.transform = `translateX(${96 * 2 + 64}px)`;
      } else if (n == 4) {
        bor.style.transform = `translateX(${96 * 3 + 48}px)`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.aggregateMessage {
  user-select: none;
  position: relative;
  .am_title {
    font-weight: bold;
    font-size: 1.5rem;
    text-align: left;
  }
  .am_tab {
    display: flex;
    position: relative;
    margin: {
      top: 1rem;
    }
    padding: {
      bottom: 1rem;
    }
    border: {
      bottom: 0.01rem solid #b2b2b2;
    }
    .am_tab_item {
      margin-right: 2rem;
      font-weight: bold;
      cursor: pointer;
    }
    .am_border {
      position: absolute;
      width: 4rem;
      height: 0.1rem;
      background-color: red;
      bottom: 0;
      transition: all 0.5s ease-in-out;
    }
  }
  .am_tab_box {
    margin-top: 1rem;
    .am_create_box {
      height: 20rem;
      background: #f4f5f5;
      border-radius: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .am_create {
        .am_create_icon {
          background-color: #9b9ea0;
          width: 1.5rem;
          font-size: 1.25rem;
          color: #fff;
          border-radius: 50%;
          margin: 0 auto;
        }
        .am_create_lt {
          margin: {
            top: 0.5rem;
            bottom: 0.75rem;
          }
        }
        .am_create_st {
          font-size: 0.8rem;
          color: #aaacad;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.am_border_hover {
  width: 4rem;
  transform: translateX(0);
}
</style>