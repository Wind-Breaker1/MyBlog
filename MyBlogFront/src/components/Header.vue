<template>
	<div id="header-box" :style="`${color};${headFootBg}`">
		<img src="@/assets/logo.png" alt="欢迎来Meditators的博客" class="logo" />
		<el-input placeholder="请输入关键字..." v-model="searchValue" class="search" :class="!isLight ? 'input-night' : ''"
			><i class="el-icon-search" slot="suffix" @click="searchArticle"> </i
		></el-input>
	</div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
export default {
	data() {
		return {
			searchValue: '',
			top: 0,
			navShow: true,
		};
	},
	computed: {
		...mapState({
			isLight: state => state.theme.isLight,
		}),
		...mapGetters(['color', 'headFootBg']),
	},
	methods: {
		searchArticle() {
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
	position: fixed;
	top: 0;
	width: 79vw;
	padding-left: 10vw;
	padding-right: 11vw;
	line-height: 50px;
	z-index: 8;
	transition: background-color 0.7s;
	.input-night {
		/deep/.el-input__inner {
			background-color: rgb(100, 100, 100);
			color: #ffffff;
		}
	}
	.logo {
		height: 60px;
		float: left;
	}
	.search {
		width: 20vw;
		float: right;

		/deep/ .el-icon-search {
			margin-right: 10px;
		}
		/deep/ .el-input__inner {
			transition: background-color 0.7s;
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
</style>
