const BlogsModel = require('../model/blogs');
const JottingModel = require('../model/jottings');
const ClassifyModel = require('../model/classifies');
const MurmruModel = require('../model/murmurs');
const TagModel = require('../model/tag');
const util = require('../utils');
var path = require('path');
var fs = require('fs');
//新增标签
const addTag = async (req, res) => {
	const { title } = req.body;
	const tag = await TagModel.addTag({ title, date: util.date(), bg: util.randomColor() });
	if (tag) {
		res.send({
			msg: '新增标签成功',
			status: 200,
			data: tag,
		});
	} else {
		res.send({
			msg: '新增标签失败',
			status: 0,
		});
	}
};
const updateTag = async (req, res) => {
	const { id, title } = req.body;
	const tag = await TagModel.uptateTag(id, title);
	if (tag.modifiedCount != 0) {
		res.send({
			msg: '标签修改成功',
			status: 200,
			data: tag,
		});
	} else {
		res.send({
			msg: '标签修改失败',
			status: 0,
		});
	}
};
//删除标签
const deleteTag = async (req, res) => {
	const { _id } = req.query;
	const tag = await TagModel.deleteTag(_id);
	if (tag) {
		res.send({
			msg: '删除标签成功',
			status: 200,
			data: tag,
		});
	} else {
		res.send({
			msg: '删除标签失败',
			status: 0,
		});
	}
};

//查找某一个标签
const getTag = async (req, res) => {
	const { _id } = req.query;
	const tag = await TagModel.getTag(_id);
	if (tag) {
		res.send({
			msg: '查询标签成功',
			status: 200,
			data: tag,
		});
	} else {
		res.send({
			msg: '查询标签成功',
			status: 0,
		});
	}
};

//获取所有标签
const getTags = async (req, res) => {
	const tags = await TagModel.getTags();
	if (tags) {
		res.send({
			msg: '获取标签列表成功',
			status: 200,
			data: tags,
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
	const blogNums = await BlogsModel.getblogSums();
	const jottingNums = await JottingModel.getJottingSums();
	const tagNums = await TagModel.getTagSums();
	const classifyNums = await ClassifyModel.getClassifySums();
	res.send({
		msg: '查询文章总数成功',
		status: 200,
		data: {
			blogNums,
			jottingNums,
			tagNums,
			classifyNums,
		},
	});
};
const getSliderInfo = async (req, res, next) => {
	const blogs = await BlogsModel.getPublishBlogs();
	const jottings = await JottingModel.getPublishJottings();
	const classifies = await ClassifyModel.getClassifies();
	const tags = await TagModel.getTags();
	if (blogs && blogs && classifies && tags) {
		res.send({
			msg: '信息栏查询成功',
			status: 200,
			data: {
				blogs,
				jottings,
				classifies,
				tags,
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
const uploadArtimg = async (req, res) => {
	const file = req.file; //这个就是前端传来的文件
	const artimgUrl = 'http://127.0.0.1:3000/images/' + file.filename;
	const url = path.join(__dirname, '../public/images/', file.filename);
	console.log(req.file, '123');
	if (fs.existsSync(url)) {
		res.send({
			artimgUrl,
			status: 200,
			msg: '图片上传成功',
		});
	} else {
		res.send({
			status: 0,
			msg: '图片上传失败',
		});
	}
};
// 照片墙上传图片
const uploadPhoto = async (req, res) => {
	const file = req.file; //这个就是前端传来的文件
	const avatarUrl = 'http://127.0.0.1:3000/photos/' + file.filename;
	const url = path.join(__dirname, '../public/photos/', file.filename);
	console.log(req.body, murmur, '123');
	if (fs.existsSync(url)) {
		res.send({
			avatarUrl,
			status: 200,
			msg: '图片上传成功',
		});
	} else {
		res.send({
			status: 0,
			msg: '图片上传失败',
		});
	}
};
// 上传头像
const uploadAvatar = async (req, res) => {
	const { murmur } = req.body;
	const file = req.file; //这个就是前端传来的文件
	const avatarUrl = 'http://127.0.0.1:3000/avatars/' + file.filename;
	const url = path.join(__dirname, '../public/avatars/', file.filename);
	const murmurInfo = await MurmruModel.getMurmurInfo(murmur);
	if (murmurInfo.avatarUrl) {
		util.deleteImg(murmurInfo.avatarUrl);
	}
	const result = await MurmruModel.updateMurmurAvatar(murmur, avatarUrl);
	if (result.modifiedCount != 0 && fs.existsSync(url)) {
		res.send({
			avatarUrl,
			status: 200,
			msg: '头像上传成功',
		});
	} else {
		res.send({
			status: 0,
			msg: '头像上传失败',
		});
	}
};
module.exports = {
	getWebInfo,
	getSliderInfo,
	searchArticle,
	uploadArtimg,
	uploadAvatar,
	uploadPhoto,
	addTag,
	deleteTag,
	getTag,
	getTags,
	updateTag,
};
