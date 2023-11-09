/* 
    This file generates the landing page  
*/

import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LocationsAutoComplete from '../../Components/LocationsAutoComplete/LocationsAutoComplete';
import WeatherGrid from '../../Components/WeatherGrid/weatherGrid';
import {fetchWeather} from './fetchWeather';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Weather = () => {

    const onLocationChange = async(location: string) => {
        console.log('in page ', location);
        const response = await fetchWeather()//request(`endpoint`, 'POST', { data: {}, params: {} });

    }
    
    return (
        <div className="Weather">
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <Item>
                            <LocationsAutoComplete onSearchClick={(e: string) => onLocationChange(e)}/>
                        </Item>
                    </Grid>
                    <Grid item xs={12}
                    container
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch"
                      >
                        <Item>
                            <WeatherGrid />
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Weather;
