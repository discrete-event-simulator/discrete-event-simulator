// @ts-nocheck
import AltRouteIcon from '@mui/icons-material/AltRoute';
import { Typography } from '@mui/material';
import { styled } from '@mui/styles';
import React from 'react';

import { whiteListComponents } from '../settings/componentSettings';

const NetworkCompPanel = () => {
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        height: '100%',
        overflow: 'auto',
        maxHeight: '100vh',
      }}
    >
      <div
        style={{
          padding: '15px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          color="primary"
          variant="h6"
          style={{ marginBottom: '16px' }}
        >
          Network Components
        </Typography>
        <div style={{ flexGrow: 1 }}>
          {whiteListComponents?.map((comp, index) => {
            return (
              <div
                style={{
                  textAlign: 'center',
                  borderRadius: '5px',
                  border: '1px solid',
                  padding: '10px',
                  display: 'flex',
                  marginBottom: '10px',
                  cursor: 'pointer',
                  overflow: 'hidden',
                }}
                onDragStart={(event) => {
                  if (comp === 'Splitter') {
                    onDragStart(event, 'splitterNode', comp);
                  } else if (comp === 'ServerMonitor') {
                    onDragStart(event, 'bareNode', comp);
                  } else {
                    onDragStart(event, 'default', comp);
                  }
                }}
                draggable
              >
                <AltRouteIcon />
                {comp}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NetworkCompPanel;
