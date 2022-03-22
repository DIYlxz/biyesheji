<template>
  <div class="uploadVideoLeft">
    <div class="uvl_btn" @click="gotoReleaseVideo">发布视频</div>
    <div class="uvl_border"></div>
    <div class="uvl_first_page uvl_title_box">
      <div>
        <span class="iconfont icon-shouye1 icon_sty"></span>
        <span>首页</span>
      </div>
      <div></div>
    </div>
    <div class="uvl_content_run uvl_title_box" @click="changeContentHide">
      <div>
        <span class="iconfont icon-guanli-fill icon_sty"></span>
        <span>内容管理</span>
      </div>
      <div class="uvl_icon_rotate">
        <div class="iconfont icon-xiala1 icon_rotate" :class="{icon_xiala: contentHide}"></div>
      </div>
    </div>
    <div v-show="contentHide" class="uvl_small_title">
      <div class="uvl_all_small_title" @click="gotoContentMessage">视频管理</div>
      <div class="uvl_all_small_title">合集管理</div>
    </div>
    <div class="uvl_video_data uvl_title_box" @click="changeVideoHide">
      <div>
        <span class="iconfont icon-shuju icon_sty"></span>
        <span>视频数据</span>
      </div>
      <div class="uvl_icon_rotate">
        <div class="iconfont icon-xiala1 icon_rotate" :class="{icon_xiala: videoHide}"></div>
      </div>
    </div>
    <div class="uvl_small_title" v-show="videoHide">
      <div class="uvl_all_small_title">数据总览</div>
      <div class="uvl_all_small_title">作品数据</div>
      <div class="uvl_all_small_title">创作周报</div>
    </div>
    <div class="uvl_help_center uvl_title_box">
      <div>
        <span class="iconfont icon-bangzhuzhongxin icon_sty"></span>
        <span>帮助中心</span>
      </div>
      <div>
        <span class="iconfont icon-xiala1"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadVideoLeft",
  data() {
    return {
      contentHide: true,
      videoHide: true,
    };
  },
  methods: {
    //前往发布视频
    gotoReleaseVideo() {
      this.$router.push("/uploadVideo");
    },
    //前往内容管理
    gotoContentMessage() {
      this.$router.push("/uploadVideo/contentMessage");
    },
    //改变视频状态
    changeVideoHide() {
      this.videoHide = this.videoHide ? false : true;
    },
    //改变内容隐藏状态
    changeContentHide() {
      this.contentHide = this.contentHide ? false : true;
    },
  },
};
</script>

<style lang="scss" scoped>
.uploadVideoLeft {
  user-select: none;
  background: {
    color: #fff;
  }
  width: 15rem;
  height: 100%;
  .uvl_btn {
    width: 12rem;
    height: 2.5rem;
    line-height: 2.5rem;
    background-color: rgba(254, 44, 85, 1);
    border-radius: 0.2rem;
    cursor: pointer;
    color: #fff;
    font-weight: bold;
    &:hover {
      background-color: rgb(199, 35, 68);
    }
    margin: 1rem auto;
  }
  .uvl_border {
    width: 90%;
    height: 0.1rem;
    margin: 0 auto;
    background: {
      color: #f7f8f9;
    }
  }
  .uvl_first_page {
    margin-top: 0.5rem;
  }
  .uvl_small_title {
    .uvl_all_small_title {
      height: 2rem;
      line-height: 2rem;
      text-align: left;
      margin: {
        left: 1rem;
        right: 1rem;
        bottom: 0.5rem;
      }
      padding: {
        left: 3rem;
      }
      &:hover {
        background: {
          color: rgba(180, 180, 180, 0.1);
        }
      }
      cursor: pointer;
    }
  }
  .uvl_title_box {
    font-weight: bold;
    text-align: left;
    margin: {
      left: 1rem;
      right: 1rem;
      bottom: 0.5rem;
    }
    height: 2rem;
    line-height: 2rem;
    padding: {
      left: 1rem;
    }
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    &:hover {
      background: {
        color: rgba(180, 180, 180, 0.1);
      }
    }
    .icon_sty {
      color: #7b7779;
      margin-right: 0.5rem;
    }
    .uvl_icon_rotate {
        .icon_rotate {
            transition: all 0.1s ease-in-out;
        }
    }
  }
}

.icon_xiala {
    transform: rotate(180deg);
}
</style>