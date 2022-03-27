<template>
  <div class="comment">
    <div class="commentBox">
      <span class="iconfont icon-pinglun cb_icon"></span>
    </div>
    <div class="commentNum">{{user.commentNum}}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Comment",
  computed: {
    ...mapState("login", ["user"]),
  },
};
</script>

<style lang="scss" scoped>
.comment {
  position: relative;
  pointer-events: auto;
  cursor: pointer;
  margin-top: 1rem;
  color: #fff;
  .commentBox {
    .cb_icon {
      font-size: 1.5rem;
      &:hover {
        color: rgb(255, 82, 82);
      }
    }
    .commentNum {
      font-size: 0.8rem;
    }
  }
}
</style>