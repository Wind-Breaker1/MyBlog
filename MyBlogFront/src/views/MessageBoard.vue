<template>
  <div class="message-box">
    <div class="tip-box">
      <h2>留言板</h2>
      <p>欢迎您访问我的博客，我是面谱人生，一名零零后程序猿。</p>
      <br />
      <p>
        回首过去却是一片模糊，似乎有过意难平，似乎弄丢了一些人，似乎...还有很多很多有意思的事，再也记不起来了，就好像这些经历属于带面具的我，不属于我，
        留给我的只是一堆遗憾罢了。
      </p>
      <br />
      <p>
        现在，在这稍纵即逝的青春的尾巴上，尽管我被生活裹挟着向梦想的远方疾驰，却依然希望能够留下些沿途的风景，这才有了在这个博客。
      </p>
      <br />
      <p>
        我在这里记录人生片段，你也可以留下你的真情实感，我相信这些片段因为有你更加精彩！
      </p>
    </div>
    <transition name="el-zoom-in-top">
      <Comment
        keyId="messageBoard"
        emptyText="期待您的留言！"
        buttonText="留言"
        :contentLength="200"
        placeholderText="请输入最多200字的留言..."
        v-show="show"
      ></Comment>
    </transition>
  </div>
</template>

<script>
import Comment from "@/components/Comment.vue";
export default {
  components: {
    Comment,
  },
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 150);
  },
};
</script>

<style lang="less">
.message-box {
  min-height: 100%;
  width: 100%;
  padding: 2%;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 5px;
  .tip-box {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
    padding: 2%;
    font-size: 18px;
  }
  h2 {
    text-align: center;
    margin-bottom: 5%;
  }
}
</style>
