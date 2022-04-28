<template>
  <div class="uploadVideoRight">
    <div class="uvr_title">发布视频</div>
    <div class="uvr_lunbo_box">
      <el-carousel :interval="3000" arrow="always" height="80px">
        <el-carousel-item v-for="item in advert" :key="item.id">
          <img :src="item.src" class="uvr_lunbp_img" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="uvr_upload_box">
      <el-upload
        class="upload-demo"
        drag
        :show-file-list="false"
        :on-success="handleVideoSuccess"
        action="http://localhost:8010/uploadVideo"
        :before-upload="beforeUploadVideo"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          为了更好的观看体验，超过40秒的视频建议上传横版视频
        </div>
      </el-upload>
    </div>
    <div class="uvr_video_format">
      <div class="uvr_video_proposal">
        <div class="uvrvp_lt">视频格式</div>
        <div class="uvrvp_st">支持常用视频格式，推荐使用mp4、webm</div>
      </div>
      <div class="uvr_video_proposal">
        <div class="uvrvp_lt">视频大小</div>
        <div class="uvrvp_st">视频文件大小不超过8G，时长在30分钟以内</div>
      </div>
      <div class="uvr_video_proposal">
        <div class="uvrvp_lt">视频分辨率</div>
        <div class="uvrvp_st">分辨率为720p（1280x720）及以上</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { sendPost,sendGet } from "../../api/reqWay";
import { mapMutations } from "vuex";
export default {
  name: "UploadVideoRight",
  data() {
    return {
      advert: [
        {
          src: require("../../assets/images/advertImg/advert01.jpeg"),
          id: "jjgj",
        },
        {
          src: require("../../assets/images/advertImg/advert02.jpeg"),
          id: "sr",
        },
        {
          src: require("../../assets/images/advertImg/advert03.jpeg"),
          id: "dv",
        },
      ],
      curHeaders: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
      },
    };
  },
  computed: {
    ...mapState("login", ["user"]),
  },
  methods: {
    ...mapMutations("video", ["setVideoInfo"]),
    reqVideoSend(param) {
      const file = new FormData();
      file.append('file', param.file)
      sendPost("/uploadVideo", {
        file,
      }).then(data => {
        console.log(data);
      })
    },
    //定义上传之前文件是什么
    beforeUploadVideo(file) {
      const formatArr = [
        "video/mp4",
        "video/ogg",
        "video/flv",
        "video/avi",
        "video/wmv",
        "video/rmvb",
      ];
      if (formatArr.indexOf(file.type) == -1) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
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
    //上传成功
    handleVideoSuccess(res) {
      sendPost("/uploadVideoForm", {
        dyNumber: this.user.dyNumber,
        videoSrc: res.videoSrc,
        headPortrait: this.user.headPortrait,
      }).then(() => {
        this.getVideoData();
      });
      this.$message({
        message: "恭喜你上传成功",
        type: "success",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.uploadVideoRight {
  user-select: none;
  .uvr_title {
    font-weight: bold;
    font-size: 1.5rem;
    text-align: left;
  }
  .uvr_lunbo_box {
    margin-top: 2rem;
    .el-carousel__item img {
      height: 5rem;
      margin: 0;
    }
  }
  .uvr_upload_box {
    margin-top: 1rem;
    height: 20rem;
    background-color: rgba(244, 245, 245, 1);
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .uvr_video_format {
    display: flex;
    justify-content: space-between;
    margin: {
      top: 1rem;
    }
    .uvr_video_proposal {
      background-color: rgba(244, 245, 245, 1);
      text-align: left;
      padding: 1rem 1rem;
      .uvrvp_lt {
        font-size: 0.9rem;
        font-weight: bold;
      }
      .uvrvp_st {
        font-size: 0.8rem;
        color: rgba(156, 159, 162, 1);
      }
    }
  }
}
</style>

<style lang="scss">
.uvr_upload_box {
  .el-upload-dragger {
    background-color: rgba(244, 245, 245, 1);
  }
}
</style>