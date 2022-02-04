import React, { Component } from 'react';
import { Grid, Button, TextField, Typography, Tooltip } from '@mui/material';
import { settings } from '../settings/componentSettings';
import {
  FormProvider,
  useForm,
  Controller,
  useFormContext,
} from 'react-hook-form';
import { removeElements } from 'react-flow-renderer';
import CustomTextField from './CustomTextField';

const CompSettingPanel = ({
  currentComponent,
  setElements,
  setCurrentComponent,
}) => {
  console.log(currentComponent);
  const methods = useForm();

  const handleDelete = () => {
    setElements((els) => {
      const findComponent = els.filter((el) => {
        return el.id === currentComponent.id;
      });
      if (findComponent.length > 0) {
        setCurrentComponent(null);
        return removeElements(findComponent, els);
      }
      return els;
    });
  };
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
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            const finalData = {};
            Object.keys(data).forEach((element) => {
              finalData[element] = data[element]
                ? settings[currentComponent.data.type][element]['type'] ===
                  'float'
                  ? parseFloat(data[element])
                  : settings[currentComponent.data.type][element]['type'] ===
                    'int'
                  ? parseInt(data[element])
                  : settings[currentComponent.data.type][element]['type'] ===
                    'boolean'
                  ? data[element] === 'true'
                  : data[element]
                : settings[currentComponent.data.type][element]['default'];
            });
            console.log(finalData);
            setElements((els) =>
              els.map((el) => {
                if (el.id === currentComponent.id) {
                  el.data.configs = finalData;
                }
                return el;
              })
            );
            setCurrentComponent(null);
          })}
        >
          <Grid container spacing={2} marginTop="4px">
            <Grid item xs={12}>
              <Typography color="default" variant="subtitle1" component="h6">
                {currentComponent.data.label}
              </Typography>
            </Grid>

            {currentComponent &&
              Object.keys(currentComponent.data.configs ?? {})?.map((key) => {
                return (
                  <CustomTextField
                    comp={key}
                    currentComponent={currentComponent}
                  />
                );
              })}
            {Object.keys(currentComponent.data.configs ?? {}).length !== 0 ? (
              <Grid item xs={4}>
                <Button
                  fullWidth
                  onClick={handleDelete}
                  color="error"
                  variant="contained"
                >
                  Delete
                </Button>
              </Grid>
            ) : (
              <div></div>
            )}
            <Grid item xs={4}></Grid>
            {Object.keys(currentComponent.data.configs ?? {}).length !== 0 ? (
              <Grid item xs={4}>
                <Button
                  fullWidth
                  type="submit"
                  color="success"
                  variant="contained"
                >
                  Save
                </Button>
              </Grid>
            ) : (
              <div></div>
            )}
          </Grid>
        </form>
      </FormProvider>
    </div>
  );
};

export default CompSettingPanel;
