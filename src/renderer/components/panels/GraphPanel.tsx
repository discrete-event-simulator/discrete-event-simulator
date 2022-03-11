import { grey, lightBlue, orange } from '@material-ui/core/colors';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import React, { useContext, useEffect, useRef, useState } from 'react';
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
import SplitterNode from './SplitterNode';
let id = 2;
const getId = () => `${id++}`;
const parameters = {
  'PacketSink:test_newScript': true,
  'PacketSink:rec_arrivals': true,
};
const nodeTypes = {
  splitterNode: SplitterNode,
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
  const { setSimulationData } = useContext(AppContext);
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
    console.log('click pane');
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
    const limit = 1;
    if (
      elements.filter((els) => els?.source === params.source).length >= limit
    ) {
      setSBState({
        open: true,
        message: `Only ${limit} connection${limit > 1 ? 's' : ''} allowed`,
      });
      return;
    }
    const fromElement = elements.find((e) => e.id === params.source);
    const toElement = elements.find((e) => e.id === params.target);

    if (
      (fromElement?.data?.type === 'Flow' &&
        toElement?.data?.type === 'TCPPacketGenerator') ||
      (fromElement?.data?.type === 'TCPPacketGenerator' &&
        toElement?.data?.type === 'Flow')
    ) {
      setElements((els) => {
        const flowElmIndex = els.findIndex(
          (e) =>
            e?.data?.type === 'Flow' &&
            [params.source, params.target].includes(e?.id)
        );
        const tCPPacketGeneratorElmIndex = els.findIndex(
          (e) =>
            e?.data?.type === 'TCPPacketGenerator' &&
            [params.source, params.target].includes(e?.id)
        );
        const newElements = JSON.parse(JSON.stringify(els));

        // change the flow attribute of the TCPPacketGenerator
        newElements[
          tCPPacketGeneratorElmIndex
        ].data.configs.flow = `Flow_${els[flowElmIndex]?.id}`;

        // change the order of them if TCPPacketGenerator was created earlier than Flow
        if (tCPPacketGeneratorElmIndex < flowElmIndex) {
          [newElements[tCPPacketGeneratorElmIndex], newElements[flowElmIndex]] =
            [
              newElements[flowElmIndex],
              newElements[tCPPacketGeneratorElmIndex],
            ];
        }

        return newElements;
      });
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
        configs[key] = `flow${elementId}`;
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

  return (
    <div ref={reactFlowWrapper} style={{ flexGrow: 1 }}>
      <Button
        variant="contained"
        style={{
          marginRight: 5,
          marginTop: 5,
          zIndex: 500,
          position: 'absolute',
          right: 0,
          top: 0,
        }}
        onClick={submitData}
        disabled={!canRun}
      >
        Run
      </Button>
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
            if (n.type === 'default' || n.type === 'splitterNode')
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
