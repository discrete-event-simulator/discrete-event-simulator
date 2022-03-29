import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import React from 'react';

const ActionPanel = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <FormControl sx={{ m: 1 }} variant="outlined">
        <InputLabel htmlFor="standard-adornment-amount">Input 1</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">@</InputAdornment>}
          label="Amount"
        />
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="outlined">
        <InputLabel htmlFor="standard-adornment-amount">Input 2</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">@</InputAdornment>}
          label="Amount"
        />
      </FormControl>
      <Button variant="contained" color="primary" style={{ height: '30px' }}>
        Start
      </Button>
      <Button variant="contained" color="secondary" style={{ height: '30px' }}>
        Stop
      </Button>
    </div>
  );
};

export default ActionPanel;
