<template>
  <div class="changeSkin" @click="changeSkinBtn" :class="{ changeSkinBack: this.backColor == `black` }">
      <div class="iconfont icon-huanfu csIconStyle"></div>
  </div>
</template>

<script>
import { mapMutations,mapState } from "vuex";

export default {
    name: "ChangeSkin",
    computed: {
        ...mapState("appSet", ["backColor"]),
    },
    methods: {
        ...mapMutations("appSet", ["setBackColore"]),
        changeSkinBtn() {
            this.setBackColore();
        }
    }
}
</script>

<style lang="scss" scoped>
.changeSkin {
    position: absolute;
    width: 2rem;
    height: 2rem;
    background-color: rgb(209, 209, 209);
    border-radius: 50%;
    bottom: 4rem;
    right: 1rem;
    text-align: center;
    .csIconStyle {
        line-height: 1.8rem;
        cursor: pointer;
    }
    .csIconStyle:hover {
        color: rgb(232, 232, 255);
    }
}

.changeSkinBack {
    background-color: #2e2f3b;
}
</style>