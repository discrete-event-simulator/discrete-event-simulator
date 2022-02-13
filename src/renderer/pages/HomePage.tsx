import { Container, Grid, Drawer } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import NetworkCompPanel from 'renderer/components/panels/NetworkCompPanel';
import CompSettingPanel from 'renderer/components/panels/CompSettingPanel';
import GraphPanel from 'renderer/components/panels/GraphPanel';
import SidePanel from 'renderer/components/panels/SidePanel';
import { makeStyles } from '@mui/styles';
import DemoPage from './Demo';
import TabPanel from '../components/panels/TabPanel';
import ReactFlow, { ReactFlowProvider, Controls } from 'react-flow-renderer';
const useStyles = makeStyles((theme) => ({
  drawer: {
    display: 'flex',
    width: 50,
  },
}));
const networkComps = [
  'Wire',
  'DistPacketGenerator',
  'PacketSink',
  'TCPPacketGenerator',
  'TCPSink',
  'PacketSwitch',
  'Flow',
  'CongestionControl',
  'TCPCubic',
  'Packet',
  'ProxyPacketGenerator',
  'ProxySink',
  'TracePacketGenerator',
  'Port',
  'REDPort',
  'DRRServer',
  'ServerMonitor',
  'SPServer',
  'VirtualClockServer',
  'WFQServer',
  'TokenBucketShaper',
  'TwoRateTokenBucketShaper',
  'TrTCM',
  'Splitter',
  'Timer',
];

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
  const [currentComponent, setCurrentComponent] = useState(null);
  const initialElements = [
    {
      id: '1',
      type: 'input',
      data: {
        label: 'Start',
        type: 'Start',
      },
      position: { x: 100, y: 100 },
    },
  ];

  const [elements, setElements] = useState(initialElements);

  return (
    <Container
      style={{
        padding: '0px',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
      }}
      maxWidth={false}
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
        <Container maxWidth={false}>
          <ReactFlowProvider>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={3}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100vh',
                  overflowY: 'auto',
                  maxWidth: '300px',
                }}
              >
                <TabPanel
                  value={currentComponent === null ? 0 : 1}
                  index={0}
                  style={{
                    display: 'flex',
                    flexGrow: 1,
                    flexDirection: 'column',
                    height: '100vh',
                    maxWidth: '300px',
                  }}
                >
                  <NetworkCompPanel networkComps={networkComps} />
                </TabPanel>
                <TabPanel
                  value={currentComponent === null ? 0 : 1}
                  index={1}
                  style={{
                    display: 'flex',
                    flexGrow: 1,
                    flexDirection: 'column',
                    height: '100vh',
                    maxWidth: '300px',
                  }}
                >
                  <CompSettingPanel
                    currentComponent={currentComponent}
                    setElements={setElements}
                    setCurrentComponent={setCurrentComponent}
                  />
                </TabPanel>
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
                <GraphPanel
                  initialElements={initialElements}
                  setCurrentComponent={setCurrentComponent}
                  elements={elements}
                  setElements={setElements}
                />
              </Grid>
            </Grid>
          </ReactFlowProvider>
        </Container>
      </TabPanel>
      <TabPanel value={panel} index={1}>
        <DemoPage />
      </TabPanel>
    </Container>
  );
};

export default HomePage;
