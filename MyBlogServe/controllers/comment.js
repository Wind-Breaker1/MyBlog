const CommentModel = require('../model/Comment');
const ClassifyModel = require('../model/classifies');
const util = require('../utils');
// 添加新一级评论
const addFirstComment = async (req, res, next) => {
  // 获取时间字符串
  const time = util.date();
  const { articleId, username, content, murmur, replyInfo = [] } = req.body;
  try {
    const result = await CommentModel.addFirstComment({
      date: time,
      articleId,
      username,
      content,
      murmur,
      replyInfo
    });
    res.send({
      msg: '评论添加成功',
      status: 200,
      data: result
    });
  } catch(err) {
    res.send({
      msg: '评论添加失败！',
      status: 0
    });
  }
};
// 添加新次级评论
const addSecondComment = async (req, res, next) => {
  // 获取时间字符串
  const time = util.date();
  const { _id, username, reply, murmur, replyname, replyId } = req.body;
  // console.log({ _id, username, reply, murmur, replyname, replyId })
  try {
    const result = await CommentModel.addSecondComment({
      _id,
      reply: {
        date: time,
        // replymurmur,
        replyId,
        username,
        reply,
        murmur,
        replyname
      }
    })
    res.send({
      msg: '评论添加成功',
      status: 200,
      data: result
    });
  } catch (err) {
    res.send({
      msg: '评论添加失败！',
      status: 0
    });
  }
};
// 给一级评论点赞
const addFirstFavour = async (req, res) => {
  try {
    const { _id, favourMurmur } = req.query;
    await CommentModel.addFirstFavour(_id, favourMurmur);
    res.send({
      msg: '评论点赞成功',
      status: 200,
    });
  } catch (err) {
    res.send({
      msg: '评论点赞失败',
      status: 200,
    });
  }
}
// 给次级评论点赞
const addSecondFavour = async (req, res) => {
  try {
    const { _id, replyId, favourMurmur } = req.query;
    console.log(_id, replyId, favourMurmur,'111')
    await CommentModel.addSecondFavour(_id, replyId, favourMurmur);
    res.send({
      msg: '评论点赞成功',
      status: 200,
    });
  } catch (err) {
    res.send({
      msg: '评论点赞失败',
      status: 0,
    });
  }
}
// 删除一级评论
const deleteFirstComment = (req, res, next) => {
  try {
    const { _id } = req.query;
    CommentModel.deleteFirstComment(_id);
    res.send({
      msg: '评论删除成功',
      status: 200,
      data:result
    });
  } catch (err) {
    res.send({
      msg: '评论删除失败',
      status: 0,
    });
  }
}
// 删除次级评论
const deleteSecondComment = async (req, res, next) => {
  try {
    const { _id, replyId } = req.query;
    const result = await CommentModel.deleteSecondComment(_id, replyId);
    res.send({
      msg: '评论删除成功',
      status: 200,
    });
  } catch (err) {
    res.send({
      msg: '评论删除失败',
      status: 0,
    });
  }
}
// 查询所有评论
const getCommentList = async (req, res) => {
  try {
    const { id } = req.query;
    // 这里必须要await
    console.log(id)
    const result = await CommentModel.commentList(id);
    res.send({
      msg: '评论查询成功',
      status: 200,
      data: result
    });
  } catch (err) {
    res.send({
      msg: '评论查询失败',
      status: 0,
    });
  }
}


module.exports = {
  addFirstComment,
  addSecondComment,
  addFirstFavour,
  addSecondFavour,
  deleteFirstComment,
  deleteSecondComment,
  getCommentList
};