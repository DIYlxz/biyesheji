<template>
  <div class="homeVideo">
    <div
      v-for="(item, index) of videoInfo"
      :key="item.videoId"
      class="myVideoBox myVideoScorll"
    >
      <div class="hv_myVideo">
        <video class="hv_video" controls ref="myVideo" crossorigin>
          <source :src="item.videoSrc" type="video/mp4" />
          浏览器不支持 video 标签
        </video>
        <div class="hv_interaction">
          <follow :vimsg="item.videoId"></follow>
          <div @click="goodOperation($event, item.videoId)">
            <like :vimsg="item.videoId"></like>
          </div>
          <div @click="openComment($event, index)">
            <comment :vimsg="item.videoId"></comment>
          </div>
          <div @click="addCollectionNum($event, item.videoId)">
            <collection :vimsg="item.videoId"></collection>
          </div>
          <div @click="shareOpen($event, item.videoSrc)">
            <share></share>
          </div>
        </div>
      </div>
      <div class="hv_commentBox" v-show="item.commentSwich">
        <div>
          <div class="hv_cb_title">
            全部评论<span>(</span>{{ item.commentNum }}<span>)</span>
          </div>
          <div
            v-for="(part, indexP) of item.commentArr"
            :key="part.infoName + indexP"
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
            @click="uploadComment($event, item.videoId, index)"
          >
            <div class="iconfont icon-shangchuan hv_cb_icon_shangchuan"></div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="分享点滴"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div>
        <el-select v-model="fansName" placeholder="请选择分享对象">
          <el-option
            v-for="item in fansInfo"
            :key="item.fansName"
            :label="item.fansName"
            :value="item.fansDyNumber"
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
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
      //分享框
      dialogVisible: false,
      //当前粉丝
      fansName: "",
    };
  },
  created() {
    this.mouseScrollListen();
  },
  computed: {
    ...mapState("login", ["user"]),
    ...mapState("video", ["videoInfo"]),
    ...mapState("fans", ["fansInfo"]),
  },
  methods: {
    ...mapMutations("video", ["setVideoInfo"]),
    ...mapMutations("login", ["setUserGoodNum", "setCollectionInfo"]),
    ...mapMutations("fans", ["setFansInfo", "setShareUrl"]),
    //点击分享
    shareOpen(e, videoUrl) {
      sendPost("/getFans", {
        dyNumber: this.user.dyNumber,
      }).then((data) => {
        this.dialogVisible = true;
        let arr = [];
        let len = data.info.length;
        for (let i = 0; i < len; i++) {
          arr.push({
            fansDyNumber: data.info[i].fansDyNumber,
            fansName: data.info[i].fansName,
          });
        }
        this.setFansInfo(arr);
        this.setShareUrl(videoUrl);
      });
    },
    //分享点击确定
    handleClose() {
      this.dialogVisible = false;
      this.$message({
        message: "成功转发",
        type: "success",
      });
      this.$router.push("/chartRoom");
    },
    //获取喜爱数量
    getLoveNum() {
      sendPost("/getGoodNum", {
        dyNumber: this.user.dyNumber,
      }).then((data) => {
        if (data.code == 200) {
          this.setUserGoodNum(data.loveNum);
        }
      });
    },
    //增添收藏
    addCollectionNum(e, videoId) {
      sendPost("/addCollection", {
        videoId,
        dyNumber: this.user.dyNumber,
      }).then((data) => {
        if (data.code == 200) {
          this.getVideoData();
          this.getUserCollectionData();
        }
      });
    },
    //当前用户收藏信息询问
    getUserCollectionData() {
      sendPost("/getUserCollection", {
        dyNumber: this.user.dyNumber,
      }).then((data) => {
        if (data.code == 200) {
          this.setCollectionInfo({
            info: data.info,
            len: data.len,
          });
        }
      });
    },
    //请求获取视频资源
    getVideoData() {
      sendGet("/videoData").then((data) => {
        if (data.code == 200) {
          //处理评论
          let len = data.info.length;
          let len2 = data.commentArr.length;
          for (let i = 0; i < len; i++) {
            for (let j = 0; j < len2; j++) {
              if (data.info[i].videoId == data.commentArr[j].videoId) {
                if (!data.info[i].commentArr) {
                  data.info[i].commentArr = [];
                }
                data.info[i].commentArr.push(data.commentArr[j]);
              }
            }
            data.info[i].commentSwich = false;
          }
          this.setVideoInfo(data.info);
        }
      });
    },
    //更新评论信息
    curCommentData(videoId, index) {
      sendPost("/curComment", {
        videoId,
      }).then(() => {
        this.openComment({}, index);
        this.getVideoData();
      });
    },
    //上传评论
    uploadComment(e, videoId, index) {
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
          this.curCommentData(videoId, index);
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
          this.getVideoData();
          this.getLoveNum();
        }
      });
    },
    //展开评论
    openComment(e, index) {
      this.videoInfo[index].commentSwich = this.videoInfo[index].commentSwich
        ? false
        : true;
      let hv = document.querySelectorAll(".hv_video")[index];
      if (this.videoInfo[index].commentSwich) {
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
        let len = this.videoInfo.length;
        homeVideo.addEventListener("wheel", (e) => {
          if (e.deltaY > 0) {
            if (len - this.curVideo > 1) {
              hv.forEach((item) => {
                item.style.transform = `translateY(${
                  -84.5 * (this.curVideo + 1)
                }vh)`;
              });
            } else {
              hv.forEach((item) => {
                item.style.transform = `translateY(${
                  -84.5 * this.curVideo + 1
                })`;
              });
              for (let i = 0; i < len; i++) {
                hv[i].style.transform = "translateY(0)";
              }
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
    justify-content: space-between;
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