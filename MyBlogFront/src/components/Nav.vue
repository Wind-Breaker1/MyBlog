<template>
	<div id="nav-box">
		<el-menu
			:collapse="isCollapse"
			:default-active="$route.path"
			class="navbar"
			background-color="#282828"
			text-color="#aaaaaa"
			active-text-color="#FFFFFF"
			router
			:collapse-transition="false">
			<el-menu-item index="/bloglist"> <i class="el-icon-menu"></i><span slot="title">博客</span> </el-menu-item>
			<el-menu-item index="/jottinglist"> <i class="el-icon-s-opportunity"></i><span slot="title">心情</span></el-menu-item>
			<el-menu-item index="/messageboard"> <i class="el-icon-chat-dot-round"></i><span slot="title">留言板</span> </el-menu-item>
			<el-menu-item index="/timeclue"> <i class="el-icon-stopwatch"></i><span slot="title">时间线</span> </el-menu-item>
			<!-- <el-menu-item index="/photo"> <i class="el-icon-stopwatch"></i>照片墙 </el-menu-item> -->
			<el-menu-item index="/about"> <i class="el-icon-user"></i><span slot="title">关于</span> </el-menu-item>
			<!-- <el-menu-item index="/loading"> <i class="el-icon-user"></i>{{ screenWidth }}</el-menu-item> -->
		</el-menu>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			screenWidth: document.documentElement.clientWidth,
			isCollapse: document.documentElement.clientWidth < 900,
			// current: $route.path,
		};
	},
	watch: {
		screenWidth(oldVal, newVal) {
			if (newVal > 1000) {
				this.isCollapse = false;
			} else {
				this.isCollapse = true;
			}
		},
	},

	mounted() {
		let that = this;
		window.onresize = function () {
			that.screenWidth = document.documentElement.clientWidth;
		};
		// this.isCollapse = document.documentElement.clientWidth > 900;
	},
	methods: {},
};
</script>

<style scoped lang="less">
#nav-box {
	width: 15vw;
	height: 100%;
	margin-right: 1vw;
	position: sticky;
	opacity: 0.8;
	top: 50px;
	// top: 0;
	padding-top: 5px;
	.navbar {
		height: calc(100vh - 130px - 15vh);
		border: 0;
		border-radius: 5px;
		.el-menu-item {
			border-radius: 5px;
		}
		.is-active {
			background-color: rgb(0, 0, 0) !important;
		}
	}
	a {
		text-decoration: none;
	}
}
@media screen and (max-width: 1000px) {
	#nav-box {
		width: 8vw;
	}
}
@media screen and (max-width: 768px) {
	#nav-box {
		width: 64px;
	}
}
</style>
