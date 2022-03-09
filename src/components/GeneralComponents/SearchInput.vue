<template>
  <div id="myInput">
    <div class="searchBox">
      <input class="mi-input" type="text" placeholder="搜索你感兴趣的内容" />
      <div class="searchBtnBox">
        <div class="iconfont icon-sousuo mi-search-icon"></div>
        <div class="searchTextBtn">搜索</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchInput",
};
</script>

<style lang="scss" scoped>
#myInput {
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
}

input {
  outline: none;
  border: none;
}
</style>