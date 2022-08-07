import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blogs: [],
    jottings: [],
    blogsOfClassify: [],
    classifies: [],
    searchs: [],
  },
  getters: {},
  mutations: {
    SAVEBLOG(state, blogs) {
      state.blogs = blogs;
    },
    SAVEJOTTING(state, jottings) {
      state.jottings = jottings;
    },
    SAVEBLOGSOFCLASSIFY(state, blogsOfClassify) {
      state.blogsOfClassify = blogsOfClassify;
    },
    SAVECLASSIFIES(state, classifies) {
      state.classifies = classifies;
    },
    SAVESEARCHLIST(state, searchs) {
      state.searchs = searchs;
    },
  },
  actions: {},
  modules: {},
});
