import React from 'react';
import { Grid, Button, TextField, Typography, Tooltip } from '@mui/material';
import { settings } from '../../settings/componentSettings';
import {
  FormProvider,
  useForm,
  Controller,
  useFormContext,
} from 'react-hook-form';

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
const CustomTextFieldDist = ({ comp, currentComponent, value }) => {
  const { control } = useFormContext();
  console.log('Dist', value);
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
              type={'text'}
              id="outlined-basic"
              label={comp}
              defaultValue={value}
              variant="outlined"
              fullWidth
              required
              error={!isJson(field.value)}
              {...field}
              disabled={settings[currentComponent.data.type][comp]['immutable']}
            />
          </Tooltip>
        )}
      />
    </Grid>
  );
};

export default CustomTextFieldDist;
