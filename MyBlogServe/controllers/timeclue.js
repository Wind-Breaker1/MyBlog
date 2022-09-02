const TimeclueModel = require('../model/timeclue');
const util = require('../utils');
const addTimeclue = async (req, res) => {
	const { title, digest, date } = req.body;
	const timeclue = await TimeclueModel.addTimeclue({ title, date, digest });
	if (timeclue) {
		res.send({
			msg: '新增时间线信息成功',
			status: 200,
			data: timeclue,
		});
	} else {
		res.send({
			msg: '新增时间线信息失败',
			status: 0,
		});
	}
};
const updateTimeclue = async (req, res) => {
	const { _id, date, title, digest } = req.body;
	const timeclue = await TimeclueModel.uptateTimeclue(_id, date, title, digest);
	if (timeclue.acknowledged && timeclue.modifiedCount != 0) {
		res.send({
			msg: '时间线信息修改成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '时间线信息修改失败',
			status: 0,
		});
	}
};
const changeTimeNodeState = async (req, res) => {
	const { id } = req.query;
	const { state } = await TimeclueModel.getTimeclue(id);
	const timeclue = await TimeclueModel.changeTimeNodeState(id, !state);
	if (timeclue.acknowledged && timeclue.modifiedCount != 0) {
		res.send({
			msg: '状态修改成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '状态修改失败',
			status: 0,
		});
	}
};
//删除时间线信息
const deleteTimeclue = async (req, res) => {
	const { _id } = req.query;
	const timeclue = await TimeclueModel.deleteTimeclue(_id);
	if (timeclue.acknowledged && timeclue.deletedCount != 0) {
		res.send({
			msg: '删除时间线信息成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '删除时间线信息失败',
			status: 0,
		});
	}
};

//查找某一个时间线信息
const getTimeclue = async (req, res) => {
	const { _id } = req.query;
	const timeclue = await TimeclueModel.getTimeclue(_id);
	if (timeclue) {
		res.send({
			msg: '查询时间线信息成功',
			status: 200,
			data: timeclue,
		});
	} else {
		res.send({
			msg: '查询时间线信息成功',
			status: 0,
		});
	}
};

//获取所有时间线信息
const getTimeclues = async (req, res) => {
	const timeclues = await TimeclueModel.getTimeclues();
	timeclues.forEach(item => (item.date = util.formatDate(item.date)));
	if (timeclues) {
		res.send({
			msg: '获取时间线信息列表成功',
			status: 200,
			data: timeclues,
		});
	} else {
		res.send({
			msg: '获取时间线信息列表失败',
			status: 0,
		});
	}
};
module.exports = {
	addTimeclue,
	deleteTimeclue,
	getTimeclue,
	getTimeclues,
	updateTimeclue,
	changeTimeNodeState,
};
