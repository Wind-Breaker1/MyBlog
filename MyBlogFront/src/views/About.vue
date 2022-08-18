<template>
	<div class="main-box">
		<div class="avatar">
			<img class="avatar" src="https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF" alt="错误" />
		</div>
		<div class="about-content">
			<p>WeiPengFei 男 在校大学生（即将毕业啦！）</p>
			<p>喜欢运动、羽毛球，乒乓球和篮球也会一点，足球也玩过</p>
			<p>梦想着成为一个资深的技术大牛，实现财富自由，生活越来越好</p>
			<p>我有很多想做的事：蹦极、去黄山观云海、去钱塘江看潮...</p>
			<p>乐观看待生活，努力改变人生！</p>
			<br />
			<div class="like">
				<div class="like-bg">
					<span>成长就是你主观世界遇到客观世界之间的那条沟，你掉进去了，叫挫折，爬出来了，叫成长。 ——罗振宇</span>
				</div>
				<div class="drops">
					<div class="drop1"></div>
					<div class="drop2"></div>
				</div>
			</div>
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
				<defs>
					<filter id="liquid">
						<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
						<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="liquid" />
					</filter>
				</defs>
			</svg>
		</div>
	</div>
</template>
<style lang="less" scoped>
.main-box {
	flex: 1;
	background-color: rgba(255, 255, 255, 0.6);
	border-radius: 5px;
	// animation: rotate-center 0.6s ease-in-out both;
	.avatar {
		width: 10vw;
		height: 10vw;
		padding-top: 5vh;
		margin: auto;
		border-radius: 50%;
		animation: swing-in-top-fwd 0.5s cubic-bezier(0.6, 2, 0.5, 1) both;
	}
	.about-content {
		margin-top: 10vh;
		text-align: center;
		font-size: 20px;
		font-weight: 800;
		line-height: 50px;
		position: relative;
	}
}

.like {
	width: 80%;
	margin: auto;

	font-family: sans-serif;
	color: #ffffff;
	font-size: 20px;
	span {
		z-index: 3;
	}
	.like-bg {
		background-color: #10a7c1;
		padding-bottom: 40px;
		border-radius: 5px;
		z-index: 2;
		animation: wave 1s ease-out forwards;
	}
	.drops {
		filter: url('#liquid');
		position: relative;
		animation: fade-in 0.1s linear 0.4s forwards;
		.drop1,
		.drop2 {
			width: 21px;
			height: 24px;
			border-radius: 50%;
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			background-color: #10a7c1;
		}

		.drop1 {
			width: 90px;
			height: 16px;
			bottom: 2px;
			border-radius: 0;
		}

		.drop2 {
			animation: drop 1.3s cubic-bezier(1, 0.19, 0.66, 0.12) 0.5s infinite;
		}
	}
}
@keyframes fade-in {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

@keyframes drop {
	0% {
		bottom: 0px;
		opacity: 1;
	}

	80% {
		opacity: 1;
	}

	100% {
		opacity: 1;
		bottom: -200px;
	}
}

@keyframes wave {
	0% {
		background-position: 0 160px;
		background-size: 170px 300px;
	}

	100% {
		background-position: 500px -18px;
		background-size: 250px 150px;
	}
}
@-webkit-keyframes swing-in-top-fwd {
	0% {
		-webkit-transform: rotateX(-100deg);
		transform: rotateX(-100deg);
		-webkit-transform-origin: top;
		transform-origin: top;
		opacity: 0;
	}
	100% {
		-webkit-transform: rotateX(0deg);
		transform: rotateX(0deg);
		-webkit-transform-origin: top;
		transform-origin: top;
		opacity: 1;
	}
}
@keyframes swing-in-top-fwd {
	0% {
		-webkit-transform: rotateX(-100deg);
		transform: rotateX(-100deg);
		-webkit-transform-origin: top;
		transform-origin: top;
		opacity: 0;
	}
	100% {
		-webkit-transform: rotateX(0deg);
		transform: rotateX(0deg);
		-webkit-transform-origin: top;
		transform-origin: top;
		opacity: 1;
	}
}
</style>
