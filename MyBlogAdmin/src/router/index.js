import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./router";
import { getToken, getUserInfo } from "@/util";
import store from "@/store";
Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});
let flag = true;
router.beforeEach(async (to, from, next) => {
	// 如果已登录
	if (getToken()) {
		try {
			if (to.path === "/loginorregister") {
				next("/admin");
				NProgress.done();
			} else {
				if (flag) {
					// 判断当前用户是否已拉取完user_info信息
					await store.dispatch("getRoutes", getUserInfo().role);
					store.getters.routes.forEach(item => {
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
		} catch (err) {
			console.log(err);
			NProgress.done();
		}
	} else {
		//未登录
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
