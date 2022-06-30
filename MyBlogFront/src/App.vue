<template>
  <div id="app">
    <Header></Header>
    <div id="mainContainer">
      <Slideshow></Slideshow>
      <Nav></Nav>
      <router-view class="router_content"></router-view>
      <SiderInfo />
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import SiderInfo from '@/components/SiderInfo.vue'
import Header from '@/components/Header.vue'
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
import Slideshow from '@/components/Slideshow.vue'
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      input3 :''
    };
  },
  components: {
    SiderInfo,
    Header,
    Nav,
    Footer,
    Slideshow
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
}
</script>
<style lang="less" >
*{
  padding: 0;
  margin: 0;
}

  #mainContainer {
    background: url('@/assets/img/meinv.jpg') no-repeat;
    background-size: 100% 100%;
    background-attachment:fixed;
    width: 100%;
    margin-top: 60px;
    box-sizing: border-box;
    padding-left: 10%;
    padding-right: 10%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
.router_content {
    animation: animate 2s;
}

@keyframes animate {
    0% { opacity: 0; transform: translateY(100px);}
    100% { opacity: 1; transform: translateY(0);}
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px;
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
