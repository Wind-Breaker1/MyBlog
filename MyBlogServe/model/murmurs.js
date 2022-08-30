const mongoose = require('mongoose');
const MurmurSchema = new mongoose.Schema({
	date: { type: Date, require: true },
	username: { type: String, require: true },
	murmur: { type: String, require: true, unique: true },
	avatarUrl: { type: String },
});
const MurmurModel = mongoose.model('murmur', MurmurSchema);

/**
 *新增浏览器指纹信息
 * @param {object} data 浏览器指纹的相关信息
 * @return 成功返回新增的指纹信息，否则返回false
 */
const addMurmur = data => {
	const murmur = new MurmurModel(data);
	return murmur
		.save()
		.then(res => res)
		.catch(() => false);
};

/**
 *修改浏览器指纹对应用户名
 * @param {string} murmur 浏览器指纹
 * @param {string} username 浏览器指纹对应用户名
 */
const updateMurmurUsername = (murmur, username) => {
	return MurmurModel.updateOne({ murmur }, { $set: { username } });
};

/**
 *更新用户头像
 * @param {string} murmur 浏览器指纹
 * @param {string} avatarUrl 浏览器指纹对应头像地址
 */
const updateMurmurAvatar = (murmur, avatarUrl) => {
	return MurmurModel.updateOne({ murmur }, { $set: { avatarUrl } });
};

// // 删除用户
const deleteMurmurInfo = id => {
	return MurmurModel.deleteOne({ _id: id });
};
// 查找某一个用户，如果用户信息不存在返回null

/**
 * @param {string} murmur 浏览器指纹
 * @return {object} 查找到的指纹信息
 */
const getMurmurInfo = murmur => {
	return MurmurModel.findOne({ murmur });
};

/**
 *获取所有指纹信息
 @return {Array} 查找到的指纹信息对象数组
 */
const getMurmurInfos = () => {
	return MurmurModel.find();
};
module.exports = {
	addMurmur,
	getMurmurInfo,
	updateMurmurUsername,
	updateMurmurAvatar,
	getMurmurInfos,
	deleteMurmurInfo,
};
