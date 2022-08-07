<template>
  <div id="app">
    <Header></Header>
    <div id="mainContainer">
      <Slideshow></Slideshow>
      <Nav></Nav>
      <div class="main-content">
        <router-view></router-view>
      </div>
      <SiderInfo />
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import SiderInfo from "@/components/SiderInfo.vue";
import Header from "@/components/Header.vue";
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
import Slideshow from "@/components/Slideshow.vue";
import { createFingerprint } from "@/util";
import Fingerprint2 from "fingerprintjs2";
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      input3: "",
    };
  },
  components: {
    SiderInfo,
    Header,
    Nav,
    Footer,
    Slideshow,
  },
  mounted() {
    this.createBrowseID();
  },
  methods: {
    // 创建浏览ID
    createBrowseID() {
      // 如果未创建
      if (!localStorage.getItem("browserId")) {
        createFingerprint();
      }
    },
  },
};
</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
}

#mainContainer {
  background: url("@/assets/img/meinv.jpg") no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  width: 100%;
  margin-top: 60px;
  box-sizing: border-box;
  padding-left: 10%;
  padding-right: 10%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .main-content {
    flex: 1;
    background-color: rgba(255, 255, 255, 0.7);
    margin-top: 5px;
    margin-bottom: 10px;
    border-radius: 5px;
    min-height: 100vh;
  }
}

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 5px;
  scrollbar-arrow-color: red;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
  scrollbar-arrow-color: red;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 0;
  background: rgba(0, 0, 0, 0);
}
</style>
