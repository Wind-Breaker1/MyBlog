const ArticlesModel = require('../model/articles');
const JottingModel = require('../model/jottings');
const ClassifyModel = require('../model/classifies');
var path = require("path")
//引入path模块，用来拼接地址的
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
var fs = require("fs")
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
editSelf = (data, callback) => {
  const img = fs.createReadStream(data.path)
  const nono = fs.createWriteStream('./assets/asas.jpg')
  img.pipe(nono)//这一步就是管道流传输
  //读取文件发生错误事件
  img.on('error', (err) => {
    console.log('发生异常:', err);
  });
  //已打开要读取的文件事件
  img.on('open', (fd) => {
    console.log('文件已打开:', fd);
  });
  //文件已经就位，可用于读取事件
  img.on('ready', () => {
    callback(img)

    console.log('文件已准备好..');
  });

  //文件读取中事件·····
  img.on('data', (chunk) => {
    console.log('读取文件数据:', chunk);
  });

  //文件读取完成事件
  img.on('end', () => {
    console.log('读取已完成..');
  });

  //文件已关闭事件
  img.on('close', () => {
    console.log('文件已关闭！');
  });
}

const uploadImg = async (req, res) => {
  const file = req.file //这个就是前端传来的文件
  console.log('file', file)

  editSelf(file, (response) => {
    console.log("re", response)
    res.send({
      url: "http://127.0.0.1:3001/images/" + file.filename,
      status: 200,
      msg: '图片上传成功'
   }) 
    
  })
}
module.exports = {
  getWebInfo,
  getSliderInfo,
  searchArticle,
  uploadImg,
};