export const setToken = token => {
	localStorage.setItem("TOKEN", token);
};
export const getToken = () => {
	return localStorage.getItem("TOKEN");
};
// /清除token
export const clearToken = () => {
	localStorage.removeItem("TOKEN");
	localStorage.removeItem("userInfo");
};
export const setClassifies = data => {
	sessionStorage.setItem("CLASSIFIES", data);
};
export const setUserInfo = user => {
	localStorage.setItem("userInfo", user);
};
export const getUserInfo = () => {
	return JSON.parse(localStorage.getItem("userInfo"));
};
export const getClassifies = () => {
	return JSON.parse(sessionStorage.getItem("CLASSIFIES"));
};
