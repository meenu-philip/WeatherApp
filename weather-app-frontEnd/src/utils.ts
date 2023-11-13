/* method to convert the default kelvin temp to celsius
   Formula :  temperature in celsius  = (temperature in kelvin - 273.15)
*/
export const kelvinToCelsius = (value: string) => {
    const temp = parseInt(value);
    return parseFloat((temp - 273.15).toFixed(2)).toString(); // 
}

export const capitalizeFirstLetter = (word: any) => {
    if (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
}