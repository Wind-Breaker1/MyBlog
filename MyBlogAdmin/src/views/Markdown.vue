<template>
	<div class="markdown-box">
		<mavon-editor v-model="article.content" ref="md" @imgAdd="imgAdd" class="markdown" scrollStyle xssOptions />
		<button @click="dialogVisible = true" class="sub">保存</button>
		<el-dialog title="发布文章" :visible.sync="dialogVisible" center>
			<el-form :model="article" ref="form" :rules="formRules">
				<el-form-item label="标题" :label-width="formLabelWidth" prop="title">
					<el-input v-model="article.title" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="文章类型" :label-width="formLabelWidth" v-if="!type" prop="classification">
					<el-select placeholder="请选择文章类型" filterable v-model="article.classification">
						<el-option v-for="item in classifyOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="书签" :label-width="formLabelWidth" prop="tags">
					<el-select multiple placeholder="请选择文章标签" default-first-option filterable v-model="article.tags">
						<el-option v-for="item in tagsOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="摘要" :label-width="formLabelWidth" prop="digest">
					<el-input v-model="article.digest" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="是否发布" :label-width="formLabelWidth" v-if="!type">
					<el-switch v-model="article.state" active-text="发布"> </el-switch>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="submit('form')">确 定</el-button>
				<el-button type="warn" @click="resetForm('form')">重置</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { uploadImg } from "../api/api";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { getClassifyList } from "../util";
import { mapGetters } from "vuex";
export default {
	components: {
		mavonEditor,
	},
	data() {
		return {
			dialogVisible: false, //控制是否显示弹出框
			formLabelWidth: "120px", // 弹出框输入框的长度
			// 专栏列表数据
			classifyOptions: [
				{
					// 专栏下拉框数据
					value: "suibi",
					label: "随笔",
				},
			],
			tagsOptions: [],
			article: {
				title: "",
				classification: "",
				digest: "",
				state: false,
				content: "",
				tags: [],
			},
			type: this.$route.query.type,
			formRules: {
				digest: [
					{ required: true, message: "请输入文章摘要", trigger: "blur" },
					{ min: 10, max: 50, message: "长度在 10 到 50 个字符", trigger: ["blur", "change"] },
				],
				title: [
					{ required: true, message: "请输入标题", trigger: "blur" },
					{ min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
				],
				tags: [{ required: true, message: "请选择书签", trigger: "blur" }],
				classification: [{ required: true, message: "请选择书签", trigger: "blur" }],
			},
		};
	},
	computed: {
		...mapGetters(["classifies", "tags"]),
	},
	methods: {
		// 将图片上传到服务器，返回地址替换到md中
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
					img.src = e.target.res;
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
							targetHeight = Math.round(maxWidth * (originHeight / originWidth));
						} else {
							targetHeight = maxHeight;
							targetWidth = Math.round(maxHeight * (originWidth / originHeight));
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
					let filename = Date.parse(new Date());
					// 转file
					let file = new File([u8arr], filename, { type: mime });
					// 将图片上传到服务器
					formData.append("artimg", file);
					let res = await uploadImg(formData);
					if (res.status === 200) {
						$vm.$img2Url(pos, res.artimgUrl);
					}
				};
			}
		},
		async submit(formName) {
			const { title, digest, content, tags, state, classification, _id } = this.article;
			this.$refs[formName].validate(async valid => {
				if (valid && this.article.content) {
					// 验证信息是否完整
					let res;
					// 判断是更新博客还是心情
					if (this.type === "jotting") {
						if (!_id) {
							this.$message.warning("哎呀，出错了！请重新编辑");
							this.$router.push("/admin/article");
						}
						const data = { title, digest, content, tags, _id };
						res = await this.$store.dispatch("updateJotting", data);
					} else if (this.type === "blog") {
						if (!_id) {
							this.$message.warning("哎呀，出错了！请重新编辑");
							this.$router.push("/admin/article");
						}
						const data = { title, digest, content, tags, _id };
						res = await this.$store.dispatch("updateBlog", data);
					}
					// 判断是添加到心情还是博客
					if (!this.type && this.article.classification === "suibi") {
						const data = { title, digest, content, tags, state };
						res = await this.$store.dispatch("addJotting", data);
					} else if (!this.type && this.article.classification !== "suibi") {
						const data = { title, digest, content, tags, state, classification };
						res = await this.$store.dispatch("addBlog", data);
					}
					if (res.status === 200) {
						// 重置表单数据
						this.$refs[formName].resetFields();
						this.dialogVisible = false;
						this.$message.success(res.msg);
						this.$router.push("/admin/article");
					} else {
						this.$message.error(res.msg);
					}
				} else {
					this.$message.warning("请注意文章内容不能为空和红色提示");
					return false;
				}
			});
		},

		resetForm(formName) {
			this.$refs[formName].clearValidate();
		},
		init() {
			for (let c of this.classifies) {
				this.classifyOptions.push({ value: c._id, label: c.title });
			}
			for (let c of this.tags) {
				this.tagsOptions.push({ value: c._id, label: c.title });
			}
			if (this.type) {
				if (this.type === "blog") {
					this.article = this.$store.getters.blog || {};
				} else {
					this.article = this.$store.getters.jotting || {};
				}
			}
		},
	},
	created() {
		this.init();
	},
};
</script>

<style scoped lang="less">
.markdown-box {
	padding: 0 !important;
	background-color: transparent !important;
	.markdown {
		height: calc(100% - 40px);
	}
	.sub {
		background-color: #323232;
		color: #ffffff;
		width: 100px;
		height: 30px;
		margin-top: 10px;
		box-shadow: 4px 4px 10px #888888;
		border-radius: 5%;
		border: 0;
		margin-left: 50%;
		transform: translate(-50%);
	}
}
</style>
