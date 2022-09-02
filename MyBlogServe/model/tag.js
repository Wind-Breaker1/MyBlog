const mongoose = require('mongoose');
const TagSchema = new mongoose.Schema({
	date: { type: Date, require: true },
	title: { type: String, require: true, unique: true },
	digest: { type: String, require: true },
	bg: { type: String },
});
const TagModel = mongoose.model('tag', TagSchema);

/**
 *新增标签
 * @param {object} data 标签的相关信息
 * @return 成功返回新增的标签信息，否则返回false
 */
const addTag = data => {
	const tag = new TagModel(data);
	return tag
		.save()
		.then(res => res)
		.catch(() => false);
};

/**
 *删除标签
 * @param {string} murmur 浏览器指纹
 */
const deleteTag = _id => {
	return TagModel.deleteOne({ _id });
};

/**
 * 查找某一个标签
 * @param {string} id 标签的_id
 * @return {object} 查找到的标签
 */
const getTag = id => {
	return TagModel.findById(id);
};
/**
 * 查找某一个标签
 * @param {string} id 标签的_id
 * @return {object} 更新操作结果
 */
const uptateTag = (_id, title, digest) => {
	console.log(_id, title, digest);
	return TagModel.updateOne({ _id }, { $set: { title, digest } });
};
/**
 *获取所有标签
 @return {Array} 查找到的标签对象数组
 */
const getTags = () => {
	return TagModel.find().lean();
};
/**
 *获取所有标签的数量
 @return {number} 查找到的标签数量
 */
const getTagSums = () => {
	return TagModel.count();
};

module.exports = {
	getTags,
	getTag,
	deleteTag,
	addTag,
	getTagSums,
	uptateTag,
};
