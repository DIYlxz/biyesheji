import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login/index.vue"

Vue.use(VueRouter)

// 防止访问同一个路由出错
const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home/index.vue")
  },
  {
    path: "/mainPage",
    component: () => import("../views/MainPage/index.vue"),
    children: [{
      path: "",
      component: () => import("../components/MainPage/WorksList.vue"),
    }],
  },
  {
    path: "/uploadVideo",
    component: () => import("../views/UploadVideo/index.vue"),
    children: [{
      path: "",
      component: () => import("../views/UploadVideo/UploadVideoRight.vue"),
    }, {
      path: "contentMessage",
      component: () => import("../components/releaseVideo/ContentMessage.vue"),
    }, {
      path: "aggregateMessage",
      component: () => import("../components/releaseVideo/AggregateMessage.vue"),
    }, {
      path: "firstPage",
      component: () => import("../components/releaseVideo/FirstPage.vue"),
    }, {
      path: "overviewData",
      component: () => import("../components/releaseVideo/OverviewData.vue"),
    }, {
      path: "worksData",
      component: () => import("../components/releaseVideo/WorksData.vue"),
    }
      , {
      path: "createWeek",
      component: () => import("../components/releaseVideo/CreateWeek.vue"),
    }],
  },
  {
    path: "/record",
    name: "Record",
    component: () => import("../views/Record/index.vue"),
  },
  {
    path: "/luxiang",
    name: "Luxiang",
    component: () => import("../views/Luxiang/index.vue"),
  },
  {
    path: "/chartRoom",
    name: "ChartRoom",
    component: () => import("../views/ChartRoom/index.vue"),
  },
  {
    path: "/editorVideo",
    name: "EditorVideo",
    component: () => import("../views/EditorVideo/index.vue"),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//全局前置守卫
// router.beforeEach((to, from, next) => {
//   if() {}
// })

export default router
