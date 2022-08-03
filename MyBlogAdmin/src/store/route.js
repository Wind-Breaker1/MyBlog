import { getRouteList, saveSecondRoute, updatRoute, deleteRoute, saveFirstRoute } from '../api/test';

const state = {
	routeList: [],
};
const mutations = {
	ROUTELIST(state, routeList) {
		state.routeList = routeList;
	},
	// USERINFO(state, info) {
	//   state.info = info;
	// },
	// USERLIST(state, userlist) {
	//   state.userList = userlist;
	// },
	// //清除本地数据
	// CLEAR(state) {
	//   state.token = '';
	//   state.info = {};
	//   clearToken();
	// }
};
const actions = {
	// 新增一级路由
	async addFirstRoute({ commit }, route) {
		let result = await saveFirstRoute(route);
		console.log(result);
		if (result.status == 200) {
			return 'ok';
		} else {
			return result;
		}
	},
	async addSecondRoute({ commit }, route) {
		let result = await saveSecondRoute(route);
		console.log(result);
		if (result.status == 200) {
			return 'ok';
		} else {
			return result;
		}
	},
	// 更新获取路由信息
	async updatRoute({ commit }, data) {
		let result = await updatRoute(data);
		console.log(result);
		if (result.status == 200) {
			return 'ok';
		} else {
			return Promise.reject(new Error('faile'));
		}
	},
	// 获取用户列表
	async deleteRoute({ commit }, data) {
		let result = await deleteRoute(data);
		if (result.status == 200) {
			commit('USERLIST', result.data);
		} else {
			return Promise.reject(new Error('faile'));
		}
	},
	// 获取路由信息
	async getRouteList({ commit }, role) {
		let result = await getRouteList({ role: role });
		console.log(result);
		if (result.status == 200) {
			commit('ROUTELIST', result.data);
			return 'ok';
		} else {
			return Promise.reject(new Error('faile'));
		}
	},
};
const getters = {
	routeInfoList(state) {
		const routeInfoList = [];
		state.routeList.forEach(item => {
			if (item.name) {
				routeInfoList.push({
					id: item._id,
					path: '/admin/' + item.path,
					name: item.name,
					icon: item.meta.icon
				})
			}
		})
		return routeInfoList;
	}
};
export default {
	state,
	mutations,
	actions,
	getters,
};
