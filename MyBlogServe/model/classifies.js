// 专栏数据模型
let mongoose = require('mongoose');
let UserSchema = new mongoose.Schema({//创建表
  date: { type: String },
  title: { type: String },
  digest: { type: String },// 描述信息
  articleNum: { type: Number, default: 0 }, // 文章数量
  bgColor: {type: String}
})
let ClassifyModel = mongoose.model('classify', UserSchema);
// 新增专栏
let addClassify = (data) => {
  console.log(111)
  data['bgColor'] = Math.random() * 0xffffff << 2;
  console.log(data)
  let Classify = new ClassifyModel(data);
  return Classify.save().then(() => {
    return true;
  }).catch(() => {
    return false;
  })
};
// 查询某一书签信息
var getClassify = (id) => {
  return ClassifyModel.findById(id);
}
// 删除专栏
var deleteClassify = (id) => {
  return ClassifyModel.findByIdAndDelete(id);
};
// 更新某一专栏文章数量
var updateClassifySum = (_id, num = 1) => {
  return ClassifyModel.updateOne({ _id }, { $inc: {"articleNum": num}});
};
// 更新某一专栏
var updateClassifyTitle = (_id, title,digest) => {
  return ClassifyModel.updateOne({ _id }, { $set: { title, digest } });
};
// 查询所有专栏
var getClassifies = () => {
  return ClassifyModel.find();
};

module.exports = {
  addClassify,
  deleteClassify,
  getClassifies,
  updateClassifySum,
  getClassify,
  updateClassifyTitle
}