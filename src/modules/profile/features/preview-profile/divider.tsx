import { Divider as MuiDivider } from '@mui/material';

export function Divider() {
    return (
        <MuiDivider
            orientation="vertical"
            flexItem
            sx={{
                width: '2px',
                height: '100%',
                borderRight: '2px dotted',
                borderColor: '#d2d2d2',
            }}
        />
    );
}

export default Divider;
