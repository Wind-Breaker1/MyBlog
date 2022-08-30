const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	//创建表
	username: { type: String, require: true },
	password: { type: String, require: true },
	email: { type: String, require: true, unique: true }, //index: { unique: true }
	date: { type: Date },
	role: { type: String, require: true, default: '普通用户' },
});
const UserModel = mongoose.model('user', UserSchema);
// 新增用户
const addUser = data => {
	const user = new UserModel(data);
	return user
		.save()
		.then(() => true)
		.catch(() => false);
};
// 更新用户信息
const updateUserInfo = (email, role, username) => {
	return UserModel.updateOne({ email }, { $set: { username, role } });
};
// 更新用户信息
const updatePassword = (email, password) => {
	return UserModel.updateOne({ email }, { $set: { password } });
};
// 删除用户
const deleteUser = email => {
	return UserModel.deleteOne({ email });
};
// 查找某一个用户，如果用户信息不存在返回null
const getUser = email => {
	return UserModel.findOne({ email });
};
// 查询所有用户
const getUsers = () => {
	return UserModel.find().lean();
};
module.exports = {
	addUser,
	updateUserInfo,
	getUsers,
	deleteUser,
	getUser,
	updatePassword,
};
