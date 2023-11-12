export const weatherDetailsList = [
    {
        title: "Feels like",
        key: 'feels_like',
        units: "°C",
        convertToCelsius: true
    },
    {
        title: "Min Temp",
        key: 'temp_min',
        units: "°C",
        convertToCelsius: true
    },
    {
        title: "Max Temp",
        key: 'temp_max',
        units: "°C",
        convertToCelsius: true
    },
    {
        title: "Humidity",
        key: 'humidity',
        units: "",
        convertToCelsius: true
    },
    {
        title: 'Pressure',
        key: 'pressure',
        units: "",
    }

]

export const ERROR_MESSAGES = {
    NotAvailable: "Data not available",
    LimitExceeded: "You have reached the limit. Please try again after an hour",
    NetworkError: "Network Erro. Please try again later",
    UnAuthorised: "You are not authorised to call this request. Please contact support",
    UnknownError: "Unexpected Error. Please try again later"
}
export enum HTTP_STATUS {
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