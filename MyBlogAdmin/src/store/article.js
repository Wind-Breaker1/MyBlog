import { changeState, getArticleList, deleteArticle, getBlog, addArticle } from "../api/test";
const state = {
  articles: [],
  article:{}
};
const mutations = {
  ARTICLES(state, articles) {
    state.articles = articles;
  },
  ARTICLE(state, article) {
    state.article = article;
  }
};
const actions = {
  // 修改文章状态
  async changeState({ commit }, data ) {
    let result = await changeState(data);
    if (result.status === 200) {
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
    if (result.status == 200) {
      commit('ARTICLES', result.data);
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  // 增加文章
  async addArticle({ commit }, data) {
    let result = await addArticle(data);
    if (result.status === 200) {
      // commit('ARTICLES', result.data);
      return "ok"
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  // 获取文章
  async getBlog({ commit }, data) {
    let result = await getBlog(data);
    if (result.status == 200) {
      commit('ARTICLE', result.data.article);
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
