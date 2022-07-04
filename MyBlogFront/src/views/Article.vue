<template>
   <div>
    <div class="blogtip">
      <h2>{{article.title}}</h2>
      <el-tag class="bookmark" v-show="isBlog">{{classifyName}}</el-tag>
      <div class="opration">
          <i class="iconfont icon-icon" @click="giveALike(article._id)"></i>{{favour || article.favour}}
          <i class="el-icon-view"></i>{{article.browse}}
          <i class="iconfont icon-rili">&nbsp&nbsp写于&nbsp2000-12-23</i>
        </div>
    </div>
    <mavon-editor
      v-model="content"
      ref="md"
      :toolbarsFlag="false"
      :subfield="false"
      defaultOpen="preview"
      :ishljs="true"
      codeStyle="rainbow"
      previewBackground="background-color: rgba(255, 255, 255, 0.7);"
      style="min-height: 100vh; z-index: 90;"
    />
    <Comment :blogId="this.article._id" v-if="content.length !== 0"></Comment>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import 'mavon-editor/dist/css/index.css';
import Comment from '@/components/Comment.vue';
export default {
  data() {
    return {
      article: {},
      content: "",
      favour: 0,
      classifyName: '',
      isBlog: true
    }
  },
  components:{
    mavonEditor,
    Comment
  },
  created(){
    this.getArticle();
  },
  watch: {
    $route(){
      if(this.$route.params.id){
        this.getArticle()
      }
    }
  },
  methods:{
    // 获取文章详细信息
    async getArticle() {
      try {
        let {id, type} = this.$route.params;
        let res = {};
        this.favour = 0;
        // 判断是博客还是随笔
        if (type === 'blog') {
          res = await this.$api.getBlog({_id:id});
        } else {
          res = await this.$api.getJotting({_id:id});
        }
        if (res.status === 200) {
          if (res.data.classifyName) {
            this.article = res.data.article;
            this.content = res.data.article.content;
            this.classifyName = res.data.classifyName;
            this.isBlog = true;
          } else {
            this.article = res.data;
            this.content = res.data.content;
            this.isBlog = false;
          }
        } else {
          this.$message.error('网络出错了,(ノへ￣、)！')
        }
      } catch (error) {
        this.$message.error(error)
      }
    },
    
    // 点赞
    async giveALike(id){
      try{
        let {type} = this.$route.params;
        let res = {};
        if (type === 'blog') {
          res = await this.$api.giveBlogALike({_id:id});
        } else {
          res = await this.$api.giveJottingALike({_id:id});
        }
        if (res.status === 200) {
          this.favour = res.data;
        }
      } catch (error) {
        this.$message.error(error)
      }
      
    }
  }
}
</script>

<style scoped lang="less">
.blogtip{
  min-height: 18vh;
  font-size: 14px;
  padding: 15px;
  position: relative;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  margin-bottom: 2vh;
  .bookmark{
    margin-top: 20px;
  }
  .opration{
    line-height: 40px;
    position: absolute;
    bottom: 0;
    width: 95%;
    i{
      margin-right: 15px;
    }
    &>i:nth-child(2){
      margin-left: 25px;
    }
    &>i:nth-child(3){
      margin-left: 25px;
      float: right;
    }
  }
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
</style>