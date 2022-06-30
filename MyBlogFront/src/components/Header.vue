<template>
  <div id="header">
    <div class="logo">MYBLOG</div>
    <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  data(){
    return{
      input3: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#header{
  height: 60px;
  background-color: #545c64;
  position: fixed;
  top: 0;
  width: 79vw;
  padding-left: 10vw;
  padding-right: 11vw;
  line-height: 60px;
  z-index: 100;
  .logo{
    color:aliceblue;
    font-size: 50px;
    float: left;
  }
  .input-with-select{
    width: 20vw;
    margin-top: 10px;
    float: right;
  }
 
}
</style>
