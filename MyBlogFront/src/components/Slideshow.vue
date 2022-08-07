<template>
  <div id="slideshow">
    <el-carousel height="40vh" direction="vertical" indicator-position="none">
      <el-carousel-item v-for="item in slideBg" :key="item">
        <img :src="item" alt="" />
      </el-carousel-item>
    </el-carousel>
    <div class="info">
      <div class="info-front">
        <img :src="infoUrl" alt="头像" />
        <!-- <div class="infodesc"></div> -->
      </div>
      <div class="info-back">
        <div>
          <img :src="infoUrl" alt="" />
          <el-avatar :src="infoUrl" class="user-img"></el-avatar>
        </div>
        <div>
          <span
            >文章总数:<span style="font-weight: 1000; margin-left: 3px">{{
              count
            }}</span></span
          >
          <!-- <span>浏览量:<span style="font-weight:1000;margin-left: 3px;">55</span></span> -->
        </div>
      </div>
    </div>
    <span class="tip">欢迎来到我的小站！</span>
  </div>
</template>
<script>
import slideBgUrl1 from "@/assets/img/slideBg/slidebg1.jpg";
import slideBgUrl2 from "@/assets/img/slideBg/slidebg2.jpg";
import slideBgUrl3 from "@/assets/img/slideBg/slidebg3.jpg";
import slideBgUrl4 from "@/assets/img/slideBg/slidebg4.jpg";
import infoUrl from "@/assets/img/girl.jpg";
export default {
  data() {
    return {
      // 轮播图背景图片
      slideBg: [slideBgUrl1, slideBgUrl2, slideBgUrl3, slideBgUrl4],
      // 头像地址
      infoUrl,
      count: 0,
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    // 请求文章数和浏览数
    async getInfo() {
      try {
        let res = await this.$api.getWebInfo();
        if (res.status === 200) {
          this.count = res.count;
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
#slideshow {
  height: 45vh;
  width: 100%;
  margin-top: 5px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.7);
  position: relative;
  .info-back {
    transform: rotateX(180deg);
    background-color: white;
    & > div:nth-child(1) {
      height: 50%;
      .user-img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    & > div:nth-child(2) {
      height: 50%;
      font-size: 12px;
      display: flex;
      justify-content: center;
      span {
        margin-top: 25%;
        text-align: center;
      }
    }
  }

  .info-front,
  .info-back {
    height: 150px;
    width: 150px;
    position: absolute;
    left: 5vw;
    bottom: 1vh;
    z-index: 90;
    transition: all 1s ease-in-out;
    border-radius: 5px;
    backface-visibility: hidden;
    // .infodesc{
    //   height: 150px;
    //   width: 150px;
    //   background: white;
    // }

    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  .info:hover .info-front {
    transform: rotateX(180deg);
  }
  .info:hover .info-back {
    transform: rotateX(0deg);
  }
  .tip {
    line-height: 5vh;
    display: block;
    text-align: center;
  }
  .el-carousel__item {
    border-radius: 5px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
