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
    name: "MainPage",
    component: () => import("../views/MainPage/index.vue")
  },
  {
    path: "/uploadVideo",
    name: "UploadVideo",
    component: () => import("../views/UploadVideo/index.vue"),
    children: [{
      path: "",
      component: () => import("../views/UploadVideo/UploadVideoRight.vue"),
    },{
      path: "contentMessage",
      component: () => import("../components/releaseVideo/ContentMessage.vue"),
    }],
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
