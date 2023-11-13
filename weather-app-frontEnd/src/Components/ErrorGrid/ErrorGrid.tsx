/* 
This file includes component to create grids to show the retrived weather details
*/
import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import * as React from 'react';

interface IError {
    message: string
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ErrorGrid = (props: IError) => {

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
            {/* <DemoPaper variant="elevation"> */}
            <Snackbar open={open} autoHideDuration={6000}
                anchorOrigin={{ "horizontal": "right", "vertical": "top" }}
                onClose={handleClose} >
                <div className="weather-error-container" aria-label='weather-error-errorMessage'>
                    <div className="weather-temp-container">
                        <Alert severity="error" onClose={handleClose} >Error: {props.message}</Alert>
                    </div>
                </div>
            </Snackbar>
            {/* </DemoPaper> */}
        </Stack>
    )
}

export default ErrorGrid;
