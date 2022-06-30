<template>
  <div class="bloglist">
    <div class="blogtip">
      <h3>随笔</h3>
    </div>
  <!-- 博客列表元素 -->
    <el-card v-for="(item, index) in jottingList" :key="index" :style="{marginBottom: '2vh'}">
      <div slot="header">
        <h3><i class="iconfont icon-wenzhang"></i>{{item.title}}</h3>
      </div>
      <div class="content">
        <p class="desc">
          <span style="font-size:16px;font-weight:bold">文章简介：</span>
          {{ item.digest }}
        </p>
       <div class="show">
          <span class="favour">
            <i class="iconfont icon-icon" style="margin-right: 10px;"></i>{{item.favour}}
          </span>
          <span class="brows">
            <i class="el-icon-view" style="margin-right: 10px;"></i>{{item.favour}}
          </span>
          <span class="createtime">
            <i class="iconfont icon-rili" style="margin-right: 10px;"></i>{{item.date}}
          </span>
        </div>
      </div>
    </el-card>
    <!-- 分页 -->
    <div class="paginationWrap">
      <el-pagination background layout="prev, pager, next" :total="count" class="pagination" :page-size="pageSize"  @current-change="handleCurrentChange" :hide-on-single-page="true">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 总文章数
      count: 0,
      // 文章列表
      jottingList: [],
      // 每页数量
      pageSize: 5,
      // 页数
      // page: 0,
      // 点赞数量数组
      // likes: [],
      // // 标识是否为Category组件传来的
      // isCategory: false,
      // // 标识是否为Tag组件传来的
      // isTag: false,
      // f当前分页开始
      pageStart: 0
    }
  },
  mounted() {
    this.getList(this.pageStart, this.pageSize)
  },
  methods: {
    handleCurrentChange(val) {
      this.pageStart = this.pageSize * (val - 1);
      this.getList(this.pageStart, this.pageSize)
    },
    async getList(pageStart, pageSize) {
      try {
          const res = await this.$api.getJottingList({pageStart, pageSize});
          console.log(res.data.jottingList)
          if (res.status === 200) {
            this.jottingList = res.data.jottingList;
            this.count = res.data.count;
            if (pageStart === 0) {
              this.$store.commit('SAVEJOTTING', res.data.jottingList.slice(0, 3));
            }
          } else {
            this.$message.error('网络出错了,(ノへ￣、)！')
          }
        // 获取博客列表
      } catch (error) {
        this.$message.error(error)
      }
    },
  }
}
</script>

<style lang="less" scoped>
.bloglist{
  flex:1;
  background-color: rgba(255, 255, 255, 0.7);
  margin-top: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
  height: 1000vh;
  .blogtip{
    // height: 8vh;
    line-height: 8vh;
    text-align: center;
    background-color: rgb(255, 255, 255);
    border-color: transparent red;
    border-radius: 5px;
    margin-bottom: 2vh;
  }
  .desc{
    display: block;
    height: 10vh;
    text-overflow: ellipsis;
  }
  .show{
    height: 4vh;
    color: gray;
    line-height: 4vh;
    .favour, .brows{
      float: left;
      width: 100px;
    }
    .createtime{
      float:right;
    }
  }
  .paginationWrap {
    margin-top: 2vh;
    margin-bottom: 10vh;
    .pagination {
      float: right;
    }
  }
}

</style>