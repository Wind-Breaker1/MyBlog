<template>
	<div id="box">
		<div
			class="main-box"
			:style="{
				height: isLogin ? '364px' : '520px',
			}">
			<div :class="isLogin ? 'login-box' : 'register-box'">
				<h2 @click="change(true)">login |</h2>
				<h2 @click="change(false)">register</h2>
				<div class="item" v-show="!isLogin">
					<input type="text" v-model="username" @input="verifyUsername" />
					<label for="">username</label>
					<div class="err-msg" v-show="errUsername"><i class="el-icon-info"></i>用户名不能为空</div>
				</div>
				<div class="item">
					<input type="text" v-model="email" @input="verifyEmail" @blur="verifyTrue('email', 'errEmail')" />
					<label for="">email</label>
					<div class="err-msg" v-show="errEmail"><i class="el-icon-info"></i>邮箱格式不正确</div>
				</div>
				<div class="item">
					<input type="password" v-model="password" @input="verifyPassword" @blur="verifyTrue('password', 'errPassword')" />
					<label for="">password(8~12位字符)</label>
					<div class="err-msg" v-show="errPassword"><i class="el-icon-info"></i>密码不符合要求</div>
				</div>
				<div class="item" v-show="!isLogin">
					<input type="password" v-model="rePassword" @input="verifyRepassword" @blur="verifyTrue('rePassword', 'errRepassword')" />
					<label for="">rePassword</label>
					<div class="err-msg" v-show="errRepassword"><i class="el-icon-info"></i>两次密码不一致</div>
				</div>
				<button class="btn" @click="login" v-show="isLogin">
					登 录
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</button>
				<button class="btn" @click="register" v-show="!isLogin">
					注 册
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { getUserInfo } from "../util";
export default {
	data() {
		return {
			email: "",
			password: "",
			rePassword: "",
			username: "",
			isLogin: true,
			errEmail: false,
			errUsername: false,
			errPassword: false,
			errRepassword: false,
		};
	},
	methods: {
		async login() {
			try {
				const { email, password, errEmail, errPassword } = this;
				let result = null;
				console.log(errEmail, errPassword);
				if (!errEmail && !errPassword) {
					result = await this.$store.dispatch("login", {
						email,
						password,
					});
				} else {
					this.$message.error("请检查是否所有信息都正确填写！");
					return;
				}
				if (result) {
					this.$message.error(result.msg);
					return;
				}
				// 登录限制后要判断在跳转
				this.$store.dispatch("getRoutes", getUserInfo().role);
				this.$notify.success("登陆成功");
				this.$router.push("/admin/blog");
			} catch (error) {
				console.log(error);
				this.$message.error("错误请重新输入账号密码！");
			}
		},
		change(bool) {
			this.isLogin = bool;
			this.email = "";
			this.password = "";
			this.username = "";
			this.rePassword = "";
			this.errEmail = false;
			this.errPassword = false;
			this.errUsername = false;
			this.errRepassword = false;
		},
		async register() {
			try {
				const { email, password, username, errEmail, errPassword, errUsername, errRepassword } = this;
				let result = null;
				console.log(errEmail, errPassword, errUsername, errRepassword);
				if (!errEmail && !errPassword & !errUsername && !errRepassword) {
					result = await this.$store.dispatch("register", {
						email,
						password,
						username,
					});
				} else {
					this.$message.error("请检查所有信息是否填写正确！");
					return;
				}
				console.log(result);
				if (result.status === 200) {
					this.$message.success(result.msg);
					this.isLogin = true;
				} else {
					this.$message.error(result.msg);
				}
			} catch (error) {
				console.log(error);
				this.$message.error("出错了，请重新注册！");
			}
		},
		// 失去焦点并且输入为空不显示校验信息
		verifyTrue(content, state) {
			if (this[content] === "") {
				this[state] = false;
			}
		},
		// 校验函数
		verifyEmail() {
			if (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.email)) {
				this.errEmail = false;
			} else {
				this.errEmail = true;
			}
		},
		verifyUsername() {
			if (this.username) {
				this.errUsername = false;
			} else {
				this.errUsername = true;
			}
		},
		verifyPassword() {
			if (this.password.length >= 8 && this.password.length <= 12) {
				this.errPassword = false;
			} else {
				this.errPassword = true;
			}
		},
		verifyRepassword() {
			if (this.password && this.password === this.rePassword) {
				this.errRepassword = false;
			} else {
				this.errRepassword = true;
			}
		},
	},
};
</script>

<style scoped>
.err-msg {
	color: #ffffff;
	font-size: 14px;
	margin-top: 5px;
	line-height: 2rem;
}
input,
button {
	background: transparent;
	border: 0;
	outline: none;
}
#box {
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	background-image: url("../assets/bg.jpg");
	/* background: linear-gradient(#141e30, #243b55); */
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	color: #03e9f4;
	font-size: 16px;
	position: relative;
}

.main-box {
	width: 400px;
	height: 364px;
	background-color: #0c1622;
	border-radius: 10px;
	box-shadow: 0 15px 25px 0 rgba(0, 0, 0, 0.6);
	padding: 40px;
	box-sizing: border-box;
	opacity: 0.8;
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	margin: auto;
}

.login-box {
	position: absolute;
	width: 320px;
	animation: loginAnimation 1s;
}
.register-box {
	position: absolute;
	width: 320px;
	animation: registerAnimation 1s;
}

@keyframes loginAnimation {
	0% {
		transform: translateX(-100px);
		opacity: 0;
	}
	100% {
		/* transform: translateX(0px); */
		opacity: 1;
	}
}
@keyframes registerAnimation {
	0% {
		transform: translateX(100px);
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
h2 {
	/* text-align: center; */
	display: inline-block;
	color: aliceblue;
	margin-bottom: 30px;
	font-family: "Courier New", Courier, monospace;
	cursor: pointer;
}

.item {
	height: 45px;
	border-bottom: 1px solid #fff;
	margin-bottom: 40px;
	position: relative;
}

.item input {
	width: 100%;
	height: 100%;
	color: #fff;
	padding-top: 20px;
	box-sizing: border-box;
}

.item input:focus + label,
.item input:valid + label {
	top: 0px;
	font-size: 2px;
}

.item label {
	position: absolute;
	left: 0;
	top: 12px;
	transition: all 0.5s linear;
}

.btn {
	padding: 10px 50px;
	margin-right: 30px;
	color: #03e9f4;
	position: relative;
	overflow: hidden;
	text-transform: uppercase;
	letter-spacing: 2px;
	left: 30%;
}

.btn:hover {
	border-radius: 5px;
	color: #fff;
	/* background: #03e9f4; */
	box-shadow: 0 0 5px 0 #03e9f4, 0 0 25px 0 #03e9f4, 0 0 50px 0 #03e9f4, 0 0 100px 0 #03e9f4;
	transition: all 500ms linear;
}

.btn > span {
	position: absolute;
}

.btn > span:nth-child(1) {
	width: 100%;
	height: 2px;
	background: -webkit-linear-gradient(left, transparent, #03e9f4);
	left: -100%;
	top: 0px;
	animation: line1 1s linear infinite;
}

@keyframes line1 {
	50%,
	100% {
		left: 100%;
	}
}

.btn > span:nth-child(2) {
	width: 2px;
	height: 100%;
	background: -webkit-linear-gradient(top, transparent, #03e9f4);
	right: 0px;
	top: -100%;
	animation: line2 1s 0.25s linear infinite;
}

@keyframes line2 {
	50%,
	100% {
		top: 100%;
	}
}

.btn > span:nth-child(3) {
	width: 100%;
	height: 2px;
	background: -webkit-linear-gradient(left, #03e9f4, transparent);
	left: 100%;
	bottom: 0px;
	animation: line3 1s 0.75s linear infinite;
}

@keyframes line3 {
	50%,
	100% {
		left: -100%;
	}
}

.btn > span:nth-child(4) {
	width: 2px;
	height: 100%;
	background: -webkit-linear-gradient(top, transparent, #03e9f4);
	left: 0px;
	top: 100%;
	animation: line4 1s 1s linear infinite;
}

@keyframes line4 {
	50%,
	100% {
		top: -100%;
	}
}
</style>
