import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import './Loader.css'; // Import your CSS file for styling

export const Loader = () => {
    return (
        <div className="loader-overlay">
            <div className="loader-content">
                <Box sx={{ display: 'flex' }}>

                    <CircularProgress aria-label='loader' />
                </Box>

            </div>
        </div>
    )
};

export default Loader;
