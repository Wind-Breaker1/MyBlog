// 统一管理所有接口 
import requests from "./request";
// 获取文章列表
export const getArticleList = (params) => requests.get('/articles/getPublishArticles', { params });

// 获取某一文章
export const getBlog = (params) => requests.get('/articles/getBlog', { params });

// 获取专栏列表
export const getClassifyList = () => requests.get('/classifies/getclassifyslist');

// 获取随笔
export const getJottingList = (params) => requests.get('/jottings/getPublishJottings', { params });

// 获取随笔
export const getJotting = (params) => requests.get('/jottings/getJotting', { params });

// 获取文章总数信息
export const getNumInfo = () => requests.get('/synthesis/getWebInfo');

// 获取某书签所有博客信息
export const getBlogsOfClassify = (params) => requests.get('/articles/getBlogsOfClassify', { params });

// 博客点赞
export const giveBlogALike = (params) => requests.get('/articles/addFavour', { params });

// 随笔点赞
export const giveJottingALike = (params) => requests.get('/jottings/addFavour', { params });

// 增加浏览量
export const addBrowse = (params) => requests.get('/articles/addBrowse', { params });

// 获取右边信息栏基础信息
export const getSliderInfo = () => requests.get('/synthesis/getSliderInfo');

// 搜索
export const search = (params) => requests.get('/synthesis/searchArticle', { params });

// 获取某篇文章的所有评论
export const getCommentList = (params) => requests.get('/comment/getcommentlist', { params });

// 一级评论点赞
export const addfirstfavour = (params) => requests.get('/comment/addfirstfavour', { params });

// 二级评论点赞
export const addsecondfavour = (params) => requests.get('/comment/addsecondfavour', { params });

// 新增一级评论
export const addfirstcomment = (data) => requests.post('/comment/addfirstcomment', data);

// 新增二级评论
export const addsecondcomment = (data) => requests.post('/comment/addsecondcomment', data);

// 删除一级评论
export const deletefirstcomment = (params) => requests.delete('/comment/deletefirstcomment', { params });

// 删除二级评论
export const deletesecondcomment = (params) => requests.delete('/comment/deletesecondcomment', { params });