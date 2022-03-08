<template>
  <div id="homeTop">
    <my-input></my-input>
    <div class="ht-right">
      <div class="htr-general">关于软件</div>
      <div class="htr-general">创作者服务</div>
      <div class="htr-general" @click="loginOrRegister">登陆/注册</div>
      <div class="htr-general">发布视频</div>
    </div>
  </div>
</template>

<script>
import MyInput from "../GeneralComponents/SearchInput.vue";
import { mapMutations } from "vuex"

export default {
  name: "HomeTop",
  components: {
    MyInput,
  },
  methods: {
    ...mapMutations("login", ["setLoginState"]),
    loginOrRegister() {
      this.setLoginState();
    }
  },
};
</script>

<style lang="scss" scoped>
#homeTop {
  display: flex;
  padding: 0.8rem 2rem;
  justify-content: space-between;
  .ht-right {
    display: flex;
    .htr-general {
      width: 8rem;
      height: 2rem;
      line-height: 2rem;
      font-weight: bold;
      cursor: pointer;
      user-select: none;
    }
    .htr-general:hover {
      color: rgb(53, 170, 224);
    }
  }
}
</style>