const BlogsModel = require('../model/blogs');
const ClassifyModel = require('../model/classifies');
const TagModel = require('../model/tag');
const util = require('../utils');
// 添加新博客
const addBlog = async (req, res) => {
	const { title, classification, content, digest, state, tags } = req.body;
	console.log(classification);
	const blog = await BlogsModel.addblog({
		date: Date.now(),
		title,
		classification,
		content,
		digest,
		state,
		tags,
	});
	await ClassifyModel.updateClassifySum(classification, 1);
	if (blog) {
		res.send({
			msg: '博客添加成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '博客添加失败！',
			status: 0,
		});
	}
};
// 修改博客状态
const changeBlogState = async (req, res) => {
	const { _id } = req.query;
	const blog = await BlogsModel.getBlog(_id);
	const result = await BlogsModel.changeBlogState(!blog.state, _id);
	if (result.acknowledged && result.modifiedCount != 0) {
		res.send({
			msg: '博客状态修改成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '博客状态修改失败!',
			status: 0,
		});
	}
};
// 更新博客
const updateBlog = async (req, res) => {
	const { content, _id, digest, title, tags } = req.body;
	const result = await BlogsModel.updateBlog(_id, content, digest, title, tags);
	if (result.acknowledged && result.modifiedCount !== 0) {
		res.send({
			msg: '博客已更新',
			status: 200,
		});
	} else {
		res.send({
			msg: '更新失败！',
			status: 0,
		});
	}
};
// 获取文章列表
const getBlogs = async (req, res) => {
	const blogs = await BlogsModel.getBlogs();
	blogs.forEach(item => (item.date = util.formatDate(item.date)));
	if (blogs) {
		res.send({
			msg: '博客查询成功',
			status: 200,
			data: blogs,
		});
	} else {
		res.send({
			msg: '博客查询失败',
			status: 200,
		});
	}
};
// 获取已发布文章列表
const getPublishBlogs = async (req, res) => {
	const { pageStart, pageSize } = req.query;
	const dataList = await BlogsModel.getPublishBlogs(pageStart, pageSize);
	const count = await BlogsModel.getblogSums();
	dataList.forEach(item => (item.date = util.formatDate(item.date)));
	if (dataList) {
		res.send({
			msg: '博客查询成功',
			status: 200,
			data: { dataList, count },
		});
	} else {
		res.send({
			msg: '博客查找失败',
			status: 0,
		});
	}
};
// 删除文章
const deleteBlog = async (req, res) => {
	const { _id, classification } = req.query;
	const deleteBlog = await BlogsModel.deleteBlog(_id);
	ClassifyModel.updateClassifySum(classification, -1);
	if (deleteBlog.acknowledged && deleteBlog.deletedCount !== 0) {
		res.send({
			msg: '博客删除成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '博客删除失败！',
			status: 0,
		});
	}
};
// 获取某一个文章
const getBlog = async (req, res) => {
	const { _id } = req.query;
	// 这里必须要await
	const blog = await BlogsModel.getBlog(_id);
	const tags = await TagModel.getTags();
	blog.tags = util.manageTags(blog.tags, tags);
	blog.date = util.formatDate(blog.date);
	const classify = await ClassifyModel.getClassify(blog.classification);
	blog.classifyName = classify?.title;
	// 查询博客所属书签
	if (blog) {
		res.send({
			msg: '博客查找成功',
			status: 200,
			data: blog,
		});
	} else {
		res.send({
			msg: '博主正在马不停蹄的创作中，敬请谅解！',
			status: 0,
		});
	}
};
// 获取某专栏下所有博客
const getBlogsOfClassify = async (req, res) => {
	const { classification } = req.query;
	const dataList = await BlogsModel.getBlogsOfClassify(classification);
	dataList.forEach(item => (item.date = util.formatDate(item.date)));
	if (dataList) {
		res.send({
			msg: '查找博客成功',
			status: 200,
			data: {
				dataList,
			},
		});
	} else {
		res.send({
			msg: '博主正在加班加点的创作中，敬请谅解！',
			status: 0,
		});
	}
};
// 点赞
const addFavour = async (req, res) => {
	const { _id, favourMurmur } = req.query;
	// 增加点赞数
	const addFavour = await BlogsModel.addFavour(_id, favourMurmur);
	const getFavour = await BlogsModel.getFavour(_id);
	if (addFavour) {
		res.send({
			msg: '博客点赞成功',
			status: 200,
			data: getFavour.favour,
		});
	} else {
		res.send({
			msg: '博客点赞失败！',
			status: 0,
		});
	}
};
// 增加浏览量
const addBlogBrowse = async (req, res) => {
	const { _id } = req.query;
	const result = await BlogsModel.addBlogBrowse(_id);
	if (result.modifiedCount === 1) {
		res.send({
			msg: '博客浏览量增加成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '博客浏览量增加失败',
			status: 0,
		});
	}
};
module.exports = {
	addBlog,
	changeBlogState,
	updateBlog,
	getBlogs,
	getPublishBlogs,
	deleteBlog,
	getBlog,
	getBlogsOfClassify,
	addFavour,
	addBlogBrowse,
};
