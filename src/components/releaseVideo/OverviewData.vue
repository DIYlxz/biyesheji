<template>
  <div class="overviewData">
    <div class="od_title">数据总览</div>
    <div class="od_account_diagnosis">
      <div class="od_small_title">
        <div>账号诊断</div>
      </div>
      <div class="od_ad_content">
        <div class="od_adc_left">
          <div class="od_adcl_small_box">
            <div class="od_adcl_title">投稿数</div>
            <div class="od_adcl_info">你的投稿数为<span>0</span></div>
          </div>
          <div class="od_adcl_small_box">
            <div class="od_adcl_title">视频播放量</div>
            <div class="od_adcl_info">你的视频播放量为<span>0</span></div>
          </div>
          <div class="od_adcl_small_box">
            <div class="od_adcl_title">视频完播率</div>
            <div class="od_adcl_info">你的视频完播率为<span>0</span></div>
          </div>
          <div class="od_adcl_small_box">
            <div class="od_adcl_title">互动指数</div>
            <div class="od_adcl_info">你的互动指数为<span>0</span></div>
          </div>
          <div class="od_adcl_small_box">
            <div class="od_adcl_title">粉丝净增量</div>
            <div class="od_adcl_info">你的新增粉丝数为<span>0</span></div>
          </div>
        </div>
        <div class="od_adc_right">
          <div class="od_adcr_box" id="radarChart"></div>
        </div>
      </div>
    </div>
    <div class="od_recommend">
      <div class="od_recommend_title">建议推荐</div>
      <div class="od_recommend_text">再接再厉！</div>
      <div class="od_recommend_title">评语</div>
      <div class="od_recommend_text">你是真的强啊！！！</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OverviewData",
  mounted() {
    this.showRadarChart();
  },
  methods: {
    //构建雷达图
    showRadarChart() {
      let myChart = this.$echarts.init(document.querySelector("#radarChart"));
      myChart.setOption({
        legend: {
          bottom: 16,
        },
        tooltip: {
          trigger: "axis",
        },
        radar: {
          indicator: [
            { name: "投稿数", max: 1000 },
            { name: "粉丝净增量", max: 5000 },
            { name: "互动指数", max: 40000 },
            { name: "完播率", max: 5000 },
            { name: "播放量", max: 20000 },
          ],
          center: ["50%", "52%"],
          radius: 80,
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            areaStyle: {},
            tooltip: {
              trigger: "item",
            },
            itemStyle: {
              color: "rgb(182,182,182)",
            },
            data: [
              {
                value: [200, 1500, 15461, 2151, 13210],
              },
            ],
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.overviewData {
  position: relative;
  .od_title {
    font-weight: bold;
    font-size: 1.5rem;
    text-align: left;
  }
  .od_account_diagnosis {
    .od_small_title {
      display: flex;
      font-size: 1.25rem;
      font-weight: bold;
      margin-top: 0.5rem;
    }
    .od_ad_content {
      display: flex;
      justify-content: space-between;
      .od_adc_left {
        .od_adcl_small_box {
          margin-top: 1rem;
          .od_adcl_title {
            text-align: left;
            font-weight: bold;
          }
          .od_adcl_info {
            text-align: left;
            color: rgb(119, 126, 135);
            margin-top: 0.5rem;
          }
        }
      }
      #radarChart {
        width: 25rem;
        height: 100%;
        background-color: rgb(247, 249, 251);
      }
    }
  }
  .od_recommend {
    .od_recommend_title {
      font-weight: bold;
      font-size: 1.25rem;
      text-align: left;
      margin: {
        top: 1rem;
        bottom: 1rem;
      }
    }
    .od_recommend_text {
      text-align: left;
    }
  }
}
</style>