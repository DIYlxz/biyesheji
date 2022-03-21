<template>
  <div class="uploadVideo">
      <upload-video-top></upload-video-top>
      <input type="file" />
  </div>
</template>

<script>
import uploadVideoTop from "./UploadVideoTop.vue"
export default {
    name: "uploadVideo",
    components: {
        uploadVideoTop,
    },
}
</script>

<style lang="scss" scoped>
.uploadVideo {
    width: 100vw;
    height: 100vh;
    background-color: #f7f8f9;
}
</style>