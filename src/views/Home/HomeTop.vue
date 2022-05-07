<template>
  <div class="homeTop" :class="{ homeTopBack: this.backColor == 'black' }">
    <div class="ht-left">
      <my-input></my-input>
    </div>
    <div class="ht-right">
      <div class="htr-general">
        <div
          v-if="ac"
          class="userData"
          @mouseenter="setupUser"
          @mouseleave="unSetupUser"
        >
          <img
            :src="user.headPortrait"
            alt="无"
            class="imgSty"
            crossorigin
          />
          <div v-show="userSetup">
            <div class="userSetup">
              <div class="ustBox">
                <div class="ustbSelect">
                  <div class="iconfont icon-shipin ustbIcon ustbi1"></div>
                  <div class="ustbNum">{{user.worksNum}}</div>
                  <div>我的作品</div>
                </div>
                <div class="ustbBorder"></div>
                <div class="ustbSelect">
                  <div class="iconfont icon-xihuan ustbIcon ustbi2"></div>
                  <div class="ustbNum">{{userGoodNum}}</div>
                  <div>我的喜欢</div>
                </div>
                <div class="ustbBorder"></div>
                <div class="ustbSelect">
                  <div class="iconfont icon-shoucangxiao ustbIcon ustbi3"></div>
                  <div class="ustbNum">{{collectionInfo.len || 0}}</div>
                  <div>我的收藏</div>
                </div>
              </div>
              <div class="ustbBorder"></div>
              <div class="ustSelect">
                <div class="ustsSel" @click="gotoMain">个人主页</div>
                <div class="ustsSel" @click="quitLogin">退出登录</div>
              </div>
            </div>
          </div>
        </div>
        <div v-else @click="loginOrRegister">登陆/注册</div>
      </div>
      <div class="htr-general" @click="gotoRealeaseVideo">发布视频</div>
    </div>
  </div>
</template>

<script>
import MyInput from "../../components/GeneralComponents/SearchInput.vue";
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
    // ...mapState("login", ["user"]),
    ...mapState({
      user: (state) => state.login.user,
      backColor: (state) => state.appSet.backColor,
      userGoodNum: (state) => state.login.userGoodNum,
      collectionInfo: (state) => state.login.collectionInfo,
    }),
  },
  created() {
    if (localStorage.getItem("user")) {
      this.ac = true;
    }
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
    ...mapMutations("login", ["removeUser"]),
    //前往发布视频
    gotoRealeaseVideo() {
      this.$router.push("/uploadVideo");
    },
    loginOrRegister() {
      this.$router.push("/");
    },
    //展开用户设置栏目
    setupUser() {
      this.userSetup = true;
    },
    //延迟关闭
    unSetupUser() {
      this.userSetup = false;
    },
    //退出登录
    quitLogin() {
      this.ac = false;
      this.removeUser();
    },
    //前往个人主页
    gotoMain() {
      this.$router.push("/mainPage");
    },
  },
};
</script>

<style lang="scss" scoped>
.homeTop {
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
          top: 2rem;
          left: -5rem;
          background: rgb(248, 248, 248);
          z-index: 2;
          border-radius: 0 0 0.5rem 0.5rem;
          .ustBox {
            display: flex;
            color: #000;
            padding: 1rem 0.5rem;
            justify-content: space-between;
            font-size: 0.8rem;
            line-height: 1.2rem;
            .ustbSelect {
              width: 5rem;
              padding: 0 1rem;
              .ustbIcon {
                font-size: 1.5rem;
              }
              .ustbi1 {
                color: rgb(64, 153, 255);
              }
              .ustbi1:hover {
                transform: scale(1.2, 1.2);
              }
              .ustbi2 {
                background-image: linear-gradient(
                  to right bottom,
                  rgb(255, 224, 224) 1%,
                  rgb(255, 0, 0)
                );
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              .ustbi2:hover {
                transform: scale(1.2, 1.2);
              }
              .ustbi3 {
                color: rgb(211, 211, 0);
              }
              .ustbi3:hover {
                transform: scale(1.2, 1.2);
              }
              .ustbNum {
                padding: 0.2rem 0;
              }
            }
            .ustbSelect:hover {
              color: rgb(166, 175, 255);
            }
            .ustbBorder {
              width: 0.1rem;
              height: 1rem;
              margin-top: 1.5rem;
              background-color: rgb(177, 177, 177);
            }
          }
          .ustbBorder {
            width: 80%;
            margin: 0.5rem auto;
            height: 0.01rem;
            background-color: rgb(177, 177, 177);
          }
          .ustSelect {
            display: flex;
            color: #000;
            justify-content: space-around;
          }
          .ustsSel {
            font-size: 0.8rem;
          }
          .ustsSel:hover {
            color: rgb(166, 175, 255);
          }
        }
      }
    }
    .htr-general:hover {
      color: rgb(53, 170, 224);
    }
  }
}
.homeTopBack {
  .userData {
    .userSetup {
      background-color: #20212c !important;
      border-top: 0.2rem solid #161722 !important;
      .ustBox {
        color: #898790 !important;
      }
      .ustSelect {
        color: #898790 !important;
      }
    }
  }
}
</style>