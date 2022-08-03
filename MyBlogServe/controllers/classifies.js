const ClassifyModel = require('../model/classifies');
const util = require('../utils');
// 添加新专栏
const addClassify = async (req, res) => {
	const result = await ClassifyModel.addClassify({
		date: util.date(),
		title,
		digest,
		bgColo: util.randomHex(),
	});
	if (result) {
		res.send({
			msg: '添加专栏成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '添加专栏失败！',
			status: -1,
		});
	}
};
// 获取专栏名称
const getClassifies = async (req, res) => {
	const result = await ClassifyModel.getClassifies();
	if (result) {
		res.send({
			msg: '查询专栏成功',
			status: 200,
			data: result,
		});
	} else {
		res.send({
			msg: '查询专栏失败',
			status: -1,
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
			status: -1,
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
			msg: '专栏文章不为零，无法删除专栏',
			status: -1,
		});
	} else {
		const result = await ClassifyModel.deleteClassify(_id);
		if (result.deletedCount !== 0) {
			res.send({
				msg: '删除专栏成功',
				status: 200,
			});
		} else {
			res.send({
				msg: '删除专栏失败！',
				status: -1,
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
