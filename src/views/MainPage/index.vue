<template>
  <div class="mainPage" :class="{ mainPageBack: this.backColor == 'black' }">
    <div class="mpTop">
      <div class="iconfont icon-shipin mainPageIcon" @click="gotoHome"></div>
      <div class="mpTopRight">
        <home-top></home-top>
      </div>
    </div>
    <div class="mpBottom">
      <div class="mpBottomLeft">
        <mpb-left></mpb-left>
      </div>
      <div class="mpBottomRight"></div>
    </div>
  </div>
</template>

<script>
import HomeTop from "../../components/HomeFuntion/HomeTop.vue";
import MpbLeft from "./MpbLeft.vue"
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
    HomeTop,
    MpbLeft,
  },
};
</script>

<style lang="scss" scoped>
.mainPage {
  width: 100vw;
  height: 100%;
  .mpTop {
    width: 100%;
    height: 3.5rem;
    border-bottom: 0.01rem solid #f5f5f7;
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
  .mpBottom {
    width: 100%;
    display: flex;
    .mpBottomLeft {
      width: 40%;
      height: 100vh;
      background-color: #fafafa;
      // height: calc(100% - 56px);
    }
    .mpBottomRight {
      width: 60%;
      height: 100vh;
    }
  }
}

.mainPageBack {
  background-color: #20212c;
  color: #898790;
  .mpBottom {
    .mpBottomLeft {
      background-color: #161722;
        box-shadow: inset 0rem -1rem 2rem #000;
    }
  }
}
</style>