import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import api from '@/api'
import 'element-ui/lib/theme-chalk/index.css'
import element from 'element-ui'
Vue.use(element)
Vue.use(api)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
