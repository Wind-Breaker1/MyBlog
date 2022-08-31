const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
	//创建博客模型
	date: { type: Date, require: true }, //创建日期
	keyId: { type: String, require: true }, // 评论的文章id
	articleTitle: { type: String, require: true },
	favour: [
		{
			type: String,
		},
	],
	content: { type: String, default: '' },
	murmur: { type: String, require: true},
	replyInfo: [
		{
			date: { type: Date, require: true }, //创建日期
			// replymurmur: { type: String, require: true },// 回复的指纹
			// replyId: { type: mongoose.Types.ObjectId, require: true }, // 回复的id
			replyName: { type: String, require: true },
			// username: { type: String, require: true },
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
		.then(res => res)
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
const deleteFirstComment = _id => {
	return CommentModel.deleteOne({ _id });
};
// 删除次级评论
const deleteSecondComment = (_id, replyId) => {
	return CommentModel.updateOne({ _id }, { $pull: { replyInfo: { _id: replyId } } });
};
// 查询所有评论
const getCommentsOfArticle = (_id, pageSize = 5, pageStart = 0) => {
	return CommentModel.find({ keyId: _id }).skip(pageStart).limit(pageSize).lean();
};
const getComments = ( pageSize = 5, pageStart = 0) => {
	return CommentModel.find();
	// return CommentModel.aggregate([
	// 	{
	// 		$lookup: {
  //       from: "murmurs", // 关联 articles 表
  //       localField: "murmur", // 根据 comments 里 articleId 字段查询
  //       foreignField: "murmur", // 查找 articles 表里对应的 _id 的数据
	// 			pipeline: [ {$project: {username: 1} } ],
  //       as: "userinfo",// 返回的字段别名
  //     },
	// 	},
	// 	{ $unwind: "$userinfo" },//数据打散
	// ]);
	// .skip(pageStart).limit(pageSize).lean();
};
// 查询某一个评论
const getCommentReplyLast = (id) => {
	return CommentModel.findById(id);
};

module.exports = {
	addFirstComment,
	addSecondComment,
	addFirstFavour,
	deleteFirstComment,
	deleteSecondComment,
	getComments,
	addSecondFavour,
	getCommentReplyLast,
	getCommentsOfArticle
};
