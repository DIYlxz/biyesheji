<template>
  <div id="login">
    <div class="login_box">
      <div class="lb_title">LOGIN</div>
      <div id="userInput">
        <input
          class="ut_input"
          placeholder="user"
          type="text"
          v-model="userName"
        />
        <input
          class="ut_input"
          placeholder="password"
          type="password"
          v-model="password"
        />
      </div>
      <div class="lb_btn">
        <el-button type="primary" plain @click="reqLoginData">登录</el-button>
      </div>
      <div class="lb_info_btn">
        <div class="lb_btn_text">注册</div>
        <div class="lb_btn_text">忘记密码?</div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendPost } from "../../api/reqWay.js";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      userName: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).userName
        : "",
      password: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).password
        : "",
    };
  },
  computed: {
    ...mapState("login", ["user"]),
  },
  methods: {
    ...mapMutations("login", ["setUser"]),
    //登录信息
    reqLoginData() {
      sendPost("/login", {
        userName: this.userName,
        password: this.password,
      })
        .then((data) => {
          if (data.access) {
            this.$message({
              message: "登陆成功",
              type: "success",
            });
            this.setUser({
              userName: this.userName,
              password: this.password,
              hpImg: "../../assets/images/LoginImg/01.jpg",
              access: data.access,
              //名称
              infoName: data.infoName,
              //灯音号
              dyNumber: data.dyNumber,
              //作品数量
              worksNum: data.worksNum,
              //粉丝数量
              fansNum: data.fansNum,
              //关注数量
              followNums: data.followNums,
              //喜欢数量
              loveNum: data.loveNum,
              //收藏数
              collectionNum: data.collectionNum,
              //点赞数量
              goodNum: data.goodNum,
            });
            this.hhp = true;
            this.$router.push("/home");
          } else {
            this.$message.error("账号密码错误");
          }
        })
        .catch(() => {
          this.$message.error(`访问错误`);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  display: flex;
  width: 45rem;
  height: 20rem;
  margin: 4rem auto;
  .login_box {
    padding: 0 3rem;
    margin: 0 auto;
    #userInput {
      .ut_input {
        display: block;
        width: 15rem;
        height: 2rem;
        line-height: 2rem;
        border: 0.01rem solid #000;
        border-radius: 0.5rem;
        padding: 0 1rem;
        margin-top: 1.5rem;
      }
    }
    .lb_title {
      text-align: center;
      font-weight: bold;
      font-size: 1.5rem;
      letter-spacing: 0.5rem;
    }
    .lb_btn {
      width: 5rem;
      margin: 2rem auto;
    }
    .lb_info_btn {
      display: flex;
      justify-content: space-between;
      .lb_btn_text {
        font-size: 0.8rem;
      }
    }
  }
}

input {
  border: none;
  outline: none;
}
</style>