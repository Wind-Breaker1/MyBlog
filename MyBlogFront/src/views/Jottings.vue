<template>
	<div class="jotting">
		<div class="jotting-tip">
			<h3>心情日记</h3>
		</div>
		<!-- 博客列表元素 -->
		<el-card v-for="(item, index) in jottingList" :key="index" :style="{ marginBottom: '2vh' }">
			<div @click="blogdetail('jotting', item._id)">
				<div slot="header">
					<h3><i class="iconfont icon-wenzhang"></i>{{ item.title }}</h3>
				</div>
				<div class="content">
					<p class="desc">
						<span style="font-size: 16px; font-weight: bold">文章简介：</span>
						{{ item.digest }}
					</p>
				</div>
			</div>
			<div class="show">
				<span class="favour"> <i class="iconfont icon-icon" style="margin-right: 10px"></i>{{ item.favour.length }} </span>
				<span class="brows"> <i class="el-icon-view" style="margin-right: 10px"></i>{{ item.browse }} </span>
				<span class="createtime"> <i class="iconfont icon-rili" style="margin-right: 10px"></i>{{ item.date }} </span>
			</div>
		</el-card>
		<!-- 分页 -->
		<div class="pagination-wrap">
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
import { mapState } from 'vuex';
export default {
	data() {
		return {
			// 总文章数
			count: 0,
			// 文章列表
			jottingList: [],
			// 每页数量
			pageSize: 5,
			pageStart: 0,
		};
	},
	mounted() {
		this.getJottingList(this.pageStart, this.pageSize);
	},
	computed: {
		...mapState(['jottings']),
	},
	methods: {
		// 分页改变事件
		handleCurrentChange(val) {
			this.pageStart = this.pageSize * (val - 1);
			this.getJottingList(this.pageStart, this.pageSize);
		},
		// 获取博客列表
		async getJottingList(pageStart, pageSize) {
			try {
				// 获取博客列表
				let res = await this.$api.getPublishJottings({ pageStart, pageSize });
				if (res.status === 200) {
					this.jottingList = res.data.jottingList;
					this.count = res.data.count;
				} else {
					this.$message.error('网络出错了,(ノへ￣、)！');
				}
				// 获取博客列表
			} catch (error) {
				this.$message.error(error);
			}
		},
		async blogdetail(type, _id) {
			try {
				this.$api.addJottingBrowse({ _id });
				this.$router.push(`/article/${type}/${_id}`);
			} catch (error) {
				this.$message.error(error);
			}
		},
	},
};
</script>

<style lang="less" scoped>
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
.jotting {
	animation: animate 2s;
	.jotting-tip {
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
	.show {
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
	.pagination-wrap {
		margin-top: 2vh;
		margin-bottom: 10vh;
		.pagination {
			float: right;
		}
	}
}
</style>
