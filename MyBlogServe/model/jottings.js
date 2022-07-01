// 随笔数据模型
const mongoose = require('mongoose');
const JottingSchema = new mongoose.Schema({//创建表
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
const JottingModel = mongoose.model('jotting', JottingSchema);
// 新增随笔
const addJotting = (data) => {
  let jotting = new JottingModel(data);
  return jotting.save().then(() => {
    return true;
  }).catch((err) => {
    return err;
  })
};
// 更新随笔
const updateJotting = ({ content, _id }) => {
  return JottingModel.updateOne({ "_id": _id }, { $set: { "content": content } }).then(() => {
    return true;
  }).catch((err) => {
    return false;
  })
};
// 修改用状态
const updateState = (state, id) => {
  return JottingModel.updateOne({ "_id": id }, { $set: { "state": state } }).then(() => {
    return true;
  }).catch((err) => {
    return false;
  })
};
// 删除随笔
const deleteJotting = (_id) => {
  return JottingModel.deleteOne({ _id });
};
// 查询某一随笔
const JottingOne = (_id) => {
  console.log(_id)
  return JottingModel.findOne({ _id });
};
// 查询所有随笔
const JottingsList = () => {
  return JottingModel.find();
};
// 查询所有已发布随笔
const publishJottings = ({ pageStart = 0, pageSize = 5 }) => {
  console.log(pageStart, pageSize)
  return JottingModel.find({ state: true }, '_id date digest favour title').skip(pageStart).limit(pageSize);
};
// 查询所有已发布的博客
const jottingNums = () => {
  return JottingModel.find({ state: true }).count();
};
// 增加点赞
const addFavour = (_id) => {
  return JottingModel.updateOne({ _id }, { $inc: { 'favour': 1 } });
};
// 获取点赞数
const getFavour = (_id) => {
  return JottingModel.findOne({ _id }, 'favour');
};
// 增加浏览量
const addBrowse = (_id) => {
  return JottingModel.updateOne({ _id }, { $inc: { 'browse': 1 } });
};
//  模糊查询所有文章
const searchJottings = (searchValue) => {
  let regexp = new RegExp(searchValue, 'i')
  return JottingModel.find({
    $or: [
      { 'title': { '$regex': regexp } }],
    state: true
  })
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
  getFavour,
  searchJottings
}