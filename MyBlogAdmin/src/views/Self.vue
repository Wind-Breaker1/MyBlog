<template>
	<el-descriptions class="self" :column="2" :labelStyle="labelStyle" :contentStyle="contentStyle">
		<template slot="title">
			<h2>个人中心</h2>
		</template>
		<el-descriptions-item label="用户名">123</el-descriptions-item>
		<el-descriptions-item label="手机号">18100000000</el-descriptions-item>
		<el-descriptions-item label="居住地" :span="2">苏州市</el-descriptions-item>
		<el-descriptions-item label="备注">
			<el-tag size="small">学校</el-tag>
		</el-descriptions-item>
		<el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
	</el-descriptions>
</template>

<script>
export default {
	data() {
		return {
			labelStyle: {
				fontSize: "16px",
				marginTop: "50px",
			},
			contentStyle: {
				fontSize: "16px",
				marginTop: "50px",
			},
		};
	},
};
</script>

<style lang="less" scoped>
.self {
	.self-label {
		color: #ddd !important;
		font-size: 16px;
	}
	color: #ddd;
	/deep/.el-descriptions__body {
		background-color: #323232;
		color: #ddd;
	}
	/deep/ .el-descriptions__title {
		margin: 20px auto 50px;
	}
}
</style>
