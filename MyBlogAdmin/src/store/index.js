// import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import classify from "./classify";
import article from "./blogs";
import jotting from "./jotting";
import route from "./route";
import tags from "./tags";
Vue.use(Vuex);

export default new Vuex.Store({
	// vuex实现模块化开发,每个模块存放自己的数据
	getters: {
		routeList: state => state.route.routeList,
	},
	modules: {
		user,
		classify,
		article,
		jotting,
		route,
		tags,
	},
});
