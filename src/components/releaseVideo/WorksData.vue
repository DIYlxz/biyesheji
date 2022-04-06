<template>
  <div class="worksData">
    <div class="wd_title">作品数据</div>
    <div class="wd_firstLine">
      <div>
        <div>总作品数</div>
        <div>0</div>
      </div>
      <div>
        <div>播放量</div>
        <div>0</div>
      </div>
      <div>
        <div>粉丝量</div>
        <div>0</div>
      </div>
    </div>
    <div class="wd_secondLine">
      <div>
        <div>作品点赞</div>
        <div>0</div>
      </div>
      <div>
        <div>作品收藏</div>
        <div>0</div>
      </div>
      <div>
        <div>作品分享</div>
        <div>0</div>
      </div>
    </div>
    <div id="wdLineChart"></div>
  </div>
</template>

<script>
export default {
  name: "WorksData",
  mounted() {
    this.showLineChart();
  },
  methods: {
    //折线统计图
    showLineChart() {
      let myChart = this.$echarts.init(document.querySelector("#wdLineChart"));
      myChart.setOption({
        title: {
          text: "作品各个数据",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["播放量", "粉丝量", "点赞量", "收藏量", "分享量"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "播放量",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "粉丝量",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "点赞量",
            type: "line",
            stack: "Total",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "收藏量",
            type: "line",
            stack: "Total",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "分享量",
            type: "line",
            stack: "Total",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.worksData {
  .wd_title {
    font-weight: bold;
    font-size: 1.5rem;
    text-align: left;
  }
  .wd_firstLine {
    display: flex;
    justify-content: space-around;
    text-align: left;
    margin: {
      top: 1rem;
      bottom: 1rem;
    }
    & > div {
      width: 15rem;
      height: 6rem;
      background-color: #eeeeee;
      margin: {
        right: 1rem;
      }
      padding: 0.5rem 0.5rem;
      box-sizing: border-box;
    }
  }
  .wd_secondLine {
    display: flex;
    justify-content: space-around;
    text-align: left;
    & > div {
      width: 15rem;
      height: 6rem;
      background-color: #eeeeee;
      margin: {
        right: 1rem;
      }
      padding: 0.5rem 0.5rem;
      box-sizing: border-box;
    }
  }
  #wdLineChart {
    margin-top: 1rem;
    width: 100%;
    height: 20rem;
  }
}
</style>