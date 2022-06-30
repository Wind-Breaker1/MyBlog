<template>
   <div class="bloglist" >
    <div class="blogtip">
      <h2>{{article.title}}</h2>
      <el-tag class="bookmark">标签一</el-tag>
      <div class="opration">
          <i class="iconfont icon-icon" @click="giveALike(article._id)"></i>{{favour || article.favour}}
          <i class="el-icon-view"></i>{{article.browse}}
          <i class="iconfont icon-rili">&nbsp&nbsp写于&nbsp2000-12-23</i>
        </div>
    </div>
    <mavon-editor
      v-model="content"
      ref="md"
      @change="change"
      :toolbarsFlag="false"
      :subfield="false"
      defaultOpen="preview"
      :ishljs="true"
      codeStyle="rainbow"
      previewBackground="background-color: rgba(255, 255, 255, 0.7);"
      style="min-height: 100vh; z-index: 90;"
    />
    <div class="discuss">

    </div>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import 'mavon-editor/dist/css/index.css'
export default {
  data() {
    return {
      article: {},
      dialogFormVisible: false,
        form: {
          title: '',
          digest: '',
        },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      content: "",
      html: "",
      configs: {},
      state: false,
      favour: 0
    }
  },
  components:{
    mavonEditor
  },
  mounted(){
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
    async getArticle() {
      let {id, type} = this.$route.params;
      console.log(id, type, this.$route.params)
      let res = null;
      if (type === 'blog') {
        res = await this.$api.getArticle({_id:id});
      } else {
        res = await this.$api.getJotting({_id:id});
      }
      if (res.status === 200) {
        this.article = res.data;
        this.content = res.data.content;
      } else {

      }
      
    },
    // 所有操作都会被解析重新渲染
    change(value, render){
        // render 为 markdown 解析后的结果[html]
        // console.log(value, render)
        this.html = render;
    },
    async giveALike(id){
      let res = await this.$api.giveALike({_id:id});
      console.log(res)
      if (res.status === 200) {
        this.favour = res.data;
      }
    }
  }
}
</script>

<style scoped lang="less">
.bloglist{
  flex:1;
  background-color: rgba(255, 255, 255, 0.7);
  margin-top: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
  min-height: 100vh;
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
  .discuss{
    min-height: 26vh;
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    margin-top: 2px;
  }
}

</style>