<template>
	<div id="app">
		<Header />
		<div id="mainContainer" :class="isLight ? 'moon' : 'night'">
			<Slideshow></Slideshow>
			<Nav></Nav>
			<router-view class="main-box" :style="`${color};${mainBg}`"></router-view>
			<SiderInfo />
		</div>
		<Footer />
		<SwitchBar />
	</div>
</template>
<script>
import SiderInfo from '@/components/siderInfo.vue';
import Header from '@/components/header.vue';
import Nav from '@/components/nav.vue';
import Footer from '@/components/footer.vue';
import Slideshow from '@/components/slideshow.vue';
import { createFingerprint } from '@/util';
import clickSpecialEffect from '@/util/clickSpecialEffect';
import bgSpecialEffect from '@/util/bgSpecialEffect';
import SwitchBar from '@/components/switch.vue';
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
		SwitchBar,
	},
	created() {
		// 取指纹操作
		if (!localStorage.getItem('browserId')) {
			createFingerprint();
		}
	},
	mounted() {
		// 点击特效
		clickSpecialEffect();
		// 背景特效
		bgSpecialEffect();
	},
};
</script>
<style lang="less">
* {
	padding: 0;
	margin: 0;
	// font-family: 'JBHGXK';
}
#mainContainer {
	background-size: 100% 100%;
	background-attachment: fixed;
	background-color: #70e6ff;
	margin-top: 50px;
	box-sizing: border-box;
	padding-left: 10vw;
	padding-right: 10vw;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	.main-box {
		flex: 1;
		margin-top: 5px;
		margin-bottom: 10px;
		border-radius: 5px;
		min-height: 100vh;
		transition: 0.6s;
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
</style>
