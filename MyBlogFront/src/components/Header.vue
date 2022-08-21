<template>
	<div id="header-box" :class="navShow ? 'navOn' : 'navOff'">
		<img src="@/assets/logo.png" alt="欢迎来Meditators的博客" class="logo" />
		<el-input placeholder="请输入关键字..." v-model="searchValue" class="search" :border="false">
			<el-button slot="append" icon="el-icon-search" @click="searchArticle"></el-button>
		</el-input>
	</div>
</template>
<script>
export default {
	data() {
		return {
			searchValue: '',
			top: 0,
			navShow: true,
		};
	},
	// watch: {
	// 	top(newValue, oldValue) {
	// 		// 等新值大于100的时候再做变化（优化一下）
	// 		//   if (newValue > 100) {
	// 		if (newValue > 1) {
	// 			if (newValue > oldValue) {
	// 				this.navShow = false;
	// 				console.log('向下滚动'); //显示
	// 			} else {
	// 				this.navShow = true;
	// 				console.log('向上滚动'); //隐藏
	// 			}
	// 		}
	// 	},
	// },
	// mounted() {
	// 	window.addEventListener('scroll', () => {
	// 		this.top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
	// 	});
	// },
	methods: {
		async searchArticle() {
			try {
				if (!this.searchValue) {
					this.$message.warning('还没有输入搜索内容呢');
					return;
				}
				this.$router.push('/search?searchValue=' + this.searchValue);
				this.searchValue = '';
			} catch (err) {
				this.$message.error(err);
			}
		},
	},
};
</script>
<style scoped lang="less">
#header-box {
	height: 50px;
	// background-color: rgba(255, 255, 255, 0.5);
	background-color: #545c64;
	position: fixed;
	top: 0;
	width: 79vw;
	padding-left: 10vw;
	padding-right: 11vw;
	line-height: 50px;
	z-index: 8;
	.logo {
		height: 60px;
		float: left;
	}
	.search {
		width: 20vw;
		margin-top: 5px;
		float: right;
		/deep/ .el-input__inner {
			border: none;
		}
	}
}
@media screen and (max-width: 768px) {
	#header-box {
		width: 85vw;
		.search {
			width: 100%;
		}
	}
	.logo {
		display: none;
	}
}
// .navOn {
// 	transition: all 0.2s ease-in-out 0.2s;
// 	transform: translateZ(0);
// 	opacity: 1;
// }
// .navOff {
// 	transition: all 0.2s ease-in-out 0.2s;
// 	transform: translate3d(0, -100%, 0);
// 	opacity: 0;
// }
</style>
