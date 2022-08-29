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

<style lang="less">
#app {
	a {
		text-decoration: none;
	}
}

* {
	margin: 0;
	padding: 0;
}
</style>
