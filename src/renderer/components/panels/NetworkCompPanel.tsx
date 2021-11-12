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

const NetworkCompPanel = () => {
  const handleClickCreatePacket = () => {
    (window as any).electron.ipcRenderer.send('create-packet', [
      'hello',
      'test',
      'any number here',
    ]);
  };
  const networkComps = [
    'Wire',
    'DistPacketGenerator',
    'PacketSink',
    'Splitter',
    'Demux',
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Typography color="primary" variant="h6">
        List of Components
      </Typography>
      <List style={{ flexGrow: 1 }}>
        {networkComps.map((comp) => {
          console.log(comp);
          return (
            <ListItem key={comp} button disableGutters>
              <ListItemIcon>
                <AltRouteIcon />
              </ListItemIcon>
              <ListItemText style={{ color: 'black' }} primary={comp} />
            </ListItem>
          );
        })}
      </List>
      <Button variant="contained" onClick={() => handleClickCreatePacket}>
        create a packet
      </Button>
    </div>
  );
};

export default NetworkCompPanel;
