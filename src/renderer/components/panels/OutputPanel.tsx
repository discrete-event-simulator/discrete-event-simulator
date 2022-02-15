/* eslint-disable jsx-a11y/control-has-associated-label */
import { DragHandle } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from 'renderer/pages/HomePage';

const OutputPanel = () => {
  const { simulationData } = useContext(AppContext);

  const [offset, setOffset] = useState(400);
  const ref = useRef<HTMLButtonElement>();
  const isDragging = useRef(false);

  const mousemoveEvent = useCallback(
    (e) => {
      if (!isDragging.current) return;
      setOffset((currentSize) => currentSize - e.movementY);
    },
    [setOffset]
  );

  useEffect(() => {
    console.log({ simulationData });
  }, [simulationData]);

  const mouseupEvent = useCallback(() => {
    isDragging.current = false;
  }, [isDragging]);

  useEffect(() => {
    window.addEventListener('mousemove', mousemoveEvent);
    window.addEventListener('mouseup', mouseupEvent);

    return () => {
      window.removeEventListener('mousemove', mousemoveEvent);
      window.removeEventListener('mouseup', mouseupEvent);
    };
  }, [setOffset, mouseupEvent, mousemoveEvent]);

  const handler = useCallback(() => {
    isDragging.current = true;
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: offset,
        background: 'black',
        position: 'relative',
      }}
    >
      <button
        type="button"
        ref={ref}
        style={{
          border: 'none',
          width: '100%',
          height: '30px',
          position: 'absolute',
          left: 0,
          top: 0,
          background: 'lightgray',
          cursor: 'row-resize',
        }}
        onMouseDown={handler}
      >
        <SvgIcon component={DragHandle} />
      </button>
      <div
        style={{
          marginTop: '30px',
          padding: '8px',
          color: 'white',
          overflowY: 'scroll',
          height: 'calc(100% - 50px)',
        }}
      >
        {simulationData &&
          simulationData.map((data) => <div key={data}>{data}</div>)}
      </div>
    </div>
  );
};

export default OutputPanel;
