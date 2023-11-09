/* 
This file includes component to create grids to show the retrived weather details
*/

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import CloudQueueOutlinedIcon from '@mui/icons-material/CloudQueueOutlined';
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { weatherDetailsList } from "../../constants";
import './weather.css'

const DemoPaper = styled(Paper)(({ theme }) => ({
    width: "auto",
    height: "auto",
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));

const style = {
    width: '100%',
    minWidth: 360,
    bgcolor: 'background.paper',
};

const WeatherGrid = (props: any) => {
    // const getIcon =(weatherIcon: string) => {
    //     return MuiIcons[weatherIcon]
    // }

    const createWeatherList = () => {
        return weatherDetailsList.map((element: any) => {
            return <>
                <ListItem >
                    <ListItemText primary={element.title} />
                    <ListItemText primary={element.title} />
                </ListItem>
                <Divider />
            </>


        });
    }

    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
            <DemoPaper variant="elevation">
                <div className="weather-forecast-container">
                    <ThunderstormOutlinedIcon className="weather-icon"/>
                    <div className="weather-temp-container">
                        <div className="weather-temp">31°<span className="after-temp">C</span></div>
                        <div className="weather-real-feel">
                            RealFeel®
                            31°
                        </div>
                    </div>
                </div>
            </DemoPaper>
            <DemoPaper variant="elevation">
                <List sx={style} component="nav" aria-label="mailbox folders">
                    {createWeatherList()}
                </List>
            </DemoPaper>
        </Stack>
    )
}

export default WeatherGrid;
