<template>
<div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      label="提交日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="title" label="标题" width="250"> </el-table-column>
    <el-table-column prop="digest" label="专栏描述" width="500"> </el-table-column>
    <el-table-column prop="articleNum" label="博客数量" width="100"> </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
          
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" center>
  <el-form :model="form" >
    <el-form-item label="专栏名" :label-width="formLabelWidth">
      <el-input v-model="form.title" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="描述" :label-width="formLabelWidth">
      <el-input v-model="form.digest" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </div>
</el-dialog>
    <button @click="addClassify" class="add">添加专栏</button>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
      return {
        dialogFormVisible: false,
        form: {
          title: "",
          digest: ""
        },
        formLabelWidth: '120px',
        dialogFormVisible: false,
        _id: '',
        dialogTitle: ''
      }
    },
    computed: {
      ...mapState({
        tableData: state => state.classify.classifies || [],
      })
    },
    mounted() {
      this.getData();
    },
    methods: {
      // 修改数据
      handleEdit(row) {
        this.dialogTitle = "编辑专栏";
        this.dialogFormVisible = true;
        this.form.title = row.title;
        this.form.digest = row.digest;
        // 获取点击行的email
        this._id = row._id;
      },
      // 删除数据
      handleDelete(row) {
        this.$store.dispatch('deleteClassify',{_id: row._id});
        this.getData();
      },
      // 获取数据
      getData() {
        this.$store.dispatch('getClassifyList')
      },
      
      // 提交数据
      async submit() {
        let result;
        if (this._id)
          result = await this.$store.dispatch("compile", {_id: this._id, title: this.form.title, digest: this.form.digest});
        else {
          result = await this.$store.dispatch("addclassify", {title: this.form.title, digest: this.form.digest});
        }
        console.log(result)
        if (result.status === 200) {
          // 修改成功后清空值
          this.form.title = '';
          this.form.digest = '';
          this._id = '';
          this.dialogFormVisible = false;
          this.getData();
        } else {
          alert(result.msg)
        }
        this._id = '';
      },
      // 增加专栏
      addClassify() {
        this.dialogTitle = "新增专栏";
        this.dialogFormVisible = true;
      },
    }
};
</script>

<style scoped>
.add{
  width:100px;
  height: 30px;
  margin-top: 10px;
  box-shadow: 4px 4px 10px #888888;
  border-radius: 5%;
  border: 0;
}
/* .el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 100px;
} */

.el-aside {
  background-color: rgb(84, 92, 100);
  color: #333;
  text-align: center;
  line-height: 1000vh;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 100%;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>