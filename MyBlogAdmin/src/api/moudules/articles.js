// 统一管理所有接口 
import requests from "../request";
// 获取文章列表
export const getArticleList = () => requests.get('/articles/getarticleList');

// 删除文章
export const deleteArticle = (params = {}) => requests.get('/articles/deletearticle', params);

// 修改文章状态
export const changeState = (data) => requests.post('/articles/changestate', data);

// 增加文章
export const addArticle = (data) => requests.post('/articles/addArticle', data);

// 获取某一文章
export const getArticle = (data) => requests.post('/articles/getarticle', data);
