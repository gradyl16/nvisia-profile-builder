import { Divider as MuiDivider, useTheme } from '@mui/material';

export function Divider() {
    const theme = useTheme();

    return (
        <MuiDivider
            orientation="vertical"
            flexItem
            sx={{
                backgroundColor: theme.palette.primary.main,
                height: '45%',
                width: '2px',
                alignSelf: 'center',
                mx: 3,
            }}
        />
    );
}

export default Divider;
