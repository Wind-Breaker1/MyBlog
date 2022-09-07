// 专栏数据模型
const mongoose = require('mongoose');
const ClassifySchema = new mongoose.Schema({
	//创建表
	date: { type: Date },
	title: { type: String },
	digest: { type: String }, // 描述信息
	articleNum: { type: Number, default: 0 }, // 文章数量
	bgColor: { type: String },
});
const ClassifyModel = mongoose.model('classify', ClassifySchema);
// 新增专栏
const addClassify = data => {
	const Classify = new ClassifyModel(data);
	return Classify.save()
		.then(() => {
			return true;
		})
		.catch(() => {
			return false;
		});
};
// 查询某一专栏信息
const getClassify = id => {
	return ClassifyModel.findById(id);
};
// 数据面板需要数据
const getClassifyForDataBoard = () => {
	return ClassifyModel.find({},'title articleNum');
};
// 删除专栏
const deleteClassify = _id => {
	return ClassifyModel.deleteOne({ _id });
};
// 更新某一专栏文章数量
const updateClassifySum = (_id, num) => {
	return ClassifyModel.updateOne({ _id }, { $inc: { articleNum: num } });
};
// 更新某一专栏
const updateClassifyTitle = (_id, title, digest) => {
	return ClassifyModel.updateOne({ _id }, { $set: { title, digest } });
};
// 查询所有专栏
const getClassifies = () => {
	return ClassifyModel.find().lean();
};
// 查询所有专栏的数量
const getClassifySums = () => {
	return ClassifyModel.count();
};
module.exports = {
	addClassify,
	deleteClassify,
	getClassifies,
	updateClassifySum,
	getClassify,
	updateClassifyTitle,
	getClassifySums,
	getClassifyForDataBoard
};
