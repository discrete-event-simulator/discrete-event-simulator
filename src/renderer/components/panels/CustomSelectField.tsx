import { FormControl, InputLabel, Select, Tooltip, Grid } from '@mui/material';

import { settings } from '../settings/componentSettings';

import {
  FormProvider,
  useForm,
  Controller,
  useFormContext,
} from 'react-hook-form';
const CustomSelectField = ({
  defaultValue,
  comp,
  currentComponent,
  children,
  ...props
}) => {
  const labelId = `${name}-label`;
  const { control } = useFormContext();
  return (
    <Grid item xs={12}>
      <FormControl fullWidth {...props}>
        <InputLabel id={labelId}>{comp}</InputLabel>
        <Controller
          render={({ field }) => (
            <Select
              {...field}
              labelId={labelId}
              label={comp}
              fullWidth
              required
            >
              {children}
            </Select>
          )}
          name={comp}
          control={control}
          defaultValue={defaultValue}
        />
      </FormControl>
    </Grid>
  );
};
export default CustomSelectField;
