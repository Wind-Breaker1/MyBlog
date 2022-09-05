<template>
	<div id="siderInfo-box">
		<div class="card" :style="`${color};${mainBg}`">
			<div class="card-head">
				<i class="el-icon-edit-outline" style="margin-right: 10px"></i>专栏
			</div>
			<div
				class="card-item"
				v-for="item in classifyList"
				:key="item._id"
				@click="getBlogsOfClassify(item)">
				<span>{{ item.title }}</span>
				<span>{{ item.articleNum }}</span>
			</div>
			<el-empty v-if="classifyList.length == 0" description="还没有专栏呢！"></el-empty>
		</div>
		<div class="card" :style="`${color};${mainBg}`">
			<div class="card-head"><i class="el-icon-price-tag" style="margin-right: 10px"></i>书签</div>
			<span
				@click="getArticlesOfTag(item)"
				class="bookmark"
				v-for="item in tagList"
				:key="item._id"
				:style="{ backgroundColor: item.bg }">
				{{ item.title }}
			</span>
			<el-empty v-if="tagList.length == 0" description="先去别的地方看看吧！"></el-empty>
		</div>
		<div class="card" :style="`${color};${mainBg}`">
			<div class="card-head"><i class="el-icon-medal" style="margin-right: 10px"></i>最新心情</div>
			<div
				class="card-item"
				v-for="item in jottingList"
				:key="item._id"
				@click="showdetail('jotting', item._id)">
				<span>{{ item.title }}</span>
				<span>{{ item.date.substr(2) }}</span>
			</div>
			<el-empty v-if="jottingList.length == 0" description="博主正在加班创作中！"></el-empty>
		</div>
		<div class="card" :style="`${color};${mainBg}`">
			<div class="card-head">
				<i class="el-icon-document" style="margin-right: 10px"></i>最新博客
			</div>
			<div
				class="card-item"
				v-for="item in blogList"
				:key="item._id"
				@click="showdetail('blog', item._id)">
				<span>{{ item.title }}</span>
				<span>{{ item.date.substr(2) }}</span>
			</div>
			<el-empty v-if="blogList.length == 0" description="再等等吧！"></el-empty>
		</div>
		<el-calendar v-model="time" class="calendar card" :class="isLight ? '' : 'calendar-night'">
		</el-calendar>
		<div class="like-context card" :style="`${color};${mainBg}`">
			<i class="el-icon-alarm-clock" style="margin-right: 10px"></i>年轻人，你怎么睡的着啊！
		</div>
		<div class="like-context card" :style="`${color};${mainBg}`">
			<i class="el-icon-aim" style="margin-right: 10px"></i>瞄准目标，坚定地走下去！
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
	data() {
		return {
			classifyList: [],
			jottingList: [],
			blogList: [],
			tagList: [],
			time: new Date(),
			loading: true,
		};
	},
	mounted() {
		this.getBaseInfo();
	},
	computed: {
		...mapState({
			blogs: state => state.synthesis.blogs,
			jottings: state => state.synthesis.jottings,
			classifies: state => state.synthesis.classifies,
			isLight: state => state.theme.isLight,
		}),
		...mapGetters(['mainBg', 'color']),
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
					if (res.status === 200) {
						this.classifyList = res.data.classifies || [];
						if (res.data.blogs.length > 0) this.blogList = res.data.blogs.slice(0, 3);
						if (res.data.jottings.length > 0) this.jottingList = res.data.jottings.slice(0, 3);
						this.tagList = res.data.tags || [];
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
		// 获取某一专栏下下所有博客
		async getBlogsOfClassify(item) {
			this.$router.push({
				path: '/list/blog?classification=' + item._id,
			});
		},
		// 获取某一书签下所有文章
		getArticlesOfTag(item) {
			this.$router.push({
				path: '/list/tag?tag=' + item._id + '&tagName=' + item.title,
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
#siderInfo-box {
	width: 265px;
	margin-left: 1vw;
	margin-top: 5px;
	margin-bottom: 1vh;
	.card {
		margin-bottom: 2vh;
		border-radius: 5px;
		padding: 10px;
		border: 1px solid #c5c4c4;
		transition: 0.6s;
		.card-head {
			font-size: 18px;
			line-height: 5vh;
			border-bottom: 1px solid #fff;
		}
		.card-item {
			font-size: 14px;
			display: flex;
			justify-content: space-between;
			padding: 5px 10px;
		}
		// 书签样式
		.bookmark {
			display: inline-block;
			margin: 5px;
			padding: 5px;
			font-size: 14px;
			border-radius: 2px;
			color: #ffffff;
			cursor: pointer;
		}
	}

	.calendar {
		background-color: rgba(255, 255, 255, 0.6);
		font-size: 15px;
		border-radius: 5px;
		padding: 0;
		/deep/ .el-button {
			padding: 5px;
		}
		/deep/ .el-calendar-day {
			border: 0;
			height: 30px;
		}
	}
	.calendar-night {
		background-color: rgba(50, 50, 50, 0.6);
		color: #ffffff;
		/deep/ .el-calendar__title {
			color: #ffffff;
		}
		/deep/ .el-button {
			background-color: gray;
			color: #ffffff;
		}
		/deep/.is-selected {
			background-color: #999;
			color: #fff;
		}
		/deep/ .el-calendar-day:hover {
			background-color: #999;
		}
	}
}
@media screen and (max-width: 768px) {
	#siderInfo-box {
		display: none;
	}
}
</style>
