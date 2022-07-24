
export const setToken = (token) => {
  localStorage.setItem("TOKEN", token);
}
export const getToken = () => {
  return localStorage.getItem("TOKEN");
}
// /清除token
export const clearToken = () => {
  localStorage.removeItem("TOKEN");
  localStorage.removeItem("userInfo");
}
export const setClassifies = (data) => {
  sessionStorage.setItem("CLASSIFIES", data);
}
export const setUserInfo = (user) => {
  localStorage.setItem("userInfo", user);
}
export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem("userInfo"));
}
export const getClassifies = () => {
  return JSON.parse(sessionStorage.getItem("CLASSIFIES"));
}
export const asyncRoute = function (myAsyncRoute) {
  let menuIdList = getUserInfo('userInfo').limits || [];
  let tempArr = filterRoute(myAsyncRoute, menuIdList);
  return tempArr
}
function filterRoute(arr, menuIdList) {
  if (!arr.length) return [];
  // console.log(arr)
  return arr.filter(item => {
    if (item.children && item.children.length) {
      item.children = filterRoute(item.children, menuIdList);
    }
    return (item.meta && item.meta.id && menuIdList.includes(item.meta.id)) || (item.children && item.children.length > 0)
  })
}