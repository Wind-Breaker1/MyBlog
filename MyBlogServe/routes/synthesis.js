var express = require('express');
var router = express.Router();
var synthesisControll = require('../controllers/synthesis');
const multer = require('multer');
const path = require('path');
var storage = multer.diskStorage({
	// 配置文件上传后存储的路径
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../public/images'));
	},
	// 配置文件上传后存储的路径和文件名
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});
const upload = multer({ storage: storage });
router.get('/getwebinfo', synthesisControll.getWebInfo);
router.get('/getsliderinfo', synthesisControll.getSliderInfo);
router.get('/searcharticle', synthesisControll.searchArticle);
router.post('/uploadimg', upload.single('file'), synthesisControll.uploadImg);
router.get('/gettags', synthesisControll.getTags);
router.get('/gettag', synthesisControll.getTag);
router.delete('/deletetag', synthesisControll.deleteTag);
router.post('/addtag', synthesisControll.addTag);
module.exports = router;
