<template>
  <div class="mainPage" :class="{mainPageBack: this.backColor == 'black' }">
    <div class="mpTop">
      <div class="iconfont icon-shipin mainPageIcon" @click="gotoHome"></div>
      <div class="mpTopRight">
        <home-top></home-top>
      </div>
    </div>
  </div>
</template>

<script>
import HomeTop from "../../components/HomeFuntion/HomeTop.vue"
import { mapState } from "vuex";

export default {
    name: "MainPage",
    computed: {
      ...mapState("appSet", ["backColor"]),
    },
    methods: {
      gotoHome() {
        this.$router.push("/");
      },
    },
    components: {
      HomeTop
    },
}
</script>

<style lang="scss" scoped>
.mainPage {
  .mpTop {
    width: 100%;
    border-bottom: 0.01rem solid #23242e;
    display: flex;
    justify-content: space-between;
    .mainPageIcon {
      width: 4rem;
      font-size: 2rem;
      padding-top: 0.8rem;
      cursor: pointer;
    }
    .mpTopRight {
      width: calc(100% - 64px);
    }
  }
}

.mainPageBack {
  background-color: #20212c;
  color: #898790
}
</style>