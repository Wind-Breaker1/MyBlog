import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import classify from './classify'
import article from './article'
import jotting from './jotting'
Vue.use(Vuex)

export default new Vuex.Store({
  // vuex实现模块化开发,每个模块存放自己的数据
  modules: {
    user,
    classify,
    article,
    jotting
  }
})
