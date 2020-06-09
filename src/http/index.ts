import request from './request';

const api = (url: any, type: any, data?: any) => {
  return request({
    url,
    method: type,
    data,
  });
};

export default api;
