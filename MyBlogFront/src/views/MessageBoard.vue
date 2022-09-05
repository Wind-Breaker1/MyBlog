<template>
	<div>
		<transition name="el-zoom-in-center">
			<div class="tip-box" v-show="showTip">
				<h2>留言板</h2>
				<p>欢迎访问我的博客，我是孤城浪人，一名零零后程序猿。</p>
				<br />
				<p>
					当我站在二十岁的分岔口去回忆我的前二十年人生，却是一片模糊，似乎有过意难平，似乎弄丢了一些人，似乎...有很多很多有意思的事，可再也记不起来了，就好像这些经历属于带面具的我，不属于我，
					留给我的只是一堆遗憾罢了。
				</p>
				<br />
				<p>
					现在，在这稍纵即逝的青春的尾巴上，我被生活裹挟着向前疾驰，希望能够留下些沿途的风景，于是有了在这个博客。
				</p>
				<br />
				<p>这些是我想说的话，你想对我说些什么呢？</p>
			</div>
		</transition>
		<transition name="el-zoom-in-top">
			<Comment
				keyId="messageBoard"
				emptyText="期待您的留言！"
				buttonText="留言"
				:contentLength="200"
				placeholderText="请输入最多200字的留言..."
				v-show="showMian"></Comment>
		</transition>
	</div>
</template>

<script>
import Comment from '@/components/comment.vue';
export default {
	components: {
		Comment,
	},
	data() {
		return {
			showTip: false,
			showMian: false,
		};
	},

	mounted() {
		setTimeout(() => {
			this.showTip = true;
			this.showMian = true;
		}, 50);
	},
};
</script>

<style lang="less" scoped>
.tip-box {
	border-radius: 5px;
	padding: 5%;
	font-size: 18px;
}
h2 {
	text-align: center;
	margin-bottom: 5%;
}
</style>
