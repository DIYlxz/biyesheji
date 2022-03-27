<template>
  <div class="collection">
    <div class="collectionBox">
      <span class="iconfont icon-shoucangxiao ctb_icon"></span>
    </div>
    <div class="collectionNum">{{user.collectionNum}}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Collection",
  computed: {
    ...mapState("login", ["user"]),
  },
};
</script>

<style lang="scss" scoped>
.collection {
  position: relative;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  margin-top: 1rem;
  .collectionBox {
    .ctb_icon {
      font-size: 1.5rem;
      &:hover {
        color: rgb(255, 82, 82);
      }
    }
    .collectionNum {
      font-size: 0.8rem;
    }
  }
}
</style>