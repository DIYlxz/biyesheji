import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"

// socket 连接参数
const socketOptions = {
  autoConnect: false,       // 自动连接,需要在指定情况下才连接socket
}

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
// 注册
Vue.use(
  new VueSocketIO({
    debug: false,   // debug调试，生产建议关闭
    connection: SocketIO("http://localhost:8010", socketOptions),
    store,          // 如果没有使用到store可以不用写
  })
)

new Vue({
  // 这里为全局监听socket事件消息，监听函数这里只写了一点，其实很有很多事件。
  sockets: {
    connecting() {
      console.log('正在连接')
    },
    disconnect() {
      console.log("Socket 断开");
    },
    connect_failed() {
      console.log('连接失败')
    },
    connect() {
      console.log('socket connected')
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
