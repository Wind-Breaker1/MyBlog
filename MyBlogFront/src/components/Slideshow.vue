<template>
	<div id="slideshow">
		<el-carousel class="cart-img" direction="vertical" height="100%" indicator-position="none">
			<el-carousel-item v-for="item in slideBg" :key="item">
				<img :src="item" alt="" />
			</el-carousel-item>
		</el-carousel>
		<div class="info">
			<div>
				<img :src="infoBgUrl" alt="" />
				<el-avatar :src="avatarUrl" class="user-img" :size="50"></el-avatar>
			</div>
			<div>
				<span
					>文章总数:<span style="font-weight: 1000; margin-left: 3px">{{ count }}</span></span
				>
				<span>浏览量:<span style="font-weight: 1000; margin-left: 3px">55</span></span>
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
	.cart-img {
		height: 93%;
	}
	.info {
		background-color: white;
		& > div:nth-child(1) {
			height: 50%;
			.user-img {
				position: absolute;
				left: 50%;
				top: 40%;
				transform: translate(-50%, -50%);
			}
		}
		& > div:nth-child(2) {
			height: 50%;
			font-size: 14px;
			display: flex;
			justify-content: center;
			span {
				margin-top: 25%;
				text-align: center;
			}
		}
	}

	.info {
		height: 25vh;
		width: 13vw;
		position: absolute;
		left: 5%;
		bottom: 2%;
		z-index: 90;
		border-radius: 5px;
		// .infodesc{
		//   height: 150px;
		//   width: 150px;
		//   background: white;
		// }

		img {
			width: 100%;
			height: 100%;
			border-radius: 5px;
		}
	}
	.tip {
		height: 7%;
		display: block;
		text-align: center;
	}
	.el-carousel__item {
		border-radius: 5px;
		img {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
