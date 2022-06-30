let mongoose = require('mongoose');
let ClassifiesModel = require('./classifies')
let UserSchema = new mongoose.Schema({//创建博客模型
  date: { type: String }, //创建日期
  title: { type: String, require: true },
  classification: { type: mongoose.Types.ObjectId, require: true },//所属专栏
  favour: { type: Number, default: 0 },
  browse: { type: Number, default: 0 },
  content: {type: String, require: true},
  // 描述信息
  digest: { type: String },
  // 状态：是否发布
  state: {type: Boolean, default: false}
  
})
let ArticleModel = mongoose.model('article', UserSchema);
// 新增文章
let addArticle = (data) => {
  let article = new ArticleModel(data);
  return article.save().then((res) => {
    return true;
  }).catch((err) => {
    return err;
  })
};
// 更新文章内容
let updateArticle = ({ content,title,digest, _id }) => {
  return ArticleModel.updateOne({ "_id": _id }, { $set: { "content": content, "title":title,"digest":digest } }).then(() => {
    return true;
  }).catch((err) => {
    return false;
  })
};
// 修改用状态
let updateState = ( state, id ) => {
  return ArticleModel.updateOne({ "_id": id }, { $set:{"state": state } }).then(() => {
    return true;
  }).catch((err) => {
    return false;
  })
};
// 删除文章
var deleteArticle = (_id) => {
  return ArticleModel.findOneAndDelete({ _id });
};
// 查询某一文章
var articleOne = (_id) => {
  return ArticleModel.findOne({ _id });
};
// 查询所有文章
var articlesList = () => {
  return ArticleModel.find();
  // { }, null, { limit: 3 }
  // return ArticleModel.aggregate([
  //   {
  //     $lookup: {
  //       from: "classifies",//关联的表
  //       localField: "classification",//关联的条件
  //       foreignField: "_id",//关联的条件
  //       as: "items"//查询到的数据放到items里边
  //     }
  //   }
  // ])
};
// 查询所有已发布的博客
var publishArticles = ({ pageStart = 0, pageSize = 5}) => {
  return ArticleModel.find({ state: true }, '_id date digest favour title browse').skip(pageStart).limit(pageSize);
};
// 查询所有已发布的博客
var articleNums = () => {
  return ArticleModel.find({ state: true }).count();
};
// 查询某一书签下的所有博客
var blogsOfClassify = (classification ) => {
  return ArticleModel.find({ classification }, '_id date digest favour title browse');
};
// 增加点赞
var addFavour = (_id) => {
  return ArticleModel.updateOne({ _id }, { $inc: { 'favour': 1 } });
};
// 获取点赞数
var getFavour = (_id) => {
  return ArticleModel.findOne({ _id }, 'favour');
};
// 增加浏览量
var addBrowse = (_id) => {
  return ArticleModel.updateOne({ _id }, { $inc: { 'browse': 1 } });
};
module.exports = {
  addArticle,
  updateState,
  updateArticle,
  deleteArticle,
  articlesList,
  articleOne,
  publishArticles,
  articleNums,
  blogsOfClassify,
  addFavour,
  addBrowse,
  getFavour
}