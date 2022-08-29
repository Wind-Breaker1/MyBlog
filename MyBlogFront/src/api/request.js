// 引入axios进行二次封装
import axios from 'axios';
const requests = axios.create({
	// 配置对象
	// 基础路径
	baseURL: '/api',
	// 请求超时的时间限 制
	timeout: 5000,
});
// 请求拦截器：在请求发出去之前做处理
requests.interceptors.request.use(config => {
	// config:配置对象，对象信息里边有一个重要信息，请求头headers
	// 进度条开始
	// console.log(config, 'config');

	return config;
});
// 响应拦截器
requests.interceptors.response.use(
	res => {
		// 进度条结束
		return res.data;
	},
	err => {
		if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
			return Promise.reject('timeout请求超时');
			// return service.request(originalRequest);// 再重复请求一次
		}
		if (err.message.indexOf('Network') !== -1) {
			return Promise.reject('网络异常');
		}
		if (err.response && err.response.status === 404) {
			return Promise.reject('请求的资源无法找到');
		} else if (err.response && err.response.status === 500) {
			return Promise.reject('服务器繁忙');
		}
		return err;
	}
);

export default requests;
