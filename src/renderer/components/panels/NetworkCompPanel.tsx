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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Typography color="primary" variant="h6">
        List of Components
      </Typography>
      <CompList style={{ flexGrow: 1 }}>
        {networkComps.map((comp) => {
          return (
            <ListItem key={comp} button disableGutters>
              <ListItemIcon>
                <AltRouteIcon />
              </ListItemIcon>
              <ListItemText style={{ color: 'black' }} primary={comp} />
            </ListItem>
          );
        })}
      </CompList>
      <Button variant="contained" onClick={handleClickCreatePacket}>
        create a packet
      </Button>
    </div>
  );
};

export default NetworkCompPanel;
