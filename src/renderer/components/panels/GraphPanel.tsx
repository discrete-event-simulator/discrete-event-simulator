import { Button } from '@mui/material';
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

let id = 2;
const getId = () => `${id++}`;
const parameters = {
  'PacketSink:test_newScript': true,
  'PacketSink:rec_arrivals': true,
};

const GraphPanel = ({
  setCurrentComponent,
  elements,
  setElements,
  initialElements,
}) => {
  const { setSimulationData } = useContext(AppContext);
  const [pythonPath] = usePythonPath();

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [canRun, setCanRun] = useState(false);

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
      if (elementsToRemove[0].data.type === 'Start') {
        return els;
      }
      setCurrentComponent(null);
      return removeElements(elementsToRemove, els);
    });

  const onConnect = (params) => setElements((els) => addEdge(params, els));
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
      data: {
        label: `${name} ${elementId}`,
        type: `${name}`,
        configs,
      },
    };
    setCurrentComponent(newNode);
    setElements((es) => es.concat(newNode));
  };
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
          nodeStrokeColor={(n) => {
            if (n.style?.background) return `${n.style.background}`;
            if (n.type === 'input') return '#0041d0';
            if (n.type === 'output') return '#ff0072';
            if (n.type === 'default') return '#1a192b';

            return '#eee';
          }}
          nodeColor={(n) => {
            if (n.style?.background) return `${n.style.background}`;

            return '#fff';
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
