<template>
  <div>
    <el-table :data="userList" style="width: 100%" height="530px">
      <i class="add"></i>
      <el-table-column label="注册日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="email" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row) " v-has>编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" v-has>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" center>
  <el-form :model="form" >
    <el-form-item v-if="flag" label="用户名" :label-width="formLabelWidth">
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item  :label="lable" :label-width="formLabelWidth">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item v-if="flag" label="email" :label-width="formLabelWidth">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </div>
</el-dialog>
    <button @click="register" class="addUser">添加用户</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      // element-ui弹出框数据
        dialogFormVisible: false,
        form: {
          username: '',
          password: '',
          email: '',
        },
        formLabelWidth: '120px',
        dialogFormVisible: false,
        title:"",
        lable:"",
        flag:true,
        email:""
    }
  },
  computed: {
    ...mapState({
      userList: (state) => state.user.userList || []
    }),
  },
  mounted() {
    //获取个人购物车数据
    this.getData();
  },
  methods: {
    // 改密码
    handleEdit(index, row) {
      this.title = "修改密码";
      this.lable = "新密码";
      this.flag = false;
      this.dialogFormVisible = true;
      // 获取点击行的email
      this.email = row.email;
    },
    // 删除
    handleDelete(index, row) {
      // 删除用户
      this.$store.dispatch("deleteUser", { email: row.email });
      this.getData();
    },
    // 获取数据
    getData(){
      this.$store.dispatch('getUserList');
    },
    // 提交数据
    async submit() {
      let result;
      if (this.flag) {
        // 注册请求接口
        result = await this.$store.dispatch("register", this.form);
      } else {
        // 修改密码请求接口
        let password = this.form.password;
        result = await this.$store.dispatch("updatePassword", {email: this.email, password});
      }
      if (result === "ok") {
        // 修改成功后清空值
        this.form.username = '';
        this.form.password = '';
        this.form.email = '';
        this.dialogFormVisible = false;
        this.getData();
      } else {
        alert(result.msg)
      }
    },
    // 注册
    register() {
      this.title = "修改密码";
      this.lable = "密码";
      this.flag = true;
      this.dialogFormVisible = true;
    },
    
  },
};
</script>

<style scoped>
.addUser{
  width:100px;
  height: 30px;
  margin-top: 10px;
  box-shadow: 4px 4px 10px #888888;
  border-radius: 5%;
  border: 0;


}
</style>