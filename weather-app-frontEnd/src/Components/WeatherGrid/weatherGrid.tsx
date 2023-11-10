/* 
This file includes component to create grids to show the retrived weather details
*/

import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import LightModeIcon from '@mui/icons-material/LightMode';
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { DemoPaper } from '../../Constants/styledThemes';
import { weatherDetailsList } from "../../constants";
import { kelvinToCelsius } from '../../utils';
import './weather.css';

interface IWeatherGrid {
    data: {
        details?: any,
        weather_data?: any,
        name?: string
    }
}

const WeatherGrid = (props: IWeatherGrid) => {

    //method to get the weather icon
    const getWeatherIcon = (icon: string) => {
        const iconType = icon?.toLowerCase().trim();
        switch (iconType) {
            case 'clouds':
                return <CloudQueueIcon className="weather-icon" />;
            case 'sun':
                return <LightModeIcon className="weather-icon" />;
            case 'rain':
                return <ThunderstormOutlinedIcon className="weather-icon" />;
            default:
                return <ThunderstormOutlinedIcon className="weather-icon" />;
        }
    }

    // method to generate the weather details
    const createWeatherList = () => {
        return weatherDetailsList.map((element: any) => {
            const getItemText = () => {
                let value = props?.data?.details ? props.data?.details[element.key] : "";
                if (value) {
                    if (element.convertToCelsius)
                        value = kelvinToCelsius(value)
                    return `${value} ${element.units}`
                }
                return value
            }
            return <>
                <ListItem >
                    <ListItemText primary={element.title} />
                    <ListItemText primary={getItemText()} />
                </ListItem>
                <Divider />
            </>


        });
    }

    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
            <DemoPaper variant="elevation">
                <div className="weather-forecast-container">

                    <div className="weather-temp-container">
                        {getWeatherIcon(props?.data.weather_data?.main)}
                        <div className="weather-temp">{kelvinToCelsius(props.data?.details?.temp)}</div>
                        <div className="weather-real-feel">
                            {props?.data?.weather_data?.description}
                        </div>
                        <div>{props?.data?.name}</div>
                    </div>
                </div>
            </DemoPaper>
            <DemoPaper variant="elevation">
                <List sx={{
                    width: '100%',
                    minWidth: 360,
                    bgcolor: 'background.paper',
                }} component="nav" aria-label="mailbox folders">
                    {createWeatherList()}
                </List>
            </DemoPaper>
        </Stack >
    )
}

export default WeatherGrid;
