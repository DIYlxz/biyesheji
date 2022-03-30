<template>
  <div class="homeVideo">
    <div
      v-for="(item, index) of locationData"
      :key="item.id"
      class="myVideoBox myVideoScorll"
    >
      <div class="hv_myVideo">
        <video class="hv_video" controls ref="myVideo">
          <source :src="item.video" type="video/mp4" />
          浏览器不支持 video 标签
        </video>
        <div class="hv_interaction">
          <follow></follow>
          <div @click="goodOperation($event, item.videoId)">
            <like :vimsg="item.videoId"></like>
          </div>
          <div @click="openComment($event, index)">
            <comment :vimsg="item.videoId"></comment>
          </div>
          <div @click="addCollectionNum($event, item.videoId)">
            <collection :vimsg="item.videoId"></collection>
          </div>
          <share></share>
        </div>
      </div>
      <div class="hv_commentBox" v-show="item.commentSwich">
        <div>
          <div class="hv_cb_title">
            全部评论<span>(</span>{{ item.commentAllNum }}<span>)</span>
          </div>
          <div
            v-for="(part, index) of item.commentArr"
            :key="part.infoName + index"
          >
            <div class="hv_cb_name">{{ part.infoName || "" }}：</div>

            <div class="hv_cb_word">
              <div>
                {{ part.cmtTalkAbout || "暂时还没有评论" }}
              </div>
              <div class="hv_cb_icon">
                <span class="iconfont icon-dianzan"> 0</span>
              </div>
            </div>
          </div>
        </div>
        <div class="hv_cb_inp">
          <input
            type="text"
            placeholder="评论在这输入"
            class="hv_cb_input"
            v-model="commentValue"
          />
          <div
            class="hv_cb_icon_box"
            @click="uploadComment($event, item.videoId)"
          >
            <div class="iconfont icon-shangchuan hv_cb_icon_shangchuan"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "../../components/VideoControl/Comment.vue";
import Follow from "../../components/VideoControl/Follow.vue";
import Like from "../../components/VideoControl/Like.vue";
import collection from "../../components/VideoControl/Collection.vue";
import share from "../../components/VideoControl/Share.vue";
import { mapMutations, mapState } from "vuex";
import { sendGet, sendPost } from "../../api/reqWay";

export default {
  components: { Follow, Like, Comment, collection, share },
  name: "HomeVideo",
  data() {
    return {
      //输入评论
      commentValue: "",
      //当前视频序号
      curVideo: 0,
      //请求的视频源
      videoData: [],
      //本地资源
      locationData: [
        {
          name: "001",
          id: "1d",
          videoId: "1d",
          video: require("../../assets/video/test/000001.mp4"),
          //评论开关
          commentSwich: false,
          //视频评论总数
          commentAllNum: 0,
          //评论存放
          commentArr: [],
        },
        {
          name: "001",
          id: "2d",
          videoId: "2d",
          video: require("../../assets/video/test/000002.mp4"),
          //评论开关
          commentSwich: false,
          //视频评论总数
          commentAllNum: 0,
          //评论存放
          commentArr: [],
        },
        {
          name: "001",
          id: "3d",
          videoId: "3d",
          video: require("../../assets/video/test/000003.mp4"),
          //评论开关
          commentSwich: false,
          //视频评论总数
          commentAllNum: 0,
          //评论存放
          commentArr: [],
        },
        {
          name: "001",
          id: "4d",
          videoId: "1d",
          video: require("../../assets/video/test/000001.mp4"),
          //评论开关
          commentSwich: false,
          //视频评论总数
          commentAllNum: 0,
          //评论存放
          commentArr: [],
        },
      ],
    };
  },
  created() {
    this.mouseScrollListen();
    this.curVideoInfo();
    this.getCommentData();
  },
  computed: {
    ...mapState("login", ["user"]),
    ...mapState("video", ["videoInfo"]),
  },
  methods: {
    ...mapMutations("video", ["setVideoInfo"]),
    //增添收藏
    addCollectionNum(e, videoId) {
      sendPost("/addCollection", {
        videoId,
        dyNumber: this.user.dyNumber,
      }).then((data) => {
        if (data.code == 200) {
          this.getCommentData();
          sendGet("/videoData").then((data) => {
            this.setVideoInfo(data.info);
          });
        }
      });
    },
    //上传评论
    uploadComment(e, videoId) {
      console.log(videoId);
      sendPost("/addComment", {
        dyNumber: this.user.dyNumber,
        infoName: this.user.infoName,
        cmtTalkAbout: this.commentValue,
        cmtGoodNum: "0",
        cmtReply: "0",
        cmtPrePeople: "0",
        videoId,
      }).then((data) => {
        if (data.code == 200) {
          this.commentValue = "";
          this.getCommentData();
          sendGet("/videoData").then((data) => {
            this.setVideoInfo(data.info);
            this.curVideoInfo();
          });
        }
      });
    },
    //点赞
    goodOperation(e, videoId) {
      sendPost("/addGood", {
        videoId,
        dyNumber: this.user.dyNumber,
      }).then((data) => {
        if (data.code == 200) {
          this.getCommentData();
          sendGet("/videoData").then((data) => {
            this.setVideoInfo(data.info);
          });
        }
      });
    },
    //获取评论信息
    getCommentData() {
      let _len1 = this.locationData.length;
      for (let i = 0; i < _len1; i++) {
        this.locationData[i].commentArr = [];
        sendPost("/curComment", {
          videoId: this.locationData[i].videoId,
        }).then((data) => {
          if (data.code != 400) {
            let info = data.info;
            for (let j = 0; j < info.length; j++) {
              this.locationData[i].commentArr.push({
                infoName: info[j].infoName,
                cmtTalkAbout: info[j].cmtTalkAbout,
              });
            }
          }
        });
      }
    },
    //视频信息
    curVideoInfo() {
      let _len1 = this.videoInfo.length;
      let _len2 = this.locationData.length;
      for (let i = 0; i < _len2; i++) {
        for (let j = 0; j < _len1; j++) {
          if (this.locationData[i].videoId == this.videoInfo[j].videoId) {
            this.locationData[i].commentAllNum = this.videoInfo[j].commentNum;
          }
        }
      }
    },
    //展开评论
    openComment(e, index) {
      this.locationData[index].commentSwich = this.locationData[index]
        .commentSwich
        ? false
        : true;
      let hv = document.querySelectorAll(".hv_video")[index];
      if (this.locationData[index].commentSwich) {
        hv.style.width = "60vw";
      } else {
        hv.style.width = "90vw";
      }
    },
    //鼠标滚轮
    mouseScrollListen() {
      this.$nextTick(() => {
        const homeVideo = document.querySelector(".homeVideo");
        const hv = document.querySelectorAll(".myVideoScorll");
        homeVideo.addEventListener("wheel", (e) => {
          //滚轮向下滑动
          //   if (e.deltaY < 0) {
          //     console.log("向下滑");
          //   }
          if (e.deltaY > 0) {
            if (this.curVideo == 0 || this.curVideo == 1) {
              hv.forEach((item) => {
                item.style.transform = `translateY(${
                  -84.5 * (this.curVideo + 1)
                }vh)`;
              });
            } else {
              hv.forEach((item) => {
                item.style.transform = "translateY(-338vh)";
              });
              hv[0].style.transform = "translateY(0)";
              hv[1].style.transform = "translateY(0)";
              hv[2].style.transform = "translateY(0)";
              hv[3].style.transform = "translateY(0)";
              this.curVideo = -1;
            }
          }
          this.curVideo++;
        });
      });
    },
  },
};
</script>

<style lang="scss">
.homeVideo {
  width: 96%;
  height: 84%;
  margin: 1rem auto;
  position: relative;
  overflow: hidden;
  .myVideoBox {
    position: relative;
    display: flex;
    .hv_myVideo {
      position: relative;
      height: 80vh;
      margin: 1rem auto;
      .hv_video {
        height: 100%;
        border-radius: 0.5rem;
        background: #000;
        position: relative;
        z-index: 0;
      }
      .hv_interaction {
        position: absolute;
        right: 2rem;
        top: 15rem;
        z-index: 2;
        pointer-events: none;
      }
    }
    .hv_commentBox {
      text-align: left;
      margin: {
        top: 1rem;
        bottom: 1rem;
        left: 0.5rem;
      }
      width: 30vw;
      height: 80vh;
      position: relative;
      z-index: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .hv_cb_name {
        font-size: 0.8rem;
        margin-top: 0.5rem;
        color: rgba(144, 147, 149, 1);
      }
      .hv_cb_word {
        font-size: 0.9rem;
        margin: {
          top: 0.5rem;
          bottom: 0.5rem;
        }
        display: flex;
        justify-content: space-between;
        .hv_cb_icon {
          line-height: 0.9rem;
          cursor: pointer;
          &:hover {
            color: red;
          }
        }
      }
      .hv_cb_inp {
        background-color: #e7e7e7;
        height: 2rem;
        display: flex;
        justify-content: space-between;
        border-radius: 1rem;
        .hv_cb_input {
          width: 20vw;
          background-color: #e7e7e7;
          height: 2rem;
          padding: {
            left: 1rem;
          }
        }
        .hv_cb_icon_box {
          width: 1.5rem;
          height: 1.5rem;
          margin: {
            top: 0.25rem;
            right: 2rem;
          }
          background-color: #cfcfcf;
          border-radius: 50%;
          cursor: pointer;
          .hv_cb_icon_shangchuan {
            color: #fff;
            font-size: 1.25rem;
            line-height: 1.5rem;
            margin: {
              left: 0.15rem;
            }
          }
          &:hover {
            background-color: #888888;
          }
        }
      }
    }
  }
}

input {
  border: none;
  outline: none;
}
</style>

<style>
.hv_video {
  width: 90vw;
}
</style>