<template>
  <div class="myInput">
    <div class="searchBox">
      <input
        class="mi-input"
        :class="{ miInput: this.backColor == `black` }"
        type="text"
        placeholder="搜索你感兴趣的内容"
        v-model="videoSearch"
      />
      <div class="searchBtnBox">
        <div class="iconfont icon-sousuo mi-search-icon"></div>
        <div class="searchTextBtn">搜索</div>
      </div>
    </div>
    <div class="mi_search_result" v-show="disSwich">
      <div
        v-for="(item, index) of resVideoWord"
        :key="index"
        class="misr_select"
      >
        <a :href="item.url">{{ item.videoName }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SearchInput",
  data() {
    return {
      videoSearch: "",
      disSwich: false,
      resVideoWord: [],
    };
  },
  computed: {
    ...mapState({
      backColor: (state) => state.appSet.backColor,
      videoInfo: (state) => state.video.videoInfo,
    }),
  },
  watch: {
    videoSearch: {
      handler(newVal) {
        if(newVal == "") {
          this.disSwich = false;
          return;
        }
        this.disSwich = true;
        this.resVideoWord = [];
        let len = this.videoInfo.length;
        for (let i = 0; i < len; i++) {
          if ( this.videoInfo[i].videoName != null && this.videoInfo[i].videoName.indexOf(newVal) != -1) {
            this.resVideoWord.push({
              videoName: this.videoInfo[i].videoName,
              url: this.videoInfo[i].videoSrc,
            });
          }
          if (this.resVideoWord.length > 5) {
            break;
          }
        }
      },
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.myInput {
  position: relative;
  .searchBox {
    display: flex;
    justify-content: space-between;
    width: 20rem;
    height: 2.1rem;
    box-sizing: border-box;
    border: 0.01rem solid rgb(136, 136, 136);
    border-radius: 0.5rem;
    .mi-input {
      width: 16rem;
      line-height: 2rem;
      border-radius: 0.5rem;
      padding: 0 0.5rem 0 1rem;
    }
    .searchBtnBox {
      display: flex;
      font-weight: bold;
      cursor: pointer;
      .mi-search-icon {
        width: 1rem;
        height: 2.1rem;
        line-height: 2rem;
        border-radius: 0.5rem;
      }
      .searchTextBtn {
        width: 3rem;
        line-height: 2rem;
      }
    }
    .searchBtnBox:hover {
      color: rgb(53, 170, 224);
    }
  }
  .mi_search_result {
    position: absolute;
    width: 18rem;
    left: 0.2rem;
    background: rgb(239, 239, 239);
    z-index: 2;
    text-align: left;
    .misr_select {
      padding: 0.2rem 0.2rem;
      cursor: pointer;
    }
  }
}

.miInput {
  background-color: #161722;
  color: #fff;
}

input {
  outline: none;
  border: none;
}
a {
  text-decoration: none;
  color: rgb(109, 177, 255);
  &:hover {
    color: rgb(254, 197, 197);
  }
}
</style>