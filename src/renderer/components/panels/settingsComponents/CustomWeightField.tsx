import React from 'react';
import { Grid, Button, TextField, Typography, Tooltip } from '@mui/material';
import { settings } from '../../settings/componentSettings';
import {
  FormProvider,
  useForm,
  Controller,
  useFormContext,
} from 'react-hook-form';
const CustomWeightField = ({ index, setWeights, comp, weight }) => {
  return (
    <Grid item xs={12}>
      <TextField
        type={'number'}
        id="outlined-basic"
        label={comp}
        defaultValue={weight}
        variant="outlined"
        fullWidth
        onChange={(e) =>
          setWeights((w) => {
            w[index][1] = Number(e.target.value);
            return w;
          })
        }
        required
      />
    </Grid>
  );
};

export default CustomWeightField;
