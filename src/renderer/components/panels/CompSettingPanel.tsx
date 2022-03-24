import { Button, Grid, MenuItem, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { removeElements } from 'react-flow-renderer';
import { FormProvider, useForm } from 'react-hook-form';

import { settings } from '../settings/componentSettings';
import CustomCheckBox from './settingsComponents/CustomCheckBox';
import CustomTextField from './settingsComponents/CustomTextField';
import CustomListField from './settingsComponents/CustomListField';

const CompSettingPanel = ({
  currentComponent,
  elements,
  setElements,
  setCurrentComponent,
  dash,
}) => {
  console.log(currentComponent);
  const methods = useForm();
  const sampleData = [0, 1];
  const [weights, setWeights] = useState(sampleData ?? []);

  useEffect(() => {
    const newWeights = 0;
  }, [weights, elements]);

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
    <div />
  ) : (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        color: 'black',
        overflow: 'auto',
        maxHeight: '100vh',
      }}
    >
      <div
        style={{
          padding: '15px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography color="primary" variant="h6">
          Settings
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit((data) => {
              const finalData = {};
              console.log(data);
              console.log('Weights', weights);
              Object.keys(data).forEach((element) => {
                // element = element.split("-label")[0];
                if (element.endsWith('_id')) {
                  finalData[element] =
                    settings[currentComponent.data.type][element].type === 'int'
                      ? parseInt(currentComponent.data.configs[element])
                      : currentComponent.data.configs[element];
                } else if (data[element] !== undefined) {
                  if (
                    settings[currentComponent.data.type][element].type ===
                    'dict'
                  ) {
                  } else if (
                    settings[currentComponent.data.type][element].type ===
                    'float'
                  ) {
                    finalData[element] = parseFloat(data[element]);
                  } else if (
                    settings[currentComponent.data.type][element].type === 'int'
                  ) {
                    finalData[element] = parseInt(data[element]);
                  } else if (
                    settings[currentComponent.data.type][element].type ===
                    'boolean'
                  ) {
                    finalData[element] = data[element];
                  } else {
                    finalData[element] =
                      settings[currentComponent.data.type][element]?.default;
                  }
                } else {
                  finalData[element] =
                    settings[currentComponent.data.type][element]?.default;
                }
              });

              if (weights && weights.length > 0) {
                finalData['weights'] = weights;
              }

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
                <Typography color="primary" marginBottom="4px">
                  {currentComponent.data.label}
                </Typography>
              </Grid>

              {currentComponent &&
                Object.keys(currentComponent.data.configs ?? {})?.map((key) => {
                  return settings[currentComponent.data.type][key].type ===
                    'boolean' ? (
                    <CustomCheckBox
                      key={key}
                      comp={key}
                      currentComponent={currentComponent}
                      defaultValue={currentComponent.data.configs[key]}
                      dash={dash}
                    >
                      {/* <MenuItem value="true">True</MenuItem>
                      <MenuItem value="false">False</MenuItem> */}
                    </CustomCheckBox>
                  ) : settings[currentComponent.data.type][key].type ===
                    'list' ? (
                    <CustomListField
                      key={key}
                      weightData={weights}
                      setWeights={setWeights}
                    />
                  ) : (
                    <CustomTextField
                      key={key}
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
                <div />
              )}
              <Grid item xs={4} />
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
                <div />
              )}
            </Grid>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CompSettingPanel;
