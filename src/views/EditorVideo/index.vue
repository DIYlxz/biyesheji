<template>
  <div class="EditorVideo">
    <div class="ev_top">
      <div class="ev_title">视频编辑</div>
      <div class="ev_quit" @click="quitHome">退出</div>
    </div>
    <div class="ev_content">
      <div class="ev_select_video">
        <div class="ev_sbox_btn">
          <div class="ev_selectVideo_btn">
            <div class="ev_sv_title">视频选择</div>
            <input type="file" class="ev_file_select" @change="test" />
          </div>
          <div class="ev_selectMusic_btn">
            <div class="ev_sm_title">音频选择</div>
            <input type="file" class="ev_file_select" @change="muiscTest" />
          </div>
        </div>
        <div>
          <div>已选择视频：
            <span v-show="!file">暂无视频</span>
            <span v-show="file">{{fileName}}</span>
          </div>
          <div>已选择音频：
            <span v-show="!muiscFile">暂无音频</span>
            <span v-show="muiscFile">{{muiscFileName}}</span>
          </div>
        </div>
        <div class="ev_sbox_progress">
          <div>
            <el-progress :percentage="percent"></el-progress>
          </div>
        </div>
      </div>
      <div class="ev_select_func">
        <div class="ev_select_part" @click="changedVideoBtn">
          <div>转化视频格式</div>
          <div>mp4->avi</div>
        </div>
        <div class="ev_select_part" @click="getVideoMuisc">
          <div>剪辑音频</div>
          <div>移出mp4的音频</div>
        </div>
        <div class="ev_select_part" @click="changeVideoFormat">
          <div>转化视频格式</div>
          <div>avi->mp4</div>
        </div>
        <div class="ev_select_part" @click="allVideoMuisc">
          <div>音频接入</div>
          <div>音频和视频并入</div>
        </div>
      </div>
    </div>
    <div class="ev_handle_result">
      结果：
      <div v-show="changedVideo">
        <a class="downVideo">下载修改的视频</a>
      </div>
    </div>
  </div>
</template>

<script>
import FFmpeg from "@ffmpeg/ffmpeg/dist/ffmpeg.min.js";
export default {
  name: "editor",
  data() {
    return {
      file: null,
      fileName: "",
      //修改后的视频
      changedVideo: false,
      changedUrl: "",
      //音频
      muiscFile: null,
      muiscFileName: "",
      //百分率
      percent: 0,
      //不允许多次触发
      funcUse: false,
    };
  },
  methods: {
    //回到视频主页
    quitHome() {
      this.$router.push("/home");
    },
    //音频选择
    muiscTest(e) {
      let name = e.target.files[0].name;
      let myType = ["mp3", "acc"];
      let len = myType.length;
      for (let i = 0; i < len; i++) {
        if (name.indexOf(myType[i]) != -1) {
          this.$message({
            type: "success",
            message: "音频选择成功",
          });
          this.muiscFile = e.target.files[0];
          this.muiscFileName = e.target.files[0].name;
          return;
        }
      }
      this.$message.error("请选择mp3,acc格式的音频");
    },
    //合并音频和视频
    allVideoMuisc() {
      if (this.file && this.muiscFile) {
        const { createFFmpeg, fetchFile } = FFmpeg;
        const ffmpeg = createFFmpeg();
        let url = null;
        (async () => {
          let { name } = this.file;
          let musicName = this.muiscFile.name;
          ffmpeg.setProgress(({ ratio }) => {
            this.percent = Math.floor(ratio * 100);
          });
          await ffmpeg.load();
          console.log(ffmpeg.FS);
          ffmpeg.FS("writeFile", name, await fetchFile(this.file));
          ffmpeg.FS("writeFile", musicName, await fetchFile(this.muiscFile));
          await ffmpeg.run("-i", name, "-i", musicName, "dzzdzz.avi");
          const data = ffmpeg.FS("readFile", "dzzdzz.avi");
          url = URL.createObjectURL(
            new Blob([data.buffer], { type: "video/avi" })
          );
          console.log(url);
          let down = document.querySelector(".downVideo");
          down.href = url;
          this.changedVideo = true;
          this.percent = 0;
        })();
      } else {
        this.$message.error("请先选择视频和音频");
      }
    },
    //改变视频格式
    changeVideoFormat() {
      if (this.file) {
        const { createFFmpeg, fetchFile } = FFmpeg;
        const ffmpeg = createFFmpeg();
        let url = null;
        (async () => {
          let { name } = this.file;
          ffmpeg.setProgress(({ ratio }) => {
            this.percent = Math.floor(ratio * 100);
          });
          await ffmpeg.load();
          ffmpeg.FS("writeFile", name, await fetchFile(this.file));
          await ffmpeg.run("-i", name, "output.mp4");
          const data = ffmpeg.FS("readFile", "output.mp4");
          url = URL.createObjectURL(
            new Blob([data.buffer], { type: "video/mp4" })
          );
          console.log(url);
          let down = document.querySelector(".downVideo");
          down.href = url;
          this.changedVideo = true;
          this.percent = 0;
        })();
      } else {
        this.$message.error("请先选择视频");
      }
    },
    //获取音频
    getVideoMuisc() {
      if (this.file) {
        const { createFFmpeg, fetchFile } = FFmpeg;
        const ffmpeg = createFFmpeg();
        let url = null;
        (async () => {
          let { name } = this.file;
          ffmpeg.setProgress(({ ratio }) => {
            this.percent = Math.floor(ratio * 100);
          });
          await ffmpeg.load();
          ffmpeg.FS("writeFile", name, await fetchFile(this.file));
          await ffmpeg.run("-i", name, "-an", "output.avi");
          const data = ffmpeg.FS("readFile", "output.avi");
          url = URL.createObjectURL(
            new Blob([data.buffer], { type: "video/avi" })
          );
          console.log(url);
          let down = document.querySelector(".downVideo");
          down.href = url;
          this.changedVideo = true;
          this.percent = 0;
        })();
      } else {
        this.$message.error("请先选择视频");
      }
    },
    //转换视频点击
    changedVideoBtn() {
      if (this.file && !this.funcUse) {
        this.funcUse = true;
        const { createFFmpeg, fetchFile } = FFmpeg;
        const ffmpeg = createFFmpeg();
        let url = null;
        (async () => {
          let { name } = this.file;
          ffmpeg.setProgress(({ ratio }) => {
            this.percent = Math.floor(ratio * 100);
          });
          await ffmpeg.load();
          ffmpeg.FS("writeFile", name, await fetchFile(this.file));
          await ffmpeg.run("-i", name, "output.avi");
          const data = ffmpeg.FS("readFile", "output.avi");
          url = URL.createObjectURL(
            new Blob([data.buffer], { type: "video/avi" })
          );
          console.log(url);
          let down = document.querySelector(".downVideo");
          down.href = url;
          this.changedVideo = true;
          setTimeout(()=>{
            this.percent = 0;
            this.funcUse = false;
          },1000)
        })();
      } else {
        this.$message.error("请先选择视频或者等待当前处理完毕");
      }
    },
    test(e) {
      let name = e.target.files[0].name;
      let myType = ["mp4", "avi"];
      let len = myType.length;
      for (let i = 0; i < len; i++) {
        if (name.indexOf(myType[i]) != -1) {
          this.$message({
            type: "success",
            message: "视频选择成功",
          });
          this.file = e.target.files[0];
          this.fileName = e.target.files[0].name;
          return;
        }
      }
      this.$message.error("请选择mp4,avi格式的视频");
    },
  },
};
</script>

<style lang="scss" scoped>
.EditorVideo {
  .ev_top {
    display: flex;
    justify-content: space-around;
    height: 2rem;
    border-bottom: 0.01rem solid #d8d8d8;
    .ev_title {
      line-height: 2rem;
    }
    .ev_quit {
      line-height: 2rem;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
  .ev_content {
    .ev_select_video {
      .ev_sbox_btn {
        display: flex;
        .ev_selectVideo_btn {
          width: 10rem;
          padding: 0.5rem 1rem 0.5rem 1rem;
          background-color: #e8e8e8;
          cursor: pointer;
          position: relative;
          margin: 1rem auto;
          .ev_sv_title {
            position: absolute;
            top: 0.7rem;
            left: 4rem;
            cursor: pointer;
          }
          .ev_file_select {
            opacity: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
        }
        .ev_selectMusic_btn {
          width: 10rem;
          padding: 0.5rem 1rem 0.5rem 1rem;
          background-color: #e8e8e8;
          cursor: pointer;
          position: relative;
          margin: 1rem auto;
          .ev_sm_title {
            position: absolute;
            top: 0.7rem;
            left: 4rem;
            cursor: pointer;
          }
          .ev_file_select {
            opacity: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
        }
      }
      .ev_sbox_progress {
        width: 20rem;
        margin: 0 auto;
      }
    }
    .ev_select_func {
      margin-top: 2rem;
      display: flex;
      justify-content: space-around;
      .ev_select_part {
        width: 15rem;
        padding: 1rem 0.5rem;
        background: #e8e8e8;
        margin: 0 1rem;
      }
    }
  }
  .ev_handle_result {
    width: 10rem;
    height: 4rem;
    background-color: #d8d8d8;
    margin: 2rem auto;
  }
}
</style>