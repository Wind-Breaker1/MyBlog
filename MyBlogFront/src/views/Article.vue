<template>
  <div>
    <div class="blogtip">
      <h2>{{ article.title }}</h2>
      <el-tag class="bookmark" v-show="isBlog">{{ <article class=""></article>classifyName }}</el-tag>
      <div class="opration">
        <i class="iconfont icon-icon" @click="giveALike(article._id)" :class="isGiveALiked ? 'active' : ''"></i>{{
            favourList.length
        }} <i class="el-icon-view"></i>{{ article.browse }}
        <i class="iconfont icon-rili"> 写于 {{ article.date }}</i>
      </div>
    </div>
    <mavon-editor v-model="article.content" ref="md" :toolbarsFlag="false" :subfield="false" defaultOpen="preview"
      :ishljs="true" codeStyle="rainbow" previewBackground="background-color: rgba(255, 255, 255, 0.7);"
      style="min-height: 100vh; z-index: 90" />
    <Comment :keyId="$route.params.id" emptyText="期待您的评论！" buttonText="评论" :contentLength="150"
      placeholderText="请输入最多150字的评论..."></Comment>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import Comment from "@/components/Comment.vue";
export default {
  data() {
    return {
      article: {},
      // content: "",
      favourList: [],
      // classifyName: "",
      isBlog: true,
      isGiveALiked: false,
    };
  },
  components: {
    mavonEditor,
    Comment,
  },
  created() {
    this.getArticle();
  },
  watch: {
    $route() {
      if (this.$route.params.id) {
        this.getArticle();
      }
    },
  },
  methods: {
    // 获取文章详细信息
    async getArticle() {
      try {
        let { id, type } = this.$route.params;
        let res = {};
        this.favourList = [];
        // 判断是博客还是随笔
        if (type === "blog") {
          res = await this.$api.getBlog({ _id: id });
        } else {
          res = await this.$api.getJotting({ _id: id });
        }
        if (res.status === 200) {
          if (res.data.classifyName) {
            this.isBlog = true;
          } else {
            this.isBlog = false;
          }
          console.log('res', res);

          this.article = res.data;
          // this.content = res.data.content;
          // this.classifyName = res.data.classifyName;
          this.favourList = res.data.favour;
          const murmur = localStorage.getItem("browserId");
          this.isGiveALiked = this.favourList.includes(murmur) ? true : false;
        } else {
          this.$message.error("网络出错了,(ノへ￣、)！");
        }
      } catch (error) {
        this.$message.error(error);
      }
    },

    // 点赞
    async giveALike(id) {
      try {
        let { type } = this.$route.params;
        let murmur = localStorage.getItem("browserId");
        if (this.isGiveALiked) {
          this.$message.warning("您已经点过赞啦！");
          return;
        }
        let res = {};
        if (type === "blog") {
          res = await this.$api.giveBlogALike({
            _id: id,
            favourMurmur: murmur,
          });
        } else {
          res = await this.$api.giveJottingALike({
            _id: id,
            favourMurmur: murmur,
          });
        }
        if (res.status === 200) {
          this.favourList = res.data;
          this.isGiveALiked = true;
          this.$message.success(res.msg);
        } else {
          this.$message.error("网络出错了,(ノへ￣、)！");
        }
      } catch (error) {
        this.$message.error(error);
      }
    },
  },
};
</script>

<style scoped lang="less">
.active {
  color: red;
}

.blogtip {
  min-height: 18vh;
  font-size: 14px;
  padding: 15px;
  position: relative;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  margin-bottom: 2vh;

  .bookmark {
    margin-top: 20px;
  }

  .opration {
    line-height: 40px;
    position: absolute;
    bottom: 0;
    width: 95%;

    i {
      margin-right: 10px;
      cursor: pointer;
    }

    &>i:nth-child(2) {
      margin-left: 25px;
    }

    &>i:nth-child(3) {
      margin-left: 25px;
      float: right;
    }
  }
}

.desc {
  display: block;
  height: 10vh;
  text-overflow: ellipsis;
}

.show {
  height: 4vh;
  color: gray;
  line-height: 4vh;

  .favour,
  .brows {
    float: left;
    width: 100px;
  }

  .createtime {
    float: right;
  }
}
</style>
