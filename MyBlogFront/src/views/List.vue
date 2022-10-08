<template>
  <div class="list-box">
    <div class="list-tip" :style="`${cardBg}`">
      <h2>{{ tipText }}</h2>
    </div>
    <!-- 博客列表元素 -->
    <div
      v-for="(item, index) in dataList"
      :key="index"
      class="card"
      :style="`${color};${cardBg}`"
    >
      <div @click="articleDetail(item)">
        <div class="head">
          <h3>{{ item.title }}</h3>
          <div v-if="$route.type == 'search' || $route.type == 'tag'">
            {{ item.type == "blog" ? "博客" : "心情" }}
          </div>
        </div>
        <p class="desc">文章简介：{{ item.digest }}</p>
      </div>
      <div class="footer">
        <span class="favour">
          <i
            class="iconfont icon-icon"
            :class="item.favour.includes(murmur) ? 'active' : ''"
            style="margin-right: 10px"
          ></i
          >{{ item.favour.length }}
        </span>
        <span class="brows">
          <i class="el-icon-view" style="margin-right: 10px"></i
          >{{ item.browse }}
        </span>
        <span class="createtime">
          <i class="iconfont icon-rili" style="margin-right: 10px"></i
          >{{ item.date }}
        </span>
      </div>
    </div>
    <el-empty
      v-if="dataList.length == 0"
      description="先去别的地方看看吧！"
    ></el-empty>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="count"
      class="pagination"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      hide-on-single-page
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // 总文章数
      count: 0,
      // 文章列表
      dataList: [],
      // 每页数量
      pageSize: 5,
      // 页数
      page: 1,
      // 当前分页开始
      pageStart: 0,
      tipText: "博客",
      murmur: localStorage.getItem("browserId"),
    };
  },
  mounted() {
    this.getDatas(this.pageStart, this.pageSize);
  },
  computed: {
    ...mapGetters(["color", "cardBg"]),
  },
  watch: {
    $route() {
      this.getDatas(0, this.pageSize);
    },
  },
  methods: {
    // 换页回调
    handleCurrentChange(val) {
      this.pageStart = this.pageSize * (val - 1);
      this.getDatas(this.pageStart, this.pageSize);
    },

    // 获取博客列表数据
    async getDatas(pageStart, pageSize) {
      try {
        this.$loading.show("加载中...");
        // 获取博客列表
        let res = null;
        const { classification, searchValue, tag, tagName } = this.$route.query;
        const { type } = this.$route.params;
        // 判断发什么请求博客
        if (classification) {
          this.tipText = "博客";
          res = await this.$api.getBlogsOfClassify({ classification });
        } else if (tag) {
          this.tipText = tagName;
          res = await this.$api.getArticlesOfTag({ searchTag: tag });
        } else if (searchValue) {
          this.tipText = "搜索结果";
          res = await this.$api.search({ searchValue });
        } else {
          if (type == "blog") {
            this.tipText = "博客";
            res = await this.$api.getPublishBlogs({ pageStart, pageSize });
          } else if (type == "jotting") {
            this.tipText = "心情";
            res = await this.$api.getPublishJottings({ pageStart, pageSize });
          }
        }
        if (res.status === 200) {
          this.dataList = res.data.dataList || [];
          this.count = res.data.count;
        } else {
          this.$message.error(res.msg);
        }
        this.$loading.hide();
      } catch (err) {
        this.$message.error(err);
        this.$loading.hide();
      }
    },
    // 跳转文章详情
    articleDetail(item) {
      try {
        this.$router.push(
          `/article/${item.classification ? "blog" : "jotting"}/${item._id}`
        );
      } catch (error) {
        this.$message.error(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.list-box {
  animation: animate 2s;
  transition: 0.6s; // 暗黑模式过度时间
  /* 博客和心情列表上方提示 */
  .list-tip {
    line-height: 8vh;
    text-align: center;
    border-color: transparent red;
    border-radius: 5px;
    margin-bottom: 2vh;
    transition: 0.6s;
  }
  .card {
    animation: animate 2s;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 2vh;
    transition: 0.6s;
    .head {
      display: flex;
      justify-content: space-between;
      h3 {
        width: calc(100% - 55px);
      }
      div {
        width: 50px;
      }
    }
    .desc {
      font-size: 14px;
      display: block;
      height: 10vh;
      overflow: hidden;
      white-space: overflow;
      text-overflow: ellipsis;
    }
    .active {
      color: rgb(202, 4, 4);
    }
    .footer {
      height: 4vh;
      color: gray;
      line-height: 4vh;
      .favour,
      .brows {
        float: left;
        width: 80px;
      }
      .createtime {
        float: right;
      }
    }
  }
}

@keyframes animate {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
