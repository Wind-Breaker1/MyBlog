<template>
	<div id="siderInfo-box">
		<el-card class="box-card" :style="`${color};${mainBg}`">
			<div slot="header"><i class="el-icon-edit-outline" style="margin-right: 10px"></i>专栏</div>
			<div class="content" v-for="item in classifyList" :key="item._id" @click="getBlogsOfClassify(item)">
				<span>{{ item.title }}</span>
				<span>{{ item.articleNum }}</span>
			</div>
			<el-empty v-if="classifyList.length == 0" description="还没有专栏呢！"></el-empty>
		</el-card>
		<el-card class="box-card" :style="`${color};${mainBg}`">
			<div slot="header"><i class="el-icon-price-tag" style="margin-right: 10px"></i>书签</div>
			<span class="bookmark" v-for="item in tagList" :key="item._id" :style="{ backgroundColor: item.bg }">
				{{ item.title }}
			</span>
			<el-empty v-if="tagList.length == 0" description="先去别的地方看看吧！"></el-empty>
		</el-card>
		<el-card class="box-card" :style="`${color};${mainBg}`">
			<div slot="header"><i class="el-icon-medal" style="margin-right: 10px"></i>最新心情</div>
			<div class="content" v-for="item in jottingList" :key="item._id" @click="showdetail('jotting', item._id)">
				<span>{{ item.title }}</span
				><span>{{ item.date.substr(2) }}</span>
			</div>
			<el-empty v-if="jottingList.length == 0" description="博主正在加班创作中！"></el-empty>
		</el-card>
		<el-card class="box-card" :style="`${color};${mainBg}`">
			<div slot="header"><i class="el-icon-document" style="margin-right: 10px"></i>最新博客</div>
			<div class="content" v-for="item in blogList" :key="item._id" @click="showdetail('blog', item._id)">
				<span>{{ item.title }}</span
				><span>{{ item.date.substr(2) }}</span>
			</div>
			<el-empty v-if="blogList.length == 0" description="再等等吧！"></el-empty>
		</el-card>
		<el-calendar v-model="time" class="calendar box-card" :class="isLight ? 'calendar-moon' : 'calendar-night'"> </el-calendar>
		<div class="like-context box-card" :style="`${color};${mainBg}`">
			<i class="el-icon-alarm-clock" style="margin-right: 10px"></i>年轻人，你怎么睡的着啊！
		</div>
		<div class="like-context box-card" :style="`${color};${mainBg}`">
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
				if (this.blogs?.length > 0 && this.jottings?.length > 0 && this.classifies?.length > 0) {
					this.classifyList = this.classifies;
					this.blogList = this.blogs;
					this.jottingList = this.jottings;
				} else {
					const res = await this.$api.getSliderInfo();
					console.log(res);
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
		// 获取某一书签下所有博客
		async getBlogsOfClassify(item) {
			this.$router.push({
				path: '/blogs',
				query: { type: 'blog', classification: item._id },
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
	height: 100%;
	width: 265px;
	margin-left: 1vw;
	margin-top: 5px;
	margin-bottom: 1vh;
	border-radius: 5px;
	font-size: 18px;
	.box-card {
		margin-bottom: 2vh;
		border: 1px solid #c5c4c4;

		.bookmark {
			display: inline-block;
			margin: 2px;
			padding: 5px;
			font-size: 14px;
			border-radius: 2px;
			color: #ffffff;
			// color: white;
			cursor: pointer;
		}
		.content {
			padding: 10px;
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			& > span:nth-child(1) {
				width: 150px;
				white-space: overflow;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			& > span:nth-child(2) {
				text-align: right;
				width: 45px;
			}
			cursor: pointer;
		}
	}
	.box-card:hover {
		box-shadow: 5px 5px 10px 2px rgb(130, 130, 130);
	}
	//
	.calendar {
		font-size: 15px;
		border-radius: 5px;
		/deep/ .el-button {
			padding: 5px;
		}
		/deep/ .el-calendar-day {
			border: 0;
			height: 30px;
		}
	}
	.calendar-moon {
		background-color: rgba(255, 255, 255, 0.6);
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
		box-shadow: 0 16px 16px 0 rgba(145, 144, 144 0.3);
	}
}
@media screen and (max-width: 768px) {
	#siderInfo-box {
		display: none;
	}
}
</style>
