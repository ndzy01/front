import axios from 'axios';
import config from '../config/index';

const http = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? config.deafultUrl.url : config.deafultUrl.urlOnLine,
  timeout: 60000, // 请求超时时间
});

//添加一个响应拦截器
http.interceptors.response.use(
  function (response) {
    if (response.data.status === 500) {
      return Promise.reject('服务器出错！');
    }
    return response;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default http;
