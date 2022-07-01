<template>
  <div id="siderInfo">
    <el-card class="box-card" >
      <div slot="header">
        <h3><i class="el-icon-edit-outline" style="margin-right:10px"></i>书签</h3>
      </div>
      <el-tag v-for="item in classifies" :key="item._id" class="bookmark" :id="item._id" @click="getBlogsOfClassify($event)">{{ item.title }}</el-tag>
    </el-card>
    <el-card class="box-card" >
      <div slot="header">
        <h3><i class="el-icon-medal" style="margin-right:10px"></i>最新随笔</h3>
      </div>
      <div class="content" v-for="item in jottingList" :key="item._id" @click="showdetail('jotting',item._id)">
          {{ item.title }}
      </div>
    </el-card>
    <el-card class="box-card" >
      <div slot="header">
        <h3><i class="el-icon-document" style="margin-right:10px"></i>最新博客</h3>
      </div>
      <div class="content" v-for="item in blogList" :key="item._id" @click="showdetail('blog',item._id)">
          {{item.title}}
      </div>
    </el-card>
    <el-calendar v-model="time" class="calendar">
    </el-calendar>
    <div class="like-context">
      <h3><i class="el-icon-alarm-clock" style="margin-right:10px"></i>年轻人，你怎么睡的着啊！</h3>
    </div>
    <div class="like-context">
      <h3><i class="el-icon-aim" style="margin-right:10px"></i>瞄准目标，坚定地走下去！</h3>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  data() {
    return {
      classifies: [],
      jottingList: [],
      blogList:[],
      time: new Date()
    }
  },
  mounted(){
    this.getBaseInfo();
  },
  computed: {
    
  },
  methods:{
    // 获取基本信息
    async getBaseInfo() {
      try {
        let {blogList, jottingList, classifies} = {...mapState(['blogList','jottingList','classifies'])};
        if (blogList.length && jottingList.length && classifies.length) {
          this.classifies = classifies;
          this.blogList = blogList;
          this.jottingList = jottingList;
        } else {
          const res = await this.$api.getSliderInfo();
          if (res.status === 200) {
            this.classifies = res.data.classifies;
            this.blogList = res.data.blogList.slice(0, 3);
            this.jottingList = res.data.jottingList.slice(0, 3);
            this.$store.commit('SAVECLASSIFIES', this.classifies);
            this.$store.commit('SAVEBLOG', res.data.blogList);
          } else {
            this.$message.error('网络出错了,(ノへ￣、)！')
          }
        }
      } catch (error) {
        this.$message.error(error)
      }
    },
    // 获取某一书签下所有博客
    async getBlogsOfClassify(e) {
      this.$router.push({path:'/bloglist', query:{type:'blog', classification:e.target.id}});
    },
    // 获取某个文章
    showdetail(type, _id) {
      this.$router.push(`/article/${type}/${_id}`)
    }
  }
}
</script>

<style scoped lang="less">
#siderInfo{
  height: 100%;
  width: 18vw;
  margin-left: 1vw;
  margin-top: 5px;
  margin-bottom: 1vh;
  border-radius: 5px;
  background-color: rgba(220, 220, 220, 0.6);
  .box-card {
    background-color: rgba(245, 245, 245, 0.8);
    margin-bottom: 2vh;
    /deep/.el-card__header {
      border-color: #c5c4c4;
    }
    .bookmark{
      margin: 10px;
    }
    .content{
      padding: 10px;
      text-overflow: ellipsis;
      overflow:hidden;
    }
  }
  // 
  .calendar{
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.8);
    /deep/ .el-button{
      padding: 5px;
    }
    /deep/ .el-calendar-day{
      border: 0;
      height: 30px;
    }
  }
  .like-context{
    background-color: rgba(245, 245, 245, 0.8);
    border-radius: 5px;
    padding-left: 10px;
    margin-top: 2vh;
    margin-bottom: 2vh;
    height: 50px;
    line-height: 50px;
    transition-duration: 1s;
  }
  .like-context:hover{
    box-shadow: 0 16px 16px 0 rgba(0, 0, 0, 0.3);;
  }
}

</style>