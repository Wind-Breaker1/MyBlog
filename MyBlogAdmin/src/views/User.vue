<template>
	<div class="article-box">
		<el-tabs tab-position="top" class="tabs" @tab-click="changeTab">
			<el-tab-pane label="用户管理" class="tab-content">
				<el-button type="primary" size="mini" @click="register" class="sub">新增用户</el-button>
				<el-table :data="userList" class="table" height="100%">
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
			currentTab: 0,
			firstClick1: true,
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
			if (this.currentTab == 1 && this.firstClick1 && this.murmurInfos.length == 0) {
				this.$store.dispatch("getMurmurInfos");
				this.firstClick1 = false;
			}
		},
		// 改密码
		changePassword(row) {
			this.title = "修改密码信息";
			this.lable = "新密码";
			this.dialogFormVisible = true;
			this.flag = "password";
			this.form.email = row.email;
		},
		editUserInfo(row) {
			this.title = "修改用户信息";
			this.lable = "新密码";
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
		async submit() {
			let res = null;
			const { username, password, email, role } = this.form;
			if (this.flag === "register") {
				// 注册请求接口
				if (!username || !password || !email || !role) {
					this.$message.warning("请完整填写必要的信息！");
					return;
				}
				res = await this.$store.dispatch("register", { username, password, email, role });
			} else if (this.flag === "userInfo") {
				// 修改用户信息请求接口
				if (!username || !role) {
					this.$message.warning("请完整填写必要的信息！");
					return;
				}
				res = await this.$store.dispatch("updateUserInfo", { username, email, role });
			} else {
				if (!password) {
					this.$message.warning("请完整填写必要的信息！");
					return;
				}
				res = await this.$store.dispatch("updatePassword", { password, email });
			}
			if (res.status === 200) {
				// 修改成功后清空值
				this.form.username = "";
				this.form.password = "";
				this.form.email = "";
				this.dialogFormVisible = false;
				this.$message.success(res.msg);
				this.getUsers();
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
.article-box {
	margin: 1vw;
	padding: 2vh;
	box-sizing: border-box;
	width: 100%;
	background-color: rgb(50, 50, 50);
	border-radius: 5px;

	.tabs {
		height: 100%;
		.tab-content {
			height: 100%;
			.option {
				height: calc(100% - 28px);
			}
		}
	}
}
</style>
