import Vue from 'vue'
import Vuex from 'vuex'
import login from "./modules/login"
import appSet from './modules/appSet';
import video from './modules/video';
import { actions } from './actions';

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules: {
    login,
    appSet,
    video,
  }
})
