// import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/bloglist',
		component: () => import('@/views/Blogs.vue'),
	},
	{
		path: '/jottinglist',
		component: () => import('@/views/Jottings.vue'),
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
		path: '/search',
		component: () => import('@/views/Search.vue'),
	},
	{
		path: '/timeclue',
		component: () => import('@/views/TimeClue.vue'),
	},
	{
		path: '/messageboard',
		component: () => import('@/views/MessageBoard.vue'),
	},
	// {
	// 	path: '/photo',
	// 	component: () => import('@/views/PhotoWall.vue'),
	// },
	// {
	// 	path: '/loading',
	// 	component: () => import('@/components/Loading.vue'),
	// },
	{
		path: '/',
		redirect: '/bloglist',
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior: (to, from, savePosition) => {
		// 	// return 期望滚动到哪个的位置
		// 	//  to：跳转到哪个页面
		// 	// from：来自哪个页面
		// 	//savePosition:位置
		// 	// 常规的一种做法，直接禁止滚动行为，每个页面切换时自动回到顶部
		// 	if (savePosition) {
		// 		return {
		// 			savePosition,
		// 			behavior: 'smooth',
		// 		};
		// 	} else {
		// 		return { behavior: 'smooth', y: 0 };
		// 	}
		return {
			// 也可以这么写
			// el: document.getElementById('main-content'),
			// el: "#main-content",
			y: 0,
		};
	},
});
// 重定向不报错
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return routerPush.call(this, location).catch(error => error);
};
export default router;
