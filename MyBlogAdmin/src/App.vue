<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>
<script>
export default {
	// 数据
	mounted() {
		this.$store.dispatch("getClassifies");
		this.$store.dispatch("getTags");
	},
};
</script>

<style lang="less"></style>
