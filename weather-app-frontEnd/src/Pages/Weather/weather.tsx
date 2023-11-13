/* 
    This file generates the landing page  
*/
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Fragment, useContext, useState } from 'react';
import ErrorGrid from '../../Components/ErrorGrid/ErrorGrid';
import { LocationsAutocomplete } from '../../Components/LocationsAutoComplete/LocationsAutoComplete';
import WeatherGrid from '../../Components/WeatherGrid/WeatherGrid';
import { ERROR_MESSAGES } from '../../Constants/constants';
import { Item } from '../../Constants/styledThemes';
import { LoaderContext } from '../Layout/Layout';
import './Weather.css';
import { fetchWeather, getStatusError } from './fetchWeather';


const Weather = () => {

    const [weatherData, setWeatherData] = useState({});
    const [error, setError] = useState("");

    const { updateLoader } = useContext(LoaderContext);

    // Function to handle location change and fetch weather data
    const onLocationChange = async (location: any) => {
        updateLoader(true);
        try {
            const response = await fetchWeather(location);

            // Check if response is an object and has a 'description' property
            if (typeof (response) === 'object' && response['description']) {
                setWeatherData(response);
                setError("");
            }
            // Check if response is an object and has an 'error' property
            else if (typeof (response) === 'object' && response['error']) {
                setError(ERROR_MESSAGES.NotAvailable);
            }
            // Check if response is an object and has a 'status' property
            else if (typeof (response) === 'object' && response['status']) {
                setError(getStatusError(response['status']));
            }
            // Handle other cases where response is not an object or doesn't have specific properties
            else {
                setError(response || response['error'] || ERROR_MESSAGES.UnknownError);
            }
        } catch (e: any) {
            setError(e);
        }
        updateLoader(false);
    }

    const onLocationEmpty = () => {
        setWeatherData({});
        setError("");
    }

    return (
        <div className="weather-page">
            <Box sx={{ width: '100%' }} className='weather-box'>
                <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='weather-grid'>
                    <Grid item xs={12}>
                        <Item>
                            {/* Render the LocationsAutoComplete component and pass the onSearchClick callback */}
                            <LocationsAutocomplete onLocationSelect={(location: object) => onLocationChange(location)}
                                onLocationClear={() => onLocationEmpty()} aria-label='weather-locationAutocomplete' />
                        </Item>
                    </Grid>
                    {/* Display weather or error message */}
                    {(Object.keys(weatherData).length && !error) ?
                        <Grid item xs={12} data-testid-='weather-data'>
                            <Item>
                                {/* Conditionally render either the WeatherGrid component with weather data or the ErrorGrid component with an error message */}
                                {!error ? <WeatherGrid data={weatherData} /> : <ErrorGrid message={error} />}
                            </Item>
                        </Grid> : <Fragment />}
                </Grid>
                {error && <ErrorGrid message={error} />}

            </Box>
        </div>
    );
}

export default Weather;
