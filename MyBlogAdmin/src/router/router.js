export const routes = [
	{
		path: "/admin",
		name: "home",
		component: () => import("@/views/Admin.vue"),
		children: [
			// {
			// 	path: "article",
			// 	name: "article",
			// 	component: () => import("../views/Article.vue"),
			// },
			// {
			// 	path: "classify",
			// 	name: "classify",
			// 	component: () => import("../views/Classification.vue"),
			// },
			// {
			// 	path: "markdown",
			// 	name: "markdown",
			// 	component: () => import("../views/Markdown"),
			// },
			// {
			// 	path: "jottings",
			// 	name: "jottings",
			// 	component: () => import("../views/Jottings"),
			// },
			// {
			// 	path: "routingmanage",
			// 	name: "routingmanage",
			// 	component: () => import("../views/route.vue"),
			// 	limits: ["管理员"],
			// },
			// {
			// 	path: "user",
			// 	name: "user",
			// 	component: () => import("../views/User.vue"),
			// 	limits: ["管理员"],
			// },
			// {
			// 	path: "logs",
			// 	name: "logs",
			// 	component: () => import("../views/Log.vue"),
			// 	limits: ["管理员"],
			// },
			// {
			// 	path: "/admin",
			// 	redirect: "article",
			// },
		],
	},
	{
		path: "/loginorregister",
		name: "loginorregister",
		component: () => import("../views/LoginOrRegister.vue"),
	},
	// {
	// 	path: "*",
	// 	redirect: "/loginorregister",
	// },
];
