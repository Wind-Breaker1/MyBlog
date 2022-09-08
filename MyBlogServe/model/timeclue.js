const mongoose = require('mongoose');
const TimeclueSchema = new mongoose.Schema({
	date: { type: String },
	title: { type: String, require: true },
	state: { type: Boolean, require: true },
	digest: { type: String },
});
const TimeclueModel = mongoose.model('timeclue', TimeclueSchema);
/**
 *新增时间线信息
 * @param {object} data 时间线信息的相关信息
 * @return 成功返回新增的时间线信息信息，否则返回false
 */
const addTimeclue = data => {
	const Timeclue = new TimeclueModel(data);
	return Timeclue.save()
		.then(res => res)
		.catch(() => false);
};

/**
 *删除时间线信息
 * @param {string} murmur 浏览器指纹
 */
const deleteTimeclue = _id => {
	return TimeclueModel.deleteOne({ _id });
};

/**
 * 查找某一个时间线信息
 * @param {string} id 时间线信息的_id
 * @return {object} 查找到的时间线信息
 */
const getTimeclue = id => {
	return TimeclueModel.findById(id);
};
/**
 * 查找某一个时间线信息
 * @param {string} id 时间线信息的_id
 * @return {object} 更新操作结果
 */
const uptateTimeclue = (id, date, title, digest) => {
	return TimeclueModel.updateOne({ _id: id }, { $set: { date, title, digest } });
};
const changeTimeNodeState = (id, state) => {
	return TimeclueModel.updateOne({ _id: id }, { $set: { state } });
};
/**
 *获取所有时间线信息
 @return {Array} 查找到的时间线信息对象数组
 */
const getTimeclues = () => {
	return TimeclueModel.find().sort({ date: -1 }).lean();
};
/**
 *获取所有时间线信息的数量
 @return {number} 查找到的时间线信息数量
 */
// const getTimeclueSums = () => {
// 	return TimeclueModel.count();
// };

module.exports = {
	getTimeclues,
	getTimeclue,
	deleteTimeclue,
	addTimeclue,
	// getTimeclueSums,
	uptateTimeclue,
	changeTimeNodeState,
};
