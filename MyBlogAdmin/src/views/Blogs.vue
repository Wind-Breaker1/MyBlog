<template>
	<el-table :data="blogsData" height="570">
		<el-table-column label="提交日期" width="180">
			<template slot-scope="scope">
				<i class="el-icon-time"></i>
				<span style="margin-left: 10px">{{ scope.row.date }}</span>
			</template>
		</el-table-column>
		<el-table-column prop="title" label="标题" width="350"> </el-table-column>
		<el-table-column prop="classifyTitle" label="书签" width="150"> </el-table-column>
		<el-table-column label="状态" width="80">
			<template slot-scope="scope">
				{{ scope.row.state ? "已发布" : "未发布" }}
			</template>
		</el-table-column>
		<el-table-column prop="favour.length" label="点赞量" width="80"> </el-table-column>
		<el-table-column prop="browse" label="浏览量" width="80"> </el-table-column>
		<el-table-column label="操作">
			<template slot-scope="scope">
				<el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
				<el-button size="mini" type="success" @click="changeBlogState(scope.row)">{{ scope.row.state ? "下架" : "发布" }}</el-button>
				<el-button size="mini" type="danger" @click="deleteBlog(scope.row)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	data() {
		return {};
	},
	mounted() {
		this.init();
	},
	computed: {
		...mapGetters(["blogs", "classifies"]),
		// 调数据的专栏名称
		blogsData() {
			let id;
			this.blogs.forEach(element => {
				id = element.classification;
				for (let ele of this.classifies) {
					if (ele._id === id) {
						element.classifyTitle = ele.title;
						break;
					}
				}
			});
			return JSON.parse(JSON.stringify(this.blogs));
		},
	},
	methods: {
		// 编辑
		async handleEdit(row) {
			await this.$store.dispatch("getBlog", { _id: row._id });
			this.$router.push({ path: "/admin/markdown", query: { type: "blog" } });
		},
		// 删除
		async deleteBlog(row) {
			const res = await this.$store.dispatch("deleteBlog", { _id: row._id, classification: row.classification });
			this.$store.dispatch("getBlogs");
			if (res.status === 200) {
				this.$message.success(res.msg);
			}
		},
		// 获取文章列表
		async init() {
			await this.$store.dispatch("getBlogs");
			if (this.classifies.length == 0) await this.$store.dispatch("getClassifies");
		},
		// 修改文章状态
		async changeBlogState(row) {
			const res = await this.$store.dispatch("changeBlogState", { _id: row._id });
			this.$store.dispatch("getBlogs");
			if (res.status === 200) {
				this.$message.success(res.msg);
			}
		},
	},
};
</script>
