var express = require('express');
var router = express.Router();
var synthesisControll = require('../controllers/synthesis');
const multer = require('multer');
const path = require('path');
var storage = multer.diskStorage({
	// 配置文件上传后存储的路径
	destination: function (req, file, cb) {
		// NodeJS的两个全局变量
		// console.log(__dirname);  //获取当前文件在服务器上的完整目录
		// console.log(__filename); //获取当前文件在服务器上的完整路径
		cb(null, path.join(__dirname, '../public/images'));
	},
	// 配置文件上传后存储的路径和文件名
	filename: function (req, file, cb) {
		// console.log('file', file);
		cb(null, Date.now() + path.extname(file.originalname));
	},
});
const upload = multer({ storage: storage });
/* GET users listing. */
router.get('/getwebinfo', synthesisControll.getWebInfo);
router.get('/getsliderinfo', synthesisControll.getSliderInfo);
router.get('/searcharticle', synthesisControll.searchArticle);
router.post('/uploadimg', upload.single('file'), synthesisControll.uploadImg);
router.post('/updatemurmur', synthesisControll.updateMurmur);
router.post('/addmurmur', synthesisControll.addMurmur);
module.exports = router;
