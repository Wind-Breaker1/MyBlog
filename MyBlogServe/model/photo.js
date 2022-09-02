const mongoose = require('mongoose');
const PhotoSchema = new mongoose.Schema({
	uploadTime: { type: Date, require: true },
	shootingTime: { type: String, required: true },
	digest: { type: String, required: true },
	photoUrl: { type: String, required: true, unique: true },
	thumbnailUrl: { type: String },
	preBg: { type: String },
});
const PhotoModel = mongoose.model('Photo', PhotoSchema);

/**
 *新增照片
 * @param {object} data 照片的相关信息
 * @return 成功返回新增的照片信息，否则返回false
 */
const addPhoto = data => {
	console.log(data);
	const Photo = new PhotoModel(data);
	return Photo.save()
		.then(res => res)
		.catch(err => false);
};

/**
 *删除照片
 * @param {string} _id
 */
const deletePhoto = _id => {
	return PhotoModel.deleteOne({ _id });
};

/**
 * 查找某一个照片
 * @param {string} id 照片的_id
 * @return {object} 查找到的照片
 */
const getPhoto = id => {
	return PhotoModel.findById(id);
};
/**
 * 更新某一个照片
 * @param {string} id 照片的_id
 * @param {string} digest 新的描述信息
 * @return {object} 更新操作结果
 */
const updatePhoto = (_id, digest, shootingTime) => {
	return PhotoModel.updateOne({ _id }, { $set: { digest, shootingTime } });
};
/**
 *获取所有照片
 @return {Array} 查找到的照片对象数组
 */
const getPhotos = () => {
	return PhotoModel.find().lean();
};

/**
 *获取所有照片的数量
 * @return {number} 照片数量
 */
const getPhotoSums = () => {
	return PhotoModel.count();
};

module.exports = {
	getPhotos,
	getPhoto,
	deletePhoto,
	addPhoto,
	getPhotoSums,
	updatePhoto,
};
