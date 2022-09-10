<template>
  <div>
    <div class="article-info" :style="`${cardBg}`">
      <h1 class="article-title">{{ article.title }}</h1>
      <div class="article-class">
        <div v-show="isBlog">专栏：{{ article.classifyName }}</div>
        <div class="tag">
          <div
            v-for="item in article.tags"
            :key="item._id"
            :style="{ 'background-color': item.bg }"
          >
            <i class="el-icon-price-tag"></i> {{ item.title }}
          </div>
        </div>
      </div>
      <div class="opration">
        <i
          class="iconfont icon-icon"
          @click="giveALike(article._id)"
          :class="isGiveALiked ? 'active' : ''"
        ></i
        >{{ favourList.length }} <i class="el-icon-view"></i
        >{{ article.browse }}
        <i class="iconfont icon-rili"> 写于 {{ article.date }}</i>
      </div>
    </div>
    <mavon-editor
      v-model="article.content"
      ref="md"
      :toolbarsFlag="false"
      :subfield="false"
      defaultOpen="preview"
      :ishljs="true"
      codeStyle="rainbow"
      :class="!isLight ? 'markDown-night' : ''"
      class="markdown"
    />
    <Comment
      :keyId="$route.params.id"
      emptyText="期待您的评论！"
      buttonText="评论"
      :contentLength="150"
      placeholderText="请输入最多150字的评论..."
      :articleTitle="article.title"
    ></Comment>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import Comment from "@/components/Comment.vue";
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      article: {},
      favourList: [],
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
  computed: {
    ...mapState({
      isLight: (state) => state.theme.isLight,
    }),
    ...mapGetters(["color", "cardBg"]),
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
        this.$loading.show("加载中...");
        let { id, type } = this.$route.params;
        let res = {};
        this.favourList = [];
        // 判断是博客还是随笔
        if (type === "blog") {
          this.$api.addBlogBrowse({ _id: id });
          res = await this.$api.getBlog({ _id: id });
        } else {
          this.$api.addJottingBrowse({ _id: id });
          res = await this.$api.getJotting({ _id: id });
        }
        if (res.status === 200) {
          if (res.data.classifyName) {
            this.isBlog = true;
          } else {
            this.isBlog = false;
          }
          this.$loading.hide();
          this.article = res.data;
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
.markdown {
  min-height: 100vh;
  z-index: 5;
}
.markDown-night {
  /deep/.v-show-content {
    background-color: #323232 !important;
    color: #ffffff;
    transition: 0.6s;
  }

  /deep/ img {
    background-color: #323232 !important;
    transition: 0.6s;
  }
}

.article-info {
  min-height: 20vh;
  font-size: 14px;
  padding: 15px;
  position: relative;
  border-radius: 5px;
  margin-bottom: 2vh;
  transition: 0.6s;

  .article-title {
    text-align: center;
  }

  .article-class {
    margin-top: 20px;
    text-align: center;

    .tag {
      margin-top: 10px;
      display: flex;
      justify-content: center;

      & > div {
        line-height: 20px;
        padding: 3px;
        background-color: red;
        margin-right: 10px;
      }

      & > div:last-child {
        margin-right: 0;
      }
    }
  }

  .opration {
    line-height: 40px;
    position: absolute;
    left: 10%;
    bottom: 0;
    width: 80%;

    i {
      margin-right: 10px;
      cursor: pointer;
    }

    & > i:nth-child(2) {
      margin-left: 25px;
    }

    & > i:nth-child(3) {
      float: right;
    }
  }
}
</style>
