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
        <div>{data.label}</div>
      </div>
    </>
  );
});
