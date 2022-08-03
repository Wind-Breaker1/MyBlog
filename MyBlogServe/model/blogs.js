const mongoose = require('mongoose');
const ClassifiesModel = require('./classifies')
const BlogSchema = new mongoose.Schema({//创建博客模型
  date: { type: String }, //创建日期
  title: { type: String, require: true },
  classification: { type: mongoose.Types.ObjectId, require: true },//所属专栏
  favour: [{
    type: String,
  }],//点赞的浏览器指纹数组
  browse: { type: Number, default: 0 },
  content: { type: String, require: true },
  digest: { type: String },// 描述信息
  state: { type: Boolean, default: false },// 状态：是否发布
})
const ArticleModel = mongoose.model('article', BlogSchema);
// 新增文章
const addblog = (data) => {
  let article = new ArticleModel(data);
  return article.save().then((res) => {
    return true;
  }).catch(() => {
    return false;
  })
};
// 更新博客内容
const updateBlog = (id, { content, title, digest}) => {
  return ArticleModel.findByIdAndUpdate(id, { $set: { content, title, digest } });
};
// 修改博客状态
const changeBlogState = (state, id) => {
  return ArticleModel.findByIdAndUpdate(id, { $set: { state } });
};
// 删除博客
const deleteBlog = (id) => {
  return ArticleModel.findByIdAndDelete(id);
};
// 查询某一博客
const getBlog = (id) => {
  return ArticleModel.findById(id);
};
// 查询所有文章
const getBlogs = () => {
  return ArticleModel.find();
};
// 查询所有已发布的博客
const getPublishBlogs = ({ pageStart = 0, pageSize = 5 }) => {
  return ArticleModel.find({ state: true }, '_id date digest favour title browse').skip(pageStart).limit(pageSize);
};
// 查询所有已发布的博客的数量
const getblogSums = () => {
  return ArticleModel.find({ state: true }).count();
};
// 查询某一书签下的所有博客
const getBlogsOfClassify = (classification) => {
  return ArticleModel.find({ classification }, '_id date digest favour title browse');
};
// 增加点赞
const addFavour = (_id, favourMurmur) => {
  return ArticleModel.findOneAndUpdate(
    { _id: _id },
    { $push: { favour: favourMurmur } }
  );
};
// 获取点赞数
const getFavour = (_id) => {
  return ArticleModel.findById(_id, 'favour');
};
// 增加浏览量
const addBlogBrowse = (_id, murmur) => {
  return ArticleModel.updateOne({ _id }, { $inc: { 'browse': 1 } });
};
// 模糊查询所有文章
const searchBlogs = (searchValue) => {
  let regexp = new RegExp(searchValue, 'i')
  return ArticleModel.find({
    $or: [
      { 'title': { '$regex': regexp } }],
    state: true
  }).skip(pageStart).limit(pageSize);
};
module.exports = {
  addblog,
  updateBlog,
  changeBlogState,
  deleteBlog,
  getBlog,
  getBlogs,
  getPublishBlogs,
  getblogSums,
  getBlogsOfClassify,
  addFavour,
  addBlogBrowse,
  getFavour,
  searchBlogs
}