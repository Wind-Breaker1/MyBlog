import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes, myAsyncRout } from './router';
import { getToken, asyncRoute } from '@/util';

Vue.use(VueRouter)

// const routes = Router;

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
let flag = true;
router.beforeEach((to, from, next) => {
  // 如果已登录
  // console.log(getToken(), 12)
  if (getToken()) {
    if (flag) {
      try {
        //获取有权限的路由进行组装
        let route = asyncRoute(myAsyncRout) || [];
        if (route.length !== 0) {
          route[0].children.push({
            path: '*',
            redirect: '404'
          });
        } else {
          route.push({
            path: '/admin',
            name: 'home',
            component: () => import('../views/Admin.vue'),
            children: [
              {
                path: '*',
                component: () => import('@/views/404.vue')
              },
            ]
          })
        }
        router.addRoutes(route)
        flag = false;
        next({ ...to, replace: true })
      } catch (e) {
        next(false)
      }
    } else {
      if ('/loginorregister' === to.path ) {
        next(from.path);
      } else {
        next();
      }
    }
  } else { //未登录
    if (to.path !== '/loginorregister') {
      next('/loginorregister')
    } else {
      next();
    }
  }
})

export default router;
