import CheckIcon from '@mui/icons-material/Check';
import HistoryIcon from '@mui/icons-material/History';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import SourceIcon from '@mui/icons-material/Source';
import { List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import React from 'react';

const SidePanel = (props: any) => {
  const { panel, setPanel } = props;

  const sideComps = [
    { icon: SettingsInputComponentIcon, },
    { icon: HistoryIcon, },
    { icon: CheckIcon, },
    // { icon: SourceIcon, }
  ];

  const handleClick = (index: number) => {
    if (index === 3) {
      // const {shell} = require('electron');
      // shell.openPath("network_graph.py");
    } else {
      setPanel(index);
    }
  };
  
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
      <List>
        {sideComps.map((comp, index) => {
          return (
            <ListItem
              style={{
                padding: '0px',
                marginBottom: '8px',
              }}
              selected={index === panel}
              button
              key={index}
            >
              <ListItemButton
                style={{
                  height: '50px',
                  width: '100%',
                  padding: '0px',
                  justifyContent: 'center',
                }}
                onClick={() => handleClick(index)}
              >
                <ListItemIcon style={{ minWidth: '24px' }}>
                  <comp.icon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default SidePanel;
