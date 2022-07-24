// 引入axios进行二次封装
import axios from "axios";
// 进度条
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css";
import store from '@/store';
// export default function $axios(options) {
//   return new Promise((resolve, reject) => {
//     const instance = axios.create({
//       // 配置对象
//       // 基础路径
//       baseURL: "/api",
//       // 请求超时的时间限 制
//       timeout: 5000
//     })

//     //request 拦截器
//     instance.interceptors.request.use(
//       config => {
//         // // 需要携带token带给服务器
//         // if (store.state.user.token) {
//         //   config.headers['auth-token'] = store.state.user.token;
//         // }
//         nprogress.start();

//         if (config.params) {
//           let params = { ...parFilter(config.params) }
//           config.params = params
//         }

//         return config
//       },

//       error => {
//         //请求错误时
//         console.log('request:', error)
//         // 1.判断请求超时
//         if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
//           console.log('timeout请求超时')
//           // return service.request(originalRequest);// 再重复请求一次
//         }
//         return Promise.reject(error)
//       }

//     )


//     //response 拦截器
//     instance.interceptors.response.use(
//       res => {
//         // 进度条结束
//         nprogress.done();
//         return res.data;
//       },

//       err => {
//         // //console.log('response:',err)
//         // // 1.判断请求超时
//         // if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
//         //   return Promise.reject('timeout请求超时')
//         //   // return service.request(originalRequest);// 再重复请求一次
//         // }
//         // if (err.message.indexOf('Network') !== -1) {
//         //   return Promise.reject('网络异常')
//         // }
//         // if (err.response && err.response.status === 404) {
//         //   return Promise.reject('请求的资源无法找到')
//         // } else if (err.response && err.response.status === 500) {
//         //   return Promise.reject('服务器繁忙')
//         // }
//         //console.log(err.response.status)
//         return Promise.reject(err)
//       }
//     )

//     // 请求处理
//     instance(options).then(res => {
//       resolve(res)
//       return false
//     }).catch(error => {
//       reject(error)
//     })

//   })
// }
const requests = axios.create({
  // 配置对象
  // 基础路径
  baseURL: "/api",
  // 请求超时的时间限 制
  timeout: 5000
})
// 请求拦截器：在请求发出去之前做处理
requests.interceptors.request.use(config => {
  if (this)
  // config:配置对象，对象信息里边有一个重要信息，请求头headers
  // 进度条开始
  // if (store.state.detail.uuid) {
  //   config.headers.userTempId = store.state.detail.uuid;
  // }
  nprogress.start();
  // // 需要携带token带给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }
  nprogress.start();
  return config;
})
// 响应拦截器
requests.interceptors.response.use(res => {
  // 进度条结束
  nprogress.done();
  return res.data;
}, err => {
  return err;
})

export default requests
