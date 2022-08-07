<template>
  <div class="comment">
    <div class="comment-header">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        :size="40"
      ></el-avatar>
      <el-input
        placeholder="请输入最多150字的评论..."
        v-model="context"
        class="input-with-select"
        type="textarea"
        size="mini"
        :maxlength="150"
        @focus="isShowReply(undefined)"
      >
      </el-input>
      <el-button
        type="info"
        style="height: 40px"
        @click="addComment(blogId, undefined)"
        >评论</el-button
      >
    </div>
    <div class="comment-body" v-for="item in comment" :key="item._id">
      <!-- 一级评论 -->
      <div class="first-comment">
        <el-avatar :size="40"></el-avatar>
        <div class="content">
          <!-- 一级评论用户昵称 -->
          <h3>{{ item.username }}</h3>
          <!-- 一级评论发布时间 -->
          <span>{{ item.date }}</span>
          <!-- 一级评论评论内容 -->
          <p style="padding-right: 30px">
            {{ item.content }}
          </p>
          <!-- 一级评论评论点赞 -->
          <div class="comment-right">
            <i
              class="iconfont icon-icon"
              @click="giveALike(undefined, item._id)"
            >
              {{ item.favour.length }}</i
            >
            <i
              class="el-icon-chat-dot-round"
              @click="isShowReply(item._id, item.username)"
            >
              回复</i
            >
            <i
              class="el-icon-delete"
              @click="deleteCommentc(item._id, undefined)"
              v-if="murmur === item.murmur"
            >
              删除</i
            >
          </div>
          <!-- 回复一级评论 -->
          <div class="reply-comment" v-show="isShow === item._id">
            <el-input
              placeholder="请输入最多150字的评论...."
              v-model="replyContext"
              :maxlength="150"
            >
            </el-input>
            <el-button
              type="info"
              size="mini"
              class="reply-button"
              @click="addComment(item._id, item._id)"
              >回复</el-button
            >
          </div>
          <!-- 次级评论 -->
          <div
            class="second-comment"
            v-for="reply in item.replyInfo"
            :key="reply._id"
          >
            <!-- 次级评论头像,该用户没有头像则显示默认头像 -->
            <el-avatar :size="40"></el-avatar>
            <div class="content">
              <!-- 次级评论用户昵称 -->
              <h3>{{ reply.username }}</h3>
              <!-- 次级评论评论时间 -->
              <span>{{ reply.date }}</span>
              <!-- 次级评论内容 xxx回复xxx：评论内容-->
              <p style="padding-right: 30px">
                <span class="to_reply">{{ reply.username }}</span>
                回复
                <span class="to_reply">{{ reply.replyname }}</span
                >：
                {{ reply.reply }}
              </p>
              <!-- 次级评论评论点赞 -->
              <div class="comment-right">
                <i
                  class="iconfont icon-icon"
                  @click="giveALike(reply._id, item._id)"
                  >{{ reply.favour ? reply.favour.length : 0 }}</i
                >
                <i
                  class="el-icon-chat-dot-round"
                  @click="isShowReply(reply._id, reply.username)"
                  >回复</i
                >
                <i
                  class="el-icon-delete"
                  @click="deleteCommentc(item._id, reply._id)"
                  v-if="murmur === reply.murmur"
                  >删除</i
                >
              </div>
              <div class="reply-comment" v-show="isShow === reply._id">
                <el-input
                  placeholder="请输入最多150字的评论...."
                  v-model="replyContext"
                  :maxlength="150"
                >
                </el-input>
                <el-button
                  type="info"
                  size="mini"
                  class="reply-button"
                  @click="addComment(item._id, reply._id)"
                  >回复</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 页码 -->
    <div class="pagenation">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="10"
        :hide-on-single-page="true"
        :page-size="pageSize"
      >
      </el-pagination>
    </div>
    <!-- 暂无评论的空状态 -->
    <el-empty
      description="暂无评论，期待您的评论"
      v-show="comment.length === 0"
    ></el-empty>
  </div>
</template>
<script>
export default {
  props: {
    blogId: {
      type: String,
    },
  },
  data() {
    return {
      comment: [], // 获取得到的评论
      context: "", // 评论内容
      replyContext: "", //一级评论回复
      // Reply: '',// 次级评论回复
      isFirCom: "", //是否显示一级回复框
      isShow: "", //是否显示次级回复框
      pageSize: 11,
      isClickId: "",
      replyName: "",
      murmur: localStorage.getItem("browserId"),
    };
  },
  // watch: {
  //   // 监听到父组件传递过来的数据后，加工一下，
  //   // 存到data中去，然后在页面上使用
  //   blogId(newvalue, oldvalue) {
  //     if (newvalue !== oldvalue) {
  //       this.getComment();
  //     }
  //   },
  // },
  // created(){

  // },
  mounted() {
    this.getCommentList();
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    // 获取本篇文章所有评论
    async getCommentList() {
      const res = await this.$api.getComments({ id: this.blogId });
      this.comment = res.data;
    },
    // 评论点赞
    async giveALike(replyId, _id) {
      let res = null;
      if (replyId) {
        if (
          this.comment
            .find((item) => item._id === _id)
            .replyInfo.find((item) => item._id === replyId)
            .favour.includes(this.murmur)
        ) {
          alert("您已经点过赞了！");
          return;
        }
        res = await this.$api.addsecondfavour({
          replyId,
          _id,
          favourMurmur: this.murmur,
        });
      } else {
        if (
          this.comment
            .find((item) => item._id === _id)
            .favour.includes(this.murmur)
        ) {
          alert("您已经点过赞了！");
          return;
        }
        res = await this.$api.addfirstfavour({
          _id,
          favourMurmur: this.murmur,
        });
      }
      this.getCommentList();
    },
    // // 一级评论点赞
    // async giveALikeForFirst(replyId,_id) {
    //   this.comment = res.data;
    //   console.log(this.comment)
    //   console.log(this.blogId, res)
    // },
    isShowReply(id, name) {
      if (id) {
        this.isShow = id;
        if (this.isClickId === this.isShow) {
          this.isShow = "";
        } else {
          this.isShow = id;
        }
        this.isClickId = this.isShow;
        this.replyName = name;
      } else {
        this.isShow = this.isClickId = "";
      }
    },
    async deleteCommentc(_id, replyId) {
      let res = null;
      if (replyId) res = await this.$api.deletesecondcomment({ replyId, _id });
      else res = await this.$api.deletefirstcomment({ _id });
      this.getCommentList();
    },
    async addComment(id, replyId) {
      let res = null;
      let username = "123";
      if (replyId) {
        res = await this.$api.addsecondcomment({
          _id: id,
          replyId,
          reply: this.replyContext,
          replyname: this.replyName,
          username,
          murmur: this.murmur,
        });
        this.replyContext = "";
      } else {
        res = await this.$api.addfirstcomment({
          articleId: id,
          username,
          content: this.context,
          murmur: this.murmur,
        });
        this.context = "";
      }
      this.isShow = this.isClickId = this.replyName = "";
      this.getCommentList();
    },
  },
};
</script>

<style lang="less" scoped>
.comment {
  min-height: 26vh;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  margin-top: 2px;
  overflow: hidden;
  .comment-header {
    height: 50px;
    padding: 10px 5px;
    display: flex;
    align-items: center;
    background-color: rgb(247, 246, 246);
    .input-with-select {
      margin-left: 10px;
      margin-right: 20px;
      flex: 1;
    }
  }
  .comment-body {
    min-height: 70px;
    padding: 10px 20px;
    font-size: 14px;
    .first-comment {
      display: flex;
      i {
        margin-right: 5px;
        margin-left: 15px;
        cursor: pointer;
        &:nth-child(3) {
          color: red;
        }
      }
      .content {
        margin-left: 10px;
        position: relative;
        flex: 1;
        & > span {
          font-size: 12px;
          color: rgb(130, 129, 129);
        }
        .comment-right {
          position: absolute;
          right: 0;
          top: 0;
        }
        .reply-comment {
          height: 60px;
          display: flex;
          align-items: center;
          .reply-button {
            margin-left: 20px;
            height: 35px;
          }
        }
        .second-comment {
          display: flex;
          padding: 10px 0 10px 5px;
          background-color: rgb(248, 246, 246);
          border-radius: 20px;
          .to_reply {
            color: rgb(126, 127, 128);
          }
        }
      }
    }
  }
  .pagenation {
    float: right;
    margin-top: 10px;
    margin-bottom: 20px;
  }
}
</style>
