/* 
    This file generates the landing page  
*/
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useContext, useState } from 'react';
import ErrorGrid from '../../Components/ErrorGrid/ErrorGrid';
import LocationsAutoComplete from '../../Components/LocationsAutoComplete/LocationsAutoComplete';
import WeatherGrid from '../../Components/WeatherGrid/WeatherGrid';
import { ERROR_MESSAGES } from '../../Constants/constants';
import { Item } from '../../Constants/styledThemes';
import { LoaderContext } from '../Layout/layout';
import { fetchWeather, getStatusError } from './fetchWeather';


const Weather = () => {

    const [weatherData, setWeatherData] = useState({});
    const [error, setError] = useState("");

    const { updateLoader } = useContext(LoaderContext);

    // Function to handle location change and fetch weather data
    const onLocationChange = async (location: string) => {
        updateLoader(true);
        try {
            const response = await fetchWeather();

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

    return (
        <div className="Weather">
            <Box sx={{ width: '100%' }}>
                {/* Grid container for layout */}
                <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {/* Location input */}
                    <Grid item xs={12}>
                        <Item>
                            {/* <LocationAutoComplete /> */}
                            {/* Render the LocationsAutoComplete component and pass the onSearchClick callback */}
                            <LocationsAutoComplete onSearchClick={(e: string) => onLocationChange(e)} />
                        </Item>
                    </Grid>
                    {/* Display weather or error message */}
                    <Grid item xs={12}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch"
                    >
                        <Item>
                            {/* Conditionally render either the WeatherGrid component with weather data or the ErrorGrid component with an error message */}
                            {!error ? <WeatherGrid data={weatherData} /> : <ErrorGrid message={error} />}
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Weather;
