export const routes = [
	{
		path: "/admin",
		name: "home",
		component: () => import("@/views/Admin.vue"),
		children: [
			{
				path: "databoard",
				name: "article",
				component: () => import("../views/DataBoard.vue"),
			},
			// {
			// 	path: "article",
			// 	name: "article",
			// 	component: () => import("../views/Article.vue"),
			// },
			// {
			// 	path: "photo",
			// 	name: "photo",
			// 	component: () => import("../views/Photo.vue"),
			// },
			// {
			// 	path: "markdown",
			// 	name: "markdown",
			// 	component: () => import("../views/Markdown.vue"),
			// },
			// {
			// 	path: "timeclue",
			// 	name: "timeclue",
			// 	component: () => import("../views/Timeclue.vue"),
			// },
			// // {
			// // 	path: "routingmanage",
			// // 	name: "routingmanage",
			// // 	component: () => import("../views/Route.vue"),
			// // 	limits: ["管理员"],
			// // },
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
	{
		path: "/",
		redirect: "/loginorregister",
	},
];
