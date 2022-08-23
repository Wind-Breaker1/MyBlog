<template>
	<div id="footer" :style="`${color};${headFootBg}`">备案号：xxxxxxxxxxx</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters(['color', 'headFootBg']),
	},
};
</script>

<style scoped>
#footer {
	height: 60px;
	width: 100%;
	color: #ffffff;
	line-height: 60px;
	text-align: center;
	transition: background-color 0.7s;
}
</style>
