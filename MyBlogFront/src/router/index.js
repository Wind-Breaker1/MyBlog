// import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/list/:type',
		component: () => import('@/views/List.vue'),
	},
	{
		path: '/about',
		component: () => import('@/views/About.vue'),
	},
	{
		path: '/article/:type/:id',
		component: () => import('@/views/Article.vue'),
	},

	{
		path: '/timeclue',
		component: () => import('@/views/TimeClue.vue'),
	},
	{
		path: '/messageboard',
		component: () => import('@/views/MessageBoard.vue'),
	},
	{
		path: '/photo',
		component: () => import('@/views/PhotoWall.vue'),
	},
	{
		path: '/',
		redirect: '/list/blog',
	},
	{
		path: '*',
		redirect: '/list/blog',
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior: (to, from, savePosition) => {
		// 动行为，每个页面切换时自动回到顶部
		if (savePosition) {
			return {
				savePosition,
				behavior: 'smooth', // 	// return 期望滚动到哪个的位置
			};
		} else {
			return { behavior: 'smooth', y: 0 };
		}
	},
});
// 重定向不报错
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return routerPush.call(this, location).catch(error => error);
};
export default router;
