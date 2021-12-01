import React, { useState, useEffect } from 'react';
import Graph from 'react-graph-vis';

const options = {
  layout: {
    hierarchical: false,
  },
  edges: {
    color: '#000000',
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
const GraphPanel = ({ newNode }) => {
  useEffect(() => {
    if (newNode) {
      createNode(40, 40, newNode);
    }
  }, [newNode]);
  const createNode = (x, y, name) => {
    const color = randomColor();

    setState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const id = counter + 1;
      const from = Math.floor(Math.random() * (counter - 1)) + 1;
      return {
        graph: {
          nodes: [...nodes, { id, label: `${name} ${id}`, color, x, y }],
          edges: [...edges, { from, to: id }],
        },
        counter: id,
        ...rest,
      };
    });
  };

  const [state, setState] = useState({
    counter: 5,
    graph: {
      nodes: [{ id: 1, label: 'Start', color: '#e04141' }],
      edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
      ],
    },
    events: {
      select: ({ nodes, edges }) => {
        console.log('Selected nodes:');
        console.log(nodes);
        console.log('Selected edges:');
        console.log(edges);
        alert('Selected node: ' + nodes);
      },
      doubleClick: ({ pointer: { canvas } }) => {
        createNode(canvas.x, canvas.y, 'temp');
      },
    },
  });
  const { graph, events } = state;
  return (
    <Droppable droppableId={'graph'}>
      {(provided) => (
        <div
          style={{
            border: '1px solid black',
            width: '100%',
            display: 'flex',
            flexGrow: 1,
          }}
          ref={provided.innerRef}
        >
          <Graph
            graph={graph}
            options={options}
            events={events}
            style={{ display: 'flex', width: '100%', flexGrow: 1 }}
          />
        </div>
      )}
    </Droppable>
  );
};

export default GraphPanel;
