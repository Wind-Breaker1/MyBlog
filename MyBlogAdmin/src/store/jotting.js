import { getJottings, changeJottingState, deleteJotting, addJotting, getJotting, updateJotting } from "../api/api";
const state = {
	jottings: [],
	jotting: {},
};
const mutations = {
	JOTTINGS(state, jottings) {
		state.jottings = jottings;
	},
	JOTTING(state, jotting) {
		state.jotting = jotting;
	},
};
const actions = {
	// 修改文章状态
	async changeJottingState({ commit }, data) {
		return await changeJottingState(data);
	},
	async updateJotting({ commit }, data) {
		return await updateJotting(data);
	},
	// 删除文章
	async deleteJotting({ commit }, data) {
		return await deleteJotting(data);
	},
	// 获取文章列表
	async getJottings({ commit }) {
		let result = await getJottings();
		if (result.status == 200) {
			commit("JOTTINGS", result.data);
		} else {
			console.log(result);
		}
	},
	// 添加随笔
	async addJotting({ commit }, data) {
		return await addJotting(data);
	},
	// 获取某一随笔
	async getJotting({ commit }, data) {
		let result = await getJotting(data);
		if (result.status == 200) {
			commit("JOTTING", result.data);
		} else {
			console.log(result);
		}
	},
};
const getters = {
	jottings(state) {
		return state.jottings;
	},
	jotting(state) {
		return state.jotting;
	},
};
export default {
	state,
	mutations,
	actions,
	getters,
};
