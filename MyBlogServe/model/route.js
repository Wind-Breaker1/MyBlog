const mongoose = require('mongoose');
const RouteSchema = new mongoose.Schema({
	//创建表
	path: { type: String, require: true, unique: true },
	name: { type: String },
	children: { type: Array, default: [] },
	meta: { type: Object, default: {} },
	limits: [
		{
			type: String,
			require: true,
		},
	],
	component: { type: String }, //index: { unique: true }
});
const RouteModel = mongoose.model('route', RouteSchema);
// 新增路由
const saveFirstRoute = route => {
	const user = new RouteModel(route);
	return user.save();
};
// 更新路由信息
const updateRouteInfo = ({ _id, name, path, component, limits }) => {
	return RouteModel.updateOne({ _id }, { $set: { name, path, component, limits } });
};
// 删除路由
const deleteFirstLevelRoute = _id => {
	return RouteModel.deleteOne({ _id });
};
// 删除二级路由
const deleteSecondlevelRoute = (_id, name) => {
	return RouteModel.updateOne({ _id }, { $pull: { children: { name } } })
		.then(res => {
			return res;
		})
		.catch(err => {
			return new Error(err);
		});
};
// 查找路由
const findRoute = () => {
	return RouteModel.find();
};
// 查找某一路由
const findOneByName = name => {
	return RouteModel.findOne({ name });
};
const saveSecondRoute = (parentRouteName, route) => {
	return RouteModel.updateOne({ name: parentRouteName }, { $push: { children: route } });
};

module.exports = {
	saveFirstRoute,
	updateRouteInfo,
	deleteFirstLevelRoute,
	findRoute,
	findOneByName,
	saveSecondRoute,
	deleteSecondlevelRoute,
};
