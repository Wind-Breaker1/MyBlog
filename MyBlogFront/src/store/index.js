import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogList: [],
    jottingList: [],
    blogsOfClassify:[]
  },
  getters: {

  },
  mutations: {
    SAVEBLOG(state, bloglist) {
      state.blogList = bloglist;
    },
    SAVEJOTTING(state, jottinglist) {
      state.jottingList = jottinglist;
    },
    SAVEBLOGSOFCLASSIFY(state, blogsOfClassify) {
      state.blogsOfClassify = blogsOfClassify
    }
  },
  actions: {
  },
  modules: {
  }
})
