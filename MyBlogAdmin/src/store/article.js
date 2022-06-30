import { changeState, getArticleList, deleteArticle, getArticle, addArticle } from "../api/test";
const state = {
  articles: [],
  art:{}
};
const mutations = {
  ARTICLES(state, articles) {
    state.articles = articles;
  },
  ARTICLE(state, art) {
    state.art = art;
  }
};
const actions = {
  // 修改文章状态
  async changeState({ commit }, data ) {
    let result = await changeState(data);
    console.log(result)
    if (result.status == 200) {
      return 'ok';
    } else {
      return result;
    }
  },
  // 删除文章
  async deleteArticle({ commit }, data) {
    let result = await deleteArticle(data);
    if (result.status == 200) {
      // 本地持久化存储
      // localStorage.setItem("TOKEN", result.data.token);
      return 'ok';
    } else {
      return result;
    }
  },
  // 获取文章列表
  async getArticleList({ commit }) {
    let result = await getArticleList();
    console.log(result, 222)
    if (result.status == 200) {
      commit('ARTICLES', result.data);
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  // 增加文章
  async addArticle({ commit }, data) {
    let result = await addArticle(data);
    if (result.status == 0) {
      // commit('ARTICLES', result.data);
      return "ok"
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  // 获取文章
  async getArticle({ commit }, data) {
    let result = await getArticle(data);
    console.log(result)
    if (result.status == 0) {
      commit('ARTICLE', result.data);
    } else {
      return Promise.reject(new Error('faile'));
    }
  },

};
const getters = {

};
export default {
  state,
  mutations,
  actions,
  getters,
};
