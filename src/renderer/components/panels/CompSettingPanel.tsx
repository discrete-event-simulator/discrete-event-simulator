import { Button, Grid, MenuItem, Typography } from '@mui/material';
import React, { useEffect, useReducer, useState } from 'react';
import { removeElements } from 'react-flow-renderer';
import { FormProvider, useForm } from 'react-hook-form';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { servers as allServers, settings } from '../settings/componentSettings';
import CustomCheckBox from './settingsComponents/CustomCheckBox';
import CustomListField from './settingsComponents/CustomListField';
import CustomSelectField from './settingsComponents/CustomSelectField';
import CustomTextField from './settingsComponents/CustomTextField';
import CustomTextFieldDist from './settingsComponents/CustomTextFieldDist';

const CompSettingPanel = ({
  currentComponent,
  elements,
  setElements,
  setCurrentComponent,
  dash,
}) => {
  const methods = useForm();
  const [weights, setWeights] = useState(
    currentComponent.data.configs?.weights ?? {}
  );
  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;
  const [servers, setServers] = useState([]);

  useDeepCompareEffect(() => {
    methods.reset();
  }, [currentComponent]);

  useEffect(() => {
    const serv = [];
    console.log(elements);
    elements
      .filter((el) => !el?.source)
      .filter((el) => allServers.includes(el?.data?.type))
      .forEach((el) => {
        serv.push(el?.data?.label.split(' ').join('_'));
      });
    console.log('Server', serv);
    if (servers.toString() !== serv.toString()) {
      setServers(serv);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elements]);

  useEffect(() => {
    if (Object.keys(weights).length === 0) {
      const els = {};
      elements
        .filter((el) => !el?.source && el?.data && el?.data?.configs)
        .forEach((el) => {
          Object.keys(el.data.configs).forEach((key) => {
            if (key.startsWith('flow_fid') || key.startsWith('flow_id')) {
              els[el.data.configs[key]] = 1;
            }
          });
        });
      console.log('Weights', els);
      setWeights(els);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentComponent, elements]);

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
              const finalData: any = {};
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
                    finalData[element] = JSON.parse(data[element]);
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
                    finalData[element] = data[element];
                  }
                } else {
                  finalData[element] =
                    settings[currentComponent.data.type][element]?.default;
                }
              });

              if (
                weights &&
                Object.keys(weights).length > 0 &&
                settings[currentComponent.data.type]?.weights
              ) {
                // @ts-ignore
                finalData.weights = weights;
              }
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
                <Typography color="primary" marginBottom="4px">
                  {currentComponent.data.label}
                </Typography>
              </Grid>

              {currentComponent &&
                Object.keys(currentComponent.data.configs ?? {})?.map((key) => {
                  return settings[currentComponent.data.type][key].type ===
                    'dropdown' ? (
                    <CustomSelectField
                      key={key + currentComponent.data.label}
                      comp={key}
                      currentComponent={currentComponent}
                      defaultValue={currentComponent.data.configs[key] ?? null}
                    >
                      {servers &&
                        servers.map((serv) => (
                          <MenuItem value={serv}>{serv}</MenuItem>
                        ))}
                    </CustomSelectField>
                  ) : settings[currentComponent.data.type][key].type ===
                    'boolean' ? (
                    <CustomCheckBox
                      key={key + currentComponent.data.label}
                      comp={key}
                      currentComponent={currentComponent}
                      defaultValue={currentComponent.data.configs[key]}
                      dash={dash}
                    >
                      {/* <MenuItem value="true">True</MenuItem>
                      <MenuItem value="false">False</MenuItem> */}
                    </CustomCheckBox>
                  ) : settings[currentComponent.data.type][key].type ===
                    'dist' ? (
                    <CustomTextFieldDist
                      key={key + currentComponent.data.label}
                      comp={key}
                      value={
                        JSON.stringify(currentComponent.data.configs[key])
                          .length > 2
                          ? JSON.stringify(currentComponent.data.configs[key])
                          : ''
                      }
                      placeholder={JSON.stringify(weights)}
                      currentComponent={currentComponent}
                    />
                  ) : (
                    <CustomTextField
                      key={key + currentComponent.data.label}
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
