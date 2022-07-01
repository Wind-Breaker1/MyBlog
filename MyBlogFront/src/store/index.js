import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogList: [],
    jottingList: [],
    blogsOfClassify: [],
    classifies: [],
    searchList: []
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
      state.blogsOfClassify = blogsOfClassify;
    },
    SAVECLASSIFIES(state, classifies) {
      state.classifies = classifies;
    },
    SAVESEARCHLIST(state, searchList) {
      state.searchList = searchList;
    },
  },
  actions: {
  },
  modules: {
  }
})
