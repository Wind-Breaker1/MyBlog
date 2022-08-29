// import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import api from '@/api';

// 应用封装的loading
import Loading from '@/components/Loading/index';
// Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(Loading);
// Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(api);
new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
