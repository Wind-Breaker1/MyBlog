const ArticlesModel = require('../model/articles');
const ClassifyModel = require('../model/classifies');
const util = require('../utils');
// 添加新文章
const addArticle = async (req, res, next) => {
  // 获取时间字符串

  let time = util.date();
  let { title, classification, content, digest, state, _id } = req.body;
  let result = null;
  if (_id) {
    // 若存在id则更新内容
    result = await ArticlesModel.updateArticle({
      title,
      digest,
      content,
      _id
    });
  } else {
    result = await ArticlesModel.addArticle({
      date: time,
      title,
      classification,
      content,
      digest,
      state,
    });
  }
  if (result) {
    await ClassifyModel.updateClassifyNum(classification);
    res.send({
      msg: '博客添加成功',
      status: 200
    });
  } else {
    res.send({
      msg: '博客添加失败！',
      status: -1
    });
  }
};

// 修改文章的状态
const changeState = async (req, res, next) => {
  let { _id } = req.query;
  let article = await ArticlesModel.articleOne(_id);
  let result = await ArticlesModel.updateState(!article.state, _id);
  if (result) {
    res.send({
      msg: '博客状态修改成功',
      status: 200
    });
  }
  else {
    res.send({
      msg: '博客状态修改失败',
      status: -1
    });
  }
  
}
// 修改文章内容
const updateContent = async (req, res, next) => {
  let { content, _id } = req.body;
  let result = await ArticlesModel.updateArticle({
    _id,
    content
  });

  if (result.modifiedCount != 0) {
    res.send({
      msg: '博客修改成功',
      status: 200
    });
  }else {
    res.send({
      msg: '修改失败',
      status: -1
    });
  }
};
// 获取文章列表
const getArticleList = async (req, res, next) => {
  let result = await ArticlesModel.articlesList();
  if (result) {
    res.send({
      msg: '博客查询成功',
      status: 200,
      data: result
    });
  } else {
    res.send({
      msg: '博客查询失败',
      status: 200,
    });
  }
}
// 获取已发布文章列表
const getPublishArticles = async (req, res, next) => {
  let { pageStart, pageSize } = req.query;
  let blogList = await ArticlesModel.publishArticles({ pageStart, pageSize });
  let count = await ArticlesModel.articleNums();
  if (blogList) {
    res.send({
      msg: '博客查询成功',
      status: 200,
      data: { blogList, count}
    });
  } else {
    res.send({
      msg: '博客查找失败',
      status: 0,
    });
  }
}
// 删除文章
const deleteArticle = async (req, res) => {
  const _id = req.query;
  // 这里必须要await
  let deleteArticle = await ArticlesModel.deleteArticle(_id);
  // 修改所属专栏的文章数量
  let result = await ClassifyModel.updateClassifyNum(deleteArticle.classification, -1);
  if (deleteArticle.deletedCount != 0 && result.modifiedCount != 0) {
    res.send({
      msg: '删除博客成功',
      status: 200,
    });
  } else {
    res.send({
      msg: '删除博客失败！',
      status: 0,
    });
  }
}
// 获取某一个文章
const getBlog = async (req, res) => {
  const { _id } = req.query;
  // 这里必须要await
  await ArticlesModel.addBlogBrowse(_id);
  let article = await ArticlesModel.articleOne(_id);
  if (article) {
    // 查询博客所属书签
    let classify = await ClassifyModel.classifyOne(article.classification);
    if (article) {
      res.send({
        msg: '查找博客成功',
        status: 200,
        data: {
          article,
          classifyName: classify.title
        }
      });
    } else {
      res.send({
        msg: '查找博客失败！',
        status: 0,
      });
    }
  }
}
// 获取某书签下所有博客
const getBlogsOfClassify = async (req, res) => {
  const { classification } = req.query;
  let result = await ArticlesModel.blogsOfClassify(classification);
  if (result && result.length) {
    res.send({
      msg: '查找博客成功',
      status: 200,
      data: {
        blogList: result
      }
    });
  } else {
    res.send({
      msg: '查找博客失败！',
      status: 0,
    });
  }
}
// 点赞
const addFavour = async (req, res) => {
  let { _id, favourMurmur } = req.query;
  // 增加点赞数
  let addFavour = await ArticlesModel.addFavour(_id, favourMurmur);
  // 获取点赞数
  let getFavour = await ArticlesModel.getFavour(_id);
  console.log(addFavour, 'addfavour');
  if (addFavour) {
    res.send({
      msg: '博客点赞成功',
      status: 200,
      data: getFavour.favour
    });
  } else {
    res.send({
      msg: '博客点赞失败！',
      status: 0,
    });
  }
}
// 增加浏览量
const addBlogBrowse = async (req, res) => {
  let { _id } = req.query;
  let result = await ArticlesModel.addBlogBrowse(_id);
  if (result.modifiedCount === 1) {
    res.send({
      msg: '博客浏览量增加成功',
      status: 200,
    });
  } else {
    res.send({
      msg: '博客浏览量增加失败',
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
  getBlog,
  getPublishArticles,
  getBlogsOfClassify,
  addFavour,
  addBlogBrowse
};