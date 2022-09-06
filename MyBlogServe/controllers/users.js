const UserModel = require('../model/users');
const { sign, verify, hash, compare, formatDate } = require('../utils');
// 添加新用户
const register = async (req, res, next) => {
	let { username, password, email, role } = req.body;
	// 密码加密
	const bcryptPassword = await hash(password);
	// 检查此邮箱是否已经被注册
	const Email = await UserModel.getUser(email);
	if (!Email) {
		let result = await UserModel.addUser({
			username,
			password: bcryptPassword,
			email,
			date: Date.now(),
			role,
		});

		if (result) {
			res.send({
				msg: '注册成功',
				status: 200,
			});
		} else {
			res.send({
				msg: '注册失败了！请检查信息',
				status: 0,
			});
		}
	} else {
		res.send({
			msg: '此邮箱已经被注册，换个邮箱吧！',
			status: 0,
		});
	}
};
// 登录
const login = async (req, res, next) => {
	let { email, password } = req.body;
	// 查找用户是否存在
	let user = await UserModel.getUser(email);
	if (user) {
		let { password: hash } = user;
		// 比较密码
		let compareResult = await compare(password, hash);
		if (compareResult) {
			let userInfo = {
				username: user.username,
				limits: user.limits,
				role: user.role,
				avatarUrl:user.avatarUrl
			};
			const token = sign(email);
			res.send({
				msg: '登陆成功',
				status: 200,
				data: {
					token: token,
					user: userInfo,
				},
			});
		} else {
			res.send({
				msg: '密码错误！',
				status: 0,
			});
		}
	} else {
		res.send({
			msg: '账号信息不存在！',
			status: 0,
		});
	}
};
// 登出
const logout = async (req, res, next) => {
	req.session = null;
	res.send({
		msg: '退出成功',
		status: 200,
	});
};
// 进入登录态
const getUserState = async (req, res, next) => {
	try {
		// 验证token
		let result = verify(token);
		res.send({
			msg: '已登录',
			status: 200,
			data: {
				username: result.username,
			},
		});
	} catch (err) {
		res.send({
			msg: '请登录',
			status: 0,
		});
	}
};
// 修改用户信息
const updateUserInfo = async (req, res, next) => {
	let { email, role, username } = req.body;
	let result = await UserModel.updateUserInfo(email, role, username);
	if (result.acknowledged && result.modifiedCount !== 0) {
		res.send({
			msg: '用户信息修改成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '用户信息修改失败',
			status: 0,
		});
	}
};

// 修改密码
const updatePassword = async (req, res, next) => {
	let { email, password } = req.body;
	const bcryptPassword = await hash(password);
	let result = await UserModel.updatePassword(email, bcryptPassword);
	if (result.acknowledged && result.modifiedCount !== 0) {
		res.send({
			msg: '密码修改成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '密码修改失败',
			status: 0,
		});
	}
};
// 获取用户列表
const getUsers = async (req, res, next) => {
	const users = await UserModel.getUsers();
	users.forEach(item => (item.date = formatDate(item.date)));
	if (users) {
		res.send({
			msg: '查询用户成功',
			status: 200,
			data: users,
		});
	} else {
		res.send({
			msg: '查询用户失败',
			status: 0,
		});
	}
};
// 删除用户
const deleteUser = async (req, res, next) => {
	const { email } = req.query;
	// 这里必须要await
	let result = await UserModel.deleteUser(email);
	if (result.acknowledged && result.deletedCount != 0) {
		res.send({
			msg: '用户注销成功！',
			status: 200,
		});
	} else {
		res.send({
			msg: '用户注销失败！',
			status: 0,
		});
	}
};

module.exports = {
	login,
	logout,
	getUserState,
	updateUserInfo,
	getUsers,
	register,
	deleteUser,
	updatePassword,
};
