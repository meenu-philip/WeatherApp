import { ERROR_MESSAGES, HTTP_STATUS } from '../../Constants/constants';
import request from '../../services/fetch/requestHandler';

export const fetchWeather = async (location: any) => {
    try {
        const response = await request(`weatherforecast?country=${location?.country}&city=${location?.city}`, 'GET', { data: {}, params: {} });
        const formattedResponse = responseFormatter(response);
        return formattedResponse;
    }
    catch (e) {
        return e
    }
}

//To format the retreived json, if required
const responseFormatter = (response: any) => {
    return response
}

// returns the error message for code
export const getStatusError = (errorCode: number) => {
    switch (errorCode) {
        case HTTP_STATUS.UNAUTHORIZED:
            return ERROR_MESSAGES.UnAuthorised
        case HTTP_STATUS.EXCEED_LIMIT:
            return ERROR_MESSAGES.LimitExceeded
        default:
            return ERROR_MESSAGES.UnknownError
    }
}