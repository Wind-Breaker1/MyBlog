import { getUserList, reqUserLogin, deleteUser, reqUserRegister, updatePassword, logout } from "../api/test";
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
		let result = await reqUserRegister(user);
		if (result.status == 0) {
			return "ok";
		} else {
			return result;
		}
	},
	// 用户登录
	async userLogin({ commit }, data) {
		let result = await reqUserLogin(data);
		if (result.status == 200) {
			// commit('USERLOGIN', result.data.token);
			// 本地持久化存储
			// localStorage.setItem("TOKEN", result.data.token);
			setUserInfo(JSON.stringify(result.data.user));
			setToken(result.data.token);
			console.log(result);
			return "ok";
		} else {
			return Promise.reject(new Error("faile"));
		}
	},
	// 获取用户列表
	async getUserList({ commit }) {
		let result = await getUserList();
		if (result.status == 200) {
			commit("USERLIST", result.data);
		} else {
			return Promise.reject(new Error("faile"));
		}
	},
	// 删除用户
	async deleteUser({ commit }, data) {
		let result = await deleteUser(data);

		if (result.status == 0) {
			return "ok";
		} else {
			return result;
		}
	},
	// 更新密码
	async updatePassword({ commit }, data) {
		let result = await updatePassword(data);
		if (result.status == 0) {
			return "ok";
		} else {
			return result;
		}
	},

	// 获取用户信息
	async getUserInfo({ commit }) {
		let result = await reqUserInfo();
		// console.log(result)
		if (result.code == 200) {
			commit("USERINFO", result.data);
			return "ok";
		} else {
			return Promise.reject(new Error("faile"));
		}
	},

	// 退出登录
	// async logout({ commit }) {
	// 	let result = await logout();
	// 	if (result.status == 200) {
	// 		commit("CLEAR");
	// 		return "ok";
	// 	} else {
	// 		return result;
	// 	}
	// },
};
const getters = {};
export default {
	state,
	mutations,
	actions,
	getters,
};
