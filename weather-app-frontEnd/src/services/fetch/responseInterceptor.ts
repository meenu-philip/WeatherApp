import { AxiosResponse } from 'axios';

enum HTTP_STATUS {
    SUCCESS = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    FORBIDDEN = 403,
    SERVER_ERROR = 500,
    UNAUTHORIZED = 401,
    ACCEPTED = 202,
    NOT_MODIFIED = 304,
    EXCEED_LIMIT = 429
}

export function onResponseError(error: any) {
    if (error.response?.status === HTTP_STATUS.SERVER_ERROR ||
        error.response?.status === HTTP_STATUS.UNAUTHORIZED ||
        error.response?.status === HTTP_STATUS.EXCEED_LIMIT) {
        return Promise.reject(error.response);
    }
    return Promise.reject(error?.response || error?.message);
}

export function onResponse(response: AxiosResponse) {
    if (
        response.status === HTTP_STATUS.SUCCESS ||
        response.status === HTTP_STATUS.CREATED ||
        response.status === HTTP_STATUS.ACCEPTED ||
        response.status === HTTP_STATUS.NOT_MODIFIED
    ) {
        return Promise.resolve(response.data);
    } else {
        return onResponseError(response);
    }
}
