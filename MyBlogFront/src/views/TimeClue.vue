<template>
	<div class="timeclue-box">
		<el-timeline>
			<el-timeline-item
				v-for="(timeNode, index) in timeNodes"
				:key="index"
				:type="timeNode.state ? 'info' : ''"
				:timestamp="timeNode.date"
				:class="isLight ? 'time-moon' : 'time-night'"
				placement="top">
				<div class="time-node card" :style="`${color};${cardBg}`">
					<h3>{{ timeNode.title }}</h3>
					<p>{{ timeNode.digest }}</p>
				</div>
			</el-timeline-item>
		</el-timeline>
	</div>
</template>
<script>
import { getTimeclues } from '@/api/api';
import { mapState, mapGetters } from 'vuex';
export default {
	data() {
		return {
			timeNodes: [],
		};
	},
	mounted() {
		this.getTimeclues();
	},
	computed: {
		...mapState({
			isLight: state => state.theme.isLight,
		}),
		...mapGetters(['color', 'cardBg']),
	},
	methods: {
		async getTimeclues() {
			const res = await getTimeclues();
			if (res.status == 200) {
				this.timeNodes = res.data;
			} else {
				this.$message.error(res.msg);
			}
		},
	},
};
</script>
<style lang="less" scoped>
.timeclue-box {
	padding: 2vw;
	.time-node {
		padding: 10px;
		border-radius: 5px;
		border: 1px solid #fff;
		transition: 0.6s;
		p {
			margin-top: 5px;
		}
	}

	.time-moon {
		/deep/.el-timeline-item__timestamp {
			color: #000000;
		}
	}
	.time-night {
		/deep/.el-timeline-item__timestamp {
			color: #dddddd;
		}
	}
}
</style>
