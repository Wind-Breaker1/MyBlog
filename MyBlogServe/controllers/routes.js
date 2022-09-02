const RouteModel = require('../model/routes');
const { sign, verify, hash, compare, date } = require('../utils');
// 添加新路由
const addFirstRoute = async (req, res) => {
	const { route } = req.body;
	const result = await RouteModel.addFirstRoute(route);
	if (result) {
		res.send({
			msg: '添加成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '添加失败！',
			status: 0,
		});
	}
};
const addSecondRoute = async (req, res, next) => {
	const { route, parentRouteName } = req.body;
	const router = await RouteModel.getRouteByPath(route.path);
	if (router) {
		res.send({
			msg: '路径重复！',
			status: 0,
		});
	} else {
		const result = await RouteModel.addSecondRoute(parentRouteName, route);
		if (result.acknowledged && result.modifiedCount !== 0) {
			res.send({
				msg: '添加成功',
				status: 200,
			});
		} else {
			res.send({
				msg: '添加失败！',
				status: 0,
			});
		}
	}
};
// 修改路由
const updatRoute = async (req, res, next) => {
	const { route } = req.body;
	const result = await RouteModel.updateFirstRouteInfo(route);
	if (result.acknowledged && result.modifiedCount != 0) {
		res.send({
			msg: '修改成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '修改失败',
			status: 0,
		});
	}
};
// 获取路由列表
const getRoutes = async (req, res, next) => {
	const { role } = req.query;
	const result = await RouteModel.getRoutes();
	console.log('rew', result);

	const route = _filterRoute(role, result);
	if (result) {
		res.send({
			msg: '查询成功',
			status: 200,
			data: route,
		});
	} else {
		res.send({
			msg: '查询失败',
			status: -1,
		});
	}
};
// 获取所有路由列表
const getRouteList = async (req, res, next) => {
	const result = await RouteModel.getRoutes();
	if (result) {
		res.send({
			msg: '查询所有路由成功',
			status: 200,
			data: result,
		});
	} else {
		res.send({
			msg: '查询失败',
			status: 0,
		});
	}
};
// 递归处理符合条件的路由
const _filterRoute = (role, routeList) => {
	const route = [];
	// console.log('r', routeList);
	routeList.forEach(item => {
		if (item.limits && item.limits.includes(role)) {
			const obj = {};
			obj._id = item._id;
			obj.path = item.path;
			obj.name = item.name;
			obj.component = item.component;
			obj.limits = item.limits;
			if (item.meta) {
				obj.meta = item.meta;
			}
			if (item.children && item.children.length !== 0) {
				obj.children = _filterRoute(role, item.children);
			}
			route.push(obj);
		}
	});
	return route;
};
// 删除路由
const deleteRoute = async (req, res) => {
	const { _id } = req.query;
	const result = await RouteModel.deleteFirstRoute(_id);
	// if (!name) {
	// } else {
	// 	result = await RouteModel.deleteSecondRoute(_id, name);
	// }
	if (result.acknowledged && result.deletedCount != 0) {
		res.send({
			msg: '路由删除成功！',
			status: 200,
		});
	} else {
		res.send({
			msg: '路由删除失败！',
			status: -1,
		});
	}
};

module.exports = {
	addSecondRoute,
	addFirstRoute,
	updatRoute,
	getRoutes,
	deleteRoute,
	getRouteList,
};
