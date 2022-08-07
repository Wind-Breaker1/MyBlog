<template>
  <div id="header">
    <img src="@/assets/logo.png" alt="欢迎来Meditators的博客" class="logo" />
    <el-input
      placeholder="请输入关键字..."
      v-model="searchValue"
      class="input-with-select"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="searchArticle"
      ></el-button>
    </el-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchValue: "",
    };
  },
  methods: {
    async searchArticle() {
      try {
        this.$router.push("/search?searchValue=" + this.searchValue);
        this.searchValue = "";
      } catch (err) {
        this.$message.error(err);
      }
    },
  },
};
</script>
<style scoped lang="less">
#header {
  height: 60px;
  background-color: #545c64;
  position: fixed;
  top: 0;
  width: 79vw;
  padding-left: 10vw;
  padding-right: 11vw;
  line-height: 60px;
  z-index: 100;
  .logo {
    height: 65px;
    float: left;
  }
  .input-with-select {
    width: 20vw;
    margin-top: 10px;
    float: right;
  }
}
</style>
