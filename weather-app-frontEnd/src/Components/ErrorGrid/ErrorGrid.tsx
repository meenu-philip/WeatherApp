/* 
This file includes component to create grids to show the retrived weather details
*/

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { DemoPaper } from '../../Constants/styledThemes';

interface IError {
    message: string
}
const ErrorGrid = (props: IError) => {

    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
            <DemoPaper variant="elevation">
                <div className="weather-error-container" aria-label='weather-error-errorMessage'>
                    <div className="weather-temp-container">
                        <Alert severity="error">Error: {props.message}</Alert>
                    </div>
                </div>
            </DemoPaper>
        </Stack>
    )
}

export default ErrorGrid;
