var ClassifyModel = require('../model/classifies');
// 添加新专栏
const addClassify = async (req, res, next) => {
  var { title, digest } = req.body;
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDay();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var time = year + '-' + month + '-' + day + '  ' + hours + ':' + minutes;
  var result = await ClassifyModel.addClassify({
    date: time,
    title,
    digest,
  });
  if (result) {
    res.send({
      msg: '添加成功',
      status: 0
    });
  } else {
    res.send({
      msg: '添加失败！',
      status: -1
    });
  }
};

// 获取专栏名称
const getClassifysList = async (req, res, next) => {
  var result = await ClassifyModel.ClassifiesList();
  if (result) {
    res.send({
      msg: '查询成功',
      status: 200,
      data: result
    });
  }
}
// 修改专栏描述标题
const compile = async (req, res, next) => {
  var { _id, title, digest } = req.body;
  let result = await ClassifyModel.updateTitle(_id, title, digest);

  if (result) {
    res.send({
      msg: '编辑成功',
      status: 0,
      data: result
    });
  }
}
// 删除专栏
const deleteClassify = async (req, res, next) => {
  const { _id } = req.query;
  console.log(_id)
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
        msg: '删除成功',
        status: 0,
      });
    } else {
      res.send({
        msg: '删除失败！',
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