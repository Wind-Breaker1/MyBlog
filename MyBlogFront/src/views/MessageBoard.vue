<template>
  <div class="message-box">
    <h2>留言板</h2>
    <Comment keyId="messageBoard"></Comment>
  </div>
</template>

<script>
import Comment from "@/components/Comment.vue";
export default {
  components: {
    Comment,
  },
};
</script>

<style lang="less">
.message-box {
  min-height: 100%;
  padding: 2vw;
  box-sizing: border-box;
  h2 {
    margin: auto;
  }
}
</style>
