const JottingModel = require('../model/jottings');
const date = require('../utils');
const addJotting = async (req, res, next) => {
  let { title, content, digest, state, _id } = req.body;
  let time = date();
  let result = null;
  // 判断是修改还是新增
  if (_id) {
    // 若存在id则更新内容
    result = await JottingModel.updateContent({
      content,
      _id
    });
  } else {
    result = await JottingModel.addJotting({
      date: time,
      title,
      content,
      digest,
      state,
    });
  }
  if (result) {
    res.send({
      msg: '随笔添加成功',
      status: 200
    });
  } else {
    res.send({
      msg: '随笔添加失败',
      status: -1
    });
  }
};
// 修改随笔的状态
const changeState = async (req, res, next) => {
  let { _id } = req.query;
  let jotting = await JottingModel.JottingOne(_id);
  let result = await JottingModel.updateState(!jotting.state, _id);
  if (result) {
    res.send({
      msg: '修改随笔成功',
      status: 200
    });
  } else {
    res.send({
      msg: '修改随笔失败',
      status: -1
    });
  }
}
// 修改随笔内容
const updateContent = async (req, res, next) => {
  let { content, _id } = req.body;
  let result = await JottingModel.updateJotting({
    _id,
    content
  });
  if (result) {
    res.send({
      msg: '修改随笔成功',
      status: 200
    });
  } else {
    res.send({
      msg: '修改随笔失败',
      status: -1
    });
  }
};
// 获取随笔列表
const getJottingsList = async (req, res, next) => {
  let result = await JottingModel.JottingsList();
  if (result) {
    res.send({
      msg: '随笔查询成功',
      status: 200,
      data: result
    });
  } else {
    res.send({
      msg: '随笔查询成功',
      status: 200,
    });
  }
}
// 获取已发布文章列表
const getPublishJottings = async (req, res, next) => {
  let { pageStart, pageSize } = req.query;
  let jottingList = await JottingModel.publishJottings({ pageStart, pageSize });
  let count = await JottingModel.jottingNums();
  if (jottingList) {
    res.send({
      msg: '随笔查询成功',
      status: 200,
      data: { jottingList, count }
    });
  } else {
    res.send({
      msg: '随笔查询成功',
      status: 200,
    });
  }
}
// 获取某一随笔
const getJotting = async (req, res, next) => {
  let { _id } = req.query;
  await JottingModel.addBrowse(_id);
  let jotting = await JottingModel.JottingOne(_id);
  if (jotting) {
    res.send({
      msg: '查询随笔详情成功',
      status: 200,
      data: jotting
    });
  } else {
    res.send({
      msg: '查询随笔详情失败',
      status: 200,
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
      msg: '随笔删除成功',
      status: 200,
    });
  } else {
    res.send({
      msg: '随笔删除失败',
      status: -1,
    });
  }
}
// 点赞
const addFavour = async (req, res) => {
  let { _id, favourMurmur } = req.query;
  let addFavour = await JottingModel.addFavour(_id, favourMurmur);
  let getFavour = await JottingModel.getFavour(_id);
  console.log(favourMurmur);
  if (addFavour) {
    res.send({
      msg: '点赞随笔成功',
      status: 200,
      data: getFavour.favour
    });
  } else {
    res.send({
      msg: '点赞随笔失败',
      status: -1,
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