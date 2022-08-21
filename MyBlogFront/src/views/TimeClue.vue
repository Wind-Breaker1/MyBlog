<template>
	<div class="timeclue-box">
		<el-timeline>
			<el-timeline-item
				v-for="(timeNode, index) in timeNodes"
				:key="index"
				:icon="timeNode.icon"
				:type="timeNode.type"
				:color="timeNode.color"
				:size="timeNode.size"
				:timestamp="timeNode.timestamp"
				:class="isLight ? 'time-moon' : ''"
				placement="top">
				<el-card :style="`${color};${cartBg}`">
					<h3>{{ timeNode.title }}</h3>
					<p>{{ timeNode.content }}</p>
				</el-card>
			</el-timeline-item>
		</el-timeline>
	</div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
export default {
	data() {
		return {
			timeNodes: [
				{
					// timestamp: "",
					// type: "info",
					title: '持续开发中, 敬请期待...',
					// content:
					//   "完成了前端的基础功能，管理系统：登录、用户管理、博客管理、随笔管理、使用markdown语法新增博客随笔；展示部分：博客展示、随笔展示。",
				},
				{
					timestamp: '2022-7-30',
					type: 'info',
					title: '完善系统，开发新功能',
					content:
						'规范了前后端代码，完善了部分代码，新增了功能：注册、后台管理系统：权限管理、路由管理、图片上传；前端展示部分：评论、留言板、关于、小站时间线、优化了切换效果，。',
				},
				{
					timestamp: '2022-7-10',
					type: 'info',
					title: '前端部分基础功能完成',
					content: '完成了前端的基础功能，管理系统：登录、用户管理、博客管理、随笔管理、使用markdown语法新增博客随笔；展示部分：博客展示、随笔展示。',
				},
				{
					timestamp: '2022-7-4',
					type: 'info',
					title: '后端基础功能完成',
					content: '完成了后端基础工功能的接口设计与实现',
				},
				{
					timestamp: '2022-6-25',
					type: 'info',
					title: '项目搭建完成',
					content: '完成项目环境的搭建、静态页面的编写和一些必要组件、方法的封装',
				},
				{
					timestamp: '2022-6-25',
					type: 'info',
					title: '前期准备工作',
					content: '在网上查找个人博客相关资料，查看优秀的个人博客作品，分析自己的需求，确定使用什么技术，完成数据库的设计。',
				},
				{
					timestamp: '2022-6-20',
					type: 'info',
					title: '确定博客项目',
				},
			],
		};
	},
	computed: {
		...mapState({
			isLight: state => state.synthesis.isLight,
		}),
		...mapGetters(['color', 'cartBg']),
	},
};
</script>
<style lang="less" scoped>
.timeclue-box {
	padding: 2vw;
	border-radius: 5px;
	// background-color: rgba(250, 250, 250, 0.4);
	box-sizing: border-box;
	p {
		margin-top: 5px;
	}
	.time-moon {
		/deep/.el-timeline-item__timestamp {
			color: #333333;
		}
	}
}
</style>
