export const routes = [
  {
    path: '/admin',
    name: 'home',
    component: () => import('../views/Admin.vue'),
    children: [
      
      {
        path: 'article',
        component: () => import('../views/Article.vue'),
      },
      {
        path: 'classify',
        component: () => import('../views/Classification.vue'),
      },
      
      {
        path: 'markdown',
        component: () => import('../views/Markdown'),
      },
      {
        path: 'jottings',
        component: () => import('../views/Jottings'),
      },
      {
        path: '404',
        component: () => import('../views/404.vue')
      },
      
      {
        path: '/admin',
        redirect: 'article'
      },
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Login')
  },
  {
    path: '*',
    redirect: '/admin',
  },
]
// 需要权限的路由
export const myAsyncRout = [
  {
    path: '/admin',
    name: 'home',
    component: () => import('../views/Admin.vue'),
    children: [
      {
        path: 'user',
        component: () => import('../views/User.vue'),
        meta: { id: 1001, btnPermissions: [ 'user'] }
      },
      {
        path: 'logs',
        component: () => import('../views/Log.vue'),
        meta: { id: 1002 }
      },
    ]
  }
]
