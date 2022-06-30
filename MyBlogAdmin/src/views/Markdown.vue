<template>
  <div>
    <mavon-editor
    v-model="content"
      ref="md"
      @change="change"
      style="height: 530px"
      scrollStyle: true
      xssOptions:false
    />
    <button @click="handleClick" class="sub">保存</button>
     <el-dialog title="发布文章" :visible.sync="dialogFormVisible" center>
  <el-form :model="form" >
    <el-form-item label="标题" :label-width="formLabelWidth">
      <el-input v-model="form.title" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item  label="文章类型" :label-width="formLabelWidth">
      <div class="block">
  <span class="demonstration" ></span>
  <el-cascader
    placeholder="试试搜索：指南"
    :options="options"
    filterable  v-model="classification"></el-cascader>
</div>
    </el-form-item>
    <el-form-item label="描述" :label-width="formLabelWidth">
      <el-input v-model="form.digest" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="是否发布" :label-width="formLabelWidth">
      <el-switch
  v-model="state"
  active-text="发布"
  >
</el-switch>
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
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { getClassifies } from '../util'
import {mapState} from 'vuex';
export default {
  name: "",
  props: [],
  components: {
    mavonEditor,
  },
  data() {
    return {
      dialogFormVisible: false,
        form: {
          title: '',
          digest: '',
        },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      classification: "",
      content: "",
      html: "",
      configs: {},
      state: false,
      // 专栏列表数据
      options: [{
          value: 'suibi',
          label: '随笔',
        }]
    }
  },
  computed: {
    ...mapState({
        art : state => state.article.art || null
      })
  },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append("file", $file);
      //将下面上传接口替换为你自己的服务器接口
      axios({
        url: "/common/upload",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(url => {
        this.$refs.md.$img2Url(pos, url);
      });
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
        classification: this.classification[0],
        digest: this.form.digest,
        state: this.state,
        content: this.html
      }
      
      let result;
      // 判断是添加到随笔还是博客
      if (this.classification[0] === 'suibi'){
        data.classification = null;
        result = await this.$store.dispatch('addJotting', data);
        // console.log(data)
      } else {
        result = await this.$store.dispatch('addArticle', data);
        // console.log(1111)
      }
      if (result === "ok") {
        // 修改成功后清空值
        this.form.username = '';
        this.form.password = '';
        this.form.email = '';
        this.dialogFormVisible = false;
        // this.$router.push('/admin/article')
      } else {
        alert(result)
      }
    },
    init() {
      
      if (this.art) {
        this.classification = this.art.classification;
        this.content = this.art.content;
        this.state = this.art.state;
        this.form.title = this.art.title;
        this.form.digest = this.art.digest;
        // this.change();
      }
    }
  },
  mounted() {
    // 从session中获得专栏列表
    let classifies = getClassifies();
    // 循环添加到
    for (let c of classifies) {
      let value = c._id;
      let label = c.title;
      this.options.push({value:value, label:label});
    }
    this.init();
  },
};
</script>

<style scoped>
button{
  width:100px;
  height: 30px;
  margin-top: 10px;
  box-shadow: 4px 4px 10px #888888;
  border-radius: 5%;
  border: 0;

}
.save{
  background-color: rgb(221, 216, 216);
  margin-right: 60px;
}
.sub{
  background-color: rgb(179,192,209);
}
</style>