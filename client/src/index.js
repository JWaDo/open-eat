import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { StoreProvider } from './store';
import { StateInspector } from "reinspect"

ReactDOM.render(
  <React.StrictMode>

    <StateInspector>
    
    {/* Provider for store */}
      <StoreProvider>

        
        {/* Provider material ui theming */}
        <ThemeProvider theme={theme}>

          {/* The entire application */}
          <App />
          
        </ThemeProvider>
        
      </StoreProvider>

    </StateInspector>
    
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
