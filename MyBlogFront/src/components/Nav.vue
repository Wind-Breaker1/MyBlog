<template>
  <div id="nav">
    <el-menu
      :default-active="$route.path"
      class="navbar"
      text-color="#aaaaaa"
      active-text-color="#FFFFFF"
    >
      <router-link to="/bloglist">
        <el-menu-item index="/bloglist">
          <i class="el-icon-menu"></i>博客
        </el-menu-item>
      </router-link>
      <router-link to="/jottinglist">
        <el-menu-item index="/jottinglist">
          <i class="el-icon-s-opportunity"></i>心情日记
        </el-menu-item>
      </router-link>
      <router-link to="/messageboard">
        <el-menu-item index="/messageboard">
          <i class="el-icon-user"></i>留言板
        </el-menu-item>
      </router-link>
      <router-link to="/timeclue">
        <el-menu-item index="/timeclue">
          <i class="el-icon-user"></i>小站时间线
        </el-menu-item>
      </router-link>
      <router-link to="/about">
        <el-menu-item index="/about">
          <i class="el-icon-user"></i>关于
        </el-menu-item>
      </router-link>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style scoped lang="less">
#nav {
  width: 15vw;
  height: 100%;
  margin-right: 1vw;
  position: sticky;
  top: 60px;
  padding-top: 5px;
  .navbar {
    height: calc(100vh - 130px - 15vh);
    background-color: rgba(40, 40, 40, 0.7);
    border: 0;
    border-radius: 5px;
    .el-menu-item {
      border-radius: 5px;
    }
    .el-menu-item:hover {
      background-color: rgb(40, 40, 40);
    }
    // .el-menu-item:focus {
    //   background-color: rgb(40, 40, 40);
    // }
    .is-active {
      background-color: rgb(40, 40, 40);
    }
  }
  a {
    text-decoration: none;
  }
}
</style>
