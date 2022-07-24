<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      label="提交日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="title" label="标题" width="350"> </el-table-column>
    <el-table-column prop="classification" label="书签" width="150"> </el-table-column>
    <el-table-column label="状态" width="80">
      <template slot-scope="scope">
        {{scope.row.state ? '已发布': '未发布'}}
      </template>
    </el-table-column>
    <el-table-column prop="favour" label="点赞量" width="80"> </el-table-column>
    <el-table-column prop="browse" label="浏览量" width="80"> </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
          size="mini"
          type="success"
          @click="handlePublish(scope.row)">{{scope.row.state ? '下架':'发布'}}</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
    };
  },
  mounted() {
    this.getArticleList();
    this.getClassify();
  },
  computed: {
    ...mapState({
      Data: (state) => state.article.articles || [],
      classifies: (state) => state.classify.classifies || [],
    }),
    // 调数据的专栏名称
    tableData() {
      let id;
      this.Data.forEach((element) => {
        id = element.classification;
        this.classifies.forEach((ele) => {
          if (ele._id === id) {
            element.classification = ele.title;
          }
        });
      });
      return JSON.parse(JSON.stringify(this.Data))
    },
  },
  methods: {
    // 编辑
    async handleEdit(row) {
      await this.$store.dispatch("getBlog", { _id: row._id });
      this.$router.push({path:"/admin/markdown", query:{type:'blog'}});
    },
    // 删除
    handleDelete(row) {
      this.$store.dispatch("deleteArticle", { _id: row._id });
      this.getArticleList();
    },
    // 获取文章列表
    getArticleList() {
      this.$store.dispatch("getArticleList");
    },
    // 获取专栏
    getClassify() {
      if (this.$store.state.classify.classifies.length == 0)
        this.$store.dispatch("getClassifyList");
    },
    // 修改文章状态
    async handlePublish(row) {
      await this.$store.dispatch("changeState", { _id: row._id });
      this.$store.dispatch("getArticleList");
    },
  },
};
</script>

<style>
</style>