<template>
  <div>
    <mavon-editor v-model="content" ref="md" @change="change" @imgAdd="img"
    style="height: 530px" scrollStyle: true xssOptions:false />
    <button @click="handleClick" class="sub">保存</button>
    <el-dialog title="发布文章" :visible.sync="dialogFormVisible" center>
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章类型" :label-width="formLabelWidth">
          <div class="block">
            <span class="demonstration"></span>
            <el-cascader
              placeholder="搜索"
              :options="options"
              filterable
              v-model="classification"
            ></el-cascader>
          </div>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.digest" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否发布" :label-width="formLabelWidth">
          <el-switch v-model="state" active-text="发布"> </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImg } from "../api/test";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { getClassifies } from "../util";
export default {
  components: {
    mavonEditor,
  },
  data() {
    return {
      dialogFormVisible: false, //控制是否显示弹出框
      form: {
        // 弹出框双向绑定数据
        title: "",
        digest: "",
      },
      formLabelWidth: "120px", // 弹出框输入框的长度
      classification: [], //分类
      content: "", // 文章内容
      html: "", // 渲染的html内容
      // configs: {},//
      state: false, //文章是否发布
      // 专栏列表数据
      options: [
        {
          // 专栏下拉框数据
          value: "suibi",
          label: "随笔",
        },
      ],
    };
  },
  // computed: {
  //   ...mapState({
  //       // article : state => state.article.article || {}
  //   })
  // },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    async img(pos, file) {
      let _this = this;
      const formData = new FormData();
      formData.append("file", file);
      // console.log(formData);
      // console.log(pos);
      // console.log(file);
      // console.log(formData.get("file"));
      let res = await uploadImg(formData);
      if (res.status === 200) {
        _this.$refs.md.$img2Url(pos, res.url);
      }
      console.log(res);
      console.log(res);
    },
    async imgAdd(pos, $file) {
      //上传图片
      let $vm = this.$refs.md;
      const formData = new FormData();

      // 压缩图片
      if ($file.type.indexOf("image") === 0) {
        let reader = new FileReader(),
          img = new Image();
        reader.readAsDataURL($file);
        reader.onload = function (e) {
          img.src = e.target.result;
        };
        img.onload = async function () {
          // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
          let canvas = document.createElement("canvas");
          let context = canvas.getContext("2d");

          // 图片原始尺寸
          let originWidth = this.width;
          let originHeight = this.height;

          // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
          let maxWidth = 800,
            maxHeight = 800;
          // 目标尺寸
          let targetWidth = originWidth,
            targetHeight = originHeight;
          // 图片尺寸超过800x800的限制
          if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > maxWidth / maxHeight) {
              // 更宽，按照宽度限定尺寸
              targetWidth = maxWidth;
              targetHeight = Math.round(
                maxWidth * (originHeight / originWidth)
              );
            } else {
              targetHeight = maxHeight;
              targetWidth = Math.round(
                maxHeight * (originWidth / originHeight)
              );
            }
          }
          // canvas对图片进行缩放
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          // 清除画布
          context.clearRect(0, 0, targetWidth, targetHeight);
          // 图片压缩
          context.drawImage(img, 0, 0, targetWidth, targetHeight);
          /*第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高*/

          //压缩后的图片转base64 url
          /*canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/png';
           * qualityArgument表示导出的图片质量，只有导出为jpeg和webp格式的时候此参数才有效，默认值是0.92*/
          let newUrl = canvas.toDataURL("image/jpeg", 0.6); //base64 格式

          // base64 转 blob 再转 file
          let arr = newUrl.split(","),
            mime = arr[0].match(/:(.*?);/)[1], // 去掉url的头，并转化为byte
            bstr = atob(arr[1]), // 处理异常,将ascii码小于0的转换为大于0
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          // 转blob
          let filename = Date.parse(new Date()) + ".jpeg";
          // 转file
          let file = new File([u8arr], filename, { type: mime });

          // 将图片上传到服务器
          formData.append("file", file);
          await axios.post("/uploadImg", formData, {
            onUploadProgress: (progressEvent) => {
              var percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              this.percentCompleted = percentCompleted;
            },
          });
          // uploadImg(formData).then(res => {
          //   $vm.$img2Url(pos, res.data)
          // })
          // axios({
          //   url: 'http://localhost:9090/file/upload',
          //   method: 'post',
          //   data: formData,
          //   headers: {'Content-Type': 'multipart/form-data'},
          // }).then((res) => {
          //   // 将返回的url替换到文本原位置![...](./0) -> ![...](url)
          //   $vm.$img2Url(pos, res.data)
          // })
          console.log(this.$api);
        };
      }
    },
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },
    // 提交
    handleClick() {
      // console.log(this.content);
      // console.log(this.html);
      // console.log(this.configs);

      this.dialogFormVisible = true;
      // this.$store.dispatch('addArticle', this.html);
    },
    async submit() {
      let data = {
        title: this.form.title,
        classification: this.classification,
        digest: this.form.digest,
        state: this.state,
        content: this.content,
      };

      let result;
      let { type } = this.$route.query;
      // 判断是添加到随笔还是博客
      console.log(this.classification);
      if (type === "jotting" || this.classification[0] === "suibi") {
        delete data.classification;
        result = await this.$store.dispatch("addJotting", data);
      } else if (type === "blog" || this.classification[0] !== "suibi") {
        result = await this.$store.dispatch("addArticle", data);
      }
      console.log(result);
      if (result === "ok") {
        // 修改成功后清空值
        this.form.username = "";
        this.form.password = "";
        this.form.email = "";
        this.dialogFormVisible = false;
        if (type === "blog" || this.classification[0] !== "suibi")
          this.$router.push("/admin/article");
        else this.$router.push("/admin/jottings");
      } else {
        alert(result);
      }
    },
    init() {
      let { type } = this.$route.query;
      let article = {};
      if (type) {
        if (type === "blog") {
          article = this.$store.state.article.article;
          // this.change();
        } else {
          article = this.$store.state.jotting.jotting;
        }
        this.classification = article.classification;
        this.content = article.content;
        this.state = article.state;
        this.form.title = article.title;
        this.form.digest = article.digest;
      }
    },
  },
  mounted() {
    // 从session中获得专栏列表
    let classifies = getClassifies();
    // 循环添加到
    for (let c of classifies) {
      let value = c._id;
      let label = c.title;
      this.options.push({ value: value, label: label });
    }
    this.init();
  },
};
</script>

<style scoped>
button {
  width: 100px;
  height: 30px;
  margin-top: 10px;
  box-shadow: 4px 4px 10px #888888;
  border-radius: 5%;
  border: 0;
}
.save {
  background-color: rgb(221, 216, 216);
  margin-right: 60px;
}
.sub {
  background-color: rgb(179, 192, 209);
}
</style>