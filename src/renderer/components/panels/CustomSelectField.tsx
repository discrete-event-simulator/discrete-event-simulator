import { FormControl, Grid, InputLabel, Select, Tooltip } from '@mui/material';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';

import { settings } from '../settings/componentSettings';

const CustomSelectField = ({
  defaultValue,
  comp,
  currentComponent,
  children,
  ...props
}) => {
  const labelId = `${comp}-label`;
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
