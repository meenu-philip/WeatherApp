import { weatherData } from '../../services/apis/mocks/weatherData';

interface IWeatherData {
    weather: any[],
    main: {},
    name: string,
}

export const fetchWeather = async () => {
    const response = weatherData//await request(`endpoint`, 'POST', { data: {}, params: {} });
    const formattedResponse = responseFormatter(response);
    return formattedResponse

}

const responseFormatter = (response: IWeatherData) => {
    const { weather, main, name } = response;
    const weather_data = {
        main: weather[0]['main'],
        description: weather[0]['description']
    }
    return { weather_data, details: main, name }
}