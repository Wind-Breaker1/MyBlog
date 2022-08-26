<template>
  <div class="article-box">
    <el-tabs tab-position="top" class="tabs">
      <el-tab-pane label="用户管理" class="tab-content">
        <el-table :data="jottings" class="table">
          <el-table-column label="提交日期" min-width="100">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" min-width="100"> </el-table-column>
          <el-table-column prop="digest" label="摘要" min-width="200"> </el-table-column>
          <el-table-column label="状态" min-width="50">
            <template slot-scope="scope">
              {{ scope.row.state ? '已发布' : '未发布' }}
            </template>
          </el-table-column>
          <el-table-column prop="favour.length" label="点赞量" min-width="50"> </el-table-column>
          <el-table-column prop="browse" label="浏览量" min-width="50"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="success" @click="handlePublish(scope.row)">{{ scope.row.state ? '下架' : '发布'
              }}
              </el-button>
              <el-button size="mini" type="danger" @click="deleteJotting(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  mounted() {
    // this.getData()
  },
  computed: {
    // 获取数据
    ...mapGetters(['jottings']),
  },
  methods: {
    // 编辑
    async handleEdit(row) {
      await this.$store.dispatch('getJotting', { _id: row._id });
      this.$router.push({ path: "/admin/markdown", query: { type: 'jotting' } })
    },
    // 删除
    async deleteJotting(row) {
      const res = await this.$store.dispatch('deleteJotting', { _id: row._id })
      if (res.status === 200) {
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
      this.getData();
    },
    // 获取随笔
    getData() {
      this.$store.dispatch('getJottings');
    },
    // 修改文章状态
    async handlePublish(row) {
      const res = await this.$store.dispatch('changeJottingState', { _id: row._id });
      if (res.status === 200) {
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
      this.getData();
    }
  }
}
</script>

<style lang="less">
.article-box {
  margin: 1vw;
  padding: 2vh;
  box-sizing: border-box;
  width: 100%;
  background-color: rgb(50, 50, 50);
  border-radius: 5px;


  .tabs {
    height: 100%;
    color: #fff !important;
    .tab-content{
      display: flex;
    }
    
  }
  /deep/ .el-tabs__item {
      
    }
  .table {
    width: 100%;
    color: #fff;
    background-color: transparent;
    flex: 1;
  }
}
</style>