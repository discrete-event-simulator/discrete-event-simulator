import React from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Modal,
} from '@mui/material';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import { styled } from '@mui/styles';
//@ts-ignore
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


const CompList = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

const NetworkCompPanel = ({ networkComps }) => {
  const handleClickCreatePacket = () => {
    (window as any).electron.ipcRenderer.send('create-packet', [
      'hello',
      'test',
      'any number here',
    ]);
  };

  // const [componentSettings, SetComponentSettings] = React.useState(networkComps?.map((comp) => {
  //   return { [comp] : {} }
  // }));

  // const handleClose = (data) => {
  //   SetComponentSettings({
  //     [data.name] : data
  //   })
  // }

  // const data = {open, handleClose, name};

  // const ModalComponent = () => {
  //   return(
  //     <Modal
  //       open={open}
  //       onClose={() => handleClose()}
  //     >
  //       <Box sx={style}>
  //         <Typography color="primary" variant="h6" component="h2">
  //           Component:
  //         </Typography>
  //         <Typography color="black" sx={{ mt: 2 }}>
  //           {comp}
  //         </Typography>
  //       </Box>
  //     </Modal>
  //   )
  // }

  const [componentSettings, SetComponentSettings] = React.useState('');
  const handleOpen = (data) => SetComponentSettings(data);
  const handleClose = (data) => SetComponentSettings('');

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    outline: 'none',
    borderRadius: '10px', 
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Typography color="primary" variant="h6" style={{ marginTop: '16px' }}>
        List of Components
      </Typography>
      <Droppable droppableId={'0'} isDropDisabled={true}>
        {(provided) => (
          <List style={{ flexGrow: 1 }} ref={provided.innerRef}>
            {networkComps?.map((comp, index) => {
              return (
                <Draggable draggableId={comp} key={comp} index={index}>
                  {(provided1) => (
                    <ListItem
                      key={comp}
                      button
                      role={undefined}
                      disableGutters
                      ContainerComponent="li"
                      ref={provided1.innerRef}
                      {...provided1.draggableProps}
                      {...provided1.dragHandleProps}
                      style={{
                        paddingTop: '0px',
                        paddingBottom: '0px',
                      }}
                    >
                      <ListItemButton
                        style={{
                          height: '50px',
                          width: '100%',
                          padding: '0px',
                          justifyContent: 'center',
                        }}
                        onClick={() => handleOpen(comp)}
                      >
                        <ListItemIcon>
                          <AltRouteIcon />
                        </ListItemIcon>
                        <ListItemText style={{ color: 'black' }} primary={comp} />
                      </ListItemButton>
                      <Modal
                        open={componentSettings === comp}
                        onClose={() => handleClose(comp)}
                      >
                        <Box sx={modalStyle}>
                          <Typography color="primary" variant="h6" component="h2">
                            Component:
                          </Typography>
                          <Typography color="black" sx={{ mt: 2 }}>
                            {comp}
                          </Typography>
                        </Box>
                      </Modal>
                    </ListItem>
                  )}
                </Draggable>
              );
            })}
          </List>
        )}
      </Droppable>
      <Button variant="contained" onClick={handleClickCreatePacket}>
        create a packet
      </Button>
    </div>
  );
};

export default NetworkCompPanel;
