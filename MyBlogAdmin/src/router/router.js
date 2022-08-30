export const routes = [
	{
		path: "/admin",
		name: "home",
		component: () => import("@/views/Admin.vue"),
		children: [
			{
				path: "article",
				name: "article",
				component: () => import("../views/Article.vue"),
			},
			{
				path: "comment",
				name: "comment",
				component: () => import("../views/Photo.vue"),
			},
			{
				path: "markdown",
				name: "markdown",
				component: () => import("../views/Markdown.vue"),
			},
			// {
			// 	path: "jottings",
			// 	name: "jottings",
			// 	component: () => import("../views/Jottings.vue"),
			// },
			// {
			// 	path: "routingmanage",
			// 	name: "routingmanage",
			// 	component: () => import("../views/Route.vue"),
			// 	limits: ["管理员"],
			// },
			{
				path: "user",
				name: "user",
				component: () => import("../views/User.vue"),
				limits: ["管理员"],
			},
			{
				path: "logs",
				name: "logs",
				component: () => import("../views/Log.vue"),
				limits: ["管理员"],
			},
			{
				path: "/admin",
				redirect: "article",
			},
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
