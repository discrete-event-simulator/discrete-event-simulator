import React from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
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

const NetworkCompPanel = () => {
  const handleClickCreatePacket = () => {
    (window as any).electron.ipcRenderer.send('create-packet', [
      'hello',
      'test',
      'any number here',
    ]);
  };
  const networkComps = ['Wire', 'DistPacketGenerator', 'Splitter'];
  const onDragEnd = (props: any) => {
    const { source, destination } = props;
    console.log('End', source, destination);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Typography color="primary" variant="h6">
        List of Components
      </Typography>
      <Droppable droppableId={'0'} isDropDisabled={true}>
        {(provided) => (
          <List style={{ flexGrow: 1 }} ref={provided.innerRef}>
            {networkComps.map((comp, index) => {
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
                    >
                      <ListItemIcon>
                        <AltRouteIcon />
                      </ListItemIcon>
                      <ListItemText style={{ color: 'black' }} primary={comp} />
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
