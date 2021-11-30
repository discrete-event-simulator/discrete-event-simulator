import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import GridViewIcon from '@mui/icons-material/GridView';
import HistoryIcon from '@mui/icons-material/History';

const SidePanel = () => {
  const inputClick = () => {
    
  };

  const historyClick = () => {

  };

  const gridClick = () => {

  };

  const sideComps = [
    {
      icon: SettingsInputComponentIcon,
      clickEvent: inputClick,
    },
    {
      icon: HistoryIcon,
      clickEvent: historyClick,
    },
    {
      icon: GridViewIcon,
      clickEvent: gridClick,
    },
  ];

  return (
    <div style={{display: 'inline-flex', flexDirection: 'column'}}>
      <List>
        {sideComps.map((comp) => {
          return (
            <ListItem style = {{ padding: "1px", paddingTop: "8px", paddingBottom: "8px" }}>
              <ListItemButton style= {{ height: "40px", width: "100%", padding: "0px", justifyContent: "center" }} onClick={comp.clickEvent}>
                <ListItemIcon style = {{ minWidth: "24px" }}>
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
