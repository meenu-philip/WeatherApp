import axios from 'axios';

import { onRequest, onRequestError } from './requestInterceptor';
import { onResponse, onResponseError } from './responseInterceptor';

export const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 30000,
});

API.interceptors.request.use(onRequest as any, onRequestError);
API.interceptors.response.use(onResponse, onResponseError);
