const ArticlesModel = require('../model/articles');
const JottingModel = require('../model/jottings');
const ClassifyModel = require('../model/classifies');

// 获取总文章数
const getWebInfo = async (req, res, next) => {
  let articleNums = await ArticlesModel.articleNums();
  let jottingNums = await JottingModel.jottingNums();
  let count = jottingNums + articleNums;
  if (count) {
    res.send({
      msg: '查询文章总数成功',
      status: 200,
      count
    });
  } else {
    res.send({
      msg: '查询文章总数失败',
      status: -1
    });
  }
};
const getSliderInfo = async (req, res, next) => {
  let blogList = await ArticlesModel.publishArticles({});
  let jottingList = await JottingModel.publishJottings({});
  let classifies = await ClassifyModel.ClassifiesList();
  if (blogList && jottingList && classifies) {
    res.send({
      msg: '查询信息栏成功',
      status: 200,
      data: {
        blogList,
        jottingList,
        classifies
      }
    });
  } else {
    res.send({
      msg: '查询信息栏失败',
      status: -1
    });
  }
};
const searchArticle = async (req, res) => {
  let { searchValue } = req.query;
  let blogs = await ArticlesModel.searchBlogs(searchValue);
  blogs.forEach(item => {
    item.type = 'blog';
  })
  let jottings = await JottingModel.searchJottings(searchValue);
  jottings.forEach(item => {
    item.type = 'jotting';
  })
  let data = [...blogs, ...jottings ];
  if (data) {
    res.send({
      msg: '搜索到文章',
      status: 200,
      data
    });
  } else {
    res.send({
      msg: '未查询到相关信息',
      status: -1
    });
  }
};
module.exports = {
  getWebInfo,
  getSliderInfo,
  searchArticle
};