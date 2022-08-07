<template>
	<div>
		<div class="option">
			<el-button type="primary" size="mini" @click="addClassify" class="sub">新增专栏</el-button>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column label="提交日期" width="180">
				<template slot-scope="scope">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">{{ scope.row.date }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="title" label="标题" width="250"> </el-table-column>
			<el-table-column prop="digest" label="专栏描述" width="500"> </el-table-column>
			<el-table-column prop="articleNum" label="博客数量" width="100"> </el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" center>
			<el-form :model="form">
				<el-form-item label="专栏名" :label-width="formLabelWidth">
					<el-input v-model="form.title" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述" :label-width="formLabelWidth">
					<el-input v-model="form.digest" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="submit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import { mapState } from "vuex";
export default {
	data() {
		return {
			dialogFormVisible: false,
			form: {
				title: "",
				digest: "",
			},
			formLabelWidth: "120px",
			dialogFormVisible: false,
			_id: "",
			dialogTitle: "",
		};
	},
	computed: {
		...mapState({
			tableData: state => state.classify.classifies || [],
		}),
	},
	mounted() {
		this.getData();
	},
	methods: {
		// 修改数据
		handleEdit(row) {
			this.dialogTitle = "编辑专栏";
			this.dialogFormVisible = true;
			this.form.title = row.title;
			this.form.digest = row.digest;
			// 获取点击行的email
			this._id = row._id;
		},
		// 删除数据
		async handleDelete(row) {
			const res = await this.$store.dispatch("deleteClassify", { _id: row._id });
			if (res?.status === 200) {
				this.$message.success(res?.msg);
				this.getData();
			} else {
				this.$message.error(res?.msg || "出错啦！");
			}
		},
		// 获取数据
		getData() {
			this.$store.dispatch("getClassifies");
		},

		// 提交数据
		async submit() {
			let res = null;
			if (this._id) {
				res = await this.$store.dispatch("updateClassifyTitle", { _id: this._id, title: this.form.title, digest: this.form.digest });
			} else {
				console.log(this.form.title);
				res = await this.$store.dispatch("addClassify", { title: this.form.title, digest: this.form.digest });
			}
			if (res?.status === 200) {
				// 修改成功后清空值
				this.form.title = "";
				this.form.digest = "";
				this._id = "";
				this.dialogFormVisible = false;
				this.$message.success(res.msg);
				this.getData();
			} else {
				this.$message.error(res?.msg || "出错啦！");
			}
		},
		// 增加专栏
		addClassify() {
			this.dialogTitle = "新增专栏";
			this.dialogFormVisible = true;
		},
	},
};
</script>

<style scoped lang="less">
.option {
	background-color: #ffffff;
	line-height: 10vh;
	button {
		margin-left: 1vw;
	}
}

.el-aside {
	background-color: rgb(84, 92, 100);
	color: #333;
	text-align: center;
	line-height: 1000vh;
}

.el-main {
	background-color: #e9eef3;
	color: #333;
	text-align: center;
	line-height: 100%;
}

body > .el-container {
	margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
	line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
	line-height: 320px;
}
</style>
