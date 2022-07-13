import { Box, Button } from "@mui/material";
import {Delete} from '@mui/icons-material';

function BodyDeleteModal({elemento, ftndelete}){
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        justifyContent: 'center',
        
      };
    return (
        <Box sx={style}>
            <h2 id="parent-modal-title"> Are you sure to remove this {elemento} ?</h2>
            <Button variant="outlined" startIcon={<Delete />}>
                Cancelar
            </Button>
            <Button onClick={(e) => ftndelete(e, elemento.id)} variant="outlined" startIcon={<Delete />}>
                Delete
            </Button>
        </Box>
    )
}

export default BodyDeleteModal;