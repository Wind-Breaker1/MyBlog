<template>
	<div id="siderInfo">
		<el-card class="box-card">
			<div slot="header">
				<h3><i class="el-icon-edit-outline" style="margin-right: 10px"></i>书签</h3>
			</div>
			<el-tag v-for="item in classifyList" :key="item._id" class="bookmark" :id="item._id" type="info" @click="getBlogsOfClassify($event)">{{
				item.title
			}}</el-tag>
		</el-card>
		<el-card class="box-card">
			<div slot="header">
				<h3><i class="el-icon-medal" style="margin-right: 10px"></i>最新随笔</h3>
			</div>
			<div class="content" v-for="item in jottingList" :key="item._id" @click="showdetail('jotting', item._id)">
				{{ item.title }}
			</div>
		</el-card>
		<el-card class="box-card">
			<div slot="header">
				<h3><i class="el-icon-document" style="margin-right: 10px"></i>最新博客</h3>
			</div>
			<div class="content" v-for="item in blogList" :key="item._id" @click="showdetail('blog', item._id)">
				{{ item.title }}
			</div>
		</el-card>
		<el-calendar v-model="time" class="calendar"> </el-calendar>
		<div class="like-context">
			<h3><i class="el-icon-alarm-clock" style="margin-right: 10px"></i>年轻人，你怎么睡的着啊！</h3>
		</div>
		<div class="like-context">
			<h3><i class="el-icon-aim" style="margin-right: 10px"></i>瞄准目标，坚定地走下去！</h3>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			classifyList: [],
			jottingList: [],
			blogList: [],
			time: new Date(),
		};
	},
	mounted() {
		this.getBaseInfo();
	},
	computed: {
		...mapState(['blogs', 'jottings', 'classifies']),
	},
	methods: {
		// 获取基本信息
		async getBaseInfo() {
			try {
				if (this.blogs.length > 0 && this.jottings.length > 0 && this.classifies.length > 0) {
					this.classifyList = this.classifies;
					this.blogList = this.blogs;
					this.jottingList = this.jottings;
				} else {
					const res = await this.$api.getSliderInfo();
					console.log(res);
					if (res.status === 200) {
						this.classifyList = res.data.classifies;
						if (res.data.blogs.length > 0) this.blogList = res.data.blogs.slice(0, 3);
						if (res.data.jottings.length > 0) this.jottingList = res.data.jottings.slice(0, 3);
						this.$store.commit('SAVECLASSIFIES', this.classifies);
						this.$store.commit('SAVEBLOG', res.data.blogs);
					} else {
						this.$message.error('网络出错了,(ノへ￣、)！');
					}
				}
			} catch (error) {
				this.$message.error(error);
			}
		},
		// 获取某一书签下所有博客
		async getBlogsOfClassify(e) {
			this.$router.push({
				path: '/bloglist',
				query: { type: 'blog', classification: e.target.id },
			});
		},
		// 获取某个文章
		showdetail(type, _id) {
			this.$router.push(`/article/${type}/${_id}`);
		},
	},
};
</script>

<style scoped lang="less">
#siderInfo {
	height: 100%;
	width: 265px;
	margin-left: 1vw;
	margin-top: 5px;
	margin-bottom: 1vh;
	border-radius: 5px;
	// background-color: rgba(220, 220, 220, 0.6);
	z-index: 99;
	.box-card {
		background-color: rgba(245, 245, 245, 0.8);
		margin-bottom: 2vh;
		/deep/.el-card__header {
			border-color: #c5c4c4;
		}
		.bookmark {
			margin: 5px 5px;
			// color: white;
			cursor: pointer;
		}
		.content {
			padding: 10px;
			text-overflow: ellipsis;
			overflow: hidden;
			cursor: pointer;
		}
	}
	//
	.calendar {
		border-radius: 5px;
		background: rgba(255, 255, 255, 0.8);
		/deep/ .el-button {
			padding: 5px;
		}
		/deep/ .el-calendar-day {
			border: 0;
			height: 30px;
		}
	}
	.like-context {
		background-color: rgba(245, 245, 245, 0.8);
		border-radius: 5px;
		padding-left: 10px;
		margin-top: 2vh;
		margin-bottom: 2vh;
		height: 50px;
		line-height: 50px;
		transition-duration: 1s;
	}
	.like-context:hover {
		box-shadow: 0 16px 16px 0 rgba(0, 0, 0, 0.3);
	}
}
</style>
