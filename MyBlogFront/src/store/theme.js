const state = {
	isLight: true,
	color: '#FFFFFF',
	infoBgColor: 'rgba(255,255,255,0.6)',
	mainBg: 'rgba(50,50,50,0.6)',
	cardBg: 'rgb(100,100,100)',
	animateBg: '#0088b5',
	headFootBg: '#545c64',
};
const getters = {
	color(state) {
		if (state.isLight) {
			state.color = '#000000';
		} else {
			state.color = '#dddddd';
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
	cardBg(state) {
		if (state.isLight) {
			state.cardBg = '#ffffff';
		} else {
			state.cardBg = '#323232';
		}
		return 'background-color:' + state.cardBg;
	},
	specialcardBg(state) {
		if (state.isLight) {
			state.cardBg = '#ffffff';
		} else {
			state.cardBg = '#323232';
		}
		return state.cardBg;
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
			state.headFootBg = 'rgb(130, 130, 130)';
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
