<template>
  <div class="publish">
  	<!-- 下载按钮 -->
    <a id="downLoadLink" style="display: none;"></a>
    <video ref="video"></video>
    <!-- 视频录制或暂停 -->
    <div @click="recordOrStop">视频录制</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mediaStreamTrack: {}, // 退出时关闭摄像头
      video_stream: '', // 视频stream
      recordedBlobs: [], // 视频音频 blobs
      isRecord: false, // 视频是否正在录制
    };
  },
  mounted() {
    // 进入页面 调用摄像头
    this.getCamera();
  },
  methods: {
    // 调用打开摄像头功能
    getCamera() {
      // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
          .then((stream) => {
          // 摄像头开启成功
          this.mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[0];
          this.video_stream = stream;
          this.$refs.video.srcObject = stream;
          this.$refs.video.play();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 录制或暂停
    recordOrStop() {
      if (this.isRecord) {
        this.stop();
      } else {
        this.record();
      }
    },
    // 视频录制
    record() {
      console.log('record');
      this.isRecord = !this.isRecord;
      let mediaRecorder;
      let options;
      this.recordedBlobs = [];
      if (typeof MediaRecorder.isTypeSupported === 'function') {
        // 根据浏览器来设置编码参数
        if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
          options = {
            MimeType: 'video/webm;codecs=h264',
          };
        } else if (MediaRecorder.isTypeSupported('video/webm;codecs=h264')) {
          options = {
            MimeType: 'video/webm;codecs=h264',
          };
        } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
          options = {
            MimeType: 'video/webm;codecs=vp8',
          };
        }
        mediaRecorder = new MediaRecorder(this.video_stream, options);
      } else {
        // console.log('isTypeSupported is not supported, using default codecs for browser');
        console.log('当前不支持isTypeSupported，使用浏览器的默认编解码器');
        mediaRecorder = new MediaRecorder(this.video_stream);
      }
      mediaRecorder.start();
      // 视频录制监听事件
      mediaRecorder.ondataavailable = e => {
        console.log(e);
        // 录制的视频数据有效
        if (e.data && e.data.size > 0) {
          this.recordedBlobs.push(e.data);
        }
      };
      // 停止录像后增加下载视频功能，将视频流转为mp4格式
      mediaRecorder.onstop = () => {
        const blob = new Blob(this.recordedBlobs, { type: 'video/mp4' });
        this.recordedBlobs = [];
        // 将视频链接转换完可以用于在浏览器上预览的本地视频
        const videoUrl = window.URL.createObjectURL(blob);
        // 设置下载链接
        document.getElementById('downLoadLink').href = videoUrl;
        // 设置下载mp4格式视频
        document.getElementById('downLoadLink').download = 'media.mp4';
        document.getElementById('downLoadLink').innerHTML = 'DownLoad video file';
        // 生成随机数字
        const rand = Math.floor((Math.random() * 1000000));
        // 生成视频名
        const name = `video${rand}.mp4`;
        
        // setAttribute() 方法添加指定的属性，并为其赋指定的值
        document.getElementById('downLoadLink').setAttribute('download', name);
        document.getElementById('downLoadLink').setAttribute('name', name);
		
		// 0.5s后自动下载视频
        setTimeout(() => {
          document.getElementById('downLoadLink').click();
        }, 500);
      };
    },
    // 停止录制
    stop() {
      this.isRecord = !this.isRecord;
      if (!this.$refs.video.srcObject) return;
      const stream = this.$refs.video.srcObject;
      const tracks = stream.getTracks();
      // 关闭摄像头和音频
      tracks.forEach(track => {
        track.stop();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.publish {
  color: #fff;
  video {
    width: 100%;
    height: 100vh;
  }
  div {
    position: absolute;
    left: calc(50% - 80px);
    bottom: 0;
    height: 40px;
    width: 160px;
    font-size: 14px;
    border-radius: 10px;
    line-height: 40px;
    background-color: rgb(25, 179, 179);
    text-align: center;
  }
}
</style>
