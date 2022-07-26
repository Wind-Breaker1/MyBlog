<template>
<el-table :data="Data" height="570">
    <el-table-column
      label="提交日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="title" label="标题" width="250"> </el-table-column>
    <el-table-column prop="digest" label="摘要" width="350"> </el-table-column>
    <el-table-column label="状态" width="80">
      <template slot-scope="scope">
        {{scope.row.state ? '已发布': '未发布'}}
      </template>
    </el-table-column>
    <el-table-column prop="favour.length" label="点赞量" width="80"> </el-table-column>
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
    }),
    
  },
  methods: {
    // 编辑
    async handleEdit(row) {
      await this.$store.dispatch('getJotting', { _id: row._id });
      this.$router.push({path:"/admin/markdown", query:{type:'jotting'}})
    },
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
    async handlePublish(row) {
      await this.$store.dispatch('changeJottingState', {_id: row._id});
      this.getData();
    }
  }
}
</script scoped>

<style>

</style>