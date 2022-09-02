<template>
	<div>
		<el-button type="primary" size="mini" @click="popdrawer()" class="sub">添加照片</el-button>
		<el-table :data="photos" height="calc(100% - 28px)">
			<el-table-column prop="shootingTime" label="拍摄日期" min-width="60"> </el-table-column>
			<el-table-column prop="uploadTime" label="上传日期" min-width="60"> </el-table-column>
			<el-table-column prop="digest" label="照片描述" min-width="180"> </el-table-column>
			<el-table-column prop="address" label="照片" width="80">
				<template slot-scope="scope">
					<el-image fit="contain" :src="scope.row.photoUrl"> </el-image>
				</template>
			</el-table-column>
			<el-table-column label="操作" min-width="80">
				<template slot-scope="scope">
					<el-button size="mini" @click="Edit(scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="deleteItem(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-drawer :title="dialogTitle" :visible="dialogShow" direction="rtl" :show-close="false" @closed="resetForm('form')">
			<el-form :model="form" ref="form" :rules="formRules">
				<el-form-item label="拍摄时间" label-width="80px" prop="shootingTime">
					<el-date-picker v-model="form.shootingTime" type="datetime" placeholder="选择日期时间"> </el-date-picker>
				</el-form-item>
				<el-form-item label="描述信息" label-width="80px" prop="digest">
					<el-input v-model="form.digest" autocomplete="off" max-length="20"></el-input>
				</el-form-item>
			</el-form>
			<div @click="$refs.img.click()" class="choose-img" v-show="dialogTitle == '上传图片'">
				<i class="el-icon-picture img-icon"></i>选择图片
				<input type="file" style="display: none" ref="img" />
			</div>
			<div class="drawer-footer">
				<el-popconfirm title="若您填写了内容，取消后将会清空" @confirm="dialogShow = false" style="margin-right: 10px">
					<el-button slot="reference">取 消</el-button>
				</el-popconfirm>
				<el-button type="primary" @click="submit('form')">确 定</el-button>
				<el-button @click="resetForm('form')">重置</el-button>
			</div>
		</el-drawer>
	</div>
</template>
<script>
import { getPhotos, updatePhotos, deletePhoto, addPhoto } from "@/api/api";
import { toBolb, pressImg } from "@/util";
export default {
	data() {
		return {
			photos: [],
			dialogShow: false,
			dialogTitle: "上传图片",
			form: {
				shootingTime: "",
				digest: "",
			},
			id: "",
			formRules: {
				shootingTime: [{ required: true, message: "请选择该照片的拍摄时间", trigger: "blur" }],
				digest: [
					{ required: true, message: "请输入该照片的描述信息", trigger: "blur" },
					{ min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" },
				],
			},
		};
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
		Edit(item) {
			this.dialogShow = true;
			this.dialogTitle = "编辑图片信息";
			this.form.shootingTime = item.shootingTime;
			this.form.digest = item.digest;
			this.id = item._id;
		},

		async deleteItem(item) {
			const res = await deletePhoto({ _id: item._id });
			if (res.status == 200) {
				this.$message.success(res.msg);
			}
		},
		submit(formName) {
			this.$refs[formName].validate(async valid => {
				if (valid) {
					const file = Array.prototype.slice.call(this.$refs.img.files)[0];
					if (this.dialogTitle == "上传图片" && file) {
						const maxSize = 2 * 1024 * 1024;
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
										this.$message.error("上传图片过大");
									} else {
										blob = toBolb(data, "image/jpeg", file.name);
										this.addAPhoto(blob);
									}
								};
							} else {
								blob = toBolb(e.target.result, file.type, file.name);
								this.addAPhoto(blob);
							}
						};
					} else if (this.dialogTitle == "编辑图片信息") {
						const res = await updatePhotos({ _id: this.id, ...this.form });
						if (res.status == 200) {
							this.dialogShow = false;
							this.$message.success(res.msg);
						}
					} else {
						this.$message.warning("您没有选择图片");
						return false;
					}
				} else {
					this.$message.warning("信息不完整，请注意红色提示");
					return false;
				}
			});
		},
		async addAPhoto(blob) {
			const formdata = new FormData();
			formdata.append("photo", blob);
			formdata.append("digest", this.form.digest);
			formdata.append("shootingTime", this.form.shootingTime);
			const res = await addPhoto(formdata);
			if (res.status == 200) {
				this.dialogShow = false;
				this.$message.success(res.msg);
			}
		},
		// 重置表单数据
		resetForm(formName) {
			this.id = "";
			this.form.shootingTime = "";
			this.form.digest = "";
			this.$refs[formName].clearValidate();
		},
		// 上传图片弹出右边抽屉
		popdrawer() {
			this.dialogShow = true;
			this.dialogTitle = "上传图片";
		},
	},
};
</script>
<style lang="less" scoped>
.choose-img {
	width: 120px;
	line-height: 30px;
	margin: 5px 0 20px 20%;
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
