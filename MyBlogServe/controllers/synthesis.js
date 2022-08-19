const BlogsModel = require('../model/blogs');
const JottingModel = require('../model/jottings');
const ClassifyModel = require('../model/classifies');
const MurmruModel = require('../model/murmurs');
const util = require('../utils');
var path = require('path');
var fs = require('fs');
//新增标签
 const addTag = async (req, res, next) => {
	const {title} = req.body;
	const tag = await TagModel.addTag({title, date: util.date()});
	if (tag) {
		res.send({	
			msg: '新增标签成功',
			status: 200,
			data: tag
		});
	} else {
		res.send({
			msg: '新增标签失败',
			status: 0,
		});
	}
};

//删除标签
const deleteTag = async (req, res, next) => {
	const {_id} = req.query;
	const tag = await TagModel.deleteTag(_id);
	if (tag) {
		res.send({
			msg: '删除标签成功',
			status: 200,
			data: tag
		});
	} else {
		res.send({
			msg: '删除标签失败',
			status: 0,
		});
	}
};

//查找某一个标签
const getTag = async (req, res, next) => {
	const {_id} = req.query;
	const tag = await TagModel.getTag(_id);
	if (tag) {
		res.send({
			msg: '查询标签成功',
			status: 200,
			data: tag
		});
	} else {
		res.send({
			msg: '查询标签成功',
			status: 0,
		});
	}
};

//获取所有标签
const getTags = async (req, res, next) => {
	const tags = await TagModel.getTags();
	if (tags) {
		res.send({
			msg: '获取标签列表成功',
			status: 200,
			data: tags
		});
	} else {
		res.send({
			msg: '获取标签列表失败',
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
	const { murmur } = req.body; 
	const file = req.file;//这个就是前端传来的文件
	const imgUrl = 'http://127.0.0.1:3001/images/' + file.filename;
	if (murmur) {
		const murmurInfo = await MurmruModel.getMurmurInfo(murmur);
		if (murmurInfo.avatarUrl) {
			deleteImg(murmurInfo.avatarUrl);
		}
		const result = await MurmruModel.updateMurmurAvatar(murmur, imgUrl);
		if (result.modifiedCount != 0) {
			res.send({
				avatarUrl: imgUrl,
				status: 200,
				msg: '头像上传成功',
			});
		} else {
			res.send({
				status: 0,
				msg: '头像上传失败',
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
	addTag,
	deleteTag,
	getTag,
	getTags
};
