import { Button, Grid, TextField, Tooltip, Typography } from '@mui/material';
import React from 'react';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';

import { settings } from '../../settings/componentSettings';

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
const CustomTextFieldDist = ({
  comp,
  currentComponent,
  placeholder,
  value,
}) => {
  const { control } = useFormContext();
  console.log('Dist', value);
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
              type="text"
              id="outlined-basic"
              label={comp}
              defaultValue={value}
              placeholder={placeholder}
              variant="outlined"
              fullWidth
              required
              error={!isJson(field.value)}
              {...field}
              disabled={settings[currentComponent.data.type][comp].immutable}
            />
          </Tooltip>
        )}
      />
    </Grid>
  );
};

export default CustomTextFieldDist;
