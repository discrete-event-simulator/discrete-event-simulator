import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

const customNodeStyles = {
  padding: 10,
  borderRadius: 3,
  borderStyle: 'solid',
  borderWidth: 1,
  width: 150,
  fontSize: 12,
  'text-align': 'center',
};
//@ts-ignore
export default memo(({ data, isConnectable }) => {
  return (
    <>
      <div style={customNodeStyles}>
        <Handle
          type="target"
          //@ts-ignore
          position="top"
          style={{ background: '#000' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />
        <div>{data.label}</div>
        <Handle
          type="source"
          //@ts-ignore
          position="bottom"
          id="a"
          style={{ left: 25, background: '#000' }}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          //@ts-ignore
          position="bottom"
          id="b"
          style={{ left: 'auto', right: 25, background: '#000' }}
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
});
