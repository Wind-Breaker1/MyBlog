const BlogsModel = require('../model/blogs');
const JottingModel = require('../model/jottings');
const ClassifyModel = require('../model/classifies');
const MurmruModel = require('../model/murmurs');
var path = require('path');
var fs = require('fs');
const addMurmur = async (req, res) => {
	const { murmur, username, avatar } = req.body;
	const result = MurmruModel.addMurmur({ murmur, username, avatar });
	if (result) {
		res.send({
			msg: '新增浏览器指纹成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '新增浏览器指纹失败',
			status: 0,
		});
	}
};
// 获取总文章数
const updateMurmur = async (req, res, next) => {
	const { murmur, username, avatar } = req.body;
	let result = await MurmruModel.updateMurmur(murmur, username, avatar);
	if (result.modifiedCount != 0) {
		res.send({
			msg: '查询文章总数成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '查询文章总数失败',
			status: 0,
		});
	}
};
// 获取总文章数
const getWebInfo = async (req, res, next) => {
	let articleNums = await BlogsModel.getblogSums();
	let jottingNums = await JottingModel.getJottingSums();
	let count = jottingNums + articleNums;
	if (count) {
		res.send({
			msg: '查询文章总数成功',
			status: 200,
			count,
		});
	} else {
		res.send({
			msg: '查询文章总数失败',
			status: 0,
		});
	}
};
const getSliderInfo = async (req, res, next) => {
	let blogs = await BlogsModel.getPublishBlogs();
	let jottings = await JottingModel.getPublishJottings();
	let classifies = await ClassifyModel.getClassifies();
	if (blogs && blogs && classifies) {
		res.send({
			msg: '信息栏查询成功',
			status: 200,
			data: {
				blogs,
				jottings,
				classifies,
			},
		});
	} else {
		res.send({
			msg: '信息栏查询失败',
			status: 0,
		});
	}
};
const searchArticle = async (req, res) => {
	let { searchValue } = req.query;
	let blogs = await BlogsModel.searchBlogs(searchValue);
	blogs.forEach(item => {
		item.type = 'blog';
	});
	let jottings = await JottingModel.searchJottings(searchValue);
	jottings.forEach(item => {
		item.type = 'jotting';
	});
	let data = [...blogs, ...jottings];
	if (data.length > 0) {
		res.send({
			msg: '搜索到文章',
			status: 200,
			data,
		});
	} else {
		res.send({
			msg: '未查询到相关信息',
			status: 0,
		});
	}
};
// 上传图片
const uploadImg = async (req, res) => {
	const { murmur } = req.body; //这个就是前端传来的文件
	const file = req.file;
	console.log(req.body);
	const imgUrl = 'http://127.0.0.1:3001/images/' + file.filename;
	if (murmur) {
		const result = await MurmruModel.updateMurmurAvatar(murmur, imgUrl);
		if (result.modifiedCount != 0) {
			res.send({
				avatarUrl,
				status: 200,
				msg: '头像上传成功',
			});
		} else {
			res.send({
				status: 0,
				msg: '图片上传失败',
			});
		}
	} else {
		res.send({
			imgUrl,
			status: 200,
			msg: '图片上传成功',
		});
	}
};
module.exports = {
	getWebInfo,
	getSliderInfo,
	searchArticle,
	uploadImg,
	addMurmur,
	updateMurmur,
};
