const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({//创建博客模型
  date: { type: String, require: true }, //创建日期
  articleId: { type: mongoose.Types.ObjectId, require: true },// 评论的文章id
  username: { type: String, require: true },
  favour: { type: Number, default: 0 },
  content: { type: String, default: '' },
  murmur: { type: String, require: true },
  replyInfo: [{
    date: { type: String }, //创建日期
    // replymurmur: { type: String, require: true },// 回复的指纹
    replyId: { type: mongoose.Types.ObjectId, require: true },// 回复的指纹
    replyname: { type: String, require: true } ,
    username: { type: String, require: true },
    favour: { type: Number, default: 0 },
    reply: { type: String, default: "" },
    murmur: { type: String, require: true },// 当前此条恢复的指纹
  }]
})
const CommentModel = mongoose.model('comment', CommentSchema);
// 新增一级评论
const addFirstComment = (data) => {
  let comment = new CommentModel(data);
  return comment.save().then((res) => {
    return res;
  }).catch((err) => {
    return new Error(err);
  })
};
// 新增次级评论
const addSecondComment = ({ _id, reply }) => {
  return CommentModel.findOneAndUpdate(
    { _id: _id },
    { $push: { replyInfo: reply } }
  ).then((res) => {
    return res;
  }).catch((err) => {
    return new Error(err);
  })
 
}; 
// 给一级评论点赞
const addFirstFavour = (_id) => {
  return CommentModel.updateOne({ _id }, { $inc: { 'favour': 1 } }).then((res) => {
    return res;
  }).catch((err) => {
    return new Error(err);
  })
};
// // 给次级评论点赞
const addSecondFavour = (_id, replyId) => {
  return CommentModel.updateOne({ _id, replyInfo: { $elemMatch: { _id:replyId } } }, { $inc: { 'replyInfo.$.favour': 1 } }).then((res) => {
      return res;
    }).catch((err) => {
      return new Error(err);
    })
};
// 删除一级评论
const deleteFirstComment = (_id) => {
    const res = CommentModel.findOneAndDelete({ _id }).then((res) => {
      return res;
    }).catch((err) => {
      return new Error(err);
    })
};
// 删除次级评论
const deleteSecondComment = (_id, replyId) => {
  return CommentModel.updateOne({ _id }, { "$pull": { replyInfo: { _id: replyId } } }).then((res) => {
      return res;
    }).catch((err) => {
      return new Error(err);
    })
};
// 查询所有评论
const commentList = (_id) => {
    return CommentModel.find({ articleId: _id }).then((res) => {
      return res;
    }).catch((err) => {
      return new Error(err);
    })
};

module.exports = {
  addFirstComment,
  addSecondComment,
  addFirstFavour,
  deleteFirstComment,
  deleteSecondComment,
  commentList,
  addSecondFavour
}