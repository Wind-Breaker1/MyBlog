<template>
	<div>
		<el-tabs tab-position="top" class="tabs" @tab-click="changeTab">
			<el-tab-pane label="用户管理" class="tab-content">
				<el-button type="primary" size="mini" @click="register" class="sub">新增用户</el-button>
				<el-table :data="userList" height="calc(100% - 28px)">
					<i class="add"></i>
					<el-table-column label="注册日期" min-width="60">
						<template slot-scope="scope">
							<i class="el-icon-time"></i>
							<span style="margin-left: 10px">{{ scope.row.date }}</span>
						</template>
					</el-table-column>
					<el-table-column label="用户名" min-width="60">
						<template slot-scope="scope">
							<span style="margin-left: 10px">{{ scope.row.username }}</span>
						</template>
					</el-table-column>
					<el-table-column label="email" min-width="60">
						<template slot-scope="scope">
							<span style="margin-left: 10px">{{ scope.row.email }}</span>
						</template>
					</el-table-column>
					<el-table-column label="角色" min-width="50">
						<template slot-scope="scope">
							<span style="margin-left: 10px">{{ scope.row.role }}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" min-width="100">
						<template slot-scope="scope">
							<el-button size="mini" @click="editUserInfo(scope.row)">更改信息</el-button>
							<el-button size="mini" type="primary" @click="changePassword(scope.row)">修改密码</el-button>
							<el-button size="mini" type="danger" @click="deleteUser(scope.row, 'user')">注销</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="游客管理" class="tab-content">
				<el-table :data="murmurInfos" class="table" height="100%">
					<el-table-column label="注册日期" min-width="160">
						<template slot-scope="scope">
							<i class="el-icon-time"></i>
							<span style="margin-left: 10px">{{ scope.row.date }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="username" label="用户名" min-width="100"> </el-table-column>
					<el-table-column prop="murmur" label="浏览器指纹" min-width="180"> </el-table-column>
					<el-table-column prop="avatarUrl" label="头像" min-width="60">
						<template slot-scope="scope">
							<el-avatar size="medium" :src="scope.row.avatarUrl"></el-avatar>
						</template>
					</el-table-column>
					<el-table-column label="操作" min-width="80">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="deleteUser(scope.row, 'murmur')">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
		<el-dialog :title="title" :visible.sync="dialogFormVisible" center>
			<el-form :model="form" :rules="formRules" ref="form">
				<el-form-item label="用户名" label-width="120px" prop="username" v-if="flag !== 'changePassword'">
					<el-input v-model="form.username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item :label="lable" label-width="120px" prop="password" v-if="flag !== 'changeUserInfo'">
					<el-input v-model="form.password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" label-width="120px" prop="rePassword" v-if="flag !== 'changeUserInfo'">
					<el-input v-model="form.rePassword" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item v-if="flag === 'register'" label="email" prop="email" label-width="120px">
					<el-input v-model="form.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色" label-width="120px" v-if="flag !== 'changePassword'">
					<el-dropdown split-button @command="changeRole">
						{{ form.role }}
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="管理员">管理员</el-dropdown-item>
							<el-dropdown-item command="普通用户">普通用户</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancle">取 消</el-button>
				<el-button type="primary" @click="submit('form')">确 定</el-button>
				<el-button @click="resetForm('form')">重置</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入密码"));
			} else {
				if (value.length < 8 || value.length > 20) {
					callback(new Error("密码长度在8-20之间"));
				} else if (this.form.rePassword !== "") {
					this.$refs.form.validateField("rePassword");
				}
				callback();
			}
		};
		var validateRePass = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请再次输入密码"));
			} else if (value !== this.form.password) {
				callback(new Error("两次输入密码不一致!"));
			} else {
				callback();
			}
		};
		return {
			// element-ui弹出框数据
			dialogFormVisible: false,
			form: {
				username: "",
				password: "",
				rePassword: "",
				email: "",
				role: "普通用户",
			},
			title: "",
			lable: "",
			flag: "",
			email: "",
			currentTab: 0,
			formRules: {
				email: [
					{ required: true, message: "请输入邮箱地址", trigger: "blur" },
					{ type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] },
				],
				username: [
					{ required: true, message: "请输入用户名", trigger: "blur" },
					{ min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" },
				],
				password: [{ validator: validatePass, trigger: "blur" }],
				rePassword: [{ validator: validateRePass, trigger: ["blur", "change"] }],
			},
		};
	},
	computed: {
		...mapGetters(["userList", "murmurInfos"]),
	},
	mounted() {
		//获取个人购物车数据
		this.getUsers();
	},
	methods: {
		//
		changeTab(tab) {
			this.currentTab = parseInt(tab.index);
			if (this.currentTab == 1) {
				this.$store.dispatch("getMurmurInfos");
			} else {
				this.getUsers();
			}
		},
		// 改密码
		changePassword(row) {
			this.title = "修改密码信息";
			this.lable = "新密码";
			this.dialogFormVisible = true;
			this.flag = "changePassword";
			this.form.email = row.email;
		},
		// 改用户信息
		editUserInfo(row) {
			this.title = "修改用户信息";
			this.lable = "新密码";
			this.dialogFormVisible = true;
			this.flag = "changeUserInfo";
			// 获取点击行的email
			this.form.email = row.email;
			this.form.role = row.role;
			this.form.username = row.username;
		},
		changeRole(command) {
			this.form.role = command;
		},
		// 删除
		async deleteUser(row, type) {
			// 删除用户
			let res = null;
			if (type == "murmur") {
				console.log(23);
				res = await this.$store.dispatch("deleteMurmurInfo", { id: row._id });
			} else {
				res = await this.$store.dispatch("deleteUser", { email: row.email });
				this.getUsers();
			}
			if (res.status === 200) {
				this.getUsers();
				this.$message.success(res.msg);
			} else {
				this.$message.error(res.msg);
			}
		},
		// 获取数据
		getUsers() {
			this.$store.dispatch("getUsers");
		},
		// 提交数据
		async submit(formName) {
			let res = null;
			const { username, password, email, role } = this.form;
			this.$refs[formName].validate(async valid => {
				if (valid) {
					if (this.flag === "register") {
						// 注册请求接口
						res = await this.$store.dispatch("register", this.form);
					} else if (this.flag === "changeUserInfo") {
						res = await this.$store.dispatch("updateUserInfo", { username, email, role });
					} else {
						res = await this.$store.dispatch("updatePassword", { password, email });
					}
					if (res.status === 200) {
						// 修改成功后清空值
						this.resetForm("form");
						this.dialogFormVisible = false;
						this.$message.success(res.msg);
						this.getUsers();
					} else {
						this.$message.error(res.msg);
					}
				} else {
					this.$message.warning("请注意红色提示");
					return false;
				}
			});
		},
		// 取消
		cancle() {
			if (this.flag != "register") {
				this.resetForm("form");
			}
			this.dialogFormVisible = false;
		},
		// 重置表单数据
		resetForm(formName) {
			// this.email = "";
			this.form.username = "";
			this.form.password = "";
			this.form.rePassword = "";
			this.form.email = "";
			this.form.role = "普通用户";
			this.$refs[formName].clearValidate();
		},
		// 注册
		register() {
			this.title = "修改密码";
			this.lable = "密码";
			this.dialogFormVisible = true;
			this.flag = "register";
		},
	},
};
</script>

<style scoped lang="less">
.tabs {
	height: 100%;
	.tab-content {
		height: 100%;
	}
}
</style>
