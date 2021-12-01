import React from 'react';

//@ts-ignore
import { Droppable, Draggable } from 'react-beautiful-dnd';
const GraphPanel = () => {
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
        ></div>
      )}
    </Droppable>
  );
};

export default GraphPanel;
