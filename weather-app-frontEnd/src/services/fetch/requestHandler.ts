import { API } from '.';

const requestHandler = (url: string, method: string, { data, params }: any) =>
    Promise.resolve(
        API.request({
            url,
            method,
            data,
            params,
        }),
    );

export default requestHandler;
