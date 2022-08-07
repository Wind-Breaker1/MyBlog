<template>
	<div class="block">
		<div class="option">
			<el-button type="primary" size="mini" @click="addRoute" class="sub">新增路由</el-button>
		</div>
		<el-tree
			class="tree"
			:data="routeList"
			show-checkbox
			node-key="id"
			empty-text="当前还未设置路由"
			default-expand-all
			:expand-on-click-node="false">
			<span class="custom-tree-node" slot-scope="{ node, data }">
				{{ data.path }}
				<span>
					<el-button type="text" size="mini" @click="() => updateRoute(data)"> 路由详情 </el-button>
					<el-button type="text" size="mini" @click="() => removeRoute(data._id)"> 删除路由 </el-button>
				</span>
			</span>
		</el-tree>

		<el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible" center>
			<el-form :model="form">
				<!-- <el-form-item label="新增路由等级" :label-width="formLabelWidth" v-show="dialogFormTitle === '新增路由'">
					<el-select v-model="routeLevel" placeholder="请选择" style="width: 100%">
						<el-option label="一级路由" value="firstRoute"> </el-option>
						<el-option label="二级路由" value="secondRoute"> </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="父级路由名字" :label-width="formLabelWidth" v-show="routeLevel === 'secondRoute'">
					<el-input v-model="parentRouteName" autocomplete="off"></el-input>
				</el-form-item> -->
				<el-form-item label="路由" :label-width="formLabelWidth">
					<el-input v-model="form.path" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="名字" :label-width="formLabelWidth">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="组件文件名" :label-width="formLabelWidth">
					<el-input v-model="form.component" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="meta" :label-width="formLabelWidth">
					<el-form size="mini">
						<el-form-item v-for="(item, index) in metaList" :key="index" class="form-meta">
							<span class="form-label">键</span>
							<el-input v-model="item.key" class="form-input"></el-input>
							<span class="form-label">值</span>
							<el-input v-model="item.value" class="form-input"></el-input>
							<el-button type="danger" @click.prevent="removeMetaItem(item)" class="form-delete">删除</el-button>
						</el-form-item>
						<el-form-item class="form-last">
							<el-button @click="addMetaItem" class="form-button" type="primary">新增配置</el-button>
							<el-button @click="resetFormMeta" class="form-button">重置</el-button>
						</el-form-item>
					</el-form>
				</el-form-item>
				<el-form-item label="用户角色" :label-width="formLabelWidth">
					<el-checkbox-group v-model="form.limits"
						>{{ form.limits.length }}
						<el-checkbox label="普通用户"></el-checkbox>
						<el-checkbox label="管理员"></el-checkbox>
					</el-checkbox-group>
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
import { mapGetters } from "vuex";
export default {
	data() {
		return {
			// dialog控制
			dialogFormVisible: false,
			dialogFormTitle: "",
			// 外层表单数据
			form: this.resetForm(),
			metaList: [],
			// 表单左边距控制
			formLabelWidth: "120px",

			roleList: [],
			routeLevel: "",
			parentRouteName: "",
		};
	},
	computed: {
		...mapGetters(["routeList", "routes"]),
	},
	mounted() {
		this.init();
	},
	methods: {
		// 重置meta
		resetFormMeta() {
			this.metaList.forEach(item => {
				(item.key = ""), (item.value = "");
			});
		},
		// 删除meta配置项
		removeMetaItem(item) {
			var index = this.metaList.indexOf(item);
			if (index !== -1) {
				this.metaList.splice(index, 1);
			}
		},
		// 新增meta配置项
		addMetaItem() {
			this.metaList.push({
				key: "",
				value: "",
			});
			console.log(this.metaList);
		},
		// 获取路由数据
		async init() {
			// if (this.routeList.length === 0)
			this.$store.dispatch("getRouteList");
		},
		addRoute() {
			this.dialogFormVisible = true;
			this.dialogFormTitle = "新增路由";
			this.form = this.resetForm();
			this.metaList = [];
		},
		// 修改路由数据
		updateRoute(data) {
			this.metaList = [];
			this.form = data;
			this.dialogFormVisible = true;
			this.dialogFormTitle = "修改路由信息";
			if (data.meta) {
				for (let item of Object.keys(data.meta)) {
					this.metaList.push({
						key: item,
						value: data.meta[item],
					});
				}
			}
			// const newChild = { id: id++, label: 'testtest', children: [] };
			// if (!data.children) {
			// 	this.$set(data, 'children', []);
			// }
			// data.children.push(newChild);
		},
		// 提交注册路由信息
		async submit() {
			if (this.metaList.length > 0) {
				this.metaList.forEach(item => {
					this.form.meta[item.key] = item.value;
				});
				this.metaList = [];
			}
			let res;
			if (this.dialogFormTitle === "新增路由") {
				res = await this.$store.dispatch("addFirstRoute", { route: this.form });
				// if (this.routeLevel === "firstRoute") {
				// 	result = this.$store.dispatch("addFirstRoute", { route: this.form });
				// } else {
				// }
			} else {
				res = await this.$store.dispatch("updatRoute", { route: this.form });
			}
			if (res.status == 200) {
				this.dialogFormVisible = false;
				this.form = this.resetForm();
				this.$message.success(res.msg);
			} else {
				this.$message.error(res.msg);
			}
		},
		async removeRoute(_id) {
			this.$confirm("将永久删除该路由信息, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(async () => {
					const res = await this.$store.dispatch("deleteRoute", { _id });
					if (res.status === 200) {
						this.$message({
							type: "success",
							message: "删除成功!",
						});
						this.$store.dispatch("getRouteList");
					} else {
						this.$message.error(res.msg);
					}
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消删除",
					});
				});
			// const obj = {};
			// if (data._id) {
			// 	obj._id = data._id;
			// 	obj.name = undefined;
			// } else {
			// 	obj._id = _id;
			// 	obj.name = data.name;
			// }
		},
		// 初始化数据
		resetForm() {
			return {
				path: "",
				name: "",
				component: "",
				meta: {},
				limits: [],
			};
		},
	},
};
</script>

<style scoped lang="less">
.block {
	overflow-y: auto;
	/deep/ .el-tree-node {
		height: 10vh;
		.el-tree-node__content {
			height: 100%;
		}
	}
	.option {
		background-color: #ffffff;
		line-height: 10vh;
		button {
			margin-left: 1vw;
		}
	}
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 20px;
		padding-right: 80px;
	}
	.form-meta {
		.form-input {
			width: 40%;
		}
		.form-label,
		.form-delete {
			margin-left: 1%;
			margin-right: 0.5%;
		}
	}
	.form-last {
		margin-bottom: 0;
	}
}
</style>
