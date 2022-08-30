<template>
	<div class="article-box">
		<el-tabs tab-position="top" class="tabs" @tab-click="changeTab">
			<el-tab-pane label="博客管理" class="tab-content">
				<el-table :data="blogsData" height="100%">
					<el-table-column type="expand">
						<template slot-scope="scope">
							<el-form label-position="left" class="table-expand">
								<el-form-item label="提交日期">
									{{ scope.row.date }}
								</el-form-item>
								<el-form-item label="标题">
									{{ scope.row.title }}
								</el-form-item>
								<el-form-item label="专栏">
									{{ scope.row.classifyTitle }}
								</el-form-item>
								<el-form-item label="摘要">
									{{ scope.row.digest }}
								</el-form-item>
								<el-form-item label="状态">
									{{ scope.row.state ? "已发布" : "未发布" }}
								</el-form-item>
								<el-form-item label="点赞量">
									{{ scope.row.favour.length }}
								</el-form-item>
								<el-form-item label="浏览量">
									{{ scope.row.browse }}
								</el-form-item>
							</el-form>
						</template>
					</el-table-column>
					<el-table-column label="提交日期" min-width="60">
						<template slot-scope="scope">
							<i class="el-icon-time"></i>
							<span style="margin-left: 10px">{{ scope.row.date }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="title" label="标题" min-width="80"> </el-table-column>
					<el-table-column prop="classifyTitle" label="专栏" min-width="80"> </el-table-column>
					<el-table-column label="状态" min-width="50">
						<template slot-scope="scope">
							{{ scope.row.state ? "已发布" : "未发布" }}
						</template>
					</el-table-column>
					<!-- <el-table-column prop="favour.length" label="点赞量" min-width="40"> </el-table-column> -->
					<!-- <el-table-column prop="browse" label="浏览量" min-width="40"> </el-table-column> -->
					<el-table-column label="操作" min-width="120">
						<template slot-scope="scope">
							<el-button size="mini" @click="Edit(scope.row, 'blog')">编辑</el-button>
							<el-button size="mini" type="success" @click="changeState(scope.row, 'blog')">{{ scope.row.state ? "下架" : "发布" }}</el-button>
							<el-button size="mini" type="danger" @click="deleteItem(scope.row, 'blog')">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="心情管理" class="tab-content">
				<el-table :data="jottings" height="100%">
					<el-table-column type="expand">
						<template slot-scope="scope">
							<el-form label-position="left" class="table-expand">
								<el-form-item label="提交日期">
									{{ scope.row.date }}
								</el-form-item>
								<el-form-item label="标题">
									{{ scope.row.title }}
								</el-form-item>
								<el-form-item label="摘要">
									{{ scope.row.digest }}
								</el-form-item>
								<el-form-item label="状态">
									{{ scope.row.state ? "已发布" : "未发布" }}
								</el-form-item>
								<el-form-item label="点赞量">
									{{ scope.row.favour.length }}
								</el-form-item>
								<el-form-item label="浏览量">
									{{ scope.row.browse }}
								</el-form-item>
							</el-form>
						</template>
					</el-table-column>
					<el-table-column label="提交日期" min-width="60">
						<template slot-scope="scope">
							<i class="el-icon-time"></i>
							<span style="margin-left: 10px">{{ scope.row.date }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="title" label="标题" min-width="80"> </el-table-column>
					<!-- <el-table-column prop="digest" label="摘要" min-width="100"> </el-table-column> -->
					<el-table-column label="状态" min-width="50">
						<template slot-scope="scope">
							{{ scope.row.state ? "已发布" : "未发布" }}
						</template>
					</el-table-column>
					<!-- <el-table-column prop="favour.length" label="点赞量" min-width="40"> </el-table-column> -->
					<!-- <el-table-column prop="browse" label="浏览量" min-width="40"> </el-table-column> -->
					<el-table-column label="操作" min-width="120">
						<template slot-scope="scope">
							<el-button size="mini" @click="Edit(scope.row, 'jotting')">编辑</el-button>
							<el-button size="mini" type="success" @click="changeState(scope.row, 'jotting')">{{ scope.row.state ? "下架" : "发布" }} </el-button>
							<el-button size="mini" type="danger" @click="deleteItem(scope.row, 'jotting')">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="专栏管理" class="tab-content">
				<el-button type="primary" size="mini" @click="addItem('classify')" class="sub">新增专栏</el-button>
				<el-table :data="classifies" class="option">
					<el-table-column label="提交日期" min-width="60">
						<template slot-scope="scope">
							<i class="el-icon-time"></i>
							<span style="margin-left: 10px">{{ scope.row.date }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="title" label="标题" min-width="100"> </el-table-column>
					<el-table-column prop="digest" label="专栏介绍" min-width="180"> </el-table-column>
					<el-table-column prop="articleNum" label="博客数量" min-width="60"> </el-table-column>
					<el-table-column label="操作" min-width="100">
						<template slot-scope="scope">
							<el-button size="mini" @click="Edit(scope.row, 'classify')">编辑</el-button>
							<el-button size="mini" type="danger" @click="deleteItem(scope.row, 'classify')">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="书签管理" class="tab-content">
				<el-button type="primary" size="mini" @click="addItem('tag')" class="sub">新增书签</el-button>
				<el-table :data="tags" class="option">
					<el-table-column label="创建日期" min-width="60">
						<template slot-scope="scope">
							<i class="el-icon-time"></i>
							<span style="margin-left: 10px">{{ scope.row.date }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="title" label="书签名" min-width="200"> </el-table-column>
					<el-table-column label="操作" min-width="100">
						<template slot-scope="scope">
							<el-button size="mini" @click="Edit(scope.row, 'tag')">编辑</el-button>
							<el-button size="mini" type="danger" @click="deleteItem(scope.row, 'tag')">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="评论管理" class="tab-content">
				<el-button type="primary" size="mini" @click="addItem('tag')" class="sub">新增书签</el-button>
				<el-table :data="comments" row-key="id" border :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
					<el-table-column label="评论日期" min-width="60">
						<template slot-scope="scope">
							<i class="el-icon-time"></i>
							<span style="margin-left: 10px">{{ scope.row.date }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="articleName" label="所属文章" min-width="180"> </el-table-column>
					<el-table-column prop="username" label="评论者" min-width="100"> </el-table-column>
					<el-table-column label="操作" min-width="100">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="deleteItem(scope.row, 'comment')">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" center>
			<el-form :model="form">
				<el-form-item :label="currentTab == 2 ? '专栏名' : '书签名'" :label-width="formLabelWidth">
					<el-input v-model="form.title" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="专栏介绍" :label-width="formLabelWidth" v-show="currentTab == 2">
					<el-input v-model="form.digest" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="submit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { getComments, deleteFirstComment, deleteSecondComment } from "@/api/api";
import { mapGetters } from "vuex";
export default {
	data() {
		return {
			form: {
				title: "",
				digest: "",
			},
			formLabelWidth: "120px",
			dialogVisible: false,
			id: "",
			dialogTitle: "",
			currentTab: 0,
			comments: [],
			firstClick1: true,
			firstClick2: true,
			firstClick3: true,
			firstClick4: true,
		};
	},
	mounted() {
		this.getBlogs();
	},
	computed: {
		// 获取数据
		...mapGetters(["jottings", "blogs", "classifies", "tags"]),
		blogsData() {
			let id;
			this.blogs.forEach(element => {
				id = element.classification;
				for (let ele of this.classifies) {
					if (ele._id === id) {
						element.classifyTitle = ele.title;
						break;
					}
				}
			});
			return JSON.parse(JSON.stringify(this.blogs));
		},
	},
	methods: {
		async changeTab(tab) {
			this.currentTab = parseInt(tab.index);
			if (this.currentTab == 1 && this.firstClick1 && this.jottings.length == 0) {
				this.$store.dispatch("getJottings");
				this.firstClick1 = false;
			} else if (this.currentTab == 2 && this.firstClick2 && this.classifies.length == 0) {
				this.$store.dispatch("getClassifies");
				this.firstClick2 = false;
			} else if (this.currentTab == 3 && this.firstClick3 && this.tags.length == 0) {
				this.$store.dispatch("getTags");
				this.firstClick3 = false;
			} else if (this.currentTab == 4 && this.firstClick4) {
				const res = await getComments();
				if (res.status == 200) {
					this.comments = res.data;
				}
				this.firstClick3 = false;
			}
		},
		// 编辑
		async Edit(row, type) {
			switch (type) {
				case "blog":
					await this.$store.dispatch("getBlog", { _id: row._id });
					this.$router.push({ path: "/admin/markdown", query: { type: "blog" } });
					break;
				case "jotting":
					await this.$store.dispatch("getJotting", { _id: row._id });
					this.$router.push({ path: "/admin/markdown", query: { type: "jotting" } });
					break;
				case "tag":
					this.dialogTitle = "编辑书签";
					this.form.title = row.title;
					this.dialogVisible = true;
					this.id = row._id;
					break;
				case "classify":
					this.dialogTitle = "编辑专栏";
					this.form.title = row.title;
					this.form.digest = row.digest;
					this.dialogVisible = true;
					this.id = row._id;
					break;
			}
			if (type == "blog") {
				await this.$store.dispatch("getBlog", { _id: row._id });
				this.$router.push({ path: "/admin/markdown", query: { type: "blog" } });
			} else if (type == "jotting") {
				await this.$store.dispatch("getJotting", { _id: row._id });
				this.$router.push({ path: "/admin/markdown", query: { type: "jotting" } });
			} else {
				this.dialogTitle = "编辑专栏";
				this.form.title = row.title;
				this.form.digest = row.digest;
				this.dialogVisible = true;
				this._id = row._id;
			}
		},
		// 删除
		async deleteItem(row, type) {
			let res = null;
			switch (type) {
				case "blog":
					res = await this.$store.dispatch("deleteBlog", { _id: row._id, classification: row.classification });
					this.$store.dispatch("getBlogs");
					break;
				case "jotting":
					res = await this.$store.dispatch("deleteJotting", { _id: row._id });
					this.$store.dispatch("getJottings");
					break;
				case "tag":
					res = await this.$store.dispatch("deleteTag", { _id: row._id });
					this.$store.dispatch("getTags");

					break;
				case "classify":
					res = await this.$store.dispatch("deleteClassify", { _id: row._id });
					this.$store.dispatch("getClassifies");
					break;
				case "comment":
					res = await this.$store.dispatch("deleteClassify", { _id: row._id });
			}
			if (res.status === 200) {
				this.$message.success(res.msg);
			} else {
				this.$message.error(res.msg);
			}
			// this.getData();
		},

		// 修改文章状态
		async changeState(row, type) {
			let res = null;
			if (type == "blog") {
				res = await this.$store.dispatch("changeBlogState", { _id: row._id });
				this.$store.dispatch("getBlogs");
			} else {
				res = await this.$store.dispatch("changeJottingState", { _id: row._id });
				this.$store.dispatch("getJottings");
			}
			if (res.status === 200) {
				this.$message.success(res.msg);
			} else {
				this.$message.error(res.msg);
			}
			// this.getData();
		},

		// 提交数据
		async submit() {
			let res = null;
			if (this.currentTab == 2) {
				if (!this.form.title || !this.form.digest) {
					this.$message.warning("专栏名称和介绍不能为空哦！");
					return;
				}
				if (this.id) {
					res = await this.$store.dispatch("updateClassifyTitle", { _id: this.id, title: this.form.title, digest: this.form.digest });
				} else {
					res = await this.$store.dispatch("addClassify", { title: this.form.title, digest: this.form.digest });
				}
				this.$store.dispatch("getClassifies");
			} else {
				console.log(this.id, "id");
				if (!this.form.title) {
					this.$message.warning("书签名不能为空！");
					return;
				}
				if (this.id) {
					res = await this.$store.dispatch("updateTag", { id: this.id, title: this.form.title });
				} else {
					res = await this.$store.dispatch("addTag", { title: this.form.title });
				}
				console.log(res);
				this.$store.dispatch("getTags");
			}
			if (res?.status === 200) {
				// 修改成功后清空值
				this.form.title = "";
				this.form.digest = "";
				this._id = "";
				this.dialogVisible = false;
				this.$message.success(res.msg);
				// this.getData();
			} else {
				this.$message.error(res?.msg || "出错啦！");
			}
		},
		async getBlogs() {
			await this.$store.dispatch("getBlogs");
		},
		// 增加专栏
		addItem(type) {
			if (type == "tag") {
				this.dialogTitle = "新增书签";
				this.dialogVisible = true;
				this.form.title = "";
			} else {
				this.dialogTitle = "新增专栏";
				this.dialogVisible = true;
				this.form.title = "";
				this.form.digest = "";
			}
		},
	},
};
</script>

<style lang="less" scoped>
.article-box {
	margin: 1vw;
	padding: 2vh;
	box-sizing: border-box;
	width: 100%;
	background-color: rgb(50, 50, 50);
	border-radius: 5px;

	.tabs {
		height: 100%;

		.tab-content {
			height: 100%;

			.table-expand .el-form-item {
				margin-right: 0;
				margin-bottom: 0;
			}

			.option {
				height: calc(100% - 28px);
			}
		}
	}
}
</style>
