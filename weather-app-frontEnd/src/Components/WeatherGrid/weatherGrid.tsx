/* 
This file includes component to create grids to show the retrived weather details
*/

import Stack from '@mui/material/Stack';
import { DemoPaper } from '../../Constants/styledThemes';
import './weather.css';

interface IWeatherGrid {
    data: {
        description?: string,
        error?: boolean
    }
}

const WeatherGrid = (props: IWeatherGrid) => {

    return (
        <Stack data-testid={'weather-grid'} direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
            <DemoPaper variant="elevation" aria-label='weather-grid-summary'>
                <div className="weather-forecast-container">
                    <div className="weather-temp-container">
                        <div className="weather-real-feel">
                            {props?.data?.description}
                        </div>
                    </div>
                </div>
            </DemoPaper>
        </Stack >
    )
}

export default WeatherGrid;
