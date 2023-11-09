import { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

export const onRequest = (config: AxiosRequestConfig) => {
  const headers = {};
  const request: AxiosRequestConfig = {
        method: 'GET',
        ...config,
        headers: {
            'Content-type': 'application/json',
            ...config.headers,
            ...headers,
        },
    };
    return request;
};

export const onRequestError = (error: any) => Promise.reject(error);
