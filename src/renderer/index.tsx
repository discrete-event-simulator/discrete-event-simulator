import { render } from 'react-dom';
import App from './App';

import { StyledEngineProvider } from '@mui/material/styles';

render(<StyledEngineProvider injectFirst><App /></StyledEngineProvider>, document.getElementById('root'));
