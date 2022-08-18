const mongoose = require('mongoose');
const MurmurSchema = new mongoose.Schema({
	//创建表
	username: { type: String, require: true },
	murmur: { type: String, require: true, unique: true },
	avatarUrl: { type: String },
});
const MurmurModel = mongoose.model('murmur', MurmurSchema);
// 新增用户
const addMurmur = data => {
	const murmur = new MurmurModel(data);
	return murmur
		.save()
		.then(res => res)
		.catch(() => false);
};
// 更新用户信息
const updateMurmurUsername = (murmur, username) => {
	return MurmurModel.updateOne({ murmur }, { $set: { username } });
};
// 更新用户头像
const updateMurmurAvatar = (murmur, avatarUrl) => {
	return MurmurModel.updateOne({ murmur }, { $set: { avatarUrl } });
};
// // 删除用户
// const deleteMurmur = email => {
// 	return MurmurModel.deleteOne({ email });
// };
// 查找某一个用户，如果用户信息不存在返回null
const getMurmur = murmur => {
	return MurmurModel.findOne({ murmur }, 'username avatar');
};
// 查询所有用户
const getMurmurs = () => {
	return MurmurModel.find();
};
module.exports = {
	addMurmur,
	getMurmur,
	updateMurmurUsername,
	updateMurmurAvatar,
	getMurmurs
};
