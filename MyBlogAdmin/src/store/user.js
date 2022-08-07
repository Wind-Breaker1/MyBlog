import { getUsers, login, deleteUser, register, getUser, updatePassword, logout, updateUserInfo } from "../api/api";
import { setToken, getToken, clearToken, setUserInfo, getUserInfo } from "../util";
const state = {
	token: getToken() || "",
	username: getUserInfo() ? getUserInfo().username : "",
	userList: [],
};
const mutations = {
	USERLOGIN(state, token) {
		state.token = token;
	},
	USERINFO(state, info) {
		state.info = info;
	},
	USERLIST(state, userlist) {
		state.userList = userlist;
	},
	//清除本地数据
	CLEAR(state) {
		state.token = "";
		state.info = {};
		clearToken();
	},
};
const actions = {
	// 用户注册
	async register({ commit }, user) {
		return await register(user);
	},
	// 用户登录
	async login({ commit }, data) {
		let result = await login(data);
		if (result.status == 200) {
			setUserInfo(result.data.user);
			setToken(result.data.token);
		} else {
			return result;
		}
	},
	// 获取用户列表
	async getUsers({ commit }) {
		let result = await getUsers();
		if (result.status == 200) {
			commit("USERLIST", result.data);
		} else {
			console.log(result);
		}
	},
	// 删除用户
	async deleteUser({ commit }, data) {
		return await deleteUser(data);
	},
	// 更新用户信息
	async updateUserInfo({ commit }, data) {
		return await updateUserInfo(data);
	},
	// 更新密码
	async updatePassword({ commit }, data) {
		return await updatePassword(data);
	},
	// 获取用户信息
	async getUser({ commit }) {
		let result = await getUser();
		if (result.code == 200) {
			commit("USERINFO", result.data);
		} else {
			return result;
		}
	},

	// 退出登录
	async logout({ commit }) {
		let result = await logout();
		if (result.status == 200) {
			commit("CLEAR");
		} else {
			return result;
		}
	},
};
const getters = {
	userList(state) {
		return state.userList;
	},
};
export default {
	state,
	mutations,
	actions,
	getters,
};
