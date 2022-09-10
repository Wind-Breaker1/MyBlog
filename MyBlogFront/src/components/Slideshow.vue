<template>
  <div id="slideshow-box" :style="`${color};${mainBg}`">
    <el-carousel
      class="cart-img"
      direction="vertical"
      indicator-position="none"
      height="100%"
    >
      <el-carousel-item v-for="item in slideBg" :key="item">
        <img :src="item" alt="加载失败" />
      </el-carousel-item>
    </el-carousel>
    <div class="info card" :style="`${infoBgColor}`">
      <img :src="infoBgUrl" alt="avatar" />
      <el-avatar :src="avatarUrl" class="avatar" :size="50"></el-avatar>
      <div class="my-name">孤城浪人</div>
      <div class="info-detail">
        <div>
          博客<span>{{ webInfo.blogNums || 0 }}</span>
        </div>
        <div>
          心情<span>{{ webInfo.jottingNums || 0 }}</span>
        </div>
        <div>
          专栏<span>{{ webInfo.classifyNums || 0 }}</span>
        </div>
        <div>
          标签<span>{{ webInfo.tagNums || 0 }}</span>
        </div>
      </div>
    </div>
    <div class="tip">欢迎来到我的小站！</div>
  </div>
</template>
<script>
import slideBgUrl1 from "@/assets/img/slideBg/slideBg1.jpg";
import slideBgUrl3 from "@/assets/img/slideBg/slideBg2.jpg";
import slideBgUrl4 from "@/assets/img/slideBg/slideBg3.jpg";
import infoBgUrl from "@/assets/img/infoBg.jpg";
import avatarUrl from "@/assets/img/avatar.png";
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      // 轮播图背景图片
      slideBg: [slideBgUrl1, slideBgUrl3, slideBgUrl4],
      // 头像地址
      avatarUrl,
      infoBgUrl,
      webInfo: {},
      styleObj: {},
    };
  },
  computed: {
    ...mapState({
      isLight: (state) => state.isLight,
    }),
    ...mapGetters(["color", "infoBgColor", "mainBg"]),
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    // 请求文章数和浏览数
    async getInfo() {
      try {
        const res = await this.$api.getWebInfo();
        if (res.status === 200) {
          this.webInfo = res.data;
        } else {
          this.$message.error("网络出错了,(ノへ￣、)！");
        }
      } catch (err) {
        this.$message.error(err);
      }
    },
  },
};
</script>

<style scoped lang="less">
#slideshow-box {
  height: 45vh;
  width: 80vw;
  margin-left: 10vw;
  margin-top: 50px;
  border-radius: 5px;
  position: relative;
  transition: 0.6s;

  .cart-img {
    height: 42vh;
    border-radius: 5px;
    img {
      height: 100%;
      width: 100%;
    }
  }

  .info {
    position: absolute;
    height: 200px;
    width: 13vw;
    left: 5%;
    bottom: 2%;
    z-index: 5;
    border-radius: 5px;
    transition: 0.6s;

    & > img {
      height: 45%;
      width: 100%;
      border-radius: 5px;
    }

    .avatar {
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
    }
    .my-name {
      margin-top: 20px;
      text-align: center;
      font-size: 20px;
    }
    .info-detail {
      display: flex;
      height: 50px;
      justify-content: space-around;
      align-items: center;
      font-size: 14px;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          margin-top: 5px;
        }
      }
    }
  }
  .tip {
    height: 3vh;
    line-height: 3vh;
    text-align: center;
  }
}
@media screen and (max-width: 1000px) {
  #slideshow-box {
    height: 35vh;
    font-size: 12px;
    .cart-img {
      height: 32vh;
    }
    .info {
      width: 140px;
    }
  }
}
</style>
