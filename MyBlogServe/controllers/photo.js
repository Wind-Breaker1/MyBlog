const PhotoModel = require('../model/photo');
const util = require('../utils');
const path = require('path');
const fs = require('fs');
// 添加新图片
const addPhoto = async (req, res) => {
  const { digest, shootingTime } = req.body;
  const file = req.file;
  const photoUrl = util.imgBaseUrl('photo') + file.filename;
  const url = path.join(__dirname, '../public/photos/', file.filename);
  const result = await PhotoModel.addPhoto({
    uploadTime: Date.now(),
    shootingTime,
    photoUrl,
    digest,
    preBg: util.randomColor(),
  });
  if (result && fs.existsSync(url)) {
    res.send({
      msg: '照片添加成功',
      status: 200,
    });
  } else {
    res.send({
      msg: '照片添加失败！',
      status: 0,
    });
  }
};
// 获取照片
const getPhotos = async (req, res) => {
  const photos = await PhotoModel.getPhotos();
  photos.forEach(item =>{
    item.uploadTime = util.formatTime(item.uploadTime);
    item.shootingTime = util.formatTime(item.shootingTime);
  })
  if (photos) {
    res.send({
      msg: '查询成功',
      status: 200,
      data: photos,
    });
  } else {
    res.send({
      msg: '查询失败',
      status: 0,
    });
  }
};
// 修改照片信息
const updatePhotoDigest = async (req, res) => {
  const { _id, digest, shootingTime } = req.body;
  const result = await PhotoModel.updatePhoto(_id, digest, shootingTime);
  if (result.acknowledged && result.modifiedCount !== 0) {
    res.send({
      msg: '照片信息编辑成功',
      status: 200,
      data: result,
    });
  } else {
    res.send({
      msg: '照片信息编辑失败',
      status: 0,
    });
  }
};
// 删除照片
const deletePhoto = async (req, res) => {
  const { _id } = req.query;
  const result = await PhotoModel.deletePhoto(_id);
  if (result.acknowledged && result.deletedCount !== 0) {
    res.send({
      msg: '照片删除成功',
      status: 200,
    });
  } else {
    res.send({
      msg: '照片删除失败！',
      status: 0,
    });
  }
};

module.exports = {
  updatePhotoDigest,
  deletePhoto,
  addPhoto,
  getPhotos,
};
