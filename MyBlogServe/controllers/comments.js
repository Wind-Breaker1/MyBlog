const CommentModel = require('../model/comments');
const MurmruModel = require('../model/murmurs');
const util = require('../utils');
// 添加新一级评论
const addFirstComment = async (req, res, next) => {
	// 获取时间字符串
	const time = util.time();
	const { keyId, username, content, murmur, replyInfo = [] } = req.body;
	const result = await CommentModel.addFirstComment({
		date: time,
		keyId,
		username,
		content,
		murmur,
		replyInfo,
	});
	if (result) {
		res.send({
			msg: '评论成功',
			status: 200,
			data: result,
		});
	} else {
		res.send({
			msg: '评论失败！',
			status: 0,
		});
	}
};
// 添加新次级评论
const addSecondComment = async (req, res, next) => {
	// 获取时间字符串
	const time = util.date();
	const { _id, username, reply, murmur, replyname, replyId } = req.body;
	const result = await CommentModel.addSecondComment(_id, {
		date: time,
		// replymurmur,
		replyId,
		username,
		reply,
		murmur,
		replyname,
	});
	if (result.modifiedCount !== 0) {
		res.send({
			msg: '评论成功',
			status: 200,
			data: result,
		});
	} else {
		res.send({
			msg: '评论失败！',
			status: 0,
		});
	}
};
// 给一级评论点赞
const addFirstFavour = async (req, res) => {
	const { _id, favourMurmur } = req.query;
	const result = await CommentModel.addFirstFavour(_id, favourMurmur);
	if (result.modifiedCount !== 0) {
		res.send({
			msg: '点赞成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '点赞失败',
			status: 0,
		});
	}
};
// 给次级评论点赞
const addSecondFavour = async (req, res) => {
	const { _id, replyId, favourMurmur } = req.query;
	const result = await CommentModel.addSecondFavour(_id, replyId, favourMurmur);
	if (result.modifiedCount !== 0) {
		res.send({
			msg: '点赞成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '点赞失败',
			status: 0,
		});
	}
};
// 删除一级评论
const deleteFirstComment = async (req, res, next) => {
	const { _id } = req.query;
	const result = await CommentModel.deleteFirstComment(_id);
	if (result.deletedCount !== 0) {
		res.send({
			msg: '评论删除成功',
			status: 200,
			data: result,
		});
	} else {
		res.send({
			msg: '评论删除失败',
			status: 0,
		});
	}
};
// 删除次级评论
const deleteSecondComment = async (req, res, next) => {
	const { _id, replyId } = req.query;
	const result = await CommentModel.deleteSecondComment(_id, replyId);
	if (result.modifiedCount !== 0) {
		res.send({
			msg: '评论删除成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '评论删除失败',
			status: 0,
		});
	}
};
// 查询所有评论
const getComments = async (req, res) => {
	const { id, pageSize, pageStart, murmur } = req.query;
	// 这里必须要await
	const comment = await CommentModel.getComments(id, pageSize, pageStart);
	const user = await MurmruModel.getMurmur(murmur);
	if (comment) {
		res.send({
			msg: '评论查询成功',
			status: 200,
			data: { comment, user },
		});
	} else {
		res.send({
			msg: '评论查询失败',
			status: 0,
		});
	}
};

module.exports = {
	addFirstComment,
	addSecondComment,
	addFirstFavour,
	addSecondFavour,
	deleteFirstComment,
	deleteSecondComment,
	getComments,
};
