const mongoose = require('mongoose');
const TagSchema = new mongoose.Schema({
	date: { type: String, require: true },
	title: { type: String, require: true, unique: true },
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
 * @param {string} username 浏览器指纹对应用户名
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
 * @return {object} 查找到的标签
 */
const uptateTag = (id, title) => {
	return TagModel.updateOne({ _id: id }, { $set: { title } });
};
/**
 *获取所有标签
 @return {Array} 查找到的标签对象数组
 */
const getTags = () => {
	return TagModel.find();
};

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
