import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/bloglist',
    component: () => import('@/views/BlogList.vue')
  },
  {
    path: '/jottinglist',
    component: () => import('@/views/JottingList.vue')
  },
  {
    path: '/about',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/article/:type/:id',
    component: () => import('@/views/Article.vue')
  },
  {
    path: '/',
    redirect: '/bloglist'
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 重定向不报错 
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
export default router
