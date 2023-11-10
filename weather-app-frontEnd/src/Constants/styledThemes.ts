import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,

}));

export const DemoPaper = styled(Paper)(({ theme }) => ({
    width: "auto",
    height: "auto",
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));