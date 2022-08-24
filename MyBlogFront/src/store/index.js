// import Vue from 'vue';
import Vuex from 'vuex';
import synthesis from './synthesis';
import theme from './theme';

Vue.use(Vuex);

export default new Vuex.Store({
	// vuex实现模块化开发,每个模块存放自己的数据
	modules: {
		synthesis,
		theme,
	},
});
