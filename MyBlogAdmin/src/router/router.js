const routes = [
  {
    path: '/admin',
    name: 'home',
    component: () => import('../views/Admin.vue'),
    children: [
      {
        path: '/admin/user',
        component: () => import('../views/User.vue')
      },
      {
        path: '/admin/article',
        component: () => import('../views/Article.vue')
      },
      {
        path: '/admin/classify',
        component: () => import('../views/Classification.vue')
      },
      {
        path: '/admin/logs',
        component: () => import('../views/Log.vue')
      },
      {
        // /search/screens -> /search?q=screens
        path: '/admin/markdown',
        component: () => import('../views/Markdown')
      },
      {
        path: '/admin/jottings',
        component: () => import('../views/Jottings')
      },
      {
        path: '/admin',
        redirect: '/admin/article'
      },

    ]
  },

  {
    path: '/login',
    component: () => import('../views/Login')
  },
  {
    // /search/screens -> /search?q=screens
    path: '*',
    redirect: '/login'
  },
 
]
module.exports = routes;