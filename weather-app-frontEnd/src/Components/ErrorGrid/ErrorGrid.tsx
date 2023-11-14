/* 
This file includes component to show error as toast
*/
import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import * as React from 'react';


// Interface for error props
interface IError {
    message: string
}

// Alert component
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// ErrorGrid component
const ErrorGrid = (props: IError) => {

    const [open, setOpen] = React.useState(true);

    // Function to handle closing of Alert
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
            <Snackbar open={open} autoHideDuration={6000}
                anchorOrigin={{ "horizontal": "right", "vertical": "top" }}
                onClose={handleClose} >
                <div className="weather-error-container" aria-label='weather-error-errorMessage'>
                    <div className="weather-temp-container">
                        <Alert severity="error" onClose={handleClose} >Error: {props.message}</Alert>
                    </div>
                </div>
            </Snackbar>
        </Stack>
    )
}

export default ErrorGrid;
