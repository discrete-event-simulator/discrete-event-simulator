import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Switch,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState, useContext } from 'react';

import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { ClassNames } from '@emotion/react';

enum NSCompoent {
  WIRE = 'Wire',
  SPLITTER = 'Splitter',
  PACKET_SINK = 'PacketSink',
}

const useStyles = makeStyles((theme: Theme) => ({
  demoCanvas: {
    background: theme.palette.background.paper,
  },
}));

const AppContext = React.createContext({
  dpgOut: '',
  setDpgOut: (out: string) => {},
  wireOut: '',
  setWireOut: (out: string) => {},
  parameters: {},
  setParameter: (key: string, value: number | string | boolean) => {},
  canRun: false,
  setCanRun: (value: boolean) => {},
});

const DPGCard = (props: { id: string }) => {
  const { setParameter } = useContext(AppContext);

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setParameter(`DPG_${props.id}:arrival_dist`, parseInt(value));
  };

  return (
    <Card sx={{ width: '300px' }}>
      <CardContent>DistPacketGenerator {props.id}</CardContent>
      <CardActions>
        <TextField
          label="arrival dist"
          type="number"
          defaultValue={1.5}
          onChange={handleChange}
        ></TextField>
      </CardActions>
    </Card>
  );
};

const DPGOutSelect = () => {
  const { setDpgOut } = useContext(AppContext);
  const [select, setSelect] = useState('');

  const handleChange = ({ target: { value } }: SelectChangeEvent) => {
    setSelect(String(value));
    setDpgOut(String(value));
  };

  const classes = useStyles();

  return (
    <FormControl className={classes.demoCanvas} sx={{ width: '600px' }}>
      <InputLabel>
        select component that will be connected to DPG out
      </InputLabel>
      <Select value={select} onChange={handleChange}>
        <MenuItem value={NSCompoent.WIRE}>Wire</MenuItem>
        <MenuItem value={NSCompoent.SPLITTER}>Splitter</MenuItem>
      </Select>
    </FormControl>
  );
};

const WireOutSelect = () => {
  const { setWireOut, setCanRun } = useContext(AppContext);
  const [select, setSelect] = useState('');

  const handleChange = ({ target: { value } }: SelectChangeEvent) => {
    setSelect(String(value));
    setWireOut(String(value));
    setCanRun(true);
  };

  const classes = useStyles();

  return (
    <FormControl className={classes.demoCanvas} sx={{ width: '600px' }}>
      <InputLabel>
        select component that will be connected to Wire out
      </InputLabel>
      <Select value={select} onChange={handleChange}>
        <MenuItem value={NSCompoent.PACKET_SINK}>Packet Sink</MenuItem>
      </Select>
    </FormControl>
  );
};

const WireCard = (props: { id: string }) => {
  const { setParameter } = useContext(AppContext);

  const defaultDelay = 0.1;

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setParameter(`Wire_${props.id}:delay`, parseInt(value));
  };

  return (
    <Card sx={{ width: '300px' }}>
      <CardContent>Wire {props.id}</CardContent>
      <CardActions>
        <TextField
          label="delay"
          type="number"
          defaultValue={defaultDelay}
          onChange={handleChange}
        ></TextField>
      </CardActions>
    </Card>
  );
};

const PacketSinkCard = () => {
  const { setParameter } = useContext(AppContext);

  const handleChange = ({
    target: { checked },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setParameter('PacketSink:rec_arrivals', checked);
  };

  const handleTesting = ({
    target: { checked },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setParameter('PacketSink:test_newScript', checked);
  };

  return (
    <Card sx={{ width: '300px' }}>
      <CardContent>PacketSink</CardContent>
      <CardActions>
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked onChange={handleChange} />}
            label="record arrivals"
          ></FormControlLabel>
          <FormControlLabel
            control={<Switch defaultChecked onChange={handleTesting} />}
            label="Testing using new script"
          ></FormControlLabel>
        </FormGroup>
      </CardActions>
    </Card>
  );
};

const DPGOutRow = () => {
  const { dpgOut } = useContext(AppContext);

  if (dpgOut === NSCompoent.WIRE) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '20px 0',
          }}
        >
          <WireCard id="1"></WireCard>
          <WireCard id="2"></WireCard>
        </div>
        <WireOutSelect></WireOutSelect>
      </div>
    );
  }
  if (dpgOut === NSCompoent.SPLITTER) {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: '20px',
        }}
      >
        <Card sx={{ width: '300px' }}>
          <CardContent>{dpgOut}</CardContent>
        </Card>
        <Card sx={{ width: '300px' }}>
          <CardContent>{dpgOut}</CardContent>
        </Card>
      </div>
    );
  }
  return <div></div>;
};

const ThirdRow = () => {
  const { wireOut } = useContext(AppContext);
  if (wireOut === NSCompoent.PACKET_SINK) {
    return (
      <div style={{ margin: '20px 0' }}>
        <PacketSinkCard />
      </div>
    );
  }
  return <div></div>;
};

const DemoPage = () => {
  const [dpgOut, setDpgOut] = useState('');
  const [wireOut, setWireOut] = useState('');
  const [parameters, setParameters] = useState({});
  const [canRun, setCanRun] = useState(false);

  const setParameter = (key: string, value: number | string | boolean) => {
    setParameters({
      ...parameters,
      [key]: value,
    });
  };

  useEffect(() => {
    (window as any).electron.ipcRenderer.on('reply', (data: any) => {
      console.log('received', data);
    });
  }, []);

  const handleRun = () => {
    console.log(dpgOut);
    console.log(wireOut);
    console.log(parameters);
    (window as any).electron.ipcRenderer.send('run', {
      dpgOut,
      wireOut,
      parameters,
    });
  };

  const classes = useStyles();

  return (
    <AppContext.Provider
      value={{
        dpgOut,
        setDpgOut,
        wireOut,
        setWireOut,
        parameters,
        setParameter,
        canRun,
        setCanRun,
      }}
    >
      <Container className={classes.demoCanvas}>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <DPGCard id="1"></DPGCard>
            <DPGCard id="2"></DPGCard>
          </Box>

          <DPGOutSelect></DPGOutSelect>

          <DPGOutRow></DPGOutRow>

          <ThirdRow></ThirdRow>

          <Button
            disabled={!canRun}
            sx={{ width: '300px', position: 'absolute', bottom: '40px' }}
            variant="contained"
            onClick={handleRun}
          >
            RUN
          </Button>
        </div>
      </Container>
    </AppContext.Provider>
  );
};

export default DemoPage;
