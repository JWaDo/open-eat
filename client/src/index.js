import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import myCustomTheme from './theme';
import { StoreProvider } from './store';
import { StateInspector } from "reinspect"

const theme = createMuiTheme(myCustomTheme);

ReactDOM.render(
  <React.StrictMode>

    <StateInspector>
    
    {/* Provider for store */}
      <StoreProvider>

        
        {/* Provider material ui theming */}
        <MuiThemeProvider theme={theme}>

          {/* The entire application */}
          <App />
          
        </MuiThemeProvider>
        
      </StoreProvider>

    </StateInspector>
    
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
