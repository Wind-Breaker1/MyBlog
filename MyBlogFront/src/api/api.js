// 统一管理所有接口 
import requests from "./request";
// 获取文章列表
export const getArticleList = (params) => requests.get('/articles/getPublishArticles', { params });

// 获取某一文章
export const getArticle = (params) => requests.get('/articles/getarticle', { params });

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

// 点赞
export const giveALike = (params) => requests.get('/articles/addFavour', { params });

// 增加浏览量
export const addBrowse = (params) => requests.get('/articles/addBrowse', { params });