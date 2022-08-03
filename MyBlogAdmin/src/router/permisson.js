export const asyncRoute = function (myAsyncRoute) {
	const routeList = this.$store.route.state.routeList;
	if (routeList.length > 0) {
		routeList.forEach(item => (item.component = `() => im`));
	}

	let tempArr = filterRoute(myAsyncRoute, menuIdList);
	return tempArr;
};
function addRoute(arr, menuIdList) {
	if (!arr.length || !menuIdList.length) return [];
	return arr.filter(item => {
		if (item.children && item.children.length) {
			item.children = filterRoute(item.children, menuIdList);
		}
		return (item.meta && item.meta.id && menuIdList.includes(item.meta.id)) || (item.children && item.children.length > 0);
	});
}
const findRoute = (role, routeList) => {
	const route = [];
	routeList.forEach(item => {
		if (item.limits && item.limits.includes(role)) {
			console.log(item.children);
			const obj = {};
			obj.path = item.path;
			obj.name = item.name;
			obj.component = item.component;
			if (!item.children || item.children.length === 0) {
				if (item.meta) {
					obj.meta = item.meta;
				}
			} else {
				obj.children = _filterRoute(role, item.children);
			}
			route.push(obj);
		}
	});
	return route;
};
