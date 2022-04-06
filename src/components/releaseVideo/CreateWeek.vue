<template>
  <div class="createWeek">
    <div class="cw_title">创作周报</div>
    <div>
      <div>2022年03月28日-2022年04月03日</div>
    </div>
    <div class="cw_title">上周创作排名</div>
    <div class="cw_ranking">
      <div>上周你的创作表现超过了0%的同级创作者</div>
      <div>上周你的视频播放量超过了0%的抖音用户</div>
    </div>
    <div class="cw_title">上周关键数据</div>
    <div class="cw_author_data">
      <div>
        <div>发表作品量</div>
        <div>0</div>
      </div>
      <div>
        <div>新增播放量</div>
        <div>0</div>
      </div>
      <div>
        <div>新增点赞量</div>
        <div>0</div>
      </div>
      <div>
        <div>新增粉丝量</div>
        <div>0</div>
      </div>
      <div>
        <div>直播人次</div>
        <div>0</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateWeek",
};
</script>

<style lang="scss" scoped>
.createWeek {
  .cw_title {
    font-weight: bold;
    font-size: 1.5rem;
    text-align: left;
  }
  .cw_ranking {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 1rem 0;
    & > div {
      width: 45%;
      height: 5rem;
      line-height: 5rem;
      background-color: #eeeeee;
    }
  }
  .cw_author_data {
    text-align: left;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    & > div {
      width: 25%;
      margin: 1rem;
      height: 5rem;
      background-color: #eeeeee;
      box-sizing: border-box;
      padding: 0.5rem;
    }
  }
}
</style>