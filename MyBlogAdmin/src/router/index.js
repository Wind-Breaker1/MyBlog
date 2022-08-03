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
router.beforeEach(async (to, from, next) => {
	// console.log(getToken(), 12)
	// 如果已登录
	if (getToken()) {
		console.log(to.path);
		if (to.path === "/loginorregister") {
			next({ path: "/admin" });
			NProgress.done();
		} else {
			if (store.getters.routeList.length === 0) {
				// isRelogin.show = true
				// 判断当前用户是否已拉取完user_info信息
				await store.dispatch("getRouteList", getUserInfo().role);
				store.getters.routeList.forEach(item => {
					router.addRoute("home", {
						path: item.path,
						name: item.name,
						component: () => import(`@/views/${item.component}`),
						meta: item.meta,
					});
				});
				flag = false;
				next({ ...to, replace: true });
				console.log(router.getRoutes());
			} else {
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
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, resolve, reject) {
	if (resolve || reject) return originalPush.call(this, location, resolve, reject);
	return originalPush.call(this, location).catch(err => err);
};
export default router;
