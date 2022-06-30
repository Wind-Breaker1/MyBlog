// 随笔数据模型
let mongoose = require('mongoose');
let JottingSchema = new mongoose.Schema({//创建表
  date: { type: String},
  title: { type: String, require: true },
  favour: { type: Number, default: 0 },
  browse: { type: Number, default: 0 },
  content: { type: String, require: true },
  // 描述信息
  digest: { type: String },
  // 状态：是否发布
  state: { type: Boolean, default: false }

})
let JottingModel = mongoose.model('jotting', JottingSchema);
// 新增随笔
let addJotting = (data) => {
  let jotting = new JottingModel(data);
  return jotting.save().then(() => {
    return true;
  }).catch((err) => {
    return err;
  })
};
// 更新随笔
let updateJotting = ({ content, _id }) => {
  return JottingModel.updateOne({ "_id": _id }, { $set: { "content": content } }).then(() => {
    return true;
  }).catch((err) => {
    return false;
  })
};
// 修改用状态
let updateState = (state, id) => {
  return JottingModel.updateOne({ "_id": id }, { $set: { "state": state } }).then(() => {
    return true;
  }).catch((err) => {
    return false;
  })
};
// 删除随笔
var deleteJotting = (_id) => {
  return JottingModel.deleteOne({ _id });
};
// 查询某一随笔
var JottingOne = (_id) => {
  console.log(_id)
  return JottingModel.findOne({ _id });
};
// 查询所有随笔
var JottingsList = () => {
  return JottingModel.find();
};
// 查询所有已发布随笔
var publishJottings = ({ pageStart = 0, pageSize = 5 }) => {
  console.log(pageStart, pageSize)
  return JottingModel.find({ state: true }, '_id date digest favour title').skip(pageStart).limit(pageSize);
};
// 查询所有已发布的博客
var jottingNums = () => {
  return JottingModel.find({ state: true }).count();
};
// 增加点赞
var addFavour = (_id) => {
  return JottingModel.updateOne({ _id }, { $inc: { 'favour': 1 } });
};
// 获取点赞数
var getFavour = (_id) => {
  return JottingModel.findOne({ _id }, 'favour');
};
// 增加浏览量
var addBrowse = (_id) => {
  return JottingModel.updateOne({ _id }, { $inc: { 'browse': 1 } });
};
module.exports = {
  addJotting,
  updateState,
  updateJotting,
  deleteJotting,
  JottingsList,
  JottingOne,
  publishJottings,
  jottingNums,
  addBrowse,
  addFavour,
  getFavour
}