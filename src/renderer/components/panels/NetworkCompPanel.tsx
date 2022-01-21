// @ts-nocheck
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
import { borderRadius } from '@mui/system';

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

  const onDragStart = (event, nodeType, name) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/reactflowname', name);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Typography color="primary" variant="h6" style={{ marginTop: '16px' }}>
        List of Components
      </Typography>
      <div style={{ flexGrow: 1, color: 'black' }}>
        {networkComps?.map((comp, index) => {
          return (
            <div
              style={{
                textAlign: 'center',
                borderRadius: '5px',
                border: '1px solid',
                padding: '10px',
                display: 'flex',
                marginBottom: '5px',
              }}
              onDragStart={(event) => onDragStart(event, 'default', comp)}
              draggable
            >
              <AltRouteIcon />
              {comp}
            </div>
          );
        })}
      </div>

      <Button variant="contained" onClick={handleClickCreatePacket}>
        create a packet
      </Button>
    </div>
  );
};

export default NetworkCompPanel;
