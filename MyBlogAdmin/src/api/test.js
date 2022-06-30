// 统一管理所有接口 
import requests from "./request";
// 获取文章列表
export const getArticleList = () => requests.get('/articles/getarticleList');

// 删除文章
export const deleteArticle = (params = {}) => requests.delete('/articles/deletearticle', { params });

// 修改文章状态
export const changeState = (params) => requests.get('/articles/changestate', { params });

// 增加文章
export const addArticle = (data) => requests.post('/articles/addArticle', data);

// 获取某一文章
export const getArticle = (params) => requests.get('/articles/getarticle', { params });
// 登录
export const reqUserLogin = (data) => requests.post('/users/login', data); 

// 获取用户信息
export const getUserList = () => requests.get('/users/getUserList'); 

// 删除用户
export const deleteUser = (params) => requests.delete('/users/deleteUser', { params }); 

// 注册用户
export const reqUserRegister = (data) => requests.post('/users/register', data); 

// 修改密码
export const updatePassword = (data) => requests.post('/users/updatepassword', data); 

// 退出
export const logout = () => requests.get('/users/logout'); 

// 获取专栏列表
export const getClassifyList = () => requests.get('/classifies/getclassifyslist');

// 删除专栏
export const deleteClassify = (params) => requests.delete('/classifies/deleteclassify', { params });

// 编辑专栏
export const compile = (data) => requests.post('/classifies/compile', data);

// 新增专栏
export const addclassify = (data) => requests.post('/classifies/addclassify', data);


// 获取随笔
export const getJottingList = () => requests.get('/jottings/getjottingList');

// 修改状态
export const changeJottingState = (params) => requests.get('/jottings/changestate', { params });

// 删除随笔
export const deleteJotting = (params) => requests.delete('/jottings/deletejotting', { params });

// 添加随笔
export const addJotting = (data) => requests.post('/jottings/addjotting', data);