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
router.beforeEach( async(to, from, next) => {
	// console.log(getToken(), 12)
	// 如果已登录
	if (getToken()) {
		if (to.path === "/login") {
			next({ path: "/admin" });
			NProgress.done();
		} else {
			if (store.getters.routeList.length === 0) {
				// isRelogin.show = true
				// 判断当前用户是否已拉取完user_info信息
					await store.dispatch("getRouteList", getUserInfo().role)
					store.getters.routeList.forEach(item => {
						router.addRoute('home', {
							path: item.path,
							name: item.name,
							component: () => import(`@/views/${item.component}`),
							meta: item.meta
						});
					})
					next({ ...to, replace: true });
					// .then(accessRoutes => {
					// 	// 根据roles权限生成可访问的路由表
					// 	accessRoutes.forEach(route => {
					// 		// if (!isHttp(route.path)) {
					// 		router.addRoute(route); // 动态添加可访问路由表
					// 		// }
					// 	});
					// 	next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
					// })
					// //#region 
					// // .catch(() => {});
					// // isRelogin.show = false
					// // store
					// // 	.dispatch("getRouteList", getUserInfo().role)
					// // 	.then(accessRoutes => {
					// // 		// 根据roles权限生成可访问的路由表
					// // 		accessRoutes.forEach(route => {
					// // 			// if (!isHttp(route.path)) {
					// // 			router.addRoute(route); // 动态添加可访问路由表
					// // 			// }
					// // 		});
					// // 		 // hack方法 确保addRoutes已完成
					// // 	})
					// // #endregion 
					// .catch(err => {
					// 	//捕捉错误，退出登录
					// 	console.log('err', err);
						
					// });
				console.log(router.getRoutes());
			} else {
				console.log(router.getRoutes());
				next();
			}
		}
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
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, resolve, reject) {
    if ( resolve || reject ) return originalPush.call(this, location, resolve, reject)
    return originalPush.call(this, location).catch(err => err)
}
export default router;
