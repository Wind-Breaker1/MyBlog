const mongoose = require('mongoose');
const RouteSchema = new mongoose.Schema({
	//创建表
	path: { type: String, require: true, unique: true },
	name: { type: String },
	meta: { type: Object, default: {} },
	children: [
		{
			path: { type: String, require: true, unique: true },
			name: { type: String },
			meta: { type: Object, default: {} },
			limits: [
				{
					type: String,
					require: true,
				},
			],
			component: { type: String }, //index: { unique: true }
		},
	],
	limits: [
		{
			type: String,
			require: true,
		},
	],
	component: { type: String }, //index: { unique: true }
});

const RouteModel = mongoose.model('route', RouteSchema);
// 新增一级路由
const addFirstRoute = route => {
	const user = new RouteModel(route);
	return user
		.save()
		.then(() => true)
		.catch(() => false);
};
// 新增二级路由
const addSecondRoute = (parentRouteName, route) => {
	return RouteModel.updateOne({ name: parentRouteName }, { $push: { children: route } });
};
// 更新一级路由信息
const updateFirstRouteInfo = ({ _id, name, path, component, limits }) => {
	return RouteModel.updateOne({ _id }, { $set: { name, path, component, limits } });
};
// 更新二级路由信息
const updateSecondRouteInfo = ({ _id, path, name, component, limits }) => {
	return RouteModel.updateOne({ _id, children: { $elemMatch: { path } } }, { $set: { name, component, limits } });
};
// 删除一级路由
const deleteFirstRoute = _id => {
	return RouteModel.deleteOne({ _id });
};
// 删除二级路由
const deleteSecondRoute = (id, path) => {
	return RouteModel.findByIdAndUpdate(id, { $pull: { children: { path } } });
};
// 查找所有路由
const getRoutes = () => {
	return RouteModel.find();
};
// 根据path查找路由
const getRouteByPath = path => {
	return RouteModel.findOne({ path });
};

module.exports = {
	addFirstRoute,
	addSecondRoute,
	updateFirstRouteInfo,
	updateSecondRouteInfo,
	deleteFirstRoute,
	deleteSecondRoute,
	getRoutes,
	getRouteByPath,
};
