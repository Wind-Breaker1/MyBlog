<template>
	<div id="app">
		<Header />
		<div id="mainContainer">
			<div></div>
			<Slideshow></Slideshow>
			<Nav></Nav>
			<!-- <div class="main-content"> -->
			<router-view class="main-box"></router-view>
			<!-- </div> -->
			<SiderInfo />
		</div>
		<Footer />
		<!-- <button class="show1" @click="clip = !clip">收齐</button> -->
	</div>
</template>
<script>
import SiderInfo from '@/components/SiderInfo.vue';
import Header from '@/components/Header.vue';
import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';
import Slideshow from '@/components/Slideshow.vue';
import { createFingerprint } from '@/util';
import Fingerprint2 from 'fingerprintjs2';
export default {
	data() {
		return {
			clip: false,
		};
	},
	components: {
		SiderInfo,
		Header,
		Nav,
		Footer,
		Slideshow,
	},
	created() {
		this.createBrowseID();
	},
	methods: {
		// 创建浏览ID
		createBrowseID() {
			// 如果未创建
			if (!localStorage.getItem('browserId')) {
				createFingerprint();
			}
		},
		show() {
			function clickEffect() {
				let balls = [];
				let longPressed = false;
				let longPress;
				let multiplier = 0;
				let width, height;
				let origin;
				let normal;
				let ctx;
				const colours = ['#F73859', '#14FFEC', '#00E0FF', '#FF99FE', '#FAF15D'];
				const canvas = document.createElement('canvas');
				document.body.appendChild(canvas);
				canvas.setAttribute('style', 'width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;');
				const pointer = document.createElement('span');
				pointer.classList.add('pointer');
				document.body.appendChild(pointer);

				if (canvas.getContext && window.addEventListener) {
					ctx = canvas.getContext('2d');
					updateSize();
					window.addEventListener('resize', updateSize, false);
					loop();
					window.addEventListener(
						'mousedown',
						function (e) {
							pushBalls(randBetween(10, 20), e.clientX, e.clientY);
							document.body.classList.add('is-pressed');
							longPress = setTimeout(function () {
								document.body.classList.add('is-longpress');
								longPressed = true;
							}, 500);
						},
						false
					);
					window.addEventListener(
						'mouseup',
						function (e) {
							clearInterval(longPress);
							if (longPressed == true) {
								document.body.classList.remove('is-longpress');
								pushBalls(randBetween(50 + Math.ceil(multiplier), 100 + Math.ceil(multiplier)), e.clientX, e.clientY);
								longPressed = false;
							}
							document.body.classList.remove('is-pressed');
						},
						false
					);
					window.addEventListener(
						'mousemove',
						function (e) {
							let x = e.clientX;
							let y = e.clientY;
							pointer.style.top = y + 'px';
							pointer.style.left = x + 'px';
						},
						false
					);
				} else {
					console.log('canvas or addEventListener is unsupported!');
				}

				function updateSize() {
					canvas.width = window.innerWidth * 2;
					canvas.height = window.innerHeight * 2;
					canvas.style.width = window.innerWidth + 'px';
					canvas.style.height = window.innerHeight + 'px';
					ctx.scale(2, 2);
					width = canvas.width = window.innerWidth;
					height = canvas.height = window.innerHeight;
					origin = {
						x: width / 2,
						y: height / 2,
					};
					normal = {
						x: width / 2,
						y: height / 2,
					};
				}
				class Ball {
					constructor(x = origin.x, y = origin.y) {
						this.x = x;
						this.y = y;
						this.angle = Math.PI * 2 * Math.random();
						if (longPressed == true) {
							this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
						} else {
							this.multiplier = randBetween(6, 12);
						}
						this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
						this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
						this.r = randBetween(8, 12) + 3 * Math.random();
						this.color = colours[Math.floor(Math.random() * colours.length)];
					}
					update() {
						this.x += this.vx - normal.x;
						this.y += this.vy - normal.y;
						normal.x = (-2 / window.innerWidth) * Math.sin(this.angle);
						normal.y = (-2 / window.innerHeight) * Math.cos(this.angle);
						this.r -= 0.3;
						this.vx *= 0.9;
						this.vy *= 0.9;
					}
				}

				function pushBalls(count = 1, x = origin.x, y = origin.y) {
					for (let i = 0; i < count; i++) {
						balls.push(new Ball(x, y));
					}
				}

				function randBetween(min, max) {
					return Math.floor(Math.random() * max) + min;
				}

				function loop() {
					ctx.fillStyle = 'rgba(255, 255, 255, 0)';
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					for (let i = 0; i < balls.length; i++) {
						let b = balls[i];
						if (b.r < 0) continue;
						ctx.fillStyle = b.color;
						ctx.beginPath();
						ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
						ctx.fill();
						b.update();
					}
					if (longPressed == true) {
						multiplier += 0.2;
					} else if (!longPressed && multiplier >= 0) {
						multiplier -= 0.4;
					}
					removeBall();
					requestAnimationFrame(loop);
				}

				function removeBall() {
					for (let i = 0; i < balls.length; i++) {
						let b = balls[i];
						if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
							balls.splice(i, 1);
						}
					}
				}
			}
			clickEffect(); //调用特效函数
		},
	},
	mounted() {
		this.show();
	},
};
</script>
<style lang="less">
* {
	padding: 0;
	margin: 0;
}
// #app {
// 	position: relative;
// 	height: 100vh;
// 	width: 100vw;
// 	.show1 {
// 		position: fixed;
// 		top: 250px;
// 		left: 20px;
// 	}
// 	.clip {
// 		// animation: slide-out-elliptic-top-bck 1s ease-in both;
// 	}
// 	.clip-reverse {
// 		// animation: slide-out-elliptic-top-bck-r 1s ease-in both;
// 	}
// 	@keyframes slide-out-elliptic-top-bck {
// 		0% {
// 			// transform: translateY(0) rotateX(0) scale(1);
// 			// transform-origin: 50% 1000px;
// 			// opacity: 1;
// 		}

// 		100% {
// 			// transform: translateY(-45vh) rotateX(-30deg) scale(0);
// 			// transform-origin: 50% 100%;
// 			// opacity: 0;
// 			height: 20vh;
// 		}
// 	}
// 	@keyframes slide-out-elliptic-top-bck-r {
// 		0% {
// 			// transform: translateY(-45vh) rotateX(-30deg) scale(0);
// 			// transform-origin: 50% 100%;
// 			height: 0;
// 		}

// 		100% {
// 			// transform: translateY(0) rotateX(0) scale(1);
// 			// transform-origin: 50% 1000px;
// 			height: 45vh;
// 		}
// 	}
// }
// #app::before {
// 	content: '';
// 	position: absolute;
// 	left: 0;
// 	width: 50%;
// 	height: 100%;
// 	background-color: rgb(19, 252, 221);
// 	z-index: 1000;
// 	animation: leftMove 2s linear forwards;
// }
// #app::after {
// 	content: '';
// 	position: absolute;
// 	right: 0;
// 	top: 0;
// 	width: 50%;
// 	height: 100%;
// 	background-color: rgb(15, 232, 239);
// 	z-index: 1000;
// 	animation: rightMove 2s linear forwards;
// }
// @keyframes leftMove {
// 	100% {
// 		width: 0;
// 	}
// }
// @keyframes rightMove {
// 	100% {
// 		width: 0;
// 	}
// }
#mainContainer {
	background: url('@/assets/img/bg6.jpg') no-repeat;
	background-size: 100% 100%;
	background-attachment: fixed;
	width: 100%;
	margin-top: 60px;
	box-sizing: border-box;
	padding-left: 10%;
	padding-right: 10%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;

	.main-box {
		z-index: 99;
		flex: 1;
		background-color: rgba(255, 255, 255, 0.7);
		margin-top: 5px;
		margin-bottom: 10px;
		border-radius: 5px;
		min-height: 100vh;
	}
}

::-webkit-scrollbar {
	/*滚动条整体样式*/
	width: 8px;
	/*高宽分别对应横竖滚动条的尺寸*/
	height: 5px;
	scrollbar-arrow-color: red;
}

::-webkit-scrollbar-thumb {
	/*滚动条里面小方块*/
	border-radius: 5px;
	background: rgba(0, 0, 0, 0.2);
	scrollbar-arrow-color: red;
}

::-webkit-scrollbar-track {
	/*滚动条里面轨道*/
	border-radius: 0;
	background: rgba(0, 0, 0, 0);
}
</style>
