// @ts-nocheck
import React, { useState, useRef } from 'react';
import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer';

const options = {
  layout: {
    hierarchical: true,
  },
  edges: {
    color: '#000000',
  },
  nodes: {
    shape: 'box',
  },
};
function randomColor() {
  const red = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, '0');
  const green = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, '0');
  const blue = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, '0');
  return `#${red}${green}${blue}`;
}

//@ts-ignore
import { Droppable, Draggable } from 'react-beautiful-dnd';

const initialElements = [
  {
    id: '1',
    type: 'input',
    data: {
      label: (
        <>
          <strong>Start</strong>
        </>
      ),
    },
    position: { x: 100, y: 100 },
  },
];

let id = 2;
const getId = () => `${id++}`;

const GraphPanel = ({ setCurrentComponent }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [elements, setElements] = useState(initialElements);
  const onElementClick = (event, element) => {
    setCurrentComponent(element);
  };
  const onPaneClick = (event) => {
    setCurrentComponent(null);
    console.log('click pane');
  };
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
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
    const newNode = {
      id: id,
      type,
      position,
      data: { label: `${name} ${id}` },
    };

    setElements((es) => es.concat(newNode));
  };
  return (
    <div ref={reactFlowWrapper} style={{ flexGrow: 1 }}>
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onElementClick={onElementClick}
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
