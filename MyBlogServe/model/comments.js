const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
	//创建博客模型
	date: { type: String, require: true }, //创建日期
	articleId: { type: mongoose.Types.ObjectId, require: true }, // 评论的文章id
	username: { type: String, require: true },
	favour: [
		{
			type: String,
		},
	],
	content: { type: String, default: '' },
	murmur: { type: String, require: true },
	replyInfo: [
		{
			date: { type: String, require: true }, //创建日期
			// replymurmur: { type: String, require: true },// 回复的指纹
			replyId: { type: mongoose.Types.ObjectId, require: true }, // 回复的id
			replyname: { type: String, require: true },
			username: { type: String, require: true },
			favour: [
				{
					type: String,
				},
			],
			reply: { type: String, default: '' },
			murmur: { type: String, require: true }, // 当前此条回复的指纹
		},
	],
});
const CommentModel = mongoose.model('comment', CommentSchema);
// 新增一级评论
const addFirstComment = data => {
	let comment = new CommentModel(data);
	return comment
		.save()
		.then(res => {
			return true;
		})
		.catch(err => {
			return false;
		});
};
// 新增次级评论
const addSecondComment = (_id, reply) => {
	return CommentModel.updateOne({ _id }, { $push: { replyInfo: reply } });
};
// 给一级评论点赞
const addFirstFavour = (_id, favourMurmur) => {
	return CommentModel.updateOne({ _id }, { $push: { favour: favourMurmur } });
};
// // 给次级评论点赞
const addSecondFavour = async (_id, replyId, favourMurmur) => {
	return CommentModel.updateOne({ _id, replyInfo: { $elemMatch: { _id: replyId } } }, { $push: { 'replyInfo.$.favour': favourMurmur } });
};
// 删除一级评论
const deleteFirstComment = id => {
	return CommentModel.deleteOne(id);
};
// 删除次级评论
const deleteSecondComment = (id, replyId) => {
	return CommentModel.updateOne(id, { $pull: { replyInfo: { _id: replyId } } });
};
// 查询所有评论
const getComments = _id => {
	return CommentModel.find({ articleId: _id });
};

module.exports = {
	addFirstComment,
	addSecondComment,
	addFirstFavour,
	deleteFirstComment,
	deleteSecondComment,
	getComments,
	addSecondFavour,
};
