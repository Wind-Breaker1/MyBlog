<template>
  <div >
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
            <i class="iconfont icon-icon" style="margin-right: 10px;"></i>{{item.favour.length}}
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
import {mapState} from 'vuex';
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
    this.getBlogList(this.pageStart, this.pageSize)
  },
  watch: {
    $route(){
      if(this.$route.query.classification){
        this.getBlogList()
      }
    }
  },
  methods: {
    // 换页回调
    handleCurrentChange(val) {
      this.pageStart = this.pageSize * (val - 1);
      this.getBlogList(this.pageStart, this.pageSize)
    },
    // 获取博客列表数据
    async getBlogList(pageStart, pageSize) {
      try {
        let {blogList} = {...mapState(['blogList'])};
        // 获取博客列表
        let res = null;
        let {classification, type} = this.$route.query;
        // 判断发什么请求博客
        if (type === 'blog'){
          if (pageStart === 0 && blogList.length) {
            this.blogList = blogList;
            return ;
          } else {
            res = await this.$api.getBlogsOfClassify({classification});
          }
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
          this.$message.error('网络出错了,(ノへ￣、)！');
        }
      } catch (error) {
        this.$message.error(error);
      }
    },
    // 获取博客详情
    async blogdetail(type, _id) {
      try {
        // await this.$api.addBrowse({_id});
        this.$router.push(`/article/${type}/${_id}`);
      } catch (error) {
        this.$message.error(error);
      }
    },
    // // 图片上传
    // async $imgAdd (pos, $file) {
    //   // 第一步，将图片上传到服务器
    //   let formdata = new FormData();
    //   formdata.append('file', $file);
    //   // console.log($file, formdata)
    //   axios({
    //       url: `${this.$store.state.baseURL}/admin/uploadCover`,
    //       method: 'post',
    //       data: formdata,
    //       headers: {'Content-Type': 'multipart/form-data'},
    //   }).then((data) => {
    //       // 第二部，将返回的url替换到文本原位置![...](0) -> ![...](url)
    //       /**
    //        * $vm 指为mavonEditor实例，可以通过如下两种方式获取
    //        * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
    //        * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
    //        */
    //       // console.log(pos)
    //       this.$refs.md.$img2Url(pos, data.data.file.url)
    //   })
    // },
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