import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	isLight: false,
	color: '#FFFFFF',
	infoBgColor: 'rgba(255,255,255,0.6)',
	mainBg: 'rgba(50,50,50,0.6)',
	cartBg: 'rgb(100,100,100)',
	animateBg: '#0088b5',
	headFootBg: '#545c64',
};
const getters = {
	color(state) {
		if (state.isLight) {
			state.color = '#000000';
		} else {
			state.color = '#FFFFFF';
		}
		return 'color:' + state.color;
	},
	infoBgColor(state) {
		if (state.isLight) {
			state.infoBgColor = 'rgba(255,255,255,0.6)';
		} else {
			state.infoBgColor = 'rgba(0,0,0,0.6)';
		}
		return 'background-color:' + state.infoBgColor;
	},
	mainBg(state) {
		if (state.isLight) {
			state.mainBg = 'rgba(255,255,255,0.6)';
		} else {
			state.mainBg = 'rgba(50,50,50,0.6)';
		}
		return 'background-color:' + state.mainBg;
	},
	cartBg(state) {
		if (state.isLight) {
			state.cartBg = 'rgb(255,255,255)';
		} else {
			state.cartBg = 'rgb(50,50,50)';
		}
		return 'background-color:' + state.cartBg;
	},
	animateBg(state) {
		if (state.isLight) {
			state.animateBg = '#0088b5';
		} else {
			state.animateBg = '#777777';
		}
		return 'background-color:' + state.animateBg;
	},
	headFootBg(state) {
		if (state.isLight) {
			state.headFootBg = '#545c64';
		} else {
			state.headFootBg = 'rgb(50, 50, 50)';
		}
		return 'background-color:' + state.headFootBg;
	},
};
const mutations = {
	CHANGETHEME(state) {
		state.isLight = !state.isLight;
	},
};
const actions = {};

export default {
	state,
	mutations,
	actions,
	getters,
};
