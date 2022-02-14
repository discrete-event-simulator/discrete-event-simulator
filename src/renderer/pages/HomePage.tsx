import { Container, Grid, Drawer } from '@mui/material';
import React from 'react';
import { useEffect, useState, useRef } from 'react';
import NetworkCompPanel from 'renderer/components/panels/NetworkCompPanel';
import CompSettingPanel from 'renderer/components/panels/CompSettingPanel';
import GraphPanel from 'renderer/components/panels/GraphPanel';
import SidePanel from 'renderer/components/panels/SidePanel';
import { makeStyles } from '@mui/styles';
import DemoPage from './Demo';
import TabPanel from '../components/panels/TabPanel';
import clsx from 'clsx';
import { Theme } from '@mui/system';
import ReactFlow, { ReactFlowProvider, Controls } from 'react-flow-renderer';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    background: '#E4E4E4',
    display: 'flex',
    width: 50,
  },
  drawerPaper: {
    width: drawerWidth,
    height: '100vh',
    position: 'relative',
  },
  dragger: {
    width: '3px',
    cursor: 'ew-resize',
    padding: '4px 0 0',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: '#f4f7f9',
    opacity: 0.1,
    userSelect: 'none',
  },
  draggerHover: {
    opacity: 1,
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
  const resizing = useRef(false);
  const [panel, setPanel] = useState(0);
  const [drawerState, setDrawerState] = useState({
    mobileOpen: false,
    isResizing: false,
    lastDownX: 0,
    newWidth: {},
    newSetWidth: {},
    hovering: false,
  });
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

  const handleMouseup = (e) => {
    e.stopPropagation();
    resizing.current = false;
    document.removeEventListener('mouseup', (e) => handleMouseup(e));
    document.removeEventListener('mousemove', (e) => handleMousemove(e));
    setInterval(function () {
      window.dispatchEvent(new Event('resize'));
    }, 1);
  };
  const handleMousedown = (e) => {
    e.preventDefault();
    resizing.current = true;

    document.addEventListener('mouseup', (e) => handleMouseup(e));
    document.addEventListener('mousemove', (e) => handleMousemove(e));
  };

  const handleMousemove = (e) => {
    // we don't want to do anything if we aren't resizing.

    if (!resizing.current) {
      return;
    }
    const offsetRight = e.clientX - 55;
    const minWidth = 200;
    const maxWidth = 400;

    if (offsetRight > minWidth && offsetRight < maxWidth) {
      setDrawerState((last) => {
        return {
          ...last,
          newSetWidth: {
            width: offsetRight,
          },
        };
      });
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
      <TabPanel
        value={panel}
        index={0}
        style={{ display: 'flex', flexDirection: 'row' }}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <ReactFlowProvider>
            <Drawer
              variant="permanent"
              open
              anchor={'left'}
              classes={{
                paper: classes.drawerPaper,
              }}
              PaperProps={{ style: drawerState.newSetWidth }}
            >
              <div
                id="dragger"
                onMouseDown={(event) => {
                  handleMousedown(event);
                }}
                onMouseEnter={(event) => {
                  setDrawerState((last) => {
                    return {
                      ...last,
                      hovering: true,
                    };
                  });
                }}
                onMouseLeave={(event) => {
                  setDrawerState((last) => {
                    return {
                      ...last,
                      hovering: false,
                    };
                  });
                }}
                className={clsx(
                  classes.dragger,
                  drawerState.hovering ? classes.draggerHover : ''
                )}
              />
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
                <NetworkCompPanel />
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
            </Drawer>

            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
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
        </div>
      </TabPanel>
      <TabPanel value={panel} index={1}>
        <DemoPage />
      </TabPanel>
    </Container>
  );
};

export default HomePage;
