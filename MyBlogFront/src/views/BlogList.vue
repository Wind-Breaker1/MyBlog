<template>
  <div class="bloglist" >
    <div class="blogtip">
      <h3>博客</h3>
    </div>
  <!-- 博客列表元素 -->
    <el-card v-for="item in blogList" :key="item._id" :style="{marginBottom: '2vh'}" :id="item._id">
      <div @click="blogdetail('blog',item._id)">
      <div slot="header" >
        <h3>{{item.title}}</h3>
      </div>
      <div class="content">
        <p class="desc">
          <span style="font-size:16px;font-weight:bold">文章简介：</span>
          {{ item.digest }}
        </p>
      </div>
      </div>
      <div class="footer">
          <span class="favour">
            <i class="iconfont icon-icon" style="margin-right: 10px;"></i>{{item.favour}}
          </span>
          <span class="brows">
            <i class="el-icon-view" style="margin-right: 10px;"></i>{{item.browse}}
          </span>
          <span class="createtime">
            <i class="iconfont icon-rili" style="margin-right: 10px;"></i>{{item.date}}
          </span>
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
      blogList: [],
      // 每页数量
      pageSize: 5,
      // 页数
      page: 1,
      // 当前分页开始
      pageStart: 0
    }
  },
  mounted() {
    this.getList(this.pageStart, this.pageSize)
  },
  watch: {
    $route(){
      if(this.$route.query.classification){
        this.getList()
      }
    }
  },
  methods: {
    // 换页回调
    handleCurrentChange(val) {
      this.pageStart = this.pageSize * (val - 1);
      this.getList(this.pageStart, this.pageSize)
    },
    async getList(pageStart, pageSize) {
      try {
        // 获取博客列表
        let res = null;
        let {classification, type} = this.$route.query;
        console.log(Boolean(type))  
        // 判断发什么请求博客
        if (type === 'blog'){
          res = await this.$api.getBlogsOfClassify({classification});
        } else {
          res = await this.$api.getArticleList({pageStart, pageSize});
        }
        if (res.status === 200) {
          this.blogList = res.data.blogList;
          this.count = res.data.count;
          if (pageStart === 0) {
            this.$store.commit('SAVEBLOG', res.data.blogList.slice(0,3));
          }
        } else {
          this.$message.error('网络出错了,(ノへ￣、)！')
        }
      } catch (error) {
        this.$message.error(error)
      }
    },
    async blogdetail(type, _id) {
       await this.$api.addBrowse({_id})
      this.$router.push(`/article/${type}/${_id}`)
     
    }
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
  min-height: 100vh;
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
  .footer{
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