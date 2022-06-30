import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from './router';

Vue.use(VueRouter)

const routes = Router;

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
