<template>
  <div class="chartRoom">
    <div class="cr_top">
      <div class="cr_quit_btnBox" @click="quitToHome">
        <span></span>
        退出
      </div>
    </div>
    <div class="cr_body">
      <div class="cr_left">
        <div class="cr_left_title">联系粉丝</div>
        <div class="cr_left_fans">
          <div
            v-for="item of fansInfo"
            :key="item.fansDyNumber"
            class="crlf_select"
          >
            {{ item.fansName }}
          </div>
        </div>
      </div>
      <div class="cr_right">
        <div class="crr_chartBox">
          <div v-for="yditem of chartArr" :key="yditem.id" class="crrcb_chart">
            <div class="crrcb_title">{{ yditem.name }}:</div>
            <div class="crrcb_msg">{{ yditem.msg }}</div>
          </div>
        </div>
        <div class="crr_chartInput">
          <textarea class="crrci_text" v-model="chartText"></textarea>
          <div class="crrci_btn" @click="sendChart">发送</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "ChartRoom",
  data() {
    return {
      chartText: "",
      chartArr: [],
    };
  },
  computed: {
    ...mapState("login", ["user"]),
    ...mapState("fans", ["fansInfo", "shareUrlSwich", "shareUrl"]),
  },
  mounted() {
    if(this.shareUrlSwich) {
      this.chartArr.push({
        name: this.user.infoName,
        msg: this.shareUrl,
      });
      this.setShareUrlSwich();
    }
    this.ChartConnect();
    this.sockets.subscribe("recoverData", (data) => {
      this.chartArr.push({
        name: data.name,
        msg: data.msg,
        id: Symbol("chart"),
      });
    });
  },
  methods: {
    ...mapMutations("fans", ["setShareUrlSwich"]),
    //发送聊天
    sendChart() {
      this.$socket.emit("sendData", {
        name: this.user.infoName,
        msg: this.chartText,
      });
      this.chartText= "";
    },
    quitToHome() {
      this.$router.push("/home");
    },
    // 连接socket
    ChartConnect() {
      this.$socket.open(); // 开始连接socket
    },
  },
};
</script>

<style lang="scss" scoped>
.chartRoom {
  width: 100vw;
  height: 100vh;
  .cr_top {
    height: 3rem;
    border-bottom: 0.01rem solid #adadad;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .cr_quit_btnBox {
      width: 5rem;
      height: 2rem;
      line-height: 2rem;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
  .cr_body {
    width: 100vw;
    height: calc(100% - 3rem);
    display: flex;
    .cr_left {
      width: 10%;
      height: 100%;
      border-right: 0.01rem solid #adadad;
      .cr_left_title {
        font-weight: bold;
        padding-top: 1rem;
      }
      .cr_left_fans {
        text-align: left;
        margin-top: 1rem;
        .crlf_select {
          cursor: pointer;
          height: 2rem;
          line-height: 2rem;
          &:hover {
            background-color: #e8e8e8;
          }
        }
      }
    }
    .cr_right {
      width: 90%;
      height: 100%;
      .crr_chartBox {
        height: 70%;
        border-bottom: 0.01rem solid #adadad;
        text-align: left;
        .crrcb_chart {
          margin-bottom: 0.5rem;
          .crrcb_title {
            font-size: 0.8rem;
            color: #adadad;
          }
          .crrcb_msg {
            font-family: SimSun;
          }
        }
      }
      .crr_chartInput {
        .crrci_text {
          width: 100%;
          height: 5rem;
          border: none;
          resize: none;
          outline: none;
          margin-bottom: 1rem;
        }
        .crrci_btn {
          width: 5rem;
          line-height: 2rem;
          border: 0.01rem solid #e8e8e8;
          border-radius: 1rem;
          cursor: pointer;
          &:hover {
            border: 0.01rem solid #8f8f8f;
            color: rgb(255, 164, 164);
          }
        }
      }
    }
  }
}
.name_style {
  margin-top: 0.5rem;
}
</style>