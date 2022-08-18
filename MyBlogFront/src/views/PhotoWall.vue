<template>
	<!-- 主体瀑布流区域，无限滚动 -->
	<div class="photo-wall" ref="photoWall" infinite-scroll-disabled="disabled" infinite-scroll-distance="10">
		<el-card
			shadow="hover"
			:body-style="{ padding: '0px', 'border-radius': '10px' }"
			v-for="(img, index) in photoList"
			:key="index"
			:style="{ top: img.top + 'px', left: img.left + 'px', width: photoWidth + 'px', height: img.height }"
			class="photo-wall-item">
			<!-- 图片懒加载 -->
			<el-image :src="img.src" class="image" :key="img.src" lazy>
				<!-- 加载前占位 -->
				<div slot="placeholder" class="image-slot">
					<div :style="{ height: img.height + 'px', width: photoWidth + 'px', backgroundColor: img.colour }"></div>
				</div>
				<!-- 加载失败占位 -->
				<div slot="error" class="image-slot">
					<div :style="{ height: img.height + 'px', width: photoWidth + 'px', backgroundColor: img.colour }"></div>
				</div>
			</el-image>
			<div class="time">2022-12-3</div>
		</el-card>
	</div>
</template>

<script>
export default {
	name: 'v-waterfall',
	data() {
		return {
			currentDate: new Date(),
			//存放计算好的数据
			photoList: [],
			//每一列的宽度
			photoWidth: 0,
			//多少列
			waterFallPhotoCol: 3,
			//右边距
			photoRight: 5,
			//下边距
			photoBottom: 10,
			//存放瀑布流各个列的高度
			DeviationHeight: [],
			imgList: [],
			//整体左偏移量，左右相同
			colLeft: 5,
			currentPage: 1,
			//是否还有数据
			noMore: false,
			//随机占位色卡的颜色
			suijicolour: ['#b4ffe3', '#66CDAA', '#acc2e6', '#d7b0d8', '#95abe6', '#ffc47b', '#b6d288', '#f49586', '#bcaf7a'],
			imgArr: [
				require('../assets/img/bg1.jpg'),
				require('../assets/img/bg2.jpg'),
				require('../assets/img/bg3.jpg'),
				require('../assets/img/bg4.jpg'),
				require('../assets/img/bg5.jpg'),
				require('../assets/logo.png'),
			],
		};
	},
	created() {
		//初始就加载数据
		for (let i = 0; i < 10; i++) {
			this.imgList.push(this.imgArr[Math.round(Math.random() * 4)]);
		}
	},
	mounted() {
		//计算可视区域能够容纳的最大列数,向下取整
		this.calculationWidth();
	},
	methods: {
		//计算每个图片的宽度或者是列数
		calculationWidth() {
			let domWidth = this.$refs.photoWall.offsetWidth;
			if (!this.photoWidth && this.waterFallPhotoCol) {
				this.photoWidth = (domWidth - this.colLeft - 5 - this.photoRight * this.waterFallPhotoCol) / this.waterFallPhotoCol;
			} else if (this.photoWidth && !this.waterFallPhotoCol) {
				this.waterFallPhotoCol = Math.floor(domWidth / (this.photoWidth + this.photoRight));
			}
			//初始化偏移高度数组
			this.DeviationHeight = new Array(this.waterFallPhotoCol);
			for (let i = 0; i < this.DeviationHeight.length; i++) {
				this.DeviationHeight[i] = 0;
			}
			this.imgPreloading();
		},
		//图片预加载
		imgPreloading() {
			for (let i = 0; i < this.imgList.length; i++) {
				let aImg = new Image();
				aImg.src = this.imgList[i];
				aImg.onload = aImg.onerror = e => {
					let imgData = {};
					// console.log(aImg, 'aImg');
					const calculateHeight = (this.photoWidth / aImg.width) * aImg.height;
					if (calculateHeight > this.$refs.photoWall.offsetHeight) {
						imgData.height = this.$refs.photoWall.offsetHeight;
					} else {
						imgData.height = calculateHeight;
					}
					console.log(imgData.height, 'minh');
					imgData.src = this.imgList[i];
					this.photoList.push(imgData);
					this.rankImg(imgData);
				};
			}
		},
		//瀑布流布局
		rankImg(imgData) {
			let { photoWidth, photoRight, photoBottom, DeviationHeight, waterFallPhotoCol } = this;

			//for (let i = 0;i < this.photoList.length;i++){
			let minIndex = this.filterMin();
			console.log(minIndex, 'min');
			imgData.top = DeviationHeight[minIndex];
			if (minIndex == 0) {
				imgData.left = this.colLeft;
			} else {
				imgData.left = minIndex * (photoRight + photoWidth) + this.colLeft;
			}
			DeviationHeight[minIndex] += imgData.height + photoBottom + 30;
			//}
		},
		/**
		 * 找到最短的列并返回下标
		 * @returns {number} 下标
		 */
		filterMin() {
			const min = Math.min.apply(null, this.DeviationHeight);
			return this.DeviationHeight.indexOf(min);
		},
	},
};
</script>

<style scoped lang="less">
.photo-wall {
	overflow: scroll;
	position: relative;
	.photo-wall-item {
		position: absolute;
		margin-top: 5px;
		margin-bottom: 5px;
		padding: 5px;
		box-sizing: border-box;
		.time {
			// padding-right: 10px;
			margin-top: 5px;
			margin-bottom: 5px;
			text-align: right;
			line-height: 15px;
			font-size: 13px;
			color: #999;
		}
	}
	.photo-wall-item::after {
		clear: both;
	}
}
</style>
