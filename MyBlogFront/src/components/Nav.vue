<template>
	<div id="nav">
		<el-menu :default-active="$route.path" class="navbar" background-color="#282828" text-color="#aaaaaa" active-text-color="#FFFFFF" router>
			<el-menu-item index="/bloglist"> <i class="el-icon-menu"></i>博客 </el-menu-item>
			<el-menu-item index="/jottinglist"> <i class="el-icon-s-opportunity"></i>心情日记 </el-menu-item>
			<el-menu-item index="/messageboard"> <i class="el-icon-chat-dot-round"></i>留言板 </el-menu-item>
			<el-menu-item index="/timeclue"> <i class="el-icon-stopwatch"></i>小站时间线 </el-menu-item>
			<!-- <el-menu-item index="/photo"> <i class="el-icon-stopwatch"></i>照片墙 </el-menu-item> -->
			<el-menu-item index="/about"> <i class="el-icon-user"></i>关于 </el-menu-item>
			<el-menu-item index="/loading"> <i class="el-icon-user"></i>关于 </el-menu-item>
		</el-menu>
	</div>
</template>

<script>
export default {
	data() {
		return {
			// current: $route.path,
		};
	},
	// computed: {
	//   activePathFn() {
	//     return this.$route.path;
	//   },
	// },
};
</script>

<style scoped lang="less">
#nav {
	width: 15vw;
	height: 100%;
	margin-right: 1vw;
	position: sticky;
	opacity: 0.8;
	top: 60px;
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
</style>
