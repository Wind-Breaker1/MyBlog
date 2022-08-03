import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import api from "@/api";
import "element-ui/lib/theme-chalk/index.css";
import element from "element-ui";
import { has } from "./util/directive";
Vue.use(element);
Vue.use(api);

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount("#app");
