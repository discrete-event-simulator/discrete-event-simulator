import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useEffect, useState } from 'react';

import usePythonPath from './pythonPath';

const useStyles = makeStyles((theme: Theme) => ({
  envCanvas: {
    background: theme.palette.background.paper,
  },
}));

const EnvTestPage = () => {
  const [pythonPath, setPythonPath] = usePythonPath();

  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [version, setVersion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pyPath, setPyPath] = useState(pythonPath);

  const classes = useStyles();

  useEffect(() => {
    (window as any).electron.ipcRenderer.on('reply:test', (data: any) => {
      console.log('received', data);
      setError(data.err);
      setVersion(data.pythonVersion?.stdout);
      setResult(data.success);
      setLoading(false);
      if (data.success) {
        setPythonPath(pyPath);
      }
    });
  }, [setError, setResult, setLoading, setVersion, pyPath, setPythonPath]);

  const handleTest = () => {
    setLoading(true);
    (window as any).electron.ipcRenderer.send('test', {
      pythonPath: pyPath,
    });
  };

  useEffect(() => {
    handleTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePath = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setPyPath(value);
  };

  return (
    <Container
      className={classes.envCanvas}
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <Box
        style={{
          paddingTop: '10px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '20px',
        }}
      >
        <TextField
          defaultValue={pythonPath}
          onChange={handleChangePath}
          label="python path (optional)"
          type="text"
        />
        <Button disabled={loading} onClick={handleTest}>
          {loading ? <CircularProgress /> : 'Test'}
        </Button>
      </Box>
      {version && <Alert>Python version: {version}</Alert>}
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      {result && <Alert severity="success">ns.py found</Alert>}
    </Container>
  );
};

export default EnvTestPage;
