const BlogsModel = require('../model/blogs');
const JottingModel = require('../model/jottings');
const ClassifyModel = require('../model/classifies');
const MurmruModel = require('../model/murmurs');
const TagModel = require('../model/tag');
const util = require('../utils');
const path = require('path');
const fs = require('fs');
//新增标签
const addTag = async (req, res) => {
	const { title, digest } = req.body;
	const tag = await TagModel.addTag({ title, date: Date.now(), bg: util.randomColor(), digest });
	console.log(tag, title, digest);
	if (tag) {
		res.send({
			msg: '新增标签成功',
			status: 200,
			data: tag,
		});
	} else {
		s;
		res.send({
			msg: '新增标签失败',
			status: 0,
		});
	}
};
const updateTag = async (req, res) => {
	const { _id, title, digest } = req.body;
	const tag = await TagModel.uptateTag(_id, title, digest);
	if (tag.acknowledged && tag.modifiedCount != 0) {
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
	if (tag.acknowledged && tag.deletedCount != 0) {
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
	tags.forEach(item => (item.date = util.formatDate(item.date)));
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
	blogs.forEach(item => {
		item.date = util.formatDate(item.date);
	});
	const jottings = await JottingModel.getPublishJottings();
	jottings.forEach(item => {
		item.date = util.formatDate(item.date);
	});
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
// 搜索文章
const searchArticle = async (req, res) => {
	let { searchValue } = req.query;
	let blogs = await BlogsModel.searchBlogs(searchValue);
	blogs.forEach(item => {
		item.date = util.formatDate(item.date);
		item.type = 'blog';
	});
	let jottings = await JottingModel.searchJottings(searchValue);
	jottings.forEach(item => {
		item.date = util.formatDate(item.date);
		item.type = 'jotting';
	});
	let data = [...blogs, ...jottings];
	if (data.length > 0) {
		res.send({
			msg: '搜索到文章',
			status: 200,
			data: {
				dataList: [...blogs, ...jottings],
			},
		});
	} else {
		res.send({
			msg: '未查询到相关信息',
			status: 0,
		});
	}
};
// 查找某一书签下所有文章
const getArticlesOfTag = async (req, res) => {
	let { searchTag } = req.query;
	let blogs = await BlogsModel.getBlogsOfTag(searchTag);
	blogs.forEach(item => {
		item.date = util.formatDate(item.date);
		item.type = 'blog';
	});
	let jottings = await JottingModel.getJottingsOfTag(searchTag);
	jottings.forEach(item => {
		item.date = util.formatDate(item.date);
		item.type = 'jotting';
	});
	let dataList = [...blogs, ...jottings];
	if (dataList) {
		res.send({
			msg: '查询到文章',
			status: 200,
			data: {
				dataList,
			},
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
	const artimgUrl = util.imgBaseUrl('image') + file.filename;
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

// 上传头像
const uploadAvatar = async (req, res) => {
	const { murmur, email } = req.body;
	const file = req.file; //这个就是前端传来的文件
	const avatarUrl = util.imgBaseUrl('avatar') + file.filename;
	const url = path.join(__dirname, '../public/avatars/', file.filename);
	let user = null,
		result = null;
	if (murmur) {
		user = await MurmruModel.getMurmurInfo(murmur);
	} else if (email) {
		user = await UserModel.getUser(email);
	}
	if (user.avatarUrl) {
		util.deleteImg(user.avatarUrl);
	}
	if (murmur) {
		result = await MurmruModel.updateMurmurAvatar(murmur, avatarUrl);
	} else {
		result = await UserModel.uploadAvatar(email, avatarUrl);
	}
	if (result.acknowledged && result.modifiedCount != 0 && fs.existsSync(url)) {
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
// 获取数据面板数据
// 上传头像
const getDataForDataBoard = async (req, res) => {
	const classify = await ClassifyModel.getClassifyForDataBoard();
	const classification = classify.map(item => {
		return { name: item.title, value: item.articleNum };
	});
	const tags = await TagModel.getTags();
	const blogs = await BlogsModel.getBlogs();
	const jottings = await JottingModel.getJottings();
	const { articleOfTag, blogsOf7, jottingsOf7 } = util.manangeDataBoard(tags, blogs, jottings);
	if (articleOfTag && blogsOf7 && jottingsOf7) {
		res.send({
			data: {
				classification,
				articleOfTag,
				blogsOf7,
				jottingsOf7,
			},
			status: 200,
			msg: '查询成功',
		});
	} else {
		res.send({
			status: 0,
			msg: '查询失败',
		});
	}
};
module.exports = {
	getWebInfo,
	getSliderInfo,
	searchArticle,
	uploadArtimg,
	uploadAvatar,
	addTag,
	deleteTag,
	getTag,
	getTags,
	updateTag,
	getArticlesOfTag,
	getDataForDataBoard,
};
