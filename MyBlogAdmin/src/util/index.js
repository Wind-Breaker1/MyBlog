export const setToken = token => {
	localStorage.setItem("TOKEN", JSON.stringify(token));
};
export const getToken = () => {
	return JSON.parse(localStorage.getItem("TOKEN"));
};
// /清除token
export const clearToken = () => {
	localStorage.removeItem("TOKEN");
	localStorage.removeItem("userInfo");
};
export const setClassifies = classifies => {
	sessionStorage.setItem("CLASSIFIES", JSON.stringify(classifies));
};
export const setUserInfo = user => {
	localStorage.setItem("userInfo", JSON.stringify(user));
};
export const getUserInfo = () => {
	return JSON.parse(localStorage.getItem("userInfo"));
};
export const getClassifies = () => {
	return JSON.parse(sessionStorage.getItem("CLASSIFIES"));
};
