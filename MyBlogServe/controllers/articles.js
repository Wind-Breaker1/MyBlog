const ArticlesModel = require('../model/articles');
const ClassifyModel = require('../model/classifies');
// 添加新文章
const addArticle = async (req, res, next) => {
  // 获取时间字符串
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDay();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var time = year + '-' + month + '-' + day + '  ' + hours + ':' + minutes;
  var { title, classification, content, digest, state, _id } = req.body;
 
  if (_id) {
    // 若存在id则更新内容
    var result = await ArticlesModel.updateArticle({
      title,
      digest,
      content,
      _id
    });
  } else {
    var result = await ArticlesModel.addArticle({
      date: time,
      title,
      classification,
      content,
      digest,
      state,
    });
    if (result) {
      await ClassifyModel.updateClassifyNum(classification);
      res.send({
        msg: '添加成功',
        status: 0
      });
    } else {
      res.send({
        msg: '添加失败！',
        status: -2
      });
    }
  }

};
// 修改文章的状态
const changeState = async (req, res, next) => {
  let { _id } = req.query;
  console.log(_id)
  let re = await ArticlesModel.articleOne(_id);
  let result = await ArticlesModel.updateState(!re.state, _id);
  if (result) {
    res.send({
      msg: '修改成功',
      status: 0
    });
  }
  else {
    res.send({
      msg: '修改失败',
      status: -1
    });
  }
  
}
// 修改文章内容
const updateContent = async (req, res, next) => {
  var { content, _id } = req.body;
  var result = await ArticlesModel.updateArticle({
    _id,
    content
  });

  if (result.modifiedCount === 1) {
    res.send({
      msg: '修改成功',
      status: 0
    });
  }
  else {
    res.send({
      msg: '修改失败',
      status: -1
    });
  }

};
// 获取文章列表
const getArticleList = async (req, res, next) => {
  var result = await ArticlesModel.articlesList();
  if (result) {
    res.send({
      msg: '查询成功',
      status: 200,
      data: result
    });
  }
}
// 获取已发布文章列表
const getPublishArticles = async (req, res, next) => {
  let { pageStart, pageSize } = req.query;
  var blogList = await ArticlesModel.publishArticles({ pageStart, pageSize });
  var count = await ArticlesModel.articleNums();
  if (blogList) {
    res.send({
      msg: '查询成功',
      status: 200,
      data: { blogList, count}
    });
  } else {
    res.send({
      msg: '查找失败了！',
      status: 0,
    });
  }
}
// 删除文章
const deleteArticle = async (req, res) => {
  const _id = req.query;
  // 这里必须要await
  let result1 = await ArticlesModel.deleteArticle(_id);

  // 修改所属专栏的文章数量
  let result2 = await ClassifyModel.updateClassifyNum(result1.classification, -1);
  if (result1.deletedCount != 0 && result2.modifiedCount != 0) {
    res.send({
      msg: '删除成功',
      status: 0,
    });
  } else {
    res.send({
      msg: '删除失败！',
      status: 0,
    });
  }
}
// 获取某一个文章
const getArticle = async (req, res) => {
  const { _id } = req.query;
  // 这里必须要await
  let result = await ArticlesModel.addBrowse(_id);
  let article = await ArticlesModel.articleOne(_id);
  if (article && result.modifiedCount) {
    res.send({
      msg: '查找成功',
      status: 200,
      data: article
    });
  } else {
    res.send({
      msg: '查找失败！',
      status: 0,
    });
  }
}
// 获取某书签下所有博客
const getBlogsOfClassify = async (req, res) => {
  const { classification } = req.query;
  // 这里必须要await
  let result = await ArticlesModel.blogsOfClassify(classification);
  if (result && result.length) {
    res.send({
      msg: '查找成功',
      status: 200,
      data: {
        blogList: result
      }
    });
  } else {
    res.send({
      msg: 'blog查找失败！',
      status: 0,
    });
  }
}
// 点赞
const addFavour = async (req, res) => {
  let { _id } = req.query;
  let result = await ArticlesModel.addFavour(_id);
  let result1 = await ArticlesModel.getFavour(_id);
  if (result.modifiedCount === 1) {
    res.send({
      msg: '点赞成功',
      status: 200,
      data: result1.favour
    });
  } else {
    res.send({
      msg: '点赞失败！',
      status: 0,
    });
  }
}
// 点赞
const addBrowse = async (req, res) => {
  let { _id } = req.query;
  console.log(_id)
  let result = await ArticlesModel.addBrowse(_id);
  if (result.modifiedCount === 1) {
    res.send({
      msg: '浏览量增加成功',
      status: 200,
    });
  } else {
    res.send({
      msg: '失败！',
      status: 0,
    });
  }
}
module.exports = {
  getArticleList,
  deleteArticle,
  updateContent,
  addArticle,
  changeState,
  getArticle,
  getPublishArticles,
  getBlogsOfClassify,
  addFavour,
  addBrowse
};