const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
	//创建表
	username: { type: String, require: true },
	password: { type: String, require: true },
	limits: [
		{
			type: Number,
			require: true,
		},
	],
	email: { type: String, require: true, unique: true }, //index: { unique: true }
	date: { type: String },
	role: { type: String, require: true, default: 'user' },
});
const UserModel = mongoose.model('user', UserSchema);
// 新增用户
const save = data => {
	const user = new UserModel(data);
	return user.save();
};
// 更新密码
const updateUserInfo = ({ password, email, role }) => {
	return UserModel.updateOne({ email }, { $set: { password, role } })
		.then(() => {
			return true;
		})
		.catch(err => {
			return false;
		});
};
// 删除用户
const deleteUser = email => {
	return UserModel.deleteOne({ email });
};
// 查找登录信息
const findUser = email => {
	return UserModel.findOne({ email });
};
const findOneUser = username => {
	return UserModel.findOne(username);
};
// 查询所有用户
const usersList = () => {
	return UserModel.find();
};
module.exports = {
	save,
	findOneUser,
	updateUserInfo,
	usersList,
	deleteUser,
	findUser,
};
