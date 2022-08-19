<template>
	<div id="slideshow">
		<el-carousel class="cart-img" direction="vertical" height="100%" indicator-position="none">
			<el-carousel-item v-for="item in slideBg" :key="item">
				<img :src="item" alt="" />
			</el-carousel-item>
		</el-carousel>
		<div class="info">
			<img :src="infoBgUrl" alt="avatar" />
			<el-avatar :src="avatarUrl" class="avatar" :size="50"></el-avatar>
			<div>
				<div>博客<span>{{ count }}</span></div>
				<div>心情<span>55</span></div>
				<div>专栏<span>55</span></div>
				<div>标签<span>55</span></div>
			</div>
		</div>
		<div class="tip">欢迎来到我的小站！</div>
	</div>
</template>
<script>
import slideBgUrl1 from '@/assets/img/slideBg/slidebg1.jpg';
// import slideBgUrl2 from "@/assets/img/slideBg/slidebg2.jpg";
import slideBgUrl3 from '@/assets/img/slideBg/slidebg3.jpg';
import slideBgUrl4 from '@/assets/img/slideBg/slidebg4.jpg';
import infoBgUrl from '@/assets/img/7.png';
import avatarUrl from '@/assets/img/6.png';
export default {
	data() {
		return {
			// 轮播图背景图片
			slideBg: [slideBgUrl1, slideBgUrl3, slideBgUrl4],
			// 头像地址
			avatarUrl,
			infoBgUrl,
			count: 0,
		};
	},
	mounted() {
		this.getInfo();
	},
	methods: {
		// 请求文章数和浏览数
		async getInfo() {
			try {
				let res = await this.$api.getWebInfo();
				if (res.status === 200) {
					this.count = res.count;
				} else {
					this.$message.error('网络出错了,(ノへ￣、)！');
				}
			} catch (err) {
				this.$message.error(err);
			}
		},
	},
};
</script>

<style scoped lang="less">
#slideshow {
	height: 45vh;
	width: 100%;
	margin-top: 1%;
	border-radius: 5px;
	background: rgba(255, 255, 255, 0.7);
	position: relative;
	font-size: 12px;
	.cart-img {
		height: 93%;
	}

	.info {
		background-color: white;
		position: absolute;
		height: 25vh;
		width: 15vw;
		left: 5%;
		bottom: 2%;
		z-index: 90;
		border-radius: 5px;

		&>img {
			height: 50%;
			width: 100%;
			border-radius: 5px;
		}

		.avatar {
			position: absolute;
			left: 50%;
			top: 40%;
			transform: translate(-50%, -45%);
		}
		& > div{
			margin-top: 1vh;
			display: flex;
			height: 10vh;
			justify-content: space-around;
			align-items: center;
			div{
				display: flex;
				flex-direction: column;
				align-items: center;
				span{
					margin-top: 5px;
				}
			}
		}
	}
}
</style>
