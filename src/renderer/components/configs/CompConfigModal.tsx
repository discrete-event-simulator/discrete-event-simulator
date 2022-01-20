import React from 'react'
import {Modal, Box, Typography} from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const CompConfigModal = ({component, handleClose}) => {
  return (
    <Modal
        open={component !== ""}
        onClose={() => handleClose()}
      >
        <Box sx={style}>
          <Typography color="primary" variant="h6" component="h2">
            Component:
          </Typography>
          <Typography color="black" sx={{ mt: 2 }}>
            {component}
          </Typography>
        </Box>
      </Modal>
  )
}

export default CompConfigModal
