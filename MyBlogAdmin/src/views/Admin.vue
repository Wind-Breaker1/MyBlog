<template>
	<div class="manage-box">
		<Head></Head>
		<div class="main-box">
			<Nav></Nav>
			<router-view class="box"></router-view>
		</div>
	</div>
</template>
<script>
import Head from "@/components/Head.vue";
import Foot from "@/components/Foot.vue";
import Nav from "@/components/Nav.vue";
export default {
	components: { Head, Nav },
};
</script>

<style lang="less" scoped>
.manage-box {
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	.main-box {
		margin-top: 45px;
		height: calc(100vh - 45px);
		display: flex;
		background-color: #000;
		.sythies-style {
			flex: 1;
			margin: 1vw;
  		padding: 1vh;
			background-color: #323232;
			border-radius: 5px;
		}
	}
}
</style>
