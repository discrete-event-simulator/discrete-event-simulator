import CheckIcon from '@mui/icons-material/Check';
import HistoryIcon from '@mui/icons-material/History';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import SourceIcon from '@mui/icons-material/Source';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Switch,
  Tooltip,
} from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) => ({
  marginCenter: { marginLeft: '-3px', marginRight: 'auto', width:'100%' },
}));

const SidePanel = (props: any) => {
  const { panel, setPanel, dash, setDash } = props;
  const classes = useStyles();
  const sideComps = [
    { icon: SettingsInputComponentIcon },
    { icon: HistoryIcon },
    { icon: CheckIcon },
    { icon: SourceIcon, }
  ];

  const handleClick = (index: number) => {
    if (index === 3) {
      console.log("Opening network_graph.py with vscode");
      (window as any).electron.ipcRenderer.send('open-with-vscode', {
        filePath: "network_graph.py",
      });
    } else {
      setPanel(index);
    }
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
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
      <div style={{ flexGrow: 1 }}></div>{' '}
      <Tooltip title={'Toggle DarkMode'} placement={'right'}>
        <Switch
          color="default"
          classes={{ root: classes.marginCenter }}
          checked={dash.darkMode}
          onClick={()=> setDash({darkMode: !dash.darkMode})}
        />
      </Tooltip>
    </div>
  );
};

export default SidePanel;
