import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DemoPage from './pages/Demo';
import './App.css';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#FF0000',
    },
    error: {
      main: '#FF0000',
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
