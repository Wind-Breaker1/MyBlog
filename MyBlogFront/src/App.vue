<template>
	<div id="app">
		<Header />
		<div id="mainContainer" :class="isLight ? 'moon' : 'night'">
			<Slideshow></Slideshow>
			<Nav></Nav>
			<router-view class="main-box" :style="`${color};${mainBg}`"></router-view>
			<SiderInfo />
		</div>
		<!-- <Footer /> -->
		<button @click="changTheme" style="position: fixed; bottom: 50px; right: 30px">{{ isLight ? '暗黑模式' : '正常模式' }}</button>
	</div>
</template>
<script>
import SiderInfo from '@/components/SiderInfo.vue';
import Header from '@/components/Header.vue';
import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';
import Slideshow from '@/components/Slideshow.vue';
import { createFingerprint } from '@/util';
import clickSpecialEffect from '@/util/clickSpecialEffect';
import bgSpecialEffect from '@/util/bgSpecialEffect';
// import './assets/font/font.css';
import { mapState, mapGetters } from 'vuex';
export default {
	data() {
		return {};
	},
	computed: {
		...mapState({
			isLight: state => state.theme.isLight,
		}),
		...mapGetters(['color', 'infoBgColor', 'mainBg']),
	},
	components: {
		SiderInfo,
		Header,
		Nav,
		Footer,
		Slideshow,
	},
	created() {
		if (!localStorage.getItem('browserId')) {
			createFingerprint();
		}
	},
	mounted() {
		clickSpecialEffect();
		bgSpecialEffect();
	},
	methods: {
		changTheme() {
			this.$store.commit('CHANGETHEME');
		},
	},
};
</script>
<style lang="less">
* {
	padding: 0;
	margin: 0;
	font-family: 'JBHGXK';
}
#mainContainer {
	background-size: 100% 100%;
	background-attachment: fixed;
	width: 100%;
	margin-top: 50px;
	box-sizing: border-box;
	padding-left: 10%;
	padding-right: 10%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	.main-box {
		flex: 1;
		margin-top: 5px;
		margin-bottom: 10px;
		border-radius: 5px;
		min-height: 100vh;
	}
}
.moon {
	background: url('@/assets/img/lightBg.png') no-repeat;
}
.night {
	background: url('@/assets/img/nightBg.jpg') no-repeat;
}
@media screen and (max-width: 768px) {
	#mainContainer {
		padding-left: 1vw;
		padding-right: 1vw;
	}
}
@media screen and (max-width: 1000px) {
	#mainContainer {
		padding-left: 3vw;
		padding-right: 3vw;
	}
}
::-webkit-scrollbar {
	/*滚动条整体样式*/
	width: 5px;
}

::-webkit-scrollbar-thumb {
	/*滚动条里面小方块*/
	border-radius: 5px;
	background: rgba(0, 0, 0, 0.2);
	scrollbar-arrow-color: red;
}

::-webkit-scrollbar-track {
	/*滚动条里面轨道*/
	border-radius: 0;
	background: rgba(0, 0, 0, 0);
}
</style>
