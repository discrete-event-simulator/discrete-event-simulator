import React from 'react';
import { Grid, Button, TextField, Typography, Tooltip } from '@mui/material';
import { settings } from '../settings/componentSettings';
import {
  FormProvider,
  useForm,
  Controller,
  useFormContext,
} from 'react-hook-form';

const CustomTextField = ({ comp, currentComponent }) => {
  const { control } = useFormContext();

  return (
    <Grid item xs={12}>
      <Controller
        name={comp}
        control={control}
        render={({ field }) => (
          <Tooltip
            title={settings[currentComponent.data.type][comp]['helperText']}
          >
            <TextField
              type={
                settings[currentComponent.data.type][comp]['type'] ?? 'text'
              }
              id="outlined-basic"
              label={comp}
              defaultValue={currentComponent.data.configs[comp]}
              variant="outlined"
              fullWidth
              required
              {...field}
              disabled={settings[currentComponent.data.type][comp]['immutable']}
            />
          </Tooltip>
        )}
      />
    </Grid>
  );
};

export default CustomTextField;
