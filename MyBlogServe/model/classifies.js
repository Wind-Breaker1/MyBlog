// 专栏数据模型
let mongoose = require('mongoose');
let UserSchema = new mongoose.Schema({//创建表
  date: { type: String },
  title: { type: String },
  // 描述信息
  digest: { type: String },
  // 文章数量
  articleNum: { type: Number, default: 0 },
  bgColor: {type: String}
})
let ClassifyModel = mongoose.model('classify', UserSchema);
// 新增专栏
let addClassify = (data) => {
  data[bgColor] = Math.random() * 0xffffff << 2;
  let Classify = new ClassifyModel(data);
  return Classify.save().then(() => {
    return true;
  }).catch((err) => {
    return err;
  })
};
// 查询某一书签信息
var classifyOne = (_id) => {
  return ClassifyModel.findOne({ _id });
}
// 删除专栏
var deleteClassify = (_id) => {
  return ClassifyModel.deleteOne({ _id });
};
// 更新某一专栏文章数量
var updateClassifyNum = (_id, num = 1) => {
  return ClassifyModel.updateOne({ _id }, { $inc: {"articleNum": num}});
};
// 更新某一专栏
var updateTitle = (_id, title,digest) => {
  return ClassifyModel.updateOne({ _id }, { $set: { "title": title, "digest": digest } });
};
// 查询所有专栏
var ClassifiesList = () => {
  return ClassifyModel.find();
};

module.exports = {
  addClassify,
  deleteClassify,
  ClassifiesList,
  updateClassifyNum,
  classifyOne,
  updateTitle
}