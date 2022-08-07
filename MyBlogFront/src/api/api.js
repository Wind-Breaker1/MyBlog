// 统一管理所有接口
import requests from "./request";
// 获取文章列表
export const getPublishBlogs = (params) =>
  requests.get("/blogs/getpublishblogs", { params });

// 获取某一文章
export const getBlog = (params) => requests.get("/blogs/getblog", { params });

// 获取专栏列表
export const getClassifies = () => requests.get("/classifies/getclassifies");

// 获取随笔
export const getPublishJottings = (params) =>
  requests.get("/jottings/getpublishjottings", { params });

// 获取随笔
export const getJotting = (params) =>
  requests.get("/jottings/getjotting", { params });

// 获取文章总数信息
export const getWebInfo = () => requests.get("/synthesis/getwebinfo");

// 获取某书签所有博客信息
export const getBlogsOfClassify = (params) =>
  requests.get("/blogs/getblogsofclassify", { params });

// 博客点赞
export const giveBlogALike = (params) =>
  requests.get("/blogs/addfavour", { params });

// 随笔点赞
export const giveJottingALike = (params) =>
  requests.get("/jottings/addfavour", { params });

// 增加博客浏览量
export const addBlogBrowse = (params) =>
  requests.get("/blogs/addblogbrowse", { params });
// 增加随笔浏览量
export const addJottingBrowse = (params) =>
  requests.get("/jottings/addjottingbrowse", { params });
// 获取右边信息栏基础信息
export const getSliderInfo = () => requests.get("/synthesis/getsliderinfo");

// 搜索
export const search = (params) =>
  requests.get("/synthesis/searcharticle", { params });

// 获取某篇文章的所有评论
export const getComments = (params) =>
  requests.get("/comments/getcomments", { params });

// 一级评论点赞
export const addfirstfavour = (params) =>
  requests.get("/comment/addfirstfavour", { params });

// 二级评论点赞
export const addsecondfavour = (params) =>
  requests.get("/comment/addsecondfavour", { params });

// 新增一级评论
export const addfirstcomment = (data) =>
  requests.post("/comment/addfirstcomment", data);

// 新增二级评论
export const addsecondcomment = (data) =>
  requests.post("/comment/addsecondcomment", data);

// 删除一级评论
export const deletefirstcomment = (params) =>
  requests.delete("/comment/deletefirstcomment", { params });

// 删除二级评论
export const deletesecondcomment = (params) =>
  requests.delete("/comment/deletesecondcomment", { params });
