<template>
  <div>
    <el-button type="primary" size="mini" @click="popdrawer()" class="sub">添加节点</el-button>
    <el-table :data="photos" class="tabel">
      <el-table-column prop="digest" label="时间" min-width="60"> </el-table-column>
      <el-table-column prop="date" label="标题" min-width="60"> </el-table-column>
      <el-table-column prop="uploadTime" label="摘要" min-width="180"> </el-table-column>
      <el-table-column label="操作" min-width="80">
        <template slot-scope="scope">
          <el-button size="mini" @click="Edit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteItem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer :title="dialogTitle" :visible="dialogShow" direction="rtl" custom-class="drawer" ref="drawer">
      <el-form :model="form">
        <el-form-item label="时间" :label-width="formLabelWidth" :rules="[{ required: true, message: '时间不能为空' }]">
          <el-date-picker v-model="form.date" type="datetime" placeholder="选择日期时间"> </el-date-picker>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.digest" autocomplete="off" max-length="20"></el-input>
        </el-form-item>
        <el-form-item label="摘要" :label-width="formLabelWidth">
          <el-input v-model="form.digest" autocomplete="off" max-length="20"></el-input>
        </el-form-item>
      </el-form>
      <div class="drawer-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="submit" :loading="loading">{{ loading ? "提交中 ..." : "确 定" }}</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { addTimeclue, updateTimeclue, deleteTimeclue, getTimeclues } from "@/api/api";
export default {
  data() {
    return {
      photos: [],
      dialogShow: false,
      loading: false,
      dialogTitle: "添加时间节点",
      form: {
        _id: "",
        date: "",
        title: "",
        digest: "",
      },
      formLabelWidth: "80px",
    };
  },
  mounted() {
    this.getTimeclues();
  },
  methods: {
    async getTimeclues() {
      const res = await getTimeclues();
      if (res.status == 200) {
        this.photos = res.data;
      } else {
        this.$message.error(res.msg);
      }
    },
    Edit(item) {
      this.dialogShow = true;
      this.dialogTitle = "编辑时间节点";
      this.form.date = item.date;
      this.form.title = item.title;
      this.form.digest = item.digest;
      this.form._id = item._id;
    },

    async deleteItem(item) {
      const res = await deleteTimeclue({ _id: item._id });
      if (res.status == 200) {
        this.$message.success(res.msg);
      }
    },
    async submit() {
      let res = null;
      if (this.dialogTitle == "编辑时间节点") {
        res = await updateTimeclue(this.form);
      } else {
        delete this.form._id;
        res = await addTimeclue(this.form);
      }
      if (res.status == 200) {
        this.dialogShow = false;
        // this.
      }
    },
    cancelForm() {
      this.loading = false;
      this.dialogShow = false;
    },
    // 上传图片弹出右边抽屉
    popdrawer() {
      this.dialogShow = true;
      this.dialogTitle = "上传图片";
    },
    handleClick() {
      this.$refs.img.click();
      console.log("123");
    },
  },
};
</script>
<style lang="less" scoped>


  .tabel {
    height: calc(100% - 28px);
  }

  .drawer-footer {
    display: flex;
    justify-content: center;
  }

  .upload {
    width: 80px;
    line-height: 30px;
    margin-top: 5px;
    text-align: center;
    background-color: #409eff;
    color: #ddd;
    border-radius: 5px;

    .img-icon {
      margin-top: 10px;
      margin-right: 5px;
    }
  }

</style>
