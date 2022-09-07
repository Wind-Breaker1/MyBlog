// 统一管理所有接口
import requests from "./request";
// 获取文章列表
export const getBlogs = () => requests.get("/blogs/getblogs");
// 更新文章
export const updateBlog = data => requests.post("/blogs/updateblog", data);
// 删除文章
export const deleteBlog = (params = {}) => requests.delete("/blogs/deleteblog", { params });
// 修改文章状态
export const changeBlogState = params => requests.get("/blogs/changeblogstate", { params });
// 增加文章
export const addBlog = data => requests.post("/blogs/addblog", data);
// 获取某一文章
export const getBlog = params => requests.get("/blogs/getblog", { params });

// 登录
export const login = data => requests.post("/users/login", data);
// 获取用户信息
export const getUsers = () => requests.get("/users/getusers");
// 删除用户
export const deleteUser = params => requests.delete("/users/deleteuser", { params });
// 注册用户
export const register = data => requests.post("/users/register", data);
// 修改用户信息
export const updateUserInfo = data => requests.post("/users/updateuserinfo", data);
// 修改密码
export const updatePassword = data => requests.post("/users/updatepassword", data);
// 退出
export const logout = () => requests.get("/users/logout");
// 获取某个用户信息
export const getUser = params => requests.get("/users/getuser", { params });

// 获取专栏列表
export const getClassifies = () => requests.get("/classifies/getclassifies");
// 删除专栏
export const deleteClassify = params => requests.delete("/classifies/deleteclassify", { params });
// 编辑专栏
export const updateClassifyTitle = data => requests.post("/classifies/updateclassifytitle", data);
// 新增专栏
export const addClassify = data => requests.post("/classifies/addclassify", data);

// 获取随笔列表
export const getJottings = () => requests.get("/jottings/getjottings");
// 修改状态
export const changeJottingState = params => requests.get("/jottings/changestate", { params });
// 删除随笔
export const deleteJotting = params => requests.delete("/jottings/deletejotting", { params });
// 添加随笔
export const addJotting = data => requests.post("/jottings/addjotting", data);
// 获取某一随笔
export const getJotting = params => requests.get("/jottings/getjotting", { params });
// 添加图片
export const uploadImg = data => requests.post("/synthesis/uploadartimg", data, { headers: { "content-type": "multipart/form-data" } });
// 添加随笔
export const updateJotting = data => requests.post("/jottings/updatejotting", data);

// 添加一级路由
export const addFirstRoute = data => requests.post("/routes/addfirstroute", data);
// 添加二级路由
export const addSecondRoute = data => requests.post("/routes/addsecondroute", data);
// 修改路由
export const updateRoute = data => requests.post("/routes/updatroute", data);
// 删除路由
export const deleteRoute = params => requests.delete("/routes/deleteroute", { params });
// 获取路由
export const getRoutes = params => requests.get("/routes/getroutes", { params });
// 获取所有路由
export const getRouteList = () => requests.get("/routes/getroutelist");

// 添加书签
export const addTag = data => requests.post("/synthesis/addtag", data);
// 获取书签
export const getTags = () => requests.get("/synthesis/gettags");
// 修改书签
export const updateTag = data => requests.post("/synthesis/updatetag", data);
// 删除书签
export const deleteTag = params => requests.delete("/synthesis/deletetag", { params });

// 修改游客信息
export const getMurmurInfos = () => requests.get("/murmur/getmurmurinfos");
// 删除游客信息
export const deleteMurmurInfo = params => requests.delete("/murmur/deletemurmurinfo", { params });

// 获取所有照片信息
export const getPhotos = () => requests.get("/photo/getphotos");
// 修改照片信息
export const updatePhotos = data => requests.post("/photo/updatephotodigest", data);
// 删除照片信息
export const deletePhoto = params => requests.delete("/photo/deletephoto", { params });
// 新增照片信息
export const addPhoto = data => requests.post("/photo/addphoto", data);

// 获取所有评论
export const getComments = () => requests.get("/comments/getcomments");
// 删除一级评论
export const deleteFirstComment = params => requests.delete("/comments/deletefirstcomment", { params });
// 删除二级评论
export const deleteSecondComment = params => requests.delete("/comments/deletesecondcomment", { params });

// 获取所有时间节点
export const getTimeclues = () => requests.get("/timeclues/gettimeclues");
// 删除时间节点
export const deleteTimeclue = params => requests.delete("/timeclues/deletetimeclue", { params });
// 修改时间节点
export const updateTimeclue = data => requests.post("/timeclues/updatetimeclue", data);
// 新增时间节点
export const addTimeclue = data => requests.post("/timeclues/addtimeclue", data);
// 改变时间节点状态
export const changeTimeNodeState = params => requests.get("/timeclues/changetimenodestate", { params });
// 改变时间节点状态
export const getDataForDataBoard = () => requests.get("/synthesis/getdatafordataboard");
