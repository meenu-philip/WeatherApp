/* 
    This file generates the landing page  
*/
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Fragment, useState } from 'react';
import LocationsAutoComplete from '../../Components/LocationsAutoComplete/LocationsAutoComplete';
import WeatherGrid from '../../Components/WeatherGrid/weatherGrid';
import { Item } from '../../Constants/styledThemes';
import { fetchWeather } from './fetchWeather';


const Weather = () => {

    const [weatherData, setWeatherData] = useState({});
    const [isError, setError] = useState(true);


    const onLocationChange = async (location: string) => {
        const response = await fetchWeather()//request(`endpoint`, 'POST', { data: {}, params: {} });
        setWeatherData(response);
        setError(false)
    }

    return (
        <div className="Weather">
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <Item>
                            <LocationsAutoComplete onSearchClick={(e: string) => onLocationChange(e)} />
                        </Item>
                    </Grid>
                    <Grid item xs={12}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch"
                    >
                        <Item>
                            {!isError ? <WeatherGrid data={weatherData} /> : <Fragment />}
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Weather;
