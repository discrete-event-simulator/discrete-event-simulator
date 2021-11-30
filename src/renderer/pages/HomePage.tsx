import { Container, Grid } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import NetworkCompPanel from 'renderer/components/panels/NetworkCompPanel';
import ActionPanel from 'renderer/components/panels/ActionPanel';
import GraphPanel from 'renderer/components/panels/GraphPanel';
import SidePanel from 'renderer/components/panels/SidePanel';
const HomePage = () => {
  useEffect(() => {
    (window as any).electron.ipcRenderer.on(
      'reply:create-packet',
      (data: any) => {
        console.log('received', data);
      }
    );
  }, []);

  return (
    <Container style = {{ padding: '0px' }}>
      <Grid container spacing={2}>
        <Grid 
            item
            xs={0.75}
            sm={0.75}
            style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
          >
            <SidePanel />
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
        >
          <NetworkCompPanel />
        </Grid>
        <Grid
          item
          xs={12}
          sm={9}
          style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
        >
          <ActionPanel />
          <GraphPanel />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
