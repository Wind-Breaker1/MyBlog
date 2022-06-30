<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    height="565px">
    <el-table-column
      label="提交日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="标题"
      width="350">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.title }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="专栏"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.classification }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="状态"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.state }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="点赞量"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.favour }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="浏览量"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.browse }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button> -->
          <el-button
          size="mini"
          type="success"
          @click="handlePublish(scope.$index, scope.row)">发布</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState } from 'vuex';
import { getClassifies } from '../util';
export default {
  data() {
      return {
      }
    },
  mounted(){
    this.getArticleList();
    this.getClassify()
  },
  computed: {
    ...mapState({
      Data: state => state.article.articles,
      classifies: state => state.classify.classifies
    }),
    // 调数据的专栏名称
    tableData() {
      let id;
      let classifies = getClassifies();
      console.log(this.Data, 111)
      console.log(this.classifies, 111)
      this.Data.forEach(element => {
        id = element.classification;
        this.classifies.forEach(ele => {
          if (ele._id === id) {
            element.classification = ele.title;
          }
        })
      });
      return this.Data
    }
  },
  methods: {
    // 编辑
    handleEdit(row) {
      this.$store.dispatch('getArticle', {_id:row._id});
      this.$router.push('/admin/markdown');
    },
    // 删除
    handleDelete(index, row) {
      this.$store.dispatch('deleteArticle', {_id:row._id})
      this.getArticleList();
    },
    // 获取文章列表
    getArticleList() {
      this.$store.dispatch('getArticleList');
    },
    // 获取专栏
    getClassify() {
      if (this.$store.state.classify.classifies.length == 0)
        this.$store.dispatch('getClassifyList');
    },
    // 修改文章状态
    handlePublish(index,row) {
      this.$store.dispatch('changeState', {_id: row._id});
      this.getArticleList();
    }
  }
}
</script>

<style>

</style>