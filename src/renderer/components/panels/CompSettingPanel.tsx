import React from 'react';
import { Grid, TextField, Typography, Tooltip } from '@mui/material';
import { settings } from '../settings/componentSettings';

const CompSettingPanel = ({ currentComponent }) => {
  console.log(currentComponent);
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
        <Grid item xs={12}>
          <Typography color="default" variant="subtitle1" component="p">
            {currentComponent.data.label}
          </Typography>
        </Grid>
        {currentComponent &&
          settings[currentComponent.data.type] &&
          Object.keys(settings[currentComponent.data.type])?.map((field) => {
            return (
              <Grid item xs={12}>
                <Tooltip
                  title={
                    settings[currentComponent.data.type][field]['helperText']
                  }
                >
                  <TextField
                    type={
                      settings[currentComponent.data.type][field]['type'] ??
                      'text'
                    }
                    id="outlined-basic"
                    label={field}
                    defaultValue={
                      settings[currentComponent.data.type][field]['default']
                    }
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Tooltip>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default CompSettingPanel;
