const ClassifyModel = require('../model/classifies');
const util = require('../utils');
// 添加新专栏
const addClassify = async (req, res) => {
	const { title, digest } = req.body;
	const result = await ClassifyModel.addClassify({
		date: Date.now(),
		title,
		digest,
		bgColor: util.randomColor(),
	});
	if (result) {
		res.send({
			msg: '专栏添加成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '专栏添加失败！',
			status: 0,
		});
	}
};
// 获取所有专栏
const getClassifies = async (req, res) => {
	const classifies = await ClassifyModel.getClassifies();
	classifies.forEach(item => item.date = util.formatDate(item.date));
	if (classifies) {
		res.send({
			msg: '专栏查询成功',
			status: 200,
			data: classifies,
		});
	} else {
		res.send({
			msg: '专栏查询失败',
			status: 0,
		});
	}
};
// 修改专栏描述标题
const updateClassifyTitle = async (req, res) => {
	const { _id, title, digest } = req.body;
	const result = await ClassifyModel.updateClassifyTitle(_id, title, digest);
	if (result.modifiedCount !== 0) {
		res.send({
			msg: '专栏编辑成功',
			status: 200,
			data: result,
		});
	} else {
		res.send({
			msg: '专栏编辑失败',
			status: 0,
		});
	}
};
// 删除专栏
const deleteClassify = async (req, res) => {
	const { _id } = req.query;
	// 这里必须要await
	const article = await ClassifyModel.getClassify(_id);
	const { articleNum } = article;
	if (articleNum != 0) {
		res.send({
			msg: '专栏博客不为零，无法删除专栏',
			status: 0,
		});
	} else {
		const result = await ClassifyModel.deleteClassify(_id);
		if (result.deletedCount !== 0) {
			res.send({
				msg: '专栏删除成功',
				status: 200,
			});
		} else {
			res.send({
				msg: '专栏删除失败！',
				status: 0,
			});
		}
	}
};

module.exports = {
	updateClassifyTitle,
	deleteClassify,
	addClassify,
	getClassifies,
};
