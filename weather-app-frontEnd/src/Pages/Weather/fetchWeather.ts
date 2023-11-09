import request from  '../../services/fetch/requestHandler'
export const fetchWeather = async() => {
   const response =  await request(`endpoint`, 'POST', { data: {}, params: {} });
   const formattedResponse = responseFormatter(response);
   return formattedResponse

}

const responseFormatter = (response: any) => {
    return {}
}