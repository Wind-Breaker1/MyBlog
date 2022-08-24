const state = {
	blogs: [],
	jottings: [],
	blogsOfClassify: [],
	classifies: [],
	searchs: [],
};
const getters = {};
const mutations = {
	SAVEBLOG(state, blogs) {
		state.blogs = blogs;
	},
	SAVEJOTTING(state, jottings) {
		state.jottings = jottings;
	},
	SAVEBLOGSOFCLASSIFY(state, blogsOfClassify) {
		state.blogsOfClassify = blogsOfClassify;
	},
	SAVECLASSIFIES(state, classifies) {
		state.classifies = classifies;
	},
	SAVESEARCHLIST(state, searchs) {
		state.searchs = searchs;
	},
};
const actions = {};

export default {
	state,
	mutations,
	actions,
	getters,
};
