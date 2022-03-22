<template>
  <div class="uploadVideo">
    <upload-video-top></upload-video-top>
    <div class="uploadVideoMain">
      <upload-video-left></upload-video-left>
      <div class="uploadVideoBox">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import UploadVideoLeft from "./UploadVideoLeft.vue";
import uploadVideoTop from "./UploadVideoTop.vue";
export default {
  name: "uploadVideo",
  components: {
    uploadVideoTop,
    UploadVideoLeft,
  },
};
</script>

<style lang="scss" scoped>
.uploadVideo {
  width: 100vw;
  height: 100vh;
  background-color: #f7f8f9;
  .uploadVideoMain {
    display: flex;
    margin: {
        top: 2rem;
        left: 10rem;
        right: 10rem;
    };
    height: calc(100% - 112px);
    .uploadVideoBox {
      margin-left: 1rem;
      flex: 1 1 auto;
      background: #fff;
      padding: 2.5rem 2rem;
    }
  }
}
</style>