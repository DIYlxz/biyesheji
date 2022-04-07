<template>
  <div class="publish">
    <upload-video-top></upload-video-top>
    <video ref="video"></video>
    <canvas style="display: none" id="canvasCamera"></canvas>
    <div v-if="imgSrc" class="img_bg_camera">
      <img :src="imgSrc" class="tx_img" />
    </div>
    <button @click="OpenCamera">打开摄像头</button>
    <button @click="CloseCamera">关闭摄像头</button>
    <button @click="setImage">拍照</button>
  </div>
</template>

<script>
import uploadVideoTop from "../UploadVideo/UploadVideoTop.vue";
export default {
  data() {
    return {
      mediaStreamTrack: {},
      video_stream: "", // 视频stream
      imgSrc: "", // 拍照图片
      canvas: null,
      context: null,
    };
  },
  components: {
    uploadVideoTop,
  },
  mounted() {
    // 进入页面 自动调用摄像头
    this.getCamera();
  },
  methods: {
    // 调用打开摄像头功能
    getCamera() {
      // 获取 canvas 画布
      this.canvas = document.getElementById("canvasCamera");
      this.context = this.canvas.getContext("2d");
      // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // 正常支持版本
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          // 摄像头开启成功
          this.mediaStreamTrack =
            typeof stream.stop === "function" ? stream : stream.getTracks()[0];
          this.video_stream = stream;
          this.$refs.video.srcObject = stream;
          this.$refs.video.play();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 拍照 绘制图片
    setImage() {
      console.log("拍照");
      // 点击canvas画图
      this.context.drawImage(this.$refs.video, 0, 0, 200, 100);
      // 获取图片base64链接
      const image = this.canvas.toDataURL("image/png");
      this.imgSrc = image;
      this.$emit("refreshDataList", this.imgSrc);
    },
    // 打开摄像头
    OpenCamera() {
      console.log("打开摄像头");
      this.getCamera();
    },
    // 关闭摄像头
    CloseCamera() {
      console.log("关闭摄像头");
      this.$refs.video.srcObject.getTracks()[0].stop();
    },
  },
};
</script>

<style lang="scss" scoped>
video {
  width: 100%;
  height: 300px;
}
canvas {
  width: 100%;
  height: 300px;
}
button {
  width: 100px;
  height: 40px;
  position: relative;
  bottom: 0;
  left: 0;
  background-color: rgb(22, 204, 195);
}
.img_bg_camera {
  .tx_img {
    width: 300px;
    height: 200px;
  }
}
</style>
