<template>
  <div id="app" :class="isLight ? 'moon' : 'night'">
    <Header />
    <Slideshow></Slideshow>
    <div id="mainContainer">
      <Nav></Nav>
      <router-view class="main-box" :style="`${color};${mainBg}`"></router-view>
      <SiderInfo />
    </div>
    <Footer />
    <SwitchBar />
  </div>
</template>
<script>
import SiderInfo from "@/components/SiderInfo.vue";
import Header from "@/components/Header.vue";
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
import Slideshow from "@/components/Slideshow.vue";
import { createFingerprint } from "@/util";
import clickSpecialEffect from "@/util/clickSpecialEffect";
import bgSpecialEffect from "@/util/bgSpecialEffect";
import SwitchBar from "@/components/Switch.vue";
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      isLight: (state) => state.theme.isLight,
    }),
    ...mapGetters(["color", "infoBgColor", "mainBg"]),
  },
  components: {
    SiderInfo,
    Header,
    Nav,
    Footer,
    Slideshow,
    SwitchBar,
  },
  created() {
    // 取指纹操作
    if (!localStorage.getItem("browserId")) {
      createFingerprint();
    }
  },
  mounted() {
    // 点击特效
    clickSpecialEffect();
    // 背景特效
    bgSpecialEffect();
  },
};
</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
  // font-family: 'JBHGXK';
}
body {
  overflow: auto;
}
#app {
  background-size: 100% 100%;
  background-attachment: fixed;
}
#mainContainer {
  box-sizing: border-box;
  padding-left: 10vw;
  padding-right: 10vw;
  display: flex;
  // flex-wrap: wrap;
  justify-content: space-between;
  color: #000;
  .main-box {
    width: calc(63vw - 265px);
    margin-top: 5px;
    margin-bottom: 10px;
    border-radius: 5px;
    min-height: 100vh;
    transition: 0.6s;
  }
}

.moon {
  background: url("@/assets/img/lightBg.png") no-repeat;
}

.night {
  background: url("@/assets/img/nightBg.jpg") no-repeat;
}

@media screen and (max-width: 768px) {
  #mainContainer {
    padding-left: 1vw;
    padding-right: 1vw;
  }
  .main-box {
    width: calc(70vw - 265px);
  }
}
@media screen and (max-width: 1000px) {
  #nav-box {
    width: 8vw;
  }
}
</style>
