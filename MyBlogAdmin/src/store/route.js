import { getRoutes, addSecondRoute, updateRoute, deleteRoute, addFirstRoute, getRouteList } from "../api/api";

const state = {
	routeList: [],
	routes: [],
};
const mutations = {
	ROUTELIST(state, routeList) {
		state.routeList = routeList;
	},
	ROUTES(state, routes) {
		state.routes = routes;
	},
	CLEARROUTES(state) {
		state.routes = [];
	},
};
const actions = {
	// 新增一级路由
	async addFirstRoute({ commit }, route) {
		return await addFirstRoute(route);
	},
	// 新增二级路由
	async addSecondRoute({ commit }, route) {
		return await addSecondRoute(route);
	},
	// 更新获取路由信息
	async updatRoute({ commit }, data) {
		return await updateRoute(data);
	},
	//删除路由
	async deleteRoute({ commit }, data) {
		return await deleteRoute(data);
	},
	// 获取有权限路由列表
	async getRoutes({ commit }, role) {
		let result = await getRoutes({ role: role });
		if (result.status == 200) {
			commit("ROUTES", result.data);
		} else {
			console.log(result);
		}
	},
	// 获取所有路由
	async getRouteList({ commit }, role) {
		let result = await getRouteList();
		if (result.status == 200) {
			commit("ROUTELIST", result.data);
		} else {
			console.log(result);
		}
	},
	// 清空routelist
	clearRoutes({ commit }) {
		commit("CLEARROUTES");
	},
};
// 返回特定路由数据
const getters = {
	// 路由管理需要的路由信息和动态导航栏
	navRouteList(state) {
		const routeList = [];
		state.routes.forEach(item => {
			console.log(!item.meta.NotShow);
			if (!item.meta.NotShow) {
				routeList.push(item);
			}
		});
		return routeList;
	},
	// 路由拦截需要的路由信息
	routes(state) {
		const routes = [];
		state.routes.forEach(item => {
			if (item.name) {
				routes.push({
					id: item._id,
					path: item.path,
					name: item.name,
					component: item.component,
					meta: item.meta,
				});
			}
		});
		return routes;
	},
};
export default {
	state,
	mutations,
	actions,
	getters,
};
