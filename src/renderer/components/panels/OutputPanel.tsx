/* eslint-disable jsx-a11y/control-has-associated-label */
import { makeStyles } from '@material-ui/core';
import { DragHandle } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from 'renderer/pages/HomePage';

const useStyles = makeStyles(() => ({
  dragger: {
    border: 'none',
    width: '100%',
    height: '3px',
    position: 'absolute',
    left: 0,
    top: 0,
    background: 'lightgray',
    cursor: 'row-resize',
    transition: 'height 0.3s, opacity 0.3s',
    opacity: 0.5,
    '&:hover': {
      height: '10px',
      opacity: 1,
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

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

  const classes = useStyles();

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
        className={classes.dragger}
        onMouseDown={handler}
      >
        <SvgIcon style={{ opacity: 0.5 }} component={DragHandle} />
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
