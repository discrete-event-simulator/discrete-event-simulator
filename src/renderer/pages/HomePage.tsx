import { Container, Grid, Drawer } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import NetworkCompPanel from 'renderer/components/panels/NetworkCompPanel';
import ActionPanel from 'renderer/components/panels/ActionPanel';
import GraphPanel from 'renderer/components/panels/GraphPanel';
import SidePanel from 'renderer/components/panels/SidePanel';
import { makeStyles } from '@mui/styles';
import DemoPage from './Demo';
import TabPanel from '../components/panels/TabPanel';

const useStyles = makeStyles((theme) => ({
  drawer: {
    display: 'flex',
    width: 50,
  },
}));

const HomePage = () => {
  useEffect(() => {
    (window as any).electron.ipcRenderer.on(
      'reply:create-packet',
      (data: any) => {
        console.log('received', data);
      }
    );
  }, []);
  const classes = useStyles();
  const [panel, setPanel] = useState(0);

  return (
    <Container
      style={{
        padding: '0px',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
      }}
    >
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawer,
        }}
      >
        <SidePanel panel={panel} setPanel={setPanel} />
      </Drawer>
      <TabPanel value={panel} index={0}>
        <Container>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={3}
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
              }}
            >
              <NetworkCompPanel />
            </Grid>
            <Grid
              item
              xs={12}
              sm={9}
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
              }}
            >
              <ActionPanel />
            </Grid>
          </Grid>
        </Container>
      </TabPanel>
      <TabPanel value={panel} index={1}>
        <DemoPage />
      </TabPanel>
    </Container>
  );
};

export default HomePage;
