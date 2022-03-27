<template>
  <div class="homeVideo">
    <div
      v-for="item of locationData"
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
          <like></like>
          <comment @click="openComment"></comment>
          <collection></collection>
          <share></share>
        </div>
      </div>
      <div class="hv_commentBox" v-show="item.commentSwich">
        <div class="hv_cb_title">
          全部评论<span>(</span>{{ user.commentNum }}<span></span>)
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { sendGet } from "../../api/reqWay";
import Comment from "../../components/VideoControl/Comment.vue";
import Follow from "../../components/VideoControl/Follow.vue";
import Like from "../../components/VideoControl/Like.vue";
import collection from "../../components/VideoControl/Collection.vue";
import share from "../../components/VideoControl/Share.vue";
import { mapState } from "vuex";

export default {
  components: { Follow, Like, Comment, collection, share },
  name: "HomeVideo",
  data() {
    return {
      //当前视频序号
      curVideo: 0,
      //请求的视频源
      videoData: [],
      //本地资源
      locationData: [
        {
          name: "001",
          id: "1d",
          video: require("../../assets/video/test/000001.mp4"),
          //评论开关
          commentSwich: false,
        },
        {
          name: "001",
          id: "2d",
          video: require("../../assets/video/test/000002.mp4"),
        },
        {
          name: "001",
          id: "3d",
          video: require("../../assets/video/test/000003.mp4"),
        },
        {
          name: "001",
          id: "4d",
          video: require("../../assets/video/test/000001.mp4"),
        },
      ],
    };
  },
  created() {
    this.mouseScrollListen();
  },
  computed: {
    ...mapState("login", ["user"]),
  },
  methods: {
    //展开评论
    openComment() {
      this.commentSwich = this.commentSwich ? false : true;
    },
    //请求视频资源
    // async reqVideoSrc() {
    //   await sendGet("/video").then((data) => {
    //     let len = data.videoArr.length;
    //     for (let i = 0; i < len; i++) {
    //       this.videoData.push(data.videoArr[i]);
    //     }
    //     this.mouseScrollListen();
    //   });
    // },
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
        width: 90vw;
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
      width: 20vw;
      height: 80vh;
      position: relative;
      z-index: 0;
    }
  }
}
</style>

<style>

</style>