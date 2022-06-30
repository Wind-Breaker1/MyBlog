<template>
  <el-container :style="{ height: '100vh' }">
    <el-header height="60px" style="font-weight: 1000">MyBlog后台管理
      <button  @click="logout">fdsfads</button>
    </el-header>
    <el-container>
      <el-aside width="200px">
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
                  <el-menu-item index="/admin/article">博客管理</el-menu-item>
                </router-link>
                <router-link to="/admin/jottings">
                  <el-menu-item index="/admin/jottings">随笔管理</el-menu-item>
                </router-link>
                <router-link to="/admin/markdown">
                  <el-menu-item index="/admin/markdown">编辑文章</el-menu-item>
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
        <el-footer>
          
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
export default {
  methods: {
    // 登出
    async logout() {
      let result = await this.$store.dispatch("logout");
      if (result == "ok") {
        this.$router.push('./login')
      }
    }
  },
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
/* 给导航设置高 */
.el-menu-vertical-demo{
  height: 100%;
}
/* .el-aside {
  background-color: rgb(84, 92, 100);
  color: #333;
  text-align: center;
  line-height: 1000vh;
} */

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 100%;
}

/* body > .el-container {
  margin-bottom: 40px;
} */

</style>