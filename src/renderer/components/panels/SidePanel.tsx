import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import GridViewIcon from '@mui/icons-material/GridView';
import HistoryIcon from '@mui/icons-material/History';

const SidePanel = (props: any) => {
  const { panel, setPanel } = props;
  const inputClick = () => {};

  const historyClick = () => {};

  const gridClick = () => {};

  const sideComps = [
    {
      icon: SettingsInputComponentIcon,
      clickEvent: inputClick,
    },
    {
      icon: HistoryIcon,
      clickEvent: historyClick,
    },
  ];
  const handleClick = (index: number) => {
    setPanel(index);
  };
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
      <List>
        {sideComps.map((comp, index) => {
          return (
            <ListItem
              style={{
                padding: '1px',
                paddingTop: '8px',
                paddingBottom: '8px',
              }}
              selected={index == panel}
              button
            >
              <ListItemButton
                style={{
                  height: '40px',
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
