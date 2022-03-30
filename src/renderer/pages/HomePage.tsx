import { DragHandle } from '@mui/icons-material';
import TerminalIcon from '@mui/icons-material/Terminal';
import {
  Collapse,
  Container,
  Drawer,
  Grid,
  IconButton,
  Snackbar,
  SnackbarContent,
  SvgIcon,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { flexbox, Theme } from '@mui/system';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import ReactFlow, { Controls, ReactFlowProvider } from 'react-flow-renderer';
import EnvTest from 'renderer/components/envTest/Index';
import PythonPathLoader from 'renderer/components/envTest/pythonPath';
import CompSettingPanel from 'renderer/components/panels/CompSettingPanel';
import GraphPanel from 'renderer/components/panels/GraphPanel';
import NetworkCompPanel from 'renderer/components/panels/NetworkCompPanel';
import OutputPanel from 'renderer/components/panels/OutputPanel';
import SidePanel from 'renderer/components/panels/SidePanel';

import TabPanel from '../components/panels/TabPanel';
import DemoPage from './Demo';

export const AppContext = React.createContext({
  simulationData: null,
  setSimulationData: (output: string) => {},
});

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
  outpanelOpen: {
    display: 'flex',
  },
  outpanelClose: {
    display: 'none',
  },
  drawer: {
    background: theme.palette.secondary.main,
    display: 'flex',
    width: 50,
  },
  drawerPaper: {
    width: drawerWidth,
    position: 'relative',
    overflow: 'hidden',
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
    backgroundColor: 'lightgray',
    opacity: 0.1,
    userSelect: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'width 0.2s, opacity 0.2s',
  },
  draggerHover: {
    opacity: 0.3,
    width: '10px',
  },
  bottomBar: {
    display: 'flex',
    flexDirection: 'column',
    height: '15px',
    width: '100%',
    background: theme.palette.primary.main,
  },
  backgroundContainer: {
    background: theme.palette.background.paper,
  },
}));

const HomePage = (props: any) => {
  const { dash, setDash } = props;

  // app contexts
  const [simulationData, setSimulationData] = useState(null);
  const [outputPanelOpen, setOutputPanelOpen] = useState(false);
  const [sbState, setSBState] = useState({ open: false, message: '' });
  useEffect(() => {
    if (simulationData) {
      setOutputPanelOpen(true);
    }
  }, [simulationData]);

  useEffect(() => {
    (window as any).electron.ipcRenderer.on(
      'reply:create-packet',
      (data: any) => {
        console.log('received', data);
      }
    );
    (window as any).electron.ipcRenderer.on('reply:test', (data: any) => {
      const message = data.success ? '✅ ns.py found' : `${data.err}`;
      setSBState({
        open: true,
        message,
      });
    });
    (window as any).electron.ipcRenderer.send('test', {});
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
  const initialElements = [];

  const [elements, setElements] = useState(initialElements);

  const handleMouseup = (e) => {
    e.stopPropagation();
    resizing.current = false;
    document.removeEventListener('mouseup', handleMouseup);
    document.removeEventListener('mousemove', handleMousemove);
    setInterval(function () {
      window.dispatchEvent(new Event('resize'));
    }, 1);
  };
  const handleMousedown = (e) => {
    e.preventDefault();
    resizing.current = true;

    document.addEventListener('mouseup', handleMouseup);
    document.addEventListener('mousemove', handleMousemove);
  };

  const handleMousemove = (e) => {
    // we don't want to do anything if we aren't resizing.

    if (!resizing.current) {
      return;
    }
    const offsetRight = e.clientX - 55;
    const minWidth = 240;
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
    <AppContext.Provider
      value={{
        simulationData,
        setSimulationData,
      }}
    >
      <Container
        className={classes.backgroundContainer}
        style={{
          padding: '0px',
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          height: '100vh',
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
          <SidePanel
            dash={dash}
            setDash={setDash}
            panel={panel}
            setPanel={setPanel}
          />
        </Drawer>
        <TabPanel value={panel} index={0}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexGrow: 1,
                height: 'calc(100% - 15px)',
              }}
            >
              <ReactFlowProvider>
                <Drawer
                  variant="permanent"
                  open
                  anchor="left"
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
                  >
                    <SvgIcon
                      style={{ transform: 'rotate(90deg)' }}
                      component={DragHandle}
                    />
                  </div>

                  <TabPanel
                    value={currentComponent === null ? 0 : 1}
                    index={0}
                    style={{
                      display: 'flex',
                      flexGrow: 1,
                      flexDirection: 'column',
                      maxWidth: '300px',
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
                    <NetworkCompPanel />
                  </TabPanel>
                  <TabPanel
                    value={currentComponent === null ? 0 : 1}
                    index={1}
                    style={{
                      display: 'flex',
                      flexGrow: 1,
                      flexDirection: 'column',
                      maxWidth: '300px',
                    }}
                  >
                    <CompSettingPanel
                      key={currentComponent ? currentComponent.data.label : ''}
                      elements={elements}
                      currentComponent={currentComponent}
                      setElements={setElements}
                      setCurrentComponent={setCurrentComponent}
                      dash={dash}
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
                    }}
                  >
                    <GraphPanel
                      initialElements={initialElements}
                      setCurrentComponent={setCurrentComponent}
                      elements={elements}
                      setElements={setElements}
                      setSBState={setSBState}
                      dash={dash}
                    />
                    <div
                      style={{
                        display: outputPanelOpen ? 'flex' : 'none',
                      }}
                    >
                      <OutputPanel />
                    </div>
                  </Grid>
                </Grid>
              </ReactFlowProvider>
            </div>
            <div className={classes.bottomBar}>
              <div style={{ flexGrow: 1 }} />
              <IconButton
                disableRipple
                style={{
                  width: '15px',
                  height: '15px',
                  marginLeft: 'auto',
                  padding: '2px 15px',
                  color: 'white',
                }}
                onClick={() => setOutputPanelOpen(!outputPanelOpen)}
              >
                <TerminalIcon style={{ width: '15px', height: '15px' }} />
              </IconButton>
            </div>
          </div>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={sbState.open}
            onClose={() => setSBState((sb) => ({ ...sb, open: false }))}
            autoHideDuration={3000}
          >
            <SnackbarContent
              sx={{
                backgroundColor: (theme) => theme.palette.background.default,
                color: (theme) => theme.palette.text.primary,
              }}
              message={sbState.message}
            />
          </Snackbar>
        </TabPanel>
        <TabPanel value={panel} index={1}>
          <EnvTest />
        </TabPanel>
      </Container>
    </AppContext.Provider>
  );
};

export default HomePage;
