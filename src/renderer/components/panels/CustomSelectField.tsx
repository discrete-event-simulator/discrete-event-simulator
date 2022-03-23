import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, Select, Tooltip } from '@mui/material';
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
  dash,
  ...props
}) => {
  const labelId = `${comp}`;
  const { control } = useFormContext();
  return (
    <Grid item xs={12}>
      <FormControl fullWidth {...props}>
        {/* <InputLabel id={labelId}>{comp}</InputLabel>
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
        /> */}

        <Controller
          name={labelId}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                 {...field}
                  checked={field.value}
                  onChange={field.onChange}
                />
              }
              label={comp}
              style={{ color: dash.darkMode ? '#FFFFFF' : '#252525' }}
            />
          )}
        />
      </FormControl>

    </Grid>
  );
};
export default CustomSelectField;
