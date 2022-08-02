// 统一管理所有接口
<<<<<<< Updated upstream
import requests from './request';
=======
import requests from "./request";
>>>>>>> Stashed changes
// 获取文章列表
export const getArticleList = () => requests.get("/blogs/getblogs");

// 删除文章
export const deleteArticle = (params = {}) =>
  requests.delete("/blogs/deleteblog", { params });

// 修改文章状态
<<<<<<< Updated upstream
export const changeState = params => requests.get('/articles/changestate', { params });

// 增加文章
export const addArticle = data => requests.post('/articles/addArticle', data);

// 获取某一文章
export const getBlog = params => requests.get('/articles/getblog', { params });
// 登录
export const reqUserLogin = data => requests.post('/users/login', data);

// 获取用户信息
export const getUserList = () => requests.get('/users/getUserList');

// 删除用户
export const deleteUser = params => requests.delete('/users/deleteUser', { params });

// 注册用户
export const reqUserRegister = data => requests.post('/users/register', data);

// 修改用户信息
export const updatePassword = data => requests.post('/users/updateuserinfo', data);

// 退出
export const logout = () => requests.get('/users/logout');
=======
export const changeState = (params) =>
  requests.get("/blogs/changeblogstate", { params });

// 增加文章
export const addArticle = (data) => requests.post("/blogs/addblog", data);

// 获取某一文章
export const getBlog = (params) => requests.get("/blogs/getblog", { params });
// 登录
export const reqUserLogin = (data) => requests.post("/users/login", data);

// 获取用户信息
export const getUserList = () => requests.get("/users/getusers");

// 删除用户
export const deleteUser = (params) =>
  requests.delete("/users/deleteuser", { params });

// 注册用户
export const reqUserRegister = (data) => requests.post("/users/register", data);

// 修改密码
export const updatePassword = (data) =>
  requests.post("/users/updateuserinfo", data);

// 退出
export const logout = () => requests.get("/users/logout");
>>>>>>> Stashed changes

// 获取专栏列表
export const getClassifyList = () => requests.get("/classifies/getclassifies");

// 删除专栏
<<<<<<< Updated upstream
export const deleteClassify = params => requests.delete('/classifies/deleteclassify', { params });

// 编辑专栏
export const compile = data => requests.post('/classifies/compile', data);

// 新增专栏
export const addclassify = data => requests.post('/classifies/addclassify', data);
=======
export const deleteClassify = (params) =>
  requests.delete("/classifies/deleteclassify", { params });

// 编辑专栏
export const compile = (data) =>
  requests.post("/classifies/updateclassifytitle", data);

// 新增专栏
export const addclassify = (data) =>
  requests.post("/classifies/addclassify", data);
>>>>>>> Stashed changes

// 获取随笔
export const getJottingList = () => requests.get("/jottings/getjottings");

// 修改状态
<<<<<<< Updated upstream
export const changeJottingState = params => requests.get('/jottings/changestate', { params });

// 删除随笔
export const deleteJotting = params => requests.delete('/jottings/deletejotting', { params });

// 添加随笔
export const addJotting = data => requests.post('/jottings/addjotting', data);
// 获取某一随笔
export const getJotting = params => requests.get('/jottings/getjotting', { params });

// 获取某一随笔
export const uploadImg = data => requests.post('/synthesis/uploadimg', data, { headers: { 'content-type': 'multipart/form-data' } });

// 添加一级路由
export const saveFirstRoute = data => requests.post('/route/savefirstroute', data);

// 添加二级路由
export const saveSecondRoute = data => requests.post('/route/savesecondroute', data);
// 修改路由
export const updatRoute = data => requests.post('/route/updatroute', data);

// 删除路由
export const deleteRoute = params => requests.get('/route/deleteroute', { params });
// 获取路由
export const getRouteList = params => requests.get('/route/getroutelist', { params });
=======
export const changeJottingState = (params) =>
  requests.get("/jottings/changestate", { params });

// 删除随笔
export const deleteJotting = (params) =>
  requests.delete("/jottings/deletejotting", { params });

// 添加随笔
export const addJotting = (data) => requests.post("/jottings/addjotting", data);
// 获取某一随笔
export const getJotting = (params) =>
  requests.get("/jottings/getjotting", { params });

// 上传图片
export const uploadImg = (data) =>
  requests.post("/synthesis/uploadimg", data, {
    headers: { "content-type": "multipart/form-data" },
  });
>>>>>>> Stashed changes
