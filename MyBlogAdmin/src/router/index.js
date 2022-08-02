import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./router";
import { getToken } from "@/util";
import store from "@/store";
Vue.use(VueRouter);
// const routes = Router;

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});
let flag = true;
router.beforeEach((to, from, next) => {
	// console.log(getToken(), 12)
	// 如果已登录
	console.log(1, getToken());
	if (getToken()) {
		console.log(2);
		if (flag) {
			//获取有权限的路由进行组装
			console.log(store);
			store.dispatch;
			const routeList = store.getters.routeList;
			console.log(routeList);
			if (routeList.length > 0) {
				routeList.forEach(item => {
					router.addRoute("home", {
						path,
						name: item.name,
						component: () => import(`@/views/${item.component}`),
						meta,
					});
				});
			}
			console.log(router.getRoutes(), router);
			flag = false;

			// next({ ...to, replace: true });
			// next(false);
		}
		// else {
		// 		console.log(to.path, 5);
		// 		if ("/loginorregister" === to.path) {
		// 			if (from.path === "/loginorregister" || from.path === "/") {
		// 				next("/admin");
		// 			}
		// 			console.log(from.path, 6);
		// 			next(from.path);
		// 		} else {
		// 			console.log(to.path, 8);
		// 			next();
		// 		}
		// 	}
	} else {
		//未登录
		console.log(to, 7);
		if (to.path !== "/loginorregister") {
			next(false);
		} else {
			next();
		}
	}
});

export default router;
