import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Collapse, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';

import CustomWeightField from './CustomWeightField';

const CustomListField = ({ weightData, setWeights }) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Grid
        item
        xs={12}
        onClick={() => setOpen((o) => !o)}
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography sx={{ color: (theme) => theme.palette.text.primary }}>
          Weights
        </Typography>
        {open ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
      </Grid>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        sx={{
          paddingLeft: '16px',
        }}
      >
        <Grid container spacing={2} sx={{ marginTop: '10px' }}>
          {weightData &&
            weightData.map((weight, index) => {
              return (
                <>
                  <CustomWeightField
                    key={index}
                    setWeights={setWeights}
                    index={index}
                    weight={weight}
                    comp={`Flow ${index}`}
                  />
                </>
              );
            })}
        </Grid>
      </Collapse>
    </>
  );
};

export default CustomListField;
