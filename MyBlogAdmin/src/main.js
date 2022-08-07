import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import "element-ui/lib/theme-chalk/index.css";
import element from "element-ui";
import { has } from "./util/directive";
// import { Message } from "element-ui";
// import { Notification } from "element-ui";
// import { MessageBox } from "element-ui";
// Vue.prototype.$message = Message;
// Vue.prototype.$notify = Notification;
// Vue.prototype.$msgbox = MessageBox;
Vue.use(element);
new Vue({
	router,
	store,
	render: h => h(App),
}).$mount("#app");
