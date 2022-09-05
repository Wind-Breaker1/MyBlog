<template>
	<div class="head-box">
		<h3>MyBlog后台管理</h3>
		<div class="user-info">
			<el-dropdown placement="bottom" @command="handleClick">
				<el-avatar class="avatar" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" size="medium" shape="square"></el-avatar>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="handleToSelf">个人中心</el-dropdown-item>
					<el-dropdown-item command="logout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			{{ username }}
		</div>
	</div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
	computed: {
		...mapGetters(["token", "username"]),
	},
	methods: {
		async handleClick(type) {
			if (type === "logout") {
				let result = await this.$store.dispatch("logout");
				if (result) {
					this.$notify.error("退出失败！");
					console.log(result);
				} else {
					this.$notify.success("退出成功");
					this.$store.dispatch("clearRoutes");
					setTimeout(() => {
						this.$router.push("/loginorregister");
					}, 500);
				}
			} else {
				this.$router.push("/admin/self");
			}
		},
		// 登出
		// async logout(type) {
		// 	if (type === "logout") {
		// 		let result = await this.$store.dispatch("logout");
		// 		if (result) {
		// 			this.$notify.error("退出失败！");
		// 			console.log(result);
		// 		} else {
		// 			this.$notify.success("退出成功");
		// 			this.$store.dispatch("clearRoutes");
		// 			setTimeout(() => {
		// 				this.$router.push("/loginorregister");
		// 			}, 500);
		// 		}
		// 	}
		// },
		// handleToSelf(){
		// 	this.$router.push('/admin/self');
		// }
	},
};
</script>
<style lang="less" scoped>
.head-box {
	height: 45px;
	width: 100%;
	padding-left: 1vw;
	background-color: rgb(50, 50, 50);
	color: #fff;
	position: fixed;
	top: 0;
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;

	.user-info {
		width: 160px;
		height: 100%;
		display: flex;
		align-items: center;

		.avatar {
			margin-right: 10px;
		}
	}
}
</style>
