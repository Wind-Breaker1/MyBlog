var express = require('express');
var router = express.Router();
var synthesisControll = require('../controllers/synthesis');
const multer = require('multer');
const path = require('path');
// markdown编辑文章上传图片
var storageArtimg = multer.diskStorage({
	// 配置文件上传后存储的路径
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../public/images'));
	},
	// 配置文件上传后存储的路径和文件名
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});
// 上传头像
var storageAvatar = multer.diskStorage({
	// 配置文件上传后存储的路径
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../public/avatars'));
	},
	// 配置文件上传后存储的路径和文件名
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});
// 照片墙上传图片上传
var storagePhoto = multer.diskStorage({
	// 配置文件上传后存储的路径
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../public/photos'));
	},
	// 配置文件上传后存储的路径和文件名
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});
const uploadArtimg = multer({ storage: storageArtimg });
const uploadAvatar = multer({ storage: storageAvatar });
const uploadPhoto = multer({ storage: storagePhoto });
router.get('/getwebinfo', synthesisControll.getWebInfo);
router.get('/getsliderinfo', synthesisControll.getSliderInfo);
router.get('/searcharticle', synthesisControll.searchArticle);
router.post('/uploadartimg', uploadArtimg.single('artimg'), synthesisControll.uploadArtimg);
router.post('/uploadavatar', uploadAvatar.single('avatar'), synthesisControll.uploadAvatar);
router.post('/uploadphoto', uploadPhoto.single('photo'), synthesisControll.uploadPhoto);
router.get('/gettags', synthesisControll.getTags);
router.get('/gettag', synthesisControll.getTag);
router.delete('/deletetag', synthesisControll.deleteTag);
router.post('/addtag', synthesisControll.addTag);
router.post('/updatetag', synthesisControll.updateTag);
module.exports = router;
