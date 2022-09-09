<template>
	<el-menu router :default-active="$route.path" class="menu" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
		<!-- <router-link to="/article">
					<el-submenu index="/article">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item-group>
					<template slot="title">分组一</template> -->
		<el-menu-item :index="'/admin/' + item.path" v-for="item in navRouteList" :key="item.id">
			<i :class="item.meta.icon"></i>
			<span slot="title">{{ item.name }}</span>
		</el-menu-item>
		<el-menu-item index="/admin/databoard">
			<i class="el-icon-notebook-1"></i>
			<span slot="title">数据看板</span>
		</el-menu-item>
		<!-- <el-menu-item index="/admin/article">
			<i class="el-icon-notebook-1"></i>
			<span slot="title">文章管理</span>
		</el-menu-item>
		<el-menu-item index="/admin/markdown">
			<i class="el-icon-edit"></i>
			<span slot="title">编辑文章</span>
		</el-menu-item>
		<el-menu-item index="/admin/photo">
			<i class="el-icon-picture"></i>
			<span slot="title">照片管理</span>
		</el-menu-item>
		<el-menu-item index="/admin/timeclue">
			<i class="el-icon-timer"></i>
			<span slot="title">时间节点管理</span>
		</el-menu-item>
		<el-menu-item index="/admin/user">
			<i class="el-icon-s-custom"></i>
			<span slot="title">用户管理</span>
		</el-menu-item> -->
		<!-- <el-menu-item index="/admin/routingmanage">
			<i class="el-icon-s-custom"></i>
			<span slot="title">路由管理</span>
		</el-menu-item> -->
		<!-- <el-menu-item index="/admin/logs">
			<i class="el-icon-setting"></i>
			<span to="logs" tag="span" slot="title">日志</span>
		</el-menu-item> -->
	</el-menu>
</template>
<script>
import { mapGetters } from "vuex";
export default {
	computed: {
		...mapGetters(["navRouteList"]),
	},
	methods: {},
};
</script>
<style lang="less" scoped>
.menu {
	flex-shrink: 0;
	width: 150px;
	height: 100%;
	border: none;
}
</style>
