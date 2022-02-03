import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import HistoryIcon from '@mui/icons-material/History';
import CheckIcon from '@mui/icons-material/Check';

const SidePanel = (props: any) => {
  const { panel, setPanel } = props;
  const inputClick = () => {};

  const historyClick = () => {};

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
      icon: CheckIcon,
      clickEvent: () => {},
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
                padding: '0px',
                marginBottom: '8px',
              }}
              selected={index == panel}
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
