<template>
  <div id="myInput">
    <div class="searchBox">
      <input class="mi-input" type="text" placeholder="搜索你感兴趣的内容"/>
      <div class="iconfont icon-sousuo mi-search-icon"></div>
      <div>搜索</div>
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
    width: 20rem;
    height: 2.1rem;
    box-sizing: border-box;
    border: 0.01rem solid rgb(136, 136, 136);
    border-radius: 0.5rem;
    .mi-search-icon {
      width: 10%;
      height: 2.1rem;
      line-height: 2rem;
      border-radius: 0.5rem;
      font-weight: bold;
      right: 0;
      cursor: pointer;
    }
    .mi-search-icon:hover {
        color: rgb(53, 170, 224);
    }
    .mi-input {
      width: 90%;
      line-height: 2rem;
      border-radius: 0.5rem;
      padding: 0 0.5rem 0 1rem;
    }
  }
}

input {
  outline: none;
  border: none;
}
</style>