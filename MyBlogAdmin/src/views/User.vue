<template>
	<div>
		<div class="option">
			<el-button type="primary" size="mini" @click="register" class="sub">新增用户</el-button>
		</div>
		<el-table :data="userList" style="width: 100%" height="530px">
			<i class="add"></i>
			<el-table-column label="注册日期" width="180">
				<template slot-scope="scope">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">{{ scope.row.date }}</span>
				</template>
			</el-table-column>
			<el-table-column label="用户名" width="180">
				<template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.username }}</span>
				</template>
			</el-table-column>
			<el-table-column label="email" width="180">
				<template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.email }}</span>
				</template>
			</el-table-column>
			<el-table-column label="角色" width="100">
				<template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.role }}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="editUserInfo(scope.row)">更改信息</el-button>
					<el-button size="mini" type="primary" @click="changePassword(scope.row)">修改密码</el-button>
					<el-button size="mini" type="danger" @click="deleteUser(scope.row)">注销</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :title="title" :visible.sync="dialogFormVisible" center>
			<el-form :model="form">
				<el-form-item label="用户名" :label-width="formLabelWidth" v-show="flag !== 'password'">
					<el-input v-model="form.username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item :label="lable" :label-width="formLabelWidth" v-show="flag !== 'userInfo'">
					<el-input v-model="form.password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item v-show="flag === 'register'" label="email" :label-width="formLabelWidth">
					<el-input v-model="form.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色" :label-width="formLabelWidth" v-show="flag !== 'password'">
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
			// element-ui弹出框数据
			dialogFormVisible: false,
			form: {
				username: "",
				password: "",
				email: "",
				role: "普通用户",
			},
			formLabelWidth: "120px",
			dialogFormVisible: false,
			title: "",
			lable: "",
			flag: "",
			email: "",
		};
	},
	computed: {
		...mapGetters(["userList"]),
	},
	mounted() {
		//获取个人购物车数据
		this.getData();
	},
	methods: {
		//
		// 改密码
		changePassword(row) {
			this.title = "修改密码信息";
			this.lable = "新密码";
			this.flag = false;
			this.dialogFormVisible = true;
			this.flag = "password";
			this.form.email = row.email;
		},
		editUserInfo(row) {
			this.title = "修改用户信息";
			this.lable = "新密码";
			this.flag = false;
			this.dialogFormVisible = true;
			this.flag = "userInfo";
			// 获取点击行的email
			this.form.email = row.email;
			this.form.role = row.role;
			this.form.username = row.username;
		},
		changeRole(command) {
			this.form.role = command;
		},
		// 删除
		async deleteUser(row) {
			// 删除用户
			const res = await this.$store.dispatch("deleteUser", { email: row.email });
			if (res.status === 200) {
				this.$message.success(res.msg);
			} else {
				this.$message.error(res.msg);
			}
			this.getData();
		},
		// 获取数据
		getData() {
			this.$store.dispatch("getUsers");
		},
		// 提交数据
		async submit() {
			let res = null;
			if (this.flag === "register") {
				// 注册请求接口
				res = await this.$store.dispatch("register", this.form);
			} else if (this.flag === "userInfo") {
				// 修改密码请求接口
				res = await this.$store.dispatch("updateUserInfo", {
					email: this.form.email,
					role: this.form.role,
					username: this.form.username,
				});
			} else {
				res = await this.$store.dispatch("updatePassword", {
					email: this.form.email,
					password: this.form.password,
				});
			}
			if (res.status === 200) {
				// 修改成功后清空值
				this.form.username = "";
				this.form.password = "";
				this.form.email = "";
				this.dialogFormVisible = false;
				this.$message.success(res.msg);
				this.getData();
			} else {
				this.$message.error(res.msg);
			}
		},
		// 注册
		register() {
			this.title = "修改密码";
			this.lable = "密码";
			this.flag = true;
			this.dialogFormVisible = true;
			this.form.username = "";
			this.form.email = "";
			this.form.role = "普通用户";
			this.flag = "register";
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
</style>
