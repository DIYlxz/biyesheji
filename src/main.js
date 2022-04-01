import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";

//模拟数据
// import "./mock/loginServe.js"
// import "./mock/videoData.js"
import "./assets/font/iconfont.css";
import "normalize.css/normalize.css";
//引入echarts
import * as echarts from "echarts/core";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { MapChart, BarChart, PieChart, LineChart, RadarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
  GridComponent,
  GeoComponent,
  MapChart,
  CanvasRenderer,
  BarChart,
  PieChart,
  LineChart,
  RadarChart,
  LegendComponent
]);

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;

Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
