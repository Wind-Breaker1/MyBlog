<template>
	<div class="comment" :style="`${mainBg}`">
		<div class="comment-header" :style="`${cartBg}`">
			<div @click="handleClick">
				<input type="file" id="avatarInput" @change="uploadAvatar" />
				<el-avatar :src="avatarUrl ? avatarUrl : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" :size="40"></el-avatar>
			</div>

			<el-input
				:placeholder="placeholderText"
				v-model="context"
				class="input"
				type="textarea"
				resize="none"
				size="mini"
				:maxlength="contentLength"
				:class="!isLight ? 'input-night' : ''"
				@focus="isShowSecReply(undefined)">
			</el-input>
			<el-button type="info" style="height: 40px" @click="submitInfo(keyId, undefined)">{{ buttonText }}</el-button>
		</div>
		<div class="comment-body" v-for="(item, index) in comments" :key="item.murmur + '' + index">
			<!-- 一级评论 -->
			<div class="first-comment">
				<el-avatar :size="40" :src="item.avatarUrl"></el-avatar>
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
						<i class="iconfont icon-icon" @click="giveALike(item, item._id)" :class="item.favour.includes(murmur) ? 'active' : ''"></i
						>{{ item.favour.length || 0 }}
						<i class="el-icon-chat-dot-round" @click="isShowSecReply(item._id)"> 回复</i>
						<i class="el-icon-delete" @click="deleteComment(item._id, undefined)" v-if="murmur === item.murmur"> 删除</i>
					</div>
					<!-- 回复一级评论 -->
					<div class="reply-comment" v-show="isShowSec === item._id">
						<el-input
							placeholder="请输入最多150字的评论...."
							class="input"
							v-model="replyContext"
							:maxlength="150"
							:class="!isLight ? 'input-night' : ''">
						</el-input>
						<el-button type="info" size="mini" class="reply-button" @click="submitInfo(item._id, item.username)">回复 </el-button>
					</div>
					<!-- 次级评论 -->
					<div class="second-comment" v-for="(reply, index) in item.replyInfo" :key="reply.murmur + '' + index" :style="`${cartBg}`">
						<!-- 次级评论头像,该用户没有头像则显示默认头像 -->
						<el-avatar :size="40" :src="reply.avatarUrl"></el-avatar>
						<div class="content">
							<!-- 次级评论用户昵称 -->
							<h3>{{ reply.username }}</h3>
							<!-- 次级评论评论时间 -->
							<span>{{ reply.date }} </span>
							<!-- 次级评论内容 xxx回复xxx：评论内容-->
							<span class="to_reply">{{ reply.username }}</span>
							回复
							<span class="to_reply">{{ reply.replyName }}</span
							>:
							<p style="padding-right: 20px">
								{{ reply.reply }}
							</p>
							<!-- 次级评论评论点赞 -->
							<div class="comment-right">
								<i class="iconfont icon-icon" @click="giveALike(reply, item._id)" :class="reply.favour.includes(murmur) ? 'active' : ''"></i
								>{{ reply.favour ? reply.favour.length : 0 }}
								<i class="el-icon-chat-dot-round" @click="isShowSecReply(reply._id)">回复</i>
								<i class="el-icon-delete" @click="deleteComment(item._id, reply._id)" v-if="murmur === reply.murmur">删除</i>
							</div>
							<div class="reply-comment" v-show="isShowSec === reply._id">
								<el-input
									placeholder="请输入最多150字的评论...."
									class="input"
									v-model="replyContext"
									:maxlength="150"
									:class="!isLight ? 'input-night' : ''">
								</el-input>
								<el-button type="info" size="mini" class="reply-button" @click="submitInfo(item._id, reply.username)">回复 </el-button>
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
		<!-- 暂无评论的空状态 -->
		<el-empty :description="emptyText" v-show="comments.length === 0"></el-empty>
	</div>
</template>
<script>
import { pressImg, toBolb } from '../util';
import { mapGetters, mapState } from 'vuex';
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
	computed: {
		...mapState({
			isLight: state => state.theme.isLight,
		}),
		...mapGetters(['mainBg', 'cartBg']),
	},
	data() {
		return {
			comments: [], // 获取得到的评论
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
			avatarUrl: '',
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
		// 唤起文件选择
		handleClick() {
			const input = document.querySelector('#avatarInput');
			input.click();
		},
		uploadAvatar(e) {
			const maxSize = 2 * 1024 * 1024;
			const file = Array.prototype.slice.call(e.target.files)[0];
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
							formdata.append('avatar', blob);
							formdata.append('murmur', this.murmur);
							const res = await this.$api.uploadAvatar(formdata);
							this.avatarUrl = res.avatarUrl;
						}
					};
				} else {
					blob = toBolb(e.target.result, file.type, file.name);
					const formdata = new FormData();
					formdata.append('file', blob);
					formdata.append('murmur', this.murmur);
					const res = await this.$api.uploadAvatar(formdata);
					this.avatarUrl = res.avatarUrl;
				}
			};
		},
		submitInfo(id, replyName) {
			if (!this.username) {
				this.$prompt('请输入你的名字', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				})
					.then(username => {
						if (!username.value) {
							throw new Error();
						}
						this.$api
							.addMurmur({
								murmur: this.murmur,
								username: username.value,
							})
							.then(res => {
								this.addComment(id, replyName);
								this.username = res.data.username;
							});
					})
					.catch(err => {
						if (err == 'cancel') {
							this.$message({
								type: 'info',
								message: '取消输入',
							});
						} else {
							this.$message.warning({
								message: '名字不能为空哦！',
							});
						}
					});
			} else {
				this.addComment(id, replyName);
			}
		},
		// 获取本篇文章所有评论
		async getCommentList(pageStart, pageSize) {
			try {
				this.comments = [];
				let id = '';
				if (this.keyId == 'messageBoard') {
					id = 'messageBoard';
				} else {
					id = this.keyId;
				}
				const res = await this.$api.getComments({
					id,
					pageSize,
					pageStart,
					murmur: this.murmur,
				});
				this.comments = res.data?.comments;
				console.log(res);
				this.username = res.data.user?.username;
				this.avatarUrl = res.data.user?.avatarUrl;
			} catch (err) {
				this.$message.error(err);
			}
		},
		// 评论点赞
		giveALike(item, _id) {
			try {
				let res = null;
				if (item.favour?.includes(this.murmur)) {
					this.$message.info('您已经点过赞啦！');
					return;
				}
				if (item.replyName) {
					this.$api
						.addsecondfavour({
							replyId: item._id,
							_id,
							favourMurmur: this.murmur,
						})
						.then(res => {
							this.$message.success(res.msg);
							item.favour.push(this.murmur);
						})
						.catch(() => {
							this.$message.error(res.msg);
						});
				} else {
					this.$api
						.addfirstfavour({
							_id,
							favourMurmur: this.murmur,
						})
						.then(res => {
							this.$message.success(res.msg);
							item.favour.push(this.murmur);
						})
						.catch(() => {
							this.$message.error(res.msg);
						});
				}
			} catch (err) {
				this.$message.error(err);
			}
		},
		isShowSecReply(id) {
			if (id) {
				this.isShowSec = id;
				if (this.isClickId === this.isShowSec) {
					this.isShowSec = '';
				} else {
					this.isShowSec = id;
				}
				this.isClickId = this.isShowSec;
				// this.replyName = name;
			} else {
				this.isShowSec = this.isClickId = '';
			}
		},
		deleteComment(_id, replyId) {
			let res = null;
			if (replyId) {
				res = this.$api
					.deletesecondcomment({ replyId, _id })
					.then(res => {
						this.$message.success(res.msg);
						const temp = this.comments.find(item => item._id == _id).replyInfo;
						for (let i = 0; i < temp.length; i++) {
							if (temp[i]._id == replyId) {
								temp.splice(i, 1);
								break;
							}
						}
					})
					.catch(() => {
						this.$message.error(res.msg);
					});
			} else {
				res = this.$api
					.deletefirstcomment({ _id })
					.then(res => {
						this.$message.success(res.msg);
						for (let i = 0; i < this.comments.length; i++) {
							if (this.comments[i]._id == _id) {
								this.comments.splice(i, 1);
							}
						}
					})
					.catch(() => {
						this.$message.error(res.msg);
					});
			}
		},
		async addComment(id, replyName) {
			let res = null;
			if (replyName) {
				if (!this.replyContext) {
					this.$message.warning('评论或留言不能为空哦！');
					return;
				}
				res = await this.$api.addsecondcomment({
					_id: id,
					reply: this.replyContext,
					replyName,
					murmur: this.murmur,
				});
				res.data.username = this.username;
				this.comments.find(item => item._id == id).replyInfo.push(res.data);
				this.replyContext = '';
			} else {
				if (!this.context) {
					this.$message.warning('评论或留言不能为空哦！');
					return;
				}
				res = await this.$api.addfirstcomment({
					keyId: id,
					content: this.context,
					murmur: this.murmur,
				});
				res.data.username = this.username;
				this.comments.push(res.data);
				this.context = '';
			}
			if (res.status === 200) {
				this.$message.success(res.msg);
			} else {
				this.$message.error(res, msg);
			}
			this.isShowSec = this.isClickId = '';
		},
	},
};
</script>

<style lang="less" scoped>
.comment {
	min-height: 26vh;
	border-radius: 5px;
	margin-top: 2px;
	overflow: hidden;
	transition: background-color 0.6s;
	.active {
		color: rgb(202, 4, 4);
	}
	.input-night {
		/deep/.el-textarea__inner,
		/deep/.el-input__inner {
			background-color: rgb(50, 50, 50);
			color: #ffffff;
		}
	}

	.comment-header {
		position: relative;
		height: 50px;
		padding: 10px 5px;
		display: flex;
		align-items: center;
		transition: background-color 0.6s;
		#avatarInput {
			width: 10vh;
			height: 10vh;
			position: absolute;
			left: 10px;
			visibility: hidden;
			z-index: 10;
		}

		.input {
			margin-left: 10px;
			margin-right: 20px;
			flex: 1;
			transition: background-color 0.6s;
			// /deep/.el-input__inner,
			// .el-textarea__inner {
			// 	transition: background-color 0.6s;
			// }
			/deep/.el-input__inner:focus {
				border-color: #dcdfe6;
			}
		}
	}

	.comment-body {
		min-height: 70px;
		padding: 10px 20px;
		font-size: 14px;
		transition: background-color 0.6s;
		.first-comment {
			display: flex;
			.input {
				/deep/.el-input__inner:focus {
					border-color: #dcdfe6;
				}
			}
			i {
				margin-right: 5px;
				margin-left: 15px;
				cursor: pointer;

				&:nth-child(3) {
					color: rgb(202, 4, 4);
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
					border-radius: 20px;
					transition: background-color 0.6s;
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
