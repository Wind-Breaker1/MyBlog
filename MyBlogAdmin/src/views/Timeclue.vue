<template>
	<div>
		<el-button type="primary" size="mini" @click="popdrawer()" class="sub">添加节点</el-button>
		<el-table :data="timeNodes" class="tabel" height="calc(100% - 28px)">
			<el-table-column prop="date" label="时间" min-width="60"> </el-table-column>
			<el-table-column prop="title" label="标题" min-width="100"> </el-table-column>
			<el-table-column label="状态" min-width="60">
				<template slot-scope="scope">
					{{ scope.row.state ? "已完成" : "未完成" }}
				</template>
			</el-table-column>
			<el-table-column label="操作" min-width="120">
				<template slot-scope="scope">
					<el-button size="mini" @click="Edit(scope.row)">编辑</el-button>
					<el-button size="mini" type="primary" @click="changeTimeNodeState(scope.row)">{{ scope.row.state ? "未完成" : "已完成" }}</el-button>
					<el-button size="mini" type="danger" @click="deleteItem(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-drawer :title="dialogTitle" :visible="dialogShow" :show-close="false" direction="rtl" @closed="resetForm('timeNodeForm')">
			<el-form :model="form" ref="timeNodeForm" :rules="formRules">
				<el-form-item label="时间" prop="date" label-width="80px">
					<el-date-picker v-model="form.date" type="datetime" placeholder="选择日期时间"> </el-date-picker>
				</el-form-item>
				<el-form-item label="标题" prop="title" label-width="80px">
					<el-input v-model="form.title" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述" prop="digest" label-width="80px">
					<el-input v-model="form.digest" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div class="drawer-footer">
				<el-button @click="dialogShow = false">取 消</el-button>
				<el-button type="primary" @click="submit('timeNodeForm')">确 定</el-button>
				<el-button @click="resetForm('timeNodeForm')">重置</el-button>
			</div>
		</el-drawer>
	</div>
</template>
<script>
import { addTimeclue, updateTimeclue, deleteTimeclue, getTimeclues, changeTimeNodeState } from "@/api/api";
export default {
	data() {
		return {
			timeNodes: [],
			dialogShow: false,
			dialogTitle: "添加时间节点",
			form: {
				date: "",
				title: "",
				digest: "",
			},
			id: "",
			formRules: {
				date: [{ required: true, message: "请选择节点时间", trigger: "blur" }],
				title: [
					{ required: true, message: "请输入节点标题", trigger: "blur" },
					{ min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" },
				],
				digest: [
					{ required: true, message: "请输入该时间节点的描述信息", trigger: "blur" },
					{ min: 1, max: 100, message: "长度在 1 到 100 个字符", trigger: "blur" },
				],
			},
		};
	},
	mounted() {
		this.getTimeclues();
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
		async changeTimeNodeState(item) {
			const res = await changeTimeNodeState({ id: item._id });
			if (res.status == 200) {
				this.$message.success(res.msg);
				this.getTimeclues();
			} else {
				this.$message.error(res.msg);
			}
		},
		Edit(item) {
			this.dialogShow = true;
			this.dialogTitle = "编辑时间节点";
			this.form.date = item.date;
			this.form.title = item.title;
			this.form.digest = item.digest;
			this.id = item._id;
		},

		async deleteItem(item) {
			const res = await deleteTimeclue({ _id: item._id });
			if (res.status == 200) {
				this.$message.success(res.msg);
				this.getTimeclues();
			}
		},
		// 重置表单数据
		resetForm(formName) {
			this.form.date = "";
			this.form.title = "";
			this.form.digest = "";
			this.$refs[formName].clearValidate();
		},
		async submit(formName) {
			let res = null;
			this.$refs[formName].validate(async valid => {
				if (valid) {
					if (this.dialogTitle == "编辑时间节点") {
						res = await updateTimeclue({ _id: this.id, ...this.form });
					} else {
						res = await addTimeclue(this.form);
					}
					if (res.status == 200) {
						this.dialogShow = false;
						this.$message.success(res.msg);
						this.getTimeclues();
					}
				} else {
					this.$message.warning("信息不完整，请确定您选择了要上传的图片");
					return false;
				}
			});
		},
		// 上传图片弹出右边抽屉
		popdrawer() {
			this.dialogShow = true;
			this.dialogTitle = "添加时间节点";
		},
	},
};
</script>
