<template>
  <div class="mpbRight">
    <div class="mpbrBox">
      <div class="mpbrTitle">
        <div>作品<span>{{user.worksNum}}</span></div>
      </div>
      <div class="mpbrTitle">
        <div>喜欢<span class="iconfont icon-24gf-lock mpbrtIcon"></span></div>
      </div>
      <div class="mpbrTitle">
        <div>收藏<span class="iconfont icon-24gf-lock mpbrtIcon"></span></div>
      </div>
    </div>
    <div class="mpbrContent">
      <!-- <router-view></router-view> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MpbRight",
  computed: {
    ...mapState("login", ["user"]),
  }
};
</script>

<style lang="scss" scoped>
.mpbRight {
  height: 100%;
  margin: 2rem 0 0 2rem;
  display: flex;
  flex-direction: column;
  .mpbrBox {
    display: flex;
    .mpbrTitle {
      font-weight: bold;
      font-size: 1rem;
      margin: 0 1rem;
      cursor: pointer;
      .mpbrtIcon {
        margin-left: 0.3rem;
      }
    }
  }
  .mpbrContent {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .mpbrc_icon {
      font-size: 5rem;
      margin-bottom: 10rem;
    }
  }
}
</style>