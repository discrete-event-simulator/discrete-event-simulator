import { Button, Grid, TextField, Tooltip, Typography } from '@mui/material';
import React from 'react';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';

import { settings } from '../../settings/componentSettings';

const CustomWeightField = ({ index, setWeights, comp, weight }) => {
  return (
    <Grid item xs={12}>
      <TextField
        type="number"
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
