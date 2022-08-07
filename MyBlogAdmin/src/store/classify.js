import { getClassifies, deleteClassify, updateClassifyTitle, addClassify } from "../api/api";
import { setClassifies, getClassifyList } from "../util";
const state = {
	classifies: [],
};
const mutations = {
	CLASSIFYLIST(state, classifies) {
		state.classifies = classifies;
	},
};
const actions = {
	// 编辑专栏
	async updateClassifyTitle({ commit }, data) {
		return await updateClassifyTitle(data);
	},
	//删除专栏
	async deleteClassify({ commit }, data) {
		return await deleteClassify(data);
	},
	// 获取专栏列表
	async getClassifies({ commit }) {
		let result = await getClassifies();
		if (result.status == 200) {
			commit("CLASSIFYLIST", result.data);
			setClassifies(result.data);
		} else {
			console.log(result);
		}
	},

	async addClassify({ commit }, data) {
		console.log(data);
		return await addClassify(data);
	},
};
const getters = {
	classifies(state) {
		return state.classifies;
	},
};
export default {
	state,
	mutations,
	actions,
	getters,
};
