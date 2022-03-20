<template>
  <div class="homeVideo">
    <div v-for="item of locationData" :key="item.id" class="myVideoBox">
      <video class="hv-video" controls ref="myVideo">
        <source :src="item.video" type="video/mp4" />
        浏览器不支持 video 标签
      </video>
      <div class="hv_interaction">
        <follow></follow>
        <like></like>
        <comment></comment>
        <collection></collection>
        <share></share>
      </div>
    </div>
  </div>
</template>

<script>
import { sendGet } from "../../api/reqWay";
import Comment from '../../components/VideoControl/Comment.vue';
import Follow from "../../components/VideoControl/Follow.vue";
import Like from "../../components/VideoControl/Like.vue";
import collection from "../../components/VideoControl/Collection.vue";
import share from "../../components/VideoControl/Share.vue"

export default {
  components: { Follow, Like, Comment, collection,share },
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
    this.reqVideoSrc();
  },
  methods: {
    //请求视频资源
    async reqVideoSrc() {
      await sendGet("/video").then((data) => {
        let len = data.videoArr.length;
        for (let i = 0; i < len; i++) {
          this.videoData.push(data.videoArr[i]);
        }
        this.mouseScrollListen();
      });
    },
    //鼠标滚轮
    mouseScrollListen() {
      this.$nextTick(() => {
        const homeVideo = document.querySelector(".homeVideo");
        const hv = document.querySelectorAll(".hv-video");
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
    .hv-video {
      width: 90vw;
      height: 80vh;
      border-radius: 0.5rem;
      background: #000;
      margin: 1rem auto;
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
}
</style>