
export const setToken = (token) => {
  localStorage.setItem("TOKEN", token);
}
export const getToken = () => {
  return localStorage.getItem("TOKEN");
}
// /清除token
export const clearToken = () => {
  localStorage.removeItem("TOKEN");
}
export const setClassifies = (data) => {
  sessionStorage.setItem("CLASSIFIES", data);
}
export const getClassifies = () => {
  return JSON.parse(sessionStorage.getItem("CLASSIFIES"));
}