import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './router';
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
        //获取有权限的路由进行组装
        let route = asyncRoute(myAsyncRout) || [];
        
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
