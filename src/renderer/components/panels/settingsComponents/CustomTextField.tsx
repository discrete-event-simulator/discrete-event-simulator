import { Button, Grid, TextField, Tooltip, Typography } from '@mui/material';
import React from 'react';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';

import { settings } from '../../settings/componentSettings';

const CustomTextField = ({ comp, currentComponent }) => {
  const { control } = useFormContext();

  return (
    <Grid item xs={12}>
      <Controller
        name={comp}
        control={control}
        render={({ field }) => (
          <Tooltip
            title={settings[currentComponent.data.type][comp].helperText}
          >
            <TextField
              type={
                settings[currentComponent.data.type][comp].type
                  ? settings[currentComponent.data.type][comp].type === 'int' ||
                    settings[currentComponent.data.type][comp].type === 'float'
                    ? 'number'
                    : 'text'
                  : 'text'
              }
              id="outlined-basic"
              label={comp}
              defaultValue={currentComponent.data.configs[comp]}
              variant="outlined"
              fullWidth
              required
              {...field}
              disabled={settings[currentComponent.data.type][comp].immutable}
            />
          </Tooltip>
        )}
      />
    </Grid>
  );
};

export default CustomTextField;
