import { AxiosRequestConfig } from 'axios';

export const onRequest = (config: AxiosRequestConfig) => {
    const headers = { 'AuthKey': process.env.REACT_APP_SERVICE_KEY };
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
