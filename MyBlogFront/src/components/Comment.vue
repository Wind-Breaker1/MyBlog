<template>
	<div class="comment">
		<div class="comment-header">
			<div @click="uploadAvatar">
				<input type="file" id="avatarInput" />
				<el-avatar :src="avatar ? avatar : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" :size="40"></el-avatar>
			</div>

			<el-input
				:placeholder="placeholderText"
				v-model="context"
				class="input-with-select"
				type="textarea"
				resize="none"
				size="mini"
				:maxlength="contentLength"
				@focus="isShowSecReply(undefined)">
			</el-input>
			<el-button type="info" style="height: 40px" @click="submitInfo(keyId, undefined)">{{ buttonText }}</el-button>
		</div>
		<div class="comment-body" v-for="item in comment" :key="item._id">
			<!-- 一级评论 -->
			<div class="first-comment">
				<el-avatar :size="40"></el-avatar>
				<div class="content">
					<!-- 一级评论用户昵称 -->
					<h3>{{ item.username }}</h3>
					<!-- 一级评论发布时间 -->
					<span>{{ item.date }}</span>
					<!-- 一级评论评论内容 -->
					<p style="padding-right: 30px">
						{{ item.content }}
					</p>
					<!-- 一级评论评论点赞 -->
					<div class="comment-right">
						<i class="iconfont icon-icon" @click="giveALike(undefined, item._id)"> {{ item.favour.length }}</i>
						<i class="el-icon-chat-dot-round" @click="isShowSecReply(item._id, item.username)"> 回复</i>
						<i class="el-icon-delete" @click="deleteComment(item._id, undefined)" v-if="murmur === item.murmur"> 删除</i>
					</div>
					<!-- 回复一级评论 -->
					<div class="reply-comment" v-show="isShowSec === item._id">
						<el-input placeholder="请输入最多150字的评论...." v-model="replyContext" :maxlength="150"> </el-input>
						<el-button type="info" size="mini" class="reply-button" @click="submitInfo(item._id, item._id)">回复</el-button>
					</div>
					<!-- 次级评论 -->
					<div class="second-comment" v-for="reply in item.replyInfo" :key="reply._id">
						<!-- 次级评论头像,该用户没有头像则显示默认头像 -->
						<el-avatar :size="40"></el-avatar>
						<div class="content">
							<!-- 次级评论用户昵称 -->
							<h3>{{ reply.username }}</h3>
							<!-- 次级评论评论时间 -->
							<span>{{ reply.date }}</span>
							<!-- 次级评论内容 xxx回复xxx：评论内容-->
							<p style="padding-right: 30px">
								<span class="to_reply">{{ reply.username }}</span>
								回复
								<span class="to_reply">{{ reply.replyname }}</span
								>：
								{{ reply.reply }}
							</p>
							<!-- 次级评论评论点赞 -->
							<div class="comment-right">
								<i class="iconfont icon-icon" @click="giveALike(reply._id, item._id)">{{ reply.favour ? reply.favour.length : 0 }}</i>
								<i class="el-icon-chat-dot-round" @click="isShowSecReply(reply._id, reply.username)">回复</i>
								<i class="el-icon-delete" @click="deleteComment(item._id, reply._id)" v-if="murmur === reply.murmur">删除</i>
							</div>
							<div class="reply-comment" v-show="isShowSec === reply._id">
								<el-input placeholder="请输入最多150字的评论...." v-model="replyContext" :maxlength="150"> </el-input>
								<el-button type="info" size="mini" class="reply-button" @click="submitInfo(item._id, reply._id)">回复</el-button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 页码 -->
		<div class="pagenation">
			<el-pagination background layout="prev, pager, next" :total="10" :hide-on-single-page="true" :page-size="pageSize"> </el-pagination>
		</div>
		<!-- 第一次须填写信息 -->
		<!-- <el-dialog :visible.sync="dialogVisible" width="30%" center>
			<el-input v-model="username" placeholder="请输入用户名"></el-input>
			<el-input type="file" v-model="avatar"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog> -->

		<!-- 暂无评论的空状态 -->
		<el-empty :description="emptyText" v-show="comment.length === 0"></el-empty>
	</div>
</template>
<script>
import { pressImg, toBolb } from '../util';
export default {
	props: {
		keyId: {
			type: String,
		},
		emptyText: {
			type: String,
		},
		buttonText: {
			type: String,
		},
		contentLength: {
			type: Number,
		},
		placeholderText: {
			type: String,
		},
	},
	data() {
		return {
			comment: [], // 获取得到的评论
			context: '', // 评论内容
			replyContext: '', //一级评论回复
			// Reply: '',// 次级评论回复
			isFirCom: '', //是否显示一级回复框
			isShowSec: '', //是否显示次级回复框
			pageSize: 11,
			isClickId: '',
			replyName: '',
			murmur: localStorage.getItem('browserId'),
			// 页数
			page: 1,
			// 当前分页开始
			pageStart: 0,
			username: '',
			avatar: '',
			dialogVisible: false,
		};
	},
	mounted() {
		this.getCommentList();
	},
	methods: {
		// 换页回调
		handleCurrentChange(val) {
			this.pageStart = this.pageSize * (val - 1);
			this.getCommentList(this.pageStart, this.pageSize);
		},
		uploadAvatar(e) {
			const input = document.querySelector('#avatarInput');
			input.click();
			console.log(input);
			const maxSize = 2 * 1024 * 1024;
			this.loading = true;
			const file = Array.prototype.slice.call(input.target.files)[0];
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
							formdata.append('file', blob);
							const res = await this.$api.uploadImg(formdata);
							console.log(res);
						}
					};
				} else {
					blob = toBolb(e.target.result, file.type, file.name);
					const formdata = new FormData();
					formdata.append('file', blob);
					formdata.append('murmur', this.murmur);
					const res = await this.$api.uploadImg(formdata);
					console.log(res);
				}
			};
		},
		submitInfo(id, replyId) {
			this.dialogVisible = !this.dialogVisible;
			if (!this.username) {
				this.$prompt('请输入用户名', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				})
					.then(username => {
						this.addComment(id, replyId, username.value);
						this.$api.addMurmur({
							murmur: this.murmur,
							username: username.value,
							avatar,
						});
					})
					.catch(() => {
						this.$message({
							type: 'info',
							message: '取消输入',
						});
					});
			} else {
				this.addComment(id, replyId, this.username);
			}
		},
		// 获取本篇文章所有评论
		async getCommentList(pageStart, pageSize) {
			try {
				let res = null;
				this.comment = [];
				if (this.keyId == 'messageBoard') {
					res = await this.$api.getComments({
						id: 'messageBoard',
						pageSize,
						pageStart,
						murmur: this.murmur,
					});
				} else {
					res = await this.$api.getComments({
						id: this.keyId,
						pageSize,
						pageStart,
						murmur: this.murmur,
					});
				}
				this.comment = res.data.comment;
				this.username = res.data.user?.username;
			} catch (err) {
				this.$message.error(err);
			}
		},
		// 评论点赞
		async giveALike(replyId, _id) {
			try {
				let res = null;
				let temp = null;
				console.log(this.comment);
				if (replyId) {
					// 暂存favour
					temp = this.comment.find(item => item._id === _id).replyInfo.find(item => item._id === replyId).favour;
					if (temp.includes(this.murmur)) {
						this.$message.info('您已经点过赞啦！');
						return;
					}
					console.log(temp);
					res = await this.$api.addsecondfavour({
						replyId,
						_id,
						favourMurmur: this.murmur,
					});
				} else {
					if (this.comment.find(item => item._id === _id).favour.includes(this.murmur)) {
						this.$message.info('您已经点过赞啦！');
						return;
					}
					res = await this.$api.addfirstfavour({
						_id,
						favourMurmur: this.murmur,
					});
				}
				if (res.status === 200) {
					this.$message.success(res.msg);
					temp.push(this.murmur);
					// this.replyName
				} else {
					this.$message.error(res, msg);
				}
			} catch (err) {
				this.$message.error(err);
			}
		},
		// // 一级评论点赞
		// async giveALikeForFirst(replyId,_id) {
		//   this.comment = res.data;
		//   console.log(this.comment)
		//   console.log(this.blogId, res)
		// },
		isShowSecReply(id, name) {
			if (id) {
				this.isShowSec = id;
				if (this.isClickId === this.isShowSec) {
					this.isShowSec = '';
				} else {
					this.isShowSec = id;
				}
				this.isClickId = this.isShowSec;
				this.replyName = name;
			} else {
				this.isShowSec = this.isClickId = '';
			}
		},
		async deleteComment(_id, replyId) {
			let res = null;
			if (replyId) {
				res = await this.$api.deletesecondcomment({ replyId, _id });
			} else {
				res = await this.$api.deletefirstcomment({ _id });
			}
			if (res.status === 200) {
				this.$message.success(res.msg);
			} else {
				this.$message.error(res, msg);
			}
			this.getCommentList();
		},
		async addComment(id, replyId, username) {
			let res = null;
			// let username = "123";
			if (replyId) {
				res = await this.$api.addsecondcomment({
					_id: id,
					replyId,
					reply: this.replyContext,
					replyname: this.replyName,
					username,
					murmur: this.murmur,
				});
				this.replyContext = '';
			} else {
				res = await this.$api.addfirstcomment({
					keyId: id,
					username,
					content: this.context,
					murmur: this.murmur,
				});
				this.context = '';
			}
			if (res.status === 200) {
				this.$message.success(res.msg);
			} else {
				this.$message.error(res, msg);
			}
			this.isShowSec = this.isClickId = this.replyName = '';
			this.getCommentList();
		},
	},
};
</script>

<style lang="less" scoped>
.comment {
	min-height: 26vh;
	background-color: rgb(255, 255, 255);
	border-radius: 5px;
	margin-top: 2px;
	overflow: hidden;
	.comment-header {
		position: relative;
		height: 50px;
		padding: 10px 5px;
		display: flex;
		align-items: center;
		background-color: rgb(247, 246, 246);
		#avatarInput {
			width: 10vh;
			height: 10vh;
			position: absolute;
			left: 10px;
			visibility: hidden;
			z-index: 10;
		}
		.input-with-select {
			margin-left: 10px;
			margin-right: 20px;
			flex: 1;
		}
	}
	.comment-body {
		min-height: 70px;
		padding: 10px 20px;
		font-size: 14px;
		.first-comment {
			display: flex;
			i {
				margin-right: 5px;
				margin-left: 15px;
				cursor: pointer;
				&:nth-child(3) {
					color: red;
				}
			}
			.content {
				margin-left: 10px;
				position: relative;
				flex: 1;
				& > span {
					font-size: 12px;
					color: rgb(130, 129, 129);
				}
				.comment-right {
					position: absolute;
					right: 0;
					top: 0;
				}
				.reply-comment {
					height: 60px;
					display: flex;
					align-items: center;
					.reply-button {
						margin-left: 20px;
						height: 35px;
					}
				}
				.second-comment {
					display: flex;
					padding: 10px 0 10px 5px;
					background-color: rgb(248, 246, 246);
					border-radius: 20px;
					.to_reply {
						color: rgb(126, 127, 128);
					}
				}
			}
		}
	}
	.pagenation {
		float: right;
		margin-top: 10px;
		margin-bottom: 20px;
	}
}
</style>
