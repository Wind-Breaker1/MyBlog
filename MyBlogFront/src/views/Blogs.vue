<template>
	<div class="blog">
		<div class="blogtip" :style="`${cartBg}`">
			<h2>博客</h2>
		</div>
		<!-- 博客列表元素 -->
		<el-card v-for="item in blogList" shadow="hover" class="blogs-item" :key="item._id" :style="`${color};${cartBg}`" :id="item._id">
			<div @click="blogdetail('blog', item._id)">
				<div slot="header">
					<h2>{{ item.title }}</h2>
				</div>
				<p class="desc">文章简介{{ item.digest }}</p>
			</div>
			<div class="footer">
				<span class="favour">
					<i class="iconfont icon-icon" :class="item.favour.includes(murmur) ? 'active' : ''" style="margin-right: 10px"></i>{{ item.favour.length }}
				</span>
				<span class="brows"> <i class="el-icon-view" style="margin-right: 10px"></i>{{ item.browse }} </span>
				<span class="createtime"> <i class="iconfont icon-rili" style="margin-right: 10px"></i>{{ item.date }} </span>
			</div>
		</el-card>
		<!-- 分页 -->
		<div class="paginationWrap">
			<el-pagination
				background
				layout="prev, pager, next"
				:total="count"
				class="pagination"
				:page-size="pageSize"
				@current-change="handleCurrentChange"
				:hide-on-single-page="true">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
	data() {
		return {
			// 总文章数
			count: 0,
			// 文章列表
			blogList: [],
			// 每页数量
			pageSize: 5,
			// 页数
			page: 1,
			// 当前分页开始
			pageStart: 0,
			murmur: localStorage.getItem('browserId'),
		};
	},
	mounted() {
		this.getBlogs(this.pageStart, this.pageSize);
	},
	computed: {
		...mapState({
			blogs: state => state.synthesis.blogs,
		}),
		...mapGetters(['color', 'cartBg']),
	},
	watch: {
		$route() {
			if (this.$route.query.classification) {
				this.getBlogs();
			}
		},
	},
	methods: {
		// 换页回调
		handleCurrentChange(val) {
			this.pageStart = this.pageSize * (val - 1);
			this.getBlogs(this.pageStart, this.pageSize);
		},

		// 获取博客列表数据
		async getBlogs(pageStart, pageSize) {
			try {
				this.$loading.show('加载中...');
				// 获取博客列表
				let res = null;
				let { classification, type } = this.$route.query;
				// 判断发什么请求博客
				if (type === 'blog') {
					res = await this.$api.getBlogsOfClassify({ classification });
				} else {
					res = await this.$api.getPublishBlogs({ pageStart, pageSize });
				}
				if (res.status === 200) {
					this.blogList = res.data.blogList;
					this.count = res.data.count;
					if (pageStart === 0) {
						this.$store.commit('SAVEBLOG', res.data.blogList.slice(0, 3));
					}
				} else {
					this.$message.error(res.msg);
				}
				this.$loading.hide();
			} catch (err) {
				this.$message.error(err);
				this.$loading.hide();
			}
		},
		// 获取博客详情
		blogdetail(type, _id) {
			try {
				this.$api.addBlogBrowse({ _id });
				this.$router.push(`/article/${type}/${_id}`);
			} catch (error) {
				this.$message.error(error);
			}
		},
	},
};
</script>

<style lang="less" scoped>
.blog {
	animation: animate 2s;
	.active {
		color: rgb(202, 4, 4);
	}
	.blogs-item {
		border: none;
		margin-bottom: 2vh;
	}
	.blogtip {
		// height: 8vh;
		line-height: 8vh;
		text-align: center;
		background-color: rgb(255, 255, 255);
		border-radius: 5px;
		margin-bottom: 2vh;
	}
	.desc {
		font-size: 14px;
		display: block;
		height: 10vh;
		overflow: hidden;
		white-space: overflow;
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

@keyframes animate {
	0% {
		opacity: 0;
		transform: translateY(100px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
