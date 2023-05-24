import type {AxiosInstance, AxiosRequestConfig} from 'axios';
import CustomAxiosInstance from './instance';

export type RequestMethod = 'get' | 'post' | 'put' | 'delete';

export interface BackendResultConfig {
  codeKey: string;
  dataKey: string;
  msgKey: string;
  successCode: number | string;
}

export interface RequestParam {
  url: string;
  method?: RequestMethod;
  data?: any;
  params?: any;
  axiosConfig?: AxiosRequestConfig;
}

export interface RequestError {
  type: string;
  code: string | number;
  msg: string;
}
export interface FailedResult {
  error: RequestError;
  data: null;
}

export interface SuccessResult<T = any> {
  error: null;
  data: T;
}

export type RequestResult<T = any> = SuccessResult<T> | FailedResult;

export function createRequest(axiosConfig: AxiosRequestConfig) {
  const customInstance = new CustomAxiosInstance(axiosConfig);

  async function asyncRequest<T>(
    params: RequestParam,
  ): Promise<RequestResult<T>> {
    const {url} = params;
    const method = params.method || 'get';
    const {instance} = customInstance;

    const res = await getRequestResponse({
      instance,
      method,
      url,
      data: params.data,
      config: params.axiosConfig,
    });
    return res;
  }

  function get<T>(url: string, params?: any, config?: AxiosRequestConfig) {
    return asyncRequest<T>({
      url,
      method: 'get',
      axiosConfig: {...config, params},
    });
  }

  function post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return asyncRequest<T>({url, method: 'post', data, axiosConfig: config});
  }

  function put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return asyncRequest<T>({url, method: 'put', data, axiosConfig: config});
  }

  function handleDelete<T>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig,
  ) {
    return asyncRequest<T>({
      url,
      method: 'delete',
      axiosConfig: {...config, params},
    });
  }

  return {
    get,
    post,
    put,
    delete: handleDelete,
  };
}

async function getRequestResponse(params: {
  instance: AxiosInstance;
  method: RequestMethod;
  url: string;
  data?: any;
  config?: AxiosRequestConfig;
}) {
  const {instance, method, url, data, config} = params;

  let res: any;
  if (method === 'get' || method === 'delete') {
    res = await instance[method](url, config);
  } else {
    res = await instance[method](url, data, config);
  }

  return res;
}
