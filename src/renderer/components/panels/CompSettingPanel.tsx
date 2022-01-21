import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';

const CompSettingPanel = ({ currentComponent }) => {
  console.log(currentComponent);
  console.log(currentComponent.data.label);
  return currentComponent === null ? (
    <div></div>
  ) : (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        color: 'black',
      }}
    >
      <Typography color="primary" variant="h6" style={{ marginTop: '16px' }}>
        Settings
      </Typography>
      <Grid container spacing={2}>
        <Grid item>{currentComponent.data.label}</Grid>
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CompSettingPanel;
