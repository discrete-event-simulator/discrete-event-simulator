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
import ReactFlow, {
  ReactFlowProvider,
  Controls,
} from 'react-flow-renderer'
//@ts-ignore
import { DragDropContext } from 'react-beautiful-dnd';
const useStyles = makeStyles((theme) => ({
  drawer: {
    display: 'flex',
    width: 50,
  },
}));
const networkComps = ['Wire', 'DistPacketGenerator', 'Splitter'];
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
  const [newNode, setNewNode] = useState(null);
  const onDragEnd = (props: any) => {
    const { source, destination } = props;
    console.log('End', source, destination);
    if (destination.droppableId === 'graph') {
      setNewNode(networkComps[source.index]);
    }
  };
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
                }}
              >
                <NetworkCompPanel networkComps={networkComps} />
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
                <GraphPanel newNode={newNode} />
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
