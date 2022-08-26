<template>
  <div class="head-box">
			<h3>MyBlog后台管理</h3>
			<div class="user-info">
				<el-dropdown placement="bottom" @command="logout" >
					<el-avatar class="avatar" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" size="medium" shape="square"></el-avatar>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>个人中心</el-dropdown-item>
						<el-dropdown-item command="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<!-- {{ this.$store.state.user.username }} -->
        wpf
			</div>
		</div>
</template>
<script>
export default {
	
	mounted() {},
	methods: {
		// 拿到路由信息
		
		// 登出
		async logout(type) {
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
			}
		},
	},
};
</script>
<style lang="less" scoped>
.head-box{
  height: 45px;
  width: 100%;
  padding-left: 3vw;
  background-color: rgb(50,50,50);
  color: #fff;
  position: fixed;
  top: 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  .user-info{
    width: 160px;
    height: 100%;
    display: flex;
    align-items: center;
    .avatar{
      margin-right: 10px;
    }
  }
}
</style>
