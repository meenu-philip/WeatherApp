/* 
This file includes component to create grids to show the retrived weather details
*/

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const DemoPaper = styled(Paper)(({ theme }) => ({
    width: "auto",
    height: "auto",
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));


const ErrorGrid = (props: any) => {

    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
            <DemoPaper variant="elevation">
                <div className="weather-error-container" aria-label='weather-error-errorMessage'>
                    <div className="weather-temp-container">
                        Error
                    </div>
                </div>
            </DemoPaper>
        </Stack>
    )
}

export default ErrorGrid;
