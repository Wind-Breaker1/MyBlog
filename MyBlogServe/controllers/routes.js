const RouteModel = require('../model/routes');
const { sign, verify, hash, compare, date } = require('../utils');
// 添加新路由
const addFirstRoute = async (req, res, next) => {
	let { route } = req.body;
	// 密码加密
	// 检查此邮箱是否已经被注册
	let result = await RouteModel.addFirstRoute(route);
	if (result) {
		res.send({
			msg: '注册成功',
			status: 200,
		});
	}
	else {
		res.send({
			msg: '此邮箱已经被注册！',
			status: -1,
		});
	}
};
const addSecondRoute = async (req, res, next) => {
	let { route, parentRouteName } = req.body;
	// 密码加密
	// 检查此邮箱是否已经被注册
	let result = await RouteModel.addSecondRoute(parentRouteName, route);
	if (result) {
		res.send({
			msg: '注册成功',
			status: 200,
		});
	}
	else {
		res.send({
			msg: '此邮箱已经被注册！',
			status: -1,
		});
	}
};
// 修改路由
const updatRoute = async (req, res, next) => {
	let { route } = req.body;
	let result = await RouteModel.updateFirstRouteInfo(route);
	if (result) {
		res.send({
			msg: '修改成功',
			status: 200,
		});
	} else {
		res.send({
			msg: '修改失败',
			status: 200,
		});
	}
};
// 获取路由列表
const getRoutes = async (req, res, next) => {
	const { role } = req.query;
	let result = await RouteModel.getRoutes();
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
// 递归处理符合条件的路由
const _filterRoute = (role, routeList) => {
	const route = [];
	console.log('role', role);
	
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
const deleteRoute = async (req, res, next) => {
	const { _id, name } = req.query;
	// 这里必须要await
	let result = null;
	if (!name) {
		result = await RouteModel.deleteFirstRoute(_id);
		_id;
	} else {
		result = await RouteModel.deleteSecondRoute(_id, name);
	}
	if (result.deletedCount != 0) {
		res.send({
			message: '路由删除成功！',
			status: 200,
		});
	} else {
		res.send({
			message: '路由删除失败！',
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
};
