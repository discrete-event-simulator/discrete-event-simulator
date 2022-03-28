import { grey, lightBlue, orange } from '@material-ui/core/colors';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import React, { useContext, useEffect, useRef, useState } from 'react';
import SourceIcon from '@mui/icons-material/Source';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  removeElements,
  updateEdge,
} from 'react-flow-renderer';
import { AppContext } from 'renderer/pages/HomePage';

import usePythonPath from '../envTest/pythonPath';
import { settings } from '../settings/componentSettings';
import buildJson from './utils/buildJson';
import SplitterNode from './graphNodes/SplitterNode';
import BareNode from './graphNodes/BareNode';
let id = 1;
const getId = () => `${id++}`;
const parameters = {
  'PacketSink:test_newScript': true,
  'PacketSink:rec_arrivals': true,
};
const nodeTypes = {
  splitterNode: SplitterNode,
  bareNode: BareNode,
};
const useStyles = makeStyles((theme: Theme) => ({
  graphCanvas: {
    background: theme.palette.background.paper,
  },
}));

const GraphPanel = ({
  setCurrentComponent,
  elements,
  setElements,
  initialElements,
  setSBState,
  dash,
}) => {
  const { simulationData, setSimulationData } = useContext(AppContext);
  const [pythonPath] = usePythonPath();

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [canRun, setCanRun] = useState(false);

  const classes = useStyles();

  const onElementClick = (event, element) => {
    if (element?.data?.type && element.data.type !== 'Start') {
      setCurrentComponent(element);
    }
  };
  const onPaneClick = (event) => {
    setCurrentComponent(null);
  };

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => {
      if (elementsToRemove[0]?.data?.type === 'Start') {
        return els;
      }

      setCurrentComponent(null);
      console.log(elementsToRemove);
      return removeElements(elementsToRemove, els);
    });

  const onConnect = (params) => {
    const sourceElem = elements.find(e => e.id === params.source);
    console.log(elements)
    const limit = 1;
    if (!sourceElem?.data?.configs?.multiple_ports &&
      elements.filter(
        (els) =>
          (els?.source === params.source && !els.sourceHandle) ||
          (els.sourceHandle &&
            els?.source === params.source &&
            els.sourceHandle === params?.sourceHandle)
      ).length >= limit
    ) {
      setSBState({
        open: true,
        message: `Only ${limit} connection${
          limit > 1 ? 's' : ''
        } allowed, please add a Splitter`,
      });
      return;
    }

    setElements((els) => addEdge(params, els));
  };

  const onLoad = (_reactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance);
    _reactFlowInstance.fitView();
  };
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };
  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const name = event.dataTransfer.getData('application/reactflowname');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const elementId = getId();
    const configs = {};
    Object.keys(settings[`${name}`] ?? {}).forEach((key) => {
      if (key === 'wire_id' || key === 'flow_id') {
        configs[key] = parseInt(elementId);
      } else if (key === 'element_id') {
        configs[key] = elementId;
      } else {
        configs[key] = settings[`${name}`][key].default;
      }
    });
    const newNode = {
      id: elementId,
      type,
      position,
      style: {
        backgroundColor: dash.darkMode ? grey[800] : '#FFFFFF',
        borderColor: dash.darkMode ? grey[300] : '#252525',
        color: dash.darkMode ? '#FFFFFF' : '#252525',
      },
      data: {
        label: `${name} ${elementId}`,
        type: `${name}`,
        configs,
      },
    };
    setCurrentComponent(newNode);
    setElements((es) => es.concat(newNode));
    console.log('Elements', elements);
  };
  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        // it's important that you create a new object here
        // in order to notify react flow about the change
        el.style = {
          backgroundColor: dash.darkMode ? grey[800] : '#FFFFFF',
          borderColor: dash.darkMode ? grey[300] : '#252525',
          color: dash.darkMode ? '#FFFFFF' : '#252525',
        };

        return el;
      })
    );
  }, [dash.darkMode, setElements]);

  const onEdgeUpdate = (oldEdge, newConnection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));

  useEffect(() => {
    (window as any).electron.ipcRenderer.on('reply', (data: any) => {
      console.log('received', data);
      setSimulationData(data);
    });
    setElements(initialElements);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCanRun(elements.length > 1);
  }, [elements]);

  const submitData = () => {
    const jsonData = buildJson(elements);

    (window as any).electron.ipcRenderer.send('run', {
      dpgOut: '',
      wireOut: '',
      parameters,
      jsonData,
      pythonPath,
    });
  };
  // use for debugging edit vscode problem
  useEffect(() => {
    (window as any).electron.ipcRenderer.on('edit_success', (data: any) => {
      console.log('received', data);

    });

    (window as any).electron.ipcRenderer.on('edit_error', (data: any) => {
      console.log('received', data);

    });

    (window as any).electron.ipcRenderer.on('edit_stderr', (data: any) => {
      console.log('received', data);

    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const editWithVscode = () => {
    console.log("Opening network_graph.py with vscode");
    (window as any).electron.ipcRenderer.send('openVscode', {
      fileName: 'network_graph.py',
    });
  };

  return (
    <div ref={reactFlowWrapper} style={{ flexGrow: 1 }}>
      <Button
        variant="contained"
        style={{
          marginRight: 10,
          marginTop: 10,
          zIndex: 500,
          position: 'absolute',
          right: 0,
          top: 0,
          fontWeight: 'bold',
        }}
        onClick={submitData}
        disabled={!canRun}
      >
        Run
      </Button>
      {simulationData && simulationData.length > 0 && (
        <Button
          variant="contained"
          style={{
            marginRight: 10,
            marginTop: 55,
            zIndex: 500,
            position: 'absolute',
            right: 0,
            top: 0,
            fontWeight: 'bold',
          }}
          onClick={editWithVscode}
          disabled={!(simulationData && simulationData.length > 0)}
        >
          Edit in Vscode
        </Button>
      )}

      <ReactFlow
        nodeTypes={nodeTypes}
        className={classes.graphCanvas}
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onElementClick={onElementClick}
        onEdgeUpdate={onEdgeUpdate}
        onLoad={onLoad}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onPaneClick={onPaneClick}
        elementsSelectable
        snapToGrid
        snapGrid={[15, 15]}
      >
        <MiniMap
          className={classes.graphCanvas}
          nodeStrokeColor={(n) => {
            if (n.style?.background) return `${n.style.background}`;
            if (n.type === 'input') return '#0041d0';
            if (n.type === 'output') return '#ff0072';
            if (
              n.type === 'default' ||
              n.type === 'splitterNode' ||
              n.type === 'bareNode'
            )
              return '#1a192b';

            return '#eee';
          }}
          nodeColor={(n) => {
            if (n.style?.background) return `${n.style.background}`;
            return dash.darkMode ? grey[800] : '#FFFFFF';
          }}
          nodeBorderRadius={2}
        />
        <Controls />
        <Background color="background" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default GraphPanel;
