import { getBlogs, updateBlog, deleteBlog, getBlog, addBlog, changeBlogState } from "../api/api";
const state = {
	blogs: [],
	blog: {},
};
const mutations = {
	BLOGS(state, blogs) {
		state.blogs = blogs;
	},
	BLOG(state, blog) {
		state.blog = blog;
	},
};
const actions = {
	// 修改文章状态
	async changeBlogState({ commit }, _id) {
		return await changeBlogState(_id);
	},
	// 更新文章
	async updateBlog({ commit }, data) {
		return await updateBlog(data);
	},
	// 删除文章
	async deleteBlog({ commit }, data) {
		return await deleteBlog(data);
	},
	// 获取文章列表
	async getBlogs({ commit }) {
		let result = await getBlogs();
		if (result.status == 200) {
			commit("BLOGS", result.data);
		} else {
			console.log(result);
		}
	},
	// 增加文章
	async addBlog({ commit }, data) {
		return await addBlog(data);
	},
	// 获取文章
	async getBlog({ commit }, data) {
		let result = await getBlog(data);
		if (result.status == 200) {
			commit("BLOG", result.data.blog);
		} else {
			return result;
		}
	},
};
const getters = {
	blog(state) {
		return state.blog;
	},
	blogs(state) {
		return state.blogs;
	},
};
export default {
	state,
	mutations,
	actions,
	getters,
};
