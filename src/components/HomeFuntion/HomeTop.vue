<template>
  <div id="homeTop">
    <div class="ht-left">
      <my-input></my-input>
    </div>
    <div class="ht-right">
      <div class="htr-general">关于软件</div>
      <div class="htr-general">创作者服务</div>
      <div class="htr-general">
        <div v-if="ac" class="userData"  @mouseenter="setupUser"  @mouseleave="unSetupUser">
          <img
            src="https://p6-passport.byteacctimg.com/img/user-avatar/75402678e113515a279ab9be0a8d993c~200x200.image"
            alt="无"
            class="imgSty"
          />
          <div
            v-show="userSetup"
          >
            <div class="userSetup">
            </div>
          </div>
        </div>
        <div v-else @click="loginOrRegister">登陆/注册</div>
      </div>
      <div class="htr-general">发布视频</div>
    </div>
  </div>
</template>

<script>
import MyInput from "../GeneralComponents/SearchInput.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "HomeTop",
  data() {
    return {
      hp: require("../../assets/images/LoginImg/01.jpg"),
      ac: false,
      userSetup: false,
    };
  },
  components: {
    MyInput,
  },
  computed: {
    ...mapState("login", ["user"]),
  },
  watch: {
    user: {
      deep: true,
      handler(nVal) {
        this.ac = nVal;
      },
    },
  },
  methods: {
    ...mapMutations("login", ["setLoginState"]),
    loginOrRegister() {
      this.setLoginState();
    },
    //展开用户设置栏目
    setupUser() {
      this.userSetup = true;
    },
    //延迟关闭
    unSetupUser() {
      this.userSetup = false;
    },
  },
};
</script>

<style lang="scss" scoped>
#homeTop {
  display: flex;
  padding: 0 2rem;
  justify-content: space-between;
  .ht-left {
    padding: 0.8rem 0;
  }
  .ht-right {
    display: flex;
    .htr-general {
      width: 8rem;
      height: 2rem;
      line-height: 2rem;
      font-weight: bold;
      padding: 0.8rem 0;
      cursor: pointer;
      position: relative;
      user-select: none;
      .imgSty {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }
      .userData {
        position: relative;
        .userSetup {
          position: absolute;
          overflow: hidden;
          width: 20rem;
          height: 10rem;
          border-top: 0.2rem solid #fff;
          top: 2.7rem;
          left: -5rem;
          background: rgb(235, 235, 235);
          z-index: 2;
        }
      }
    }
    .htr-general:hover {
      color: rgb(53, 170, 224);
    }
  }
}
</style>