var express = require('express');
var router = express.Router();
var synthesisControll = require('../controllers/synthesis');
const multer = require("multer")
const path = require("path")
var storage = multer.diskStorage({
  // 配置文件上传后存储的路径
  destination: function (req, file, cb) {
    // NodeJS的两个全局变量
    // console.log(__dirname);  //获取当前文件在服务器上的完整目录 
    // console.log(__filename); //获取当前文件在服务器上的完整路径 
    cb(null, path.join(__dirname, '../public/images'))
  },
  // 配置文件上传后存储的路径和文件名
  filename: function (req, file, cb) {
    // console.log('file', file);
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage })
/* GET users listing. */
router.get('/getWebInfo', synthesisControll.getWebInfo);
router.get('/getSliderInfo', synthesisControll.getSliderInfo);
router.get('/searchArticle', synthesisControll.searchArticle);
router.post('/uploadimg', upload.single("file"), synthesisControll.uploadImg);
module.exports = router;