var express = require('express');
var router = express.Router();
var PhotoController = require('../controllers/photo');
const multer = require('multer');
const path = require('path');
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
const uploadPhoto = multer({ storage: storagePhoto });
/* GET users listing. */
router.get('/getphotos', PhotoController.getPhotos);
router.delete('/deletephoto', PhotoController.deletePhoto);
router.post('/addphoto',uploadPhoto.single('photo'), PhotoController.addPhoto);
router.post('/updatephotodigest', PhotoController.updatePhotoDigest)
module.exports = router;
