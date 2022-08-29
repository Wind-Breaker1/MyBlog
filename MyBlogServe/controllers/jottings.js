const JottingModel = require('../model/jottings');
const util = require('../utils');
const addJotting = async (req, res, next) => {
	let { title, content, digest, state, tags } = req.body;
	let result = await JottingModel.addJotting({
		date: util.date(),
		title,
		content,
		digest,
		state,
		tags,
	});
	if (result) {
		res.send({
			msg: '随笔添加成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '随笔添加失败',
			status: 0,
		});
	}
};
// 修改随笔的状态
const changeState = async (req, res) => {
	let { _id } = req.query;
	let jotting = await JottingModel.getJotting(_id);
	let result = await JottingModel.changeJottingState(!jotting.state, _id);
	if (result.modifiedCount !== 0) {
		res.send({
			msg: '随笔状态修改成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '随笔状态修改失败',
			status: 0,
		});
	}
};
// 修改随笔内容
const updateJotting = async (req, res, next) => {
	let { content, _id, title, digest, tags } = req.body;
	let result = await JottingModel.updateJotting(_id, { content, digest, title, tags });
	if (result.modifiedCount !== 0) {
		res.send({
			msg: '随笔修改成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '随笔修改失败',
			status: 0,
		});
	}
};
// 获取随笔列表
const getJottings = async (req, res, next) => {
	let result = await JottingModel.getJottings();
	if (result) {
		res.send({
			msg: '随笔查询成功',
			status: 200,
			data: result,
		});
	} else {
		res.send({
			msg: '博主正在加班加点的创作中，敬请谅解！',
			status: 0,
		});
	}
};
// 获取已发布文章列表
const getPublishJottings = async (req, res, next) => {
	let { pageStart, pageSize } = req.query;
	let jottingList = await JottingModel.getPublishJottings(pageStart, pageSize);
	let count = await JottingModel.getJottingSums();
	if (jottingList) {
		res.send({
			msg: '随笔查询成功',
			status: 200,
			data: { jottingList, count },
		});
	} else {
		res.send({
			msg: '博主正在加班加点的创作中，敬请谅解！',
			status: 0,
		});
	}
};
// 获取某一随笔
const getJotting = async (req, res, next) => {
	let { _id } = req.query;
	let jotting = await JottingModel.getJotting(_id);
	if (jotting) {
		res.send({
			msg: '随笔详情查询成功',
			status: 200,
			data: jotting,
		});
	} else {
		res.send({
			msg: '随笔详情查询失败',
			status: 0,
		});
	}
};
// 点赞某一随笔
const addBrowse = async (req, res, next) => {
	let { _id } = req.query;
	let jotting = await JottingModel.addBrowse(_id);
	if (jotting.modifiedCount !== 0) {
		res.send({
			msg: '随笔点赞成功',
			status: 200,
			data: jotting,
		});
	} else {
		res.send({
			msg: '随笔点赞失败',
			status: 0,
		});
	}
};
// 删除随笔
const deleteJotting = async (req, res, next) => {
	const { _id } = req.query;
	// 这里必须要await
	let result = await JottingModel.deleteJotting(_id);
	if (result.deletedCount !== 0) {
		res.send({
			msg: '随笔删除成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '随笔删除失败',
			status: 0,
		});
	}
};
// 点赞
const addFavour = async (req, res) => {
	let { _id, favourMurmur } = req.query;
	let addFavour = await JottingModel.addFavour(_id, favourMurmur);
	let getFavour = await JottingModel.getFavour(_id);
	if (addFavour.modifiedCount !== 0) {
		res.send({
			msg: '点赞随笔成功',
			status: 200,
			data: getFavour.favour,
		});
	} else {
		res.send({
			msg: '点赞随笔失败',
			status: 0,
		});
	}
};

// 增加浏览量
const addJottingBrowse = async (req, res) => {
	let { _id } = req.query;
	let addBrowse = await JottingModel.addJottingBrowse(_id);
	if (addBrowse.modifiedCount !== 0) {
		res.send({
			msg: '随笔浏览量增加成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '随笔浏览量增加失败',
			status: 0,
		});
	}
};
module.exports = {
	getJottings,
	deleteJotting,
	updateJotting,
	addJotting,
	changeState,
	getPublishJottings,
	getJotting,
	addFavour,
	addBrowse,
	addJottingBrowse,
};
