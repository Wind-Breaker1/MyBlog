const ArticlesModel = require('../model/articles');
const JottingModel = require('../model/jottings');

// 修改随笔内容
const getWebInfo = async (req, res, next) => {
  let count1 = await ArticlesModel.articleNums();
  let count2 = await JottingModel.jottingNums();
  let count = count1 + count2;
  if (count) {
    res.send({
      msg: '修改成功',
      status: 200,
      count
    });
  }
  else {
    res.send({
      msg: '修改失败',
      status: -1
    });
  }
};
module.exports = {
  getWebInfo,
};