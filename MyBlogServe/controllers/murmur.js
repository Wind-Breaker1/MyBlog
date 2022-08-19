const MurmruModel = require('../model/murmurs');
const util = require('../utils');
// 新增指纹信息
const addMurmurInfo = async (req, res) => {
  const { murmur, username, avatar } = req.body;
  const result = await MurmruModel.addMurmur({date: util.date(), murmur, username, avatar });
  console.log(result)
  if (result) {
    res.send({
      msg: '新增浏览器指纹信息成功',
      status: 200,
      data: result
    });
  } else {
    res.send({
      msg: '新增浏览器指纹信息失败',
      status: 0,
    });
  }
};
// 更新用户名
const updateMurmurUsername = async (req, res, next) => {
  const { murmur, username } = req.body;
  let result = await MurmruModel.updateMurmurUsername(murmur, username);
  if (result.modifiedCount != 0) {
    res.send({
      msg: '更新用户名成功',
      status: 200,
    });
  } else {
    res.send({
      msg: '更新用户名失败',
      status: 0,
    });
  }
};
//查询所有用户信息 
const getMurmurInfos = (req, res, next) => {
  let result = MurmruModel.getMurmurInfos();
  if (result.modifiedCount != 0) {
    res.send({
      msg: '更新用户名成功',
      status: 200,
    });
  } else {
    res.send({
      msg: '更新用户名失败',
      status: 0,
    });
  }
};

module.exports = {
  addMurmurInfo,
  updateMurmurUsername,
  getMurmurInfos
};