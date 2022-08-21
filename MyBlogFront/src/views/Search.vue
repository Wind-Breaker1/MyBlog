<template>
	<div class="search-box">
		<div class="blogtip" :style="`${cartBg}`">
			<h2>搜索结果</h2>
		</div>
		<!-- 博客列表元素 -->
		<el-card v-for="item in searches" :key="item._id" class="search-item" :style="`${color};${cartBg}`" :id="item._id">
			<div @click="blogdetail(item._id, item.classification || undefined)">
				<div slot="header">
					<h3 style="display: inline; margin-right: 50px">{{ item.title }}</h3>
					<span style="float: right">{{ item.classification ? '博客' : '心情' }}</span>
				</div>
				<p class="desc">
					<span style="font-size: 16px; font-weight: bold">文章简介：</span>
					{{ item.digest }}
				</p>
			</div>
			<div class="footer">
				<span class="favour"> <i class="iconfont icon-icon" style="margin-right: 10px"></i>{{ item.favour.length }} </span>
				<span class="brows"> <i class="el-icon-view" style="margin-right: 10px"></i>{{ item.browse }} </span>
				<span class="createtime"> <i class="iconfont icon-rili" style="margin-right: 10px"></i>{{ item.date }} </span>
			</div>
		</el-card>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			searches: [],
		};
	},
	computed: {
		...mapGetters(['color', 'cartBg']),
	},
	mounted() {
		this.init();
	},
	methods: {
		// 获取博客详情
		async blogdetail(_id, classify) {
			try {
				this.$loading.show('加载中...');
				let type = null;
				if (classify) {
					this.$api.addBlogBrowse({ _id });
					type = 'blog';
				} else {
					this.$api.addJottingBrowse({ _id });
					type = 'jotting';
				}
				this.$router.push(`/article/${type}/${_id}`);
				this.$loading.hide();
			} catch (error) {
				this.$message.error(error);
				this.$loading.hide();
			}
		},
		async init() {
			try {
				const { searchValue } = this.$route.query;
				let res = await this.$api.search({ searchValue });
				if (res.status === 200) {
					this.$message.success(res.msg);
					this.searches = res.data;
				} else {
					this.$message.success(res.msg);
				}
			} catch (err) {
				this.$message.error(err);
			}
		},
	},
};
</script>

<style lang="less" scoped>
.search-box {
	background-color: rgba(255, 255, 255, 0.7);
	.search-item {
		border: none;
		margin-bottom: 2vh;
	}
	.blogtip {
		// height: 8vh;
		line-height: 8vh;
		text-align: center;
		background-color: rgb(255, 255, 255);
		border-color: transparent red;
		border-radius: 5px;
		margin-bottom: 2vh;
	}
	.desc {
		display: block;
		height: 10vh;
		text-overflow: ellipsis;
	}
	.footer {
		height: 4vh;
		color: gray;
		line-height: 4vh;
		.favour,
		.brows {
			float: left;
			width: 100px;
		}
		.createtime {
			float: right;
		}
	}
	.paginationWrap {
		margin-top: 2vh;
		margin-bottom: 10vh;
		.pagination {
			float: right;
		}
	}
}
</style>
