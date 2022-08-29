import { updateTag, deleteTag, getTags, addTag } from "../api/api";
const state = {
	tags: [],
};
const mutations = {
	TAGS(state, tags) {
		state.tags = tags;
	},
};
const actions = {
	// 编辑专栏
	async updateTag({ commit }, data) {
		return await updateTag(data);
	},
	//删除专栏
	async deleteTag({ commit }, data) {
		return await deleteTag(data);
	},
	// 获取专栏列表
	async getTags({ commit }) {
		let result = await getTags();
		console.log(result);
		if (result.status == 200) {
			commit("TAGS", result.data);
		} else {
			console.log(result);
		}
	},

	async addTag({ commit }, data) {
		console.log(data);
		return await addTag(data);
	},
};
const getters = {
	tags(state) {
		return state.tags;
	},
};
export default {
	state,
	mutations,
	actions,
	getters,
};
