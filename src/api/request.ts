import { ElMessage } from 'element-plus';
import axios from 'axios';
const service = axios.create({
  timeout: 30000,
  baseURL: import.meta.env.VITE_APP_API,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});
//请求拦截
service.interceptors.request.use(
  config => {
    const extra = {
      key: 'f21fe646ac4cfc4f8eafbbbd91bd5f70',
      key_words: config.data,
    };
    config.data = {
      ...extra,
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//响应拦截
service.interceptors.response.use(
  result => {
    if (result.data.code === 200) {
      return result.data;
    }
    ElMessage.error(result.data.message);
    return Promise.reject(result);
  },
  error => {
    if (error.response) {
      ElMessage.error(error.response.data.message);
    } else {
      //请求超时状态
      if (error.message.includes('timeout')) {
        ElMessage.error('网络请求超时，请稍后再试');
      } else if (error.message.includes('canceled')) {
        // 取消请求
      } else {
        //可以展示断网组件
        ElMessage.error('网络请求异常，请稍后再试');
      }
    }
    return Promise.reject(error);
  }
);

/**
 * 封装 请求
 */
function request(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  url: string,
  params = {},
  options = {}
) {
  return new Promise((resolve, reject) => {
    const config = Object.assign(
      {
        url,
        method,
        [method === 'get' || method === 'delete' ? 'params' : 'data']: params,
      },
      options
    );
    service
      .request(config)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

const http = {
  get: request.bind(null, 'get'),
  post: request.bind(null, 'post'),
  put: request.bind(null, 'put'),
  patch: request.bind(null, 'patch'),
  delete: request.bind(null, 'delete'),
};

export default http;
