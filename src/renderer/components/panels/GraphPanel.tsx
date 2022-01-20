import React, { useState, useEffect } from 'react';
import Graph from 'react-graph-vis';
import CompConfigModal from '../configs/CompConfigModal';

const options = {
  layout: {
    hierarchical: true,
  },
  edges: {
    color: '#000000',
  },
  nodes:{
    shape:'box'
  }
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
    const color = '#FFF';

    setState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const id = counter + 1;
      const from = counter;
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
    counter: 1,
    graph: {
      nodes: [{ id: 1, label: 'Start', color: '#e04141' }],
      edges: [
      ],
    },

  });
  const { graph, } = state;
  const [currentComp, setCurrentComp] = React.useState('');
  const handleOpen = (data) => setCurrentComp(data);
  const handleClose = (data) => {
   setCurrentComp("");
  };

  const events = {

     select: function({ nodes, edges }){
        console.log('Selected nodes:');
        console.log(nodes);
        console.log(state.graph.nodes);
        console.log('Selected edges:');
        console.log(edges);
        console.log()
        //alert('Selected node: ' + nodes);
        const selectedNode = state.graph.nodes.filter((node)=>node.id === nodes[0])
        if(selectedNode){
          setCurrentComp(selectedNode[0].label);
        }
      }
  };
  return (
    <>
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
            events={
             events
            }
            style={{ display: 'flex', width: '100%', flexGrow: 1 }}
          />
        </div>
      )}
    </Droppable>
    <CompConfigModal component={currentComp} handleClose={handleClose}/>
    </>
  );
};

export default GraphPanel;
