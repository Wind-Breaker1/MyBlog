<template>
  <el-container :style="{ height: '100vh' } " id="app">
    <!-- 页头 -->
    <el-header >
      <h3>MyBlog后台管理</h3>
    <div class="user">
      <el-dropdown  placement="bottom"  @command="logout" style="margin-right:10px;">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      {{this.$store.state.user.username}}
    </div>
    </el-header>
    <el-container>
      <!-- 侧边导航 -->
      <el-aside width="210px">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- <router-link to="/article"> -->
              <el-submenu index="/article">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span>文章管理</span>
                </template>
              <el-menu-item-group>
                <!-- <template slot="title">分组一</template> -->
                <router-link to="/admin/article">
                  <el-menu-item index="/admin/article">
                    <i class="el-icon-notebook-2"></i>
                    <span slot="title">博客管理</span>
                  </el-menu-item>
                </router-link>
                <router-link to="/admin/jottings">

                  <el-menu-item index="/admin/jottings">
                    <i class="el-icon-notebook-1"></i>
                    <span slot="title">随笔管理</span>
                  </el-menu-item>
                </router-link>
                <router-link to="/admin/markdown">
                  <el-menu-item index="/admin/markdown">
                    <i class="el-icon-edit"></i>
                    <span slot="title">编辑文章</span>
                  </el-menu-item>
                </router-link>
                <!-- <el-menu-item index="1-2">选项2</el-menu-item> -->
              </el-menu-item-group>
            </el-submenu>
          <!-- </router-link> -->
          <router-link to="/admin/classify">
            <el-menu-item index="/admin/classify">
              <i class="el-icon-menu"></i>
              <span slot="title">专栏管理</span>
            </el-menu-item>
          </router-link>
          <router-link to="/admin/user">
            <el-menu-item index="/admin/user">
              <i class="el-icon-s-custom"></i>
              <span slot="title">个人中心</span>
            </el-menu-item>
          </router-link>
          <router-link to="/admin/logs">
            <el-menu-item index="/admin/logs">
              <i class="el-icon-setting"></i>
              <span to="logs" tag="span" slot="title" >日志</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <!-- 注意需要给 el-scrollbar 设置高度，判断是否滚动是看它的height判断的 -->
          <router-view></router-view>
        </el-main>
        <!-- 页脚 -->
        <el-footer>
          <img src="http://127.0.0.1:3001/public/images/1657071187610.jpg" alt="">
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
export default {
  methods: {
    // 登出
    async logout(type) {
      if (type === "logout") {
        let result = await this.$store.dispatch("logout");
        if (result == "ok") {
          console.log('22222')
          this.$router.push('/login')
        }
      }
    }
  },
};
</script>

<style lang="less">

.el-header, .el-footer {
  background-color: #b3c0d1;
  color: #333;
  padding:0 3vw;
  display:inline-flex; 
  align-items:center;
  justify-content: space-between;
  .user{
    display:inline-flex; 
    align-items:center;
    justify-content: space-between;
  }
}
/* 给导航设置高 */
.el-menu-vertical-demo{
  height: 100%;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 100%;
}
</style>