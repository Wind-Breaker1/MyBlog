<template>
  <div class="bloglist">
    <div class="blogtip">
      <h3>搜索结果</h3>
    </div>
    <!-- 博客列表元素 -->
    <el-card
      v-for="item in searchList"
      :key="item._id"
      :style="{ marginBottom: '2vh' }"
      :id="item._id"
    >
      <div @click="blogdetail(item._id, item.classification || undefined)">
        <div slot="header">
          <h3>{{ item.title }}</h3>
        </div>
        <div class="content">
          <p class="desc">
            <span style="font-size: 16px; font-weight: bold">文章简介：</span>
            {{ item.digest }}
          </p>
        </div>
      </div>
      <div class="footer">
        <span class="favour">
          <i class="iconfont icon-icon" style="margin-right: 10px"></i
          >{{ item.favour }}
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
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      searchList: "searchList",
    }),
  },
  methods: {
    // 获取博客详情
    async blogdetail(_id, classify) {
      try {
        let type = null;
        if (classify) {
          type = "blog";
        } else {
          type = "jotting";
        }
        this.$router.push(`/article/${type}/${_id}`);
      } catch (error) {
        this.$message.error(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.bloglist {
  flex: 1;
  background-color: rgba(255, 255, 255, 0.7);
  margin-top: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
  min-height: 100vh;
  .blogtip {
    // height: 8vh;
    line-height: 8vh;
    text-align: center;
    background-color: rgb(255, 255, 255);
    border-color: transparent red;
    border-radius: 5px;
    margin-bottom: 2vh;
  }
  .desc {
    display: block;
    height: 10vh;
    text-overflow: ellipsis;
  }
  .footer {
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
  .paginationWrap {
    margin-top: 2vh;
    margin-bottom: 10vh;
    .pagination {
      float: right;
    }
  }
}
</style>