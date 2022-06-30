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
      width="180">
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
      label="描述"
      width="300">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.digest }}</span>
      </template>
    </el-table-column>
    
    <el-table-column
      label="点赞量"
      width="100">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.favour }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="浏览量"
      width="100">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.browse}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="状态"
      width="100">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.state }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          @click="handleEdit()">编辑</el-button> -->
          <el-button
          size="mini"
          type="success"
          @click="handlePublish(scope.row)">热门</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
      return {
     
      }
    },
   mounted(){
    this.getData()
  },
  computed: {
    // 获取数据
    ...mapState({
      Data: state => state.jotting.jottings,
      classifies: state => state.jotting.jottings
    }),
    tableData() {
      let id;
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
    // // 编辑
    // handleEdit() {
    //   this.$router.push('/admin/markdown')
    // },
    // 删除
    handleDelete(row) {
      this.$store.dispatch('deleteJotting', {_id:row._id})
      this.getData();
    },
    // 获取随笔
    getData() {
      this.$store.dispatch('getJottingList');
    },
    // 修改文章状态
    handlePublish(row) {
      this.$store.dispatch('changeJottingState', {_id: row._id});
      this.getData();
    }
  }
}
</script scoped>

<style>

</style>