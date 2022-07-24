import { getClassifyList, deleteClassify, compile, addclassify } from "../api/test";
import { setClassifies,getClassifies } from '../util'
const state = {
  classifies: getClassifies() || []
};
const mutations = {
  CLASSIFYLIST(state, classifies) {
    state.classifies = classifies;
  },

};
const actions = {
  // 编辑专栏
  async compile({ commit }, data) {
    let result = await compile(data);
    if (result.status == 0) {
      return 'ok';
    } else {
      return result;
    }
  },
  //删除专栏
  async deleteClassify({ commit }, data) {
    let result = await deleteClassify(data);
    if (result.status == 0) {
      // 本地持久化存储
      // localStorage.setItem("TOKEN", result.data.token);
      return 'ok';
    } else {
      return result;  
    }
  },
  // 获取专栏列表
  async getClassifyList({ commit }) {
    let result = await getClassifyList();
    if (result.status == 200) {
      commit('CLASSIFYLIST', result.data);
      setClassifies(JSON.stringify(result.data));
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  
  async addclassify({ commit }, data) {
    let result = await addclassify(data);
    if (result.status == 200) {
      return result;
    } else {
      return result;
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
