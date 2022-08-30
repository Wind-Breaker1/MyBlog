<template>
  <div class="photo-box">
    <el-button type="primary" size="mini" @click="popdrawer()" class="sub">添加照片</el-button>
    <el-table height="250" border style="width: 100%" :data="photos">
      <el-table-column prop="shootingTime" label="拍摄日期" min-width="60">
      </el-table-column>
      <el-table-column prop="uploadTime" label="上传日期" min-width="60">
      </el-table-column>
      <el-table-column prop="digest" label="照片描述" min-width="180">
      </el-table-column>
      <el-table-column prop="address" label="照片" width="90">
        <template slot-scope="scope">
          <el-image fit="contain" :src="scope.row.photoUrl">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="80">
						<template slot-scope="scope" >
							<el-button size="mini" @click="Edit(scope.row)">编辑</el-button>
							<el-button size="mini" type="danger" @click="deleteItem(scope.row)">删除</el-button>
						</template>
					</el-table-column>
    </el-table>
    <el-drawer :title="dialogTitle" :visible.sync="dialogShow" direction="rtl" custom-class="demo-drawer" ref="drawer">
      <el-form :model="form">
        <el-form-item label="拍摄时间" :label-width="formLabelWidth">
          <el-date-picker v-model="form.shootingTime" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="描述信息" :label-width="formLabelWidth">
          <el-input v-model="form.digest" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择图片" :label-width="formLabelWidth" v-show="dialogTitle == '上传图片'">
          <div @click="handleClick">
            上传
            <input type="file" style="display: none;" ref="img" />
          </div>
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="submit" :loading="loading">{{  loading ? '提交中 ...' : '确 定'  }}</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { getPhotos, updatePhotos, deletePhoto, addPhoto } from '@/api/api'
import { toBolb, pressImg } from '@/util'
export default {
  data() {
    return {
      photos: [],
      dialogShow: false,
      loading: false,
      dialogTitle: '上传图片',
      form: {
        _id: '',
        shootingTime: '',
        digest: '',
      },
      formLabelWidth: '80px',
    }
  },
  mounted() {
    this.getPhotos();
  },
  methods: {
    async getPhotos() {
      const res = await getPhotos();
      if (res.status == 200) {
        this.photos = res.data;
      } else {
        this.$message.error(res.msg);
      }
    },
    Edit(item){
      this.dialogShow = true;
      this.dialogTitle = '编辑图片信息';
      this.form.shootingTime = item.shootingTime;
      this.form.digest = item.digest;
      this.form._id = item._id;
    },
    
    async deleteItem(item) {
      const res = await deletePhoto({_id:item._id});
      if (res.status == 200) {
        this.$message.success(res.msg);
      }
    },
    async submit() {
      let res = null;
      if (this.dialogTitle == '上传图片') {
        const maxSize = 2 * 1024 * 1024;
        const file = Array.prototype.slice.call(this.$refs.img.files)[0];
        const render = new FileReader();
        render.readAsDataURL(file);
        render.onload = async e => {
          let blob = null;
          if (file.size > maxSize) {
            let img = new Image();
            img.src = e.target.result;
            img.onload = async () => {
              const data = pressImg(img);
              if (data.length > maxSize) {
                this.$message.error('上传图片过大');
              } else {
                blob = toBolb(data, 'image/jpeg', file.name);
                const formdata = new FormData();
                formdata.append('photo', blob);
                formdata.append('digest', this.form.digest);
                formdata.append('shootingTime', this.form.shootingTime);
                res = await addPhoto(formdata);
                this.avatarUrl = res.avatarUrl;
              }
            };
          } else {
            blob = toBolb(e.target.result, file.type, file.name);
            const formdata = new FormData();
            formdata.append('photo', blob);
            formdata.append('digest', this.form.digest);
            formdata.append('shootingTime', this.form.shootingTime);
            res = await addPhoto(formdata);
            this.avatarUrl = res.avatarUrl;
          }
        }
      } else {
        res = await updatePhotos(this.form);
      }
      if (res.status == 200) {
        this.dialogShow = false;
        // this.
      }
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
    },
    // 上传图片弹出右边抽屉
    popdrawer() {
      this.dialogShow = true;
      this.dialogTitle = '上传图片';
    },
    handleClick() {
      this.$refs.img.click();
      console.log('123');
    }
  }
};
</script>
<style lang="less" scoped>
.photo-box {
  margin: 1vw;
  padding: 1vh;
  background-color: #323232;
  border-radius: 5px;
}
</style>
