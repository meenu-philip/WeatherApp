/* 
This file includes component to create grids to show the retrived weather details
*/

import Stack from '@mui/material/Stack';
import { capitalizeFirstLetter } from '../../utils';
import './weather.css';

interface IWeatherGrid {
    data: {
        description?: string,
        error?: boolean
    }
}

const WeatherGrid = (props: IWeatherGrid) => {

    return (
        <Stack data-testid={'weather-grid'} >
            <div className="weather-forecast-container">
                <div className="weather-temp-container">
                    <div className="weather-real-feel">
                        Forecasted Weather : <b>{capitalizeFirstLetter(props?.data?.description)}</b>
                    </div>
                </div>
            </div>
        </Stack >
    )
}

export default WeatherGrid;
