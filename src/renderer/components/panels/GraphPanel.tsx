// @ts-nocheck
import React, { useState, useRef } from 'react';
import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  updateEdge,
} from 'react-flow-renderer';
import { settings } from '../settings/componentSettings';
import { Button, Snackbar } from '@mui/material';

let id = 2;
const getId = () => `${id++}`;

const GraphPanel = ({ setCurrentComponent, elements, setElements }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onElementClick = (event, element) => {
    if (element.data.type !== 'Start') {
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
    const id = getId();
    const configs = {};
    Object.keys(settings[`${name}`] ?? {}).forEach((key) => {
      configs[key] = settings[`${name}`][key]['default'];
    });
    const newNode = {
      id: id,
      type,
      position,
      data: {
        label: `${name} ${id}`,
        type: `${name}`,
        configs: configs,
      },
    };

    setElements((es) => es.concat(newNode));
  };
  const onEdgeUpdate = (oldEdge, newConnection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));

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
        elementsSelectable={true}
        snapToGrid={true}
        snapGrid={[15, 15]}
      >
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.style?.background) return n.style.background;
            if (n.type === 'input') return '#0041d0';
            if (n.type === 'output') return '#ff0072';
            if (n.type === 'default') return '#1a192b';

            return '#eee';
          }}
          nodeColor={(n) => {
            if (n.style?.background) return n.style.background;

            return '#fff';
          }}
          nodeBorderRadius={2}
        />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default GraphPanel;
