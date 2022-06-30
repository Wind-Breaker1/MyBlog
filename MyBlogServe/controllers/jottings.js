const JottingModel = require('../model/jottings');
const addJotting = async (req, res, next) => {
  var { title, content, digest, state, _id } = req.body;
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDay();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var time = year + '-' + month + '-' + day + '  ' + hours + ':' + minutes;
  // 判断是修改还是新增
  if (_id) {
    // 若存在id则更新内容
    var result = await JottingModel.updateContent({
      content,
      _id
    });
  } else {
    var result = await JottingModel.addJotting({
      date:time,
      title,
      content,
      digest,
      state,
    });
    if (result) {
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
// 修改随笔的状态
const changeState = async (req, res, next) => {
  let { _id } = req.query;
  let re = await JottingModel.JottingOne(_id);
  let result = await JottingModel.updateState(!re.state, _id);
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
// 修改随笔内容
const updateContent = async (req, res, next) => {
  var { content, _id } = req.body;
  var result = await JottingModel.updateJotting({
    _id,
    content
  });

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
};
// 获取随笔列表
const getJottingsList = async (req, res, next) => {
  var result = await JottingModel.JottingsList();
  if (result) {
    res.send({
      msg: '查询成功',
      status: 200,
      data: result
    });
  }
}
// 获取已发布文章列表
const getPublishJottings = async (req, res, next) => {
  let { pageStart, pageSize } = req.query;
  var jottingList = await JottingModel.publishJottings({ pageStart, pageSize });
  var count = await JottingModel.jottingNums();
  console.log(jottingList, 111)
  if (jottingList) {
    res.send({
      msg: '查询成功',
      status: 200,
      data: { jottingList, count }
    });
  }
}
// 获取某一随笔
const getJotting = async (req, res, next) => {
  let { _id } = req.query;
  let result = await JottingModel.addBrowse(_id);
  let jotting = await JottingModel.JottingOne(_id);
  if (jotting && result.modifiedCount) {
    res.send({
      msg: '查询成功',
      status: 200,
      data: jotting
    });
  }
}
// 删除随笔
const deleteJotting = async (req, res, next) => {
  const { _id } = req.query;
  // 这里必须要await
  let result = await JottingModel.deleteJotting(_id);
  if (result.deletedCount != 0) {
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
// 点赞
const addFavour = async (req, res) => {
  let { _id } = req.query;
  let result = await JottingModel.addFavour(_id);
  let result1 = await JottingModel.getFavour(_id);
  if (result.modifiedCount === 1) {
    res.send({
      msg: '点赞成功',
      status: 200,
      data: result1
    });
  } else {
    res.send({
      msg: '点赞失败！',
      status: 0,
    });
  }
}
module.exports = {
  getJottingsList,
  deleteJotting,
  updateContent,
  addJotting,
  changeState,
  getPublishJottings,
  getJotting,
  addFavour
};