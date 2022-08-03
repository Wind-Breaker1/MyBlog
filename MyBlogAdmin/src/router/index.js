import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./router";
import { getToken, getUserInfo } from "@/util";
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
	console.log(1, to.path);
	if (getToken()) {
		console.log(2);
		if (to.path === "/login") {
			console.log(111);
			next({ path: "" });
			NProgress.done();
		} else {
			console.log(store.getters.routeList);
			if (store.getters.routeList.length === 0) {
				// isRelogin.show = true
				// 判断当前用户是否已拉取完user_info信息
				console.log("object");
				new Promise(async (resolve, reject) => {
					await store.dispatch("getRouteList", getUserInfo().role);
				})
					.then(accessRoutes => {
						// 根据roles权限生成可访问的路由表
						accessRoutes.forEach(route => {
							// if (!isHttp(route.path)) {
							router.addRoute(route); // 动态添加可访问路由表
							// }
						});
						next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
					})
					// .catch(() => {});
					// isRelogin.show = false
					// store
					// 	.dispatch("getRouteList", getUserInfo().role)
					// 	.then(accessRoutes => {
					// 		// 根据roles权限生成可访问的路由表
					// 		accessRoutes.forEach(route => {
					// 			// if (!isHttp(route.path)) {
					// 			router.addRoute(route); // 动态添加可访问路由表
					// 			// }
					// 		});
					// 		next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
					// 	})
					.catch(err => {
						//捕捉错误，退出登录
						store.dispatch("LogOut").then(() => {
							ElMessage.error(err);
							next({ path: "/" });
						});
					});
				console.log(router.getRoutes());
			} else {
				console.log(router.getRoutes());
				next();
			}
		}
		// if (flag) {
		// 	//获取有权限的路由进行组装
		// 	console.log(store);
		// 	const routeList = store.getters.routeList;
		// 	console.log(routeList, "routelist");
		// 	if (routeList.length > 0) {
		// 		routeList.forEach(item => {
		// 			router.addRoute("home", {
		// 				path,
		// 				name: item.name,
		// 				component: () => import(`@/views/${item.component}`),
		// 				meta,
		// 			});
		// 		});
		// 	}
		// 	console.log(router.getRoutes(), "router");
		// 	flag = false;

		// next({ ...to, replace: true });
		// next(false);
		// }
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
