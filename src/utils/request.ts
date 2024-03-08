import { App } from 'vue';
import axios , { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig }from "axios";
import { ElMessage } from "element-plus";

declare module "axios" {
  interface AxiosResponse<T = any> {
    code: number;
    message: string;
    data: T;
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $http: AxiosInstance;
  }
}

const baseConfig: AxiosRequestConfig = {
  baseURL: setBaseUrl(),
  timeout: 20000,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
};

function setBaseUrl() {
// 此处可根据 环境 配置不同 baseUrl
  const { MODE, VITE_APP_BASE_URL, VITE_APP_PORT }  = import.meta.env;
  if (MODE === 'development') {
    /** */
  }
  return `${VITE_APP_BASE_URL}:${VITE_APP_PORT}`;
}
const formatRequestConfig = (config: InternalAxiosRequestConfig) => {
  let auth =  JSON.parse(localStorage.getItem("TOKEN")!)  || {};
  config.headers.Authorization = `Bearer ${auth.token || ''}`
  return config;
};

const formatResponseData = (response: AxiosResponse) => {
  // 响应拦截器
  return response.data;
};

const err = ({ response }: { response: any}) => {
  if (!response) {
    ElMessage.error('networkError');
  } else {
    const { status } = response;
    switch (status) {
      case 200:
      console.log('正常请求');
        break;
      case 429:
        break;
      case 403:
        break;
      case 401:
        break;
      case 400:
        break;
      case 500:
        ElMessage.error("服务器内部错误")
        break;
      default:
        break;
    }
  }
  return Promise.reject(response);
};
// 创建携带 baseUrl 的 axios 实例
const service = axios.create(baseConfig);
service.interceptors.request.use(formatRequestConfig, err);
service.interceptors.response.use(formatResponseData, err);

// 创建一个初始 axios
const baseService = axios.create({
  baseURL: '',
  timeout: 20000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});
baseService.interceptors.request.use(formatRequestConfig, err);
baseService.interceptors.response.use(formatResponseData, err);

const installer = {
  install(vm: App) {
    vm.config.globalProperties.$http = baseService;
    vm.config.globalProperties.$axios = service;
  },
};

export {
  installer as VueAxios,
  service as axios,
  baseService as http,
};
