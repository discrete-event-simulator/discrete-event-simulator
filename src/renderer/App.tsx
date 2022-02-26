import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DemoPage from './pages/Demo';
import './App.css';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { orange, lightBlue, grey } from '@material-ui/core/colors';

let dash = { darkMode: true};
const mainPrimaryColor = dash.darkMode ? orange[500] : lightBlue[500];
const mainSecondaryColor = dash.darkMode ? grey[800] : '#E4E4E4';
const theme = createTheme({
  palette: {
    mode: dash.darkMode ? 'dark' : 'light',
    primary: {
      main: mainPrimaryColor,
    },
    secondary: {
      main: mainSecondaryColor,
    },
    error: {
      main: '#FF0000',
    },
    background: {
      paper: dash.darkMode ? '#252525' : '#FFFFFF',
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