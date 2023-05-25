import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import {
  handleAxiosError,
  handleBackendError,
  handleExpired,
  handleResponseError,
  handleServiceResult,
} from './helpers';

interface BackendResultConfig {
  codeKey: string;
  dataKey: string;
  msgKey: string;
  successCode: number | string;
}

export default class CustomAxiosInstance {
  instance: AxiosInstance;
  backendConfig: BackendResultConfig;

  constructor(
    axiosConfig: AxiosRequestConfig,
    backendConfig: BackendResultConfig = {
      codeKey: 'code',
      dataKey: 'data',
      msgKey: 'message',
      successCode: 0,
    },
  ) {
    this.backendConfig = backendConfig;
    this.instance = axios.create(axiosConfig);
    this.setInterceptor();
  }

  setInterceptor() {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // const token = load('token');
        // config.headers.token = token;
        return config;
      },
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error, null);
      },
    );
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const {status} = response;
        if (status === 200 || status < 300 || status === 304) {
          let backend = response.data;

          if (response.data.type === 'application/vnd.ms-excel') {
            backend = {data: response.data, code: 0};
          }
          const {codeKey, dataKey, successCode} = this.backendConfig;

          if (backend[codeKey] === successCode) {
            return handleServiceResult(null, backend[dataKey]);
          }

          // 账号过期
          if (backend[codeKey] === '401') {
            handleExpired();
          }

          const error = handleBackendError(backend, this.backendConfig);

          return handleServiceResult(error, null);
        }
        const error = handleResponseError(response);

        return handleServiceResult(error, null);
      },
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error, null);
      },
    );
  }
}
