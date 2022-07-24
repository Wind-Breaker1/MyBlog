import { getJottingList, changeJottingState, deleteJotting, addJotting, getJotting } from "../api/test";
const state = {
  jottings: [],
  jotting: {}
};
const mutations = {
  JOTTINGS(state, jottings) {
    state.jottings = jottings;
  },
  JOTTING(state, jotting) {
    state.jotting = jotting;
  }
};
const actions = {
  // 修改文章状态
  async changeJottingState({ commit }, data) {
    let result = await changeJottingState(data);
    if (result.status == 0) {
      return 'ok';
    } else {
      return result;
    }
  },
  // 删除文章
  async deleteJotting({ commit }, data) {
    let result = await deleteJotting(data);
    if (result.status == 0) {
      // 本地持久化存储
      // localStorage.setItem("TOKEN", result.data.token);
      return 'ok';
    } else {
      return result;
    }
  },
  // 获取文章列表
  async getJottingList({ commit }) {
    let result = await getJottingList();
    if (result.status == 200) {
      commit('JOTTINGS', result.data);
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  // 添加随笔
  async addJotting({ commit },data) {
    let result = await addJotting(data);
    if (result.status == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  // 获取某一随笔
  async getJotting({ commit }, data) {
    let result = await getJotting(data);
    console.log(result)
    if (result.status == 200) {
      commit('JOTTING', result.data);
      return 'ok'
    } else {
      return Promise.reject(new Error(result));
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
