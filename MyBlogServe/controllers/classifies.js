const ClassifyModel = require('../model/classifies');
// 添加新专栏
const addClassify = async (req, res) => {
  let { title, digest } = req.body;
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDay();
  let time = year + '-' + month + '-' + day;
  let result = await ClassifyModel.addClassify({
    date: time,
    title,
    digest,
  });
  if (result) {
    res.send({
      msg: '添加专栏成功',
      status: 200
    });
  } else {
    res.send({
      msg: '添加专栏失败！',
      status: -1
    });
  }
};

// 获取专栏名称
const getClassifysList = async (req, res) => {
  let result = await ClassifyModel.ClassifiesList();
  if (result) {
    res.send({
      msg: '查询专栏成功',
      status: 200,
      data: result
    });
  } else {
    res.send({
      msg: '查询专栏失败',
      status: -1,
    });
  }
}
// 修改专栏描述标题
const compile = async (req, res) => {
  let { _id, title, digest } = req.body;
  let result = await ClassifyModel.updateTitle(_id, title, digest);
  if (result) {
    res.send({
      msg: '编辑专栏成功',
      status: 200,
      data: result
    });
  } else {
    res.send({
      msg: '编辑专栏失败',
      status: -1,
    });
  }
}
// 删除专栏
const deleteClassify = async (req, res, next) => {
  const { _id } = req.query;
  // 这里必须要await
  let article = await ClassifyModel.classifyOne(_id);
  let { articleNum } = article;
  if (articleNum != 0) {
    res.send({
      msg: '专栏文章不为零，无法删除专栏',
      status: -1,
    });
  } else {
    let result = await ClassifyModel.deleteClassify(_id);
    if (result.deletedCount != 0) {
      res.send({
        msg: '删除专栏成功',
        status: 200,
      });
    } else {
      res.send({
        msg: '删除专栏失败！',
        status: -1,
      });
    }
  }
}

module.exports = {
  getClassifysList,
  deleteClassify,
  addClassify,
  compile
};