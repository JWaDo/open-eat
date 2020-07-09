import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StoreProvider } from './store';
import { StateInspector } from "reinspect"
import { SnackbarProvider } from 'notistack';
import CustomThemeProvider from './components/CustomThemeProvider';

ReactDOM.render(
  <React.StrictMode>

    <StateInspector>
    
      {/*  Provider for snackbar display ('notistack')  */}
      <SnackbarProvider maxSnack={1} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >

        {/* Provider material ui theming */}
        <CustomThemeProvider>
          {/* Provider for store */}
          <StoreProvider>

            {/* The entire application */}
            <App />

          </StoreProvider>
          
        </CustomThemeProvider>
      
      </SnackbarProvider>

    </StateInspector>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// Start the service worker
serviceWorker.register();
