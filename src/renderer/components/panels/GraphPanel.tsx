// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
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
import buildJson from './utils/buildJson';

let id = 2;
const getId = () => `${id++}`;
const parameters = {
  'PacketSink:test_newScript': true,
  'PacketSink:rec_arrivals': true,
};
let data = {
  components: [
    {
      name: 'DPG_1',
      type: 'DistPacketGenerator',
      attributes: {
        element_id: 'flow1',
        arrival_dist: 1.5,
        flow_id: 1,
        size_dist: 100,
      },
    },
    {
      name: 'DPG_2',
      type: 'DistPacketGenerator',
      attributes: {
        element_id: 'flow2',
        arrival_dist: 1.5,
        flow_id: 1,
        size_dist: 200,
      },
    },
    {
      name: 'Wire_1',
      type: 'Wire',
      attributes: {
        delay_dist: 0.1,
        wire_id: 3,
        debug: true,
      },
    },
    {
      name: 'Wire_2',
      type: 'Wire',
      attributes: {
        delay_dist: 0.1,
        wire_id: 4,
        debug: true,
      },
    },
    {
      name: 'PacketSink_1',
      type: 'PacketSink',
      attributes: {
        rec_arrivals: true,
        absolute_arrivals: true,
        rec_waits: true,
        rec_flow_ids: false,
        debug: true,
      },
    },
  ],
  connections: [
    {
      from: {
        name: 'DPG_1',
      },
      to: {
        name: 'Wire_1',
      },
    },
    {
      from: {
        name: 'DPG_2',
      },
      to: {
        name: 'Wire_2',
      },
    },
    {
      from: {
        name: 'Wire_1',
      },
      to: {
        name: 'PacketSink_1',
      },
    },
    {
      from: {
        name: 'Wire_2',
      },
      to: {
        name: 'PacketSink_1',
      },
    },
  ],
  display_data: [
    {
      name: 'PacketSink_1',
      informations: ['waits', 'arrivals'],
    },
  ],
};

const GraphPanel = ({ setCurrentComponent, elements, setElements }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [canRun, setCanRun] = useState(false);

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

  useEffect(() => {
    (window as any).electron.ipcRenderer.on('reply', (data: any) => {
      console.log('received', data);
    });
  }, []);

  const submitData = () => {
    buildJson(elements);

    (window as any).electron.ipcRenderer.send('run', {
      dpgOut: '',
      wireOut: '',
      parameters,
      jsonData: data,
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
