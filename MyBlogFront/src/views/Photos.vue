<template>
  <div id="photos">
        <h2 :style="{color: Color}">相册内容</h2>
        <div id="container">
          <div class="card" v-for="(item, index) in PhotoList" :key="index">
            <el-image :src="item.imgsrc[0]" @click="handleToDetail(item.pic_id)"></el-image>
            <h4 :style="{color: Color}">{{item.brief}}</h4>
            <!-- <p>{{item.create_time}}</p> -->
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'about',
    data() {
        return {
            // 页数
            page: 1,
            // 每页数量
            pageSize: 10,
            // 总数
            count: 10,
            // 获取的数组
            PhotoList: []
        }
    },
    computed: {
        Color() {
            return this.$store.state.Color
        }
    },
    mounted() {
        this.getPhotos()
    },
    methods: {
        async getPhotos() {
            try {
                const res = await this.$api.getPhotos()
                console.log(res)
                if (res.code === 200) {
                    // this.$message.success("获取相册成功")
                    res.data.map(item => {
                      item.imgsrc = JSON.parse(item.imgsrc)
                    })
                    this.PhotoList = res.data
                    // console.log(res.data)
                } else {
                    this.$message.error(error)
                }
            } catch (error) {
                this.$message.error(error)
            }
        },
        // 跳转详情页
        handleToDetail (id) {
          this.$router.push(`/photoDetail/${id}`);
        }
    }
}
</script>

<style lang='scss' scoped>
#photos {
  width: 96%;
  margin: 0 auto;
  margin-top: 12px;
  border-radius: 4px;
  // border: 1px solid #EBEEF5;
  position: relative;
  // z-index: 5;
  transition: all 1s;
  padding: 0 15px;
  padding-top: 20px;
  h2{
    margin-left: 15px;
    margin-bottom: 25px;
  }
  #container {
    width: 100%;
    height: 100%;
    column-count: 3;
    .card {
      width: 100%;
      background: rgba($color: #fff, $alpha: 0.2);
      // border: 1px solid #ccc;
      border-radius: 4px;
      break-inside:avoid;
      padding: 8px;
      margin-bottom: 8px;
      box-shadow: 0 5px 10px 3px #ccc;
      ::v-deep img {
      // max-width: 100%;
      cursor: pointer;
    }
  }
  }
  @media screen and (max-width: 1500px){
      #container {
        columns:2 ;
      }
  }
    @media screen and (max-width: 1200px){
      #container {
        columns:2 ;
      }
  }
    @media screen and (max-width: 900px){
      #container {
        columns:2 ;
      }
  }
  header {
    padding-bottom: 32px;
    position: relative;
    span:hover {
      color: lightblue;
    }
  }
}
@media screen and (max-width:992px) {
  #photos{
      width: 100%;
      margin: 0;
  }
}

</style>