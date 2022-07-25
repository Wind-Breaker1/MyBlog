import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './router';
import { getToken, asyncRoute } from '@/util';
import { myAsyncRout } from '@/router/router';

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
        route[0].children.push({
          path: '*',
          redirect: '404'
        });
        router.addRoutes(route)
        flag = false
        next({ ...to, replace: true })
      } catch (e) {
        next(false)
      }
    } else {
      if (['/login', '/register'].includes(to.path) && !['/login', '/register'].includes(from.path)) {
        next(from.path);
      } else {
        next();
      }
    }
  } else { //未登录
    if ('/loginorregister' === to.path) {
      next();
    } else {
      next('/loginorregister')
    }
  }
})

export default router;
