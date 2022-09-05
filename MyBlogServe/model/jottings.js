// 随笔数据模型
const mongoose = require('mongoose');
const JottingSchema = new mongoose.Schema({
	//创建表
	date: { type: Date },
	title: { type: String, require: true },
	favour: [
		{
			type: String,
			default: 0,
		},
	],
	tags: [
		{
			type: mongoose.Types.ObjectId,
			require: true,
		},
	],
	browse: { type: Number, default: 0 },
	content: { type: String, require: true },
	digest: { type: String }, // 描述信息
	state: { type: Boolean, default: false }, // 状态：是否发布
});
const JottingModel = mongoose.model('jotting', JottingSchema);
// 新增随笔
const addJotting = data => {
	let jotting = new JottingModel(data);
	return jotting
		.save()
		.then(() => {
			return true;
		})
		.catch(() => {
			return false;
		});
};
// 更新随笔
const updateJotting = (_id, { content, digest, title, tags }) => {
	return JottingModel.updateOne({ _id }, { $set: { content, digest, title, tags } });
};
// 修改随笔状态
const changeJottingState = (state, _id) => {
	return JottingModel.updateOne({ _id }, { $set: { state } });
};
// 删除随笔
const deleteJotting = _id => {
	return JottingModel.deleteOne({ _id });
};
// 查询某一随笔
const getJotting = id => {
	return JottingModel.findById(id).lean();
};
// 查询所有随笔
const getJottings = () => {
	return JottingModel.find().lean();
};
// 查询所有已发布随笔
const getPublishJottings = (pageStart = 0, pageSize = 5) => {
	return JottingModel.find({ state: true }, '_id date digest favour title browse').skip(pageStart).limit(pageSize).lean();
};
// 查询某一书签下的所有博客
const getJottingsOfTag = searchTag => {
	return JottingModel.find({ tags: { $in: searchTag } }, '_id date digest favour title browse').lean();
};
// 查询所有已发布的随笔数量
const getJottingSums = () => {
	return JottingModel.find({ state: true }).count();
};
// 增加点赞
const addFavour = (_id, favourMurmur) => {
	return JottingModel.updateOne({ _id }, { $push: { favour: favourMurmur } });
};
// 获取点赞数
const getFavour = id => {
	return JottingModel.findById(id, 'favour');
};
// 增加浏览量
const addJottingBrowse = _id => {
	return JottingModel.updateOne({ _id }, { $inc: { browse: 1 } });
};
//  模糊查询所有随笔
const searchJottings = searchValue => {
	let regexp = new RegExp(searchValue, 'i');
	return JottingModel.find({
		$or: [{ title: { $regex: regexp } }],
		state: true,
	}).lean();
};
module.exports = {
	addJotting,
	updateJotting,
	changeJottingState,
	deleteJotting,
	getJotting,
	getJottings,
	getPublishJottings,
	getJottingSums,
	addJottingBrowse,
	addFavour,
	getFavour,
	searchJottings,
	getJottingsOfTag,
};
