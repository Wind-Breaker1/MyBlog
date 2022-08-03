const ArticlesModel = require('../model/blogs');
const ClassifyModel = require('../model/classifies');
const util = require('../utils');
// 添加新博客
const addBlog = async (req, res) => {
	const { title, classification, content, digest, state, _id } = req.body;
	const result = await ArticlesModel.addblog({
		date: util.date(),
		title,
		classification,
		content,
		digest,
		state,
	});
	if (result) {
		ClassifyModel.updateClassifySum(classification);
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
	const article = await ArticlesModel.getBlog(_id);
	const result = await ArticlesModel.changeBlogState(!article.state, _id);
	if (result) {
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
	const { content, _id } = req.body;
	const result = await ArticlesModel.updateBlog(_id, content);
	if (result) {
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
	const result = await ArticlesModel.getBlogs();
	if (result) {
		res.send({
			msg: '博客查询成功',
			status: 200,
			data: result,
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
	const blogList = await ArticlesModel.getPublishBlogs({ pageStart, pageSize });
	const count = await ArticlesModel.getblogSums();
	if (blogList) {
		res.send({
			msg: '博客查询成功',
			status: 200,
			data: { blogList, count },
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
	const { _id } = req.query;
	const deleteBlog = await ArticlesModel.deleteBlog(_id);
	const result = await ClassifyModel.updateClassifySum(deleteBlog.classification, -1);
	if (deleteBlog.deletedCount !== 0 && result.modifiedCount !== 0) {
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
	const article = await ArticlesModel.getBlog(_id);
	const classify = await ClassifyModel.getClassify(article.classification);
	if (article) {
		// 查询博客所属书签
		if (article) {
			res.send({
				msg: '博客查找成功',
				status: 200,
				data: {
					article,
					classifyName: classify.title,
				},
			});
		} else {
			res.send({
				msg: '博客查找失败！',
				status: 0,
			});
		}
	}
};
// 获取某书签下所有博客
const getBlogsOfClassify = async (req, res) => {
	const { classification } = req.query;
	const result = await ArticlesModel.getBlogsOfClassify(classification);
	if (result && result.length) {
		res.send({
			msg: '查找博客成功',
			status: 200,
			data: {
				blogList: result,
			},
		});
	} else {
		res.send({
			msg: '查找博客失败！',
			status: 0,
		});
	}
};
// 点赞
const addFavour = async (req, res) => {
	const { _id, favourMurmur } = req.query;
	// 增加点赞数
	const addFavour = await ArticlesModel.addFavour(_id, favourMurmur);
	console.log(addFavour, 'addfavour');
	if (addFavour) {
		res.send({
			msg: '博客点赞成功',
			status: 200,
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
	const result = await ArticlesModel.addBlogBrowse(_id);
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
