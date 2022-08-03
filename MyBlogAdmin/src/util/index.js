export const setToken = token => {
	sessionStorage.setItem("TOKEN", JSON.stringify(token));
};
export const getToken = () => {
	return JSON.parse(sessionStorage.getItem("TOKEN"));
};
// /清除token
export const clearToken = () => {
	sessionStorage.removeItem("TOKEN");
	sessionStorage.removeItem("userInfo");
};
export const setClassifies = classifies => {
	sessionStorage.setItem("CLASSIFIES", JSON.stringify(classifies));
};
export const setUserInfo = user => {
	sessionStorage.setItem("userInfo", JSON.stringify(user));
};
export const getUserInfo = () => {
	return JSON.parse(sessionStorage.getItem("userInfo"));
};
export const getClassifies = () => {
	return JSON.parse(sessionStorage.getItem("CLASSIFIES"));
};
