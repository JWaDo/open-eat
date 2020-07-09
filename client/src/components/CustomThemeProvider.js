import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { useSnackbar } from 'notistack';
import customTheme from '../theme';

/**
 * 
 * This custom theme provider provides a theme depending on the connection status
 */
function CustomThemeProvider({ children }) {

    const { enqueueSnackbar } = useSnackbar();
    const [theme, setTheme] = React.useState(createMuiTheme(customTheme));
    
    const onConnectionStatusChanged = () => {
        // Set the new connection status
        if (navigator.onLine) {
            enqueueSnackbar('Your connection is back', { variant: 'success', autoHideDuration: 3000 });
            //
            setTheme(createMuiTheme(customTheme));
        } else {
            enqueueSnackbar('Your are offline.', { variant: 'error', persist: true });
            setTheme(createMuiTheme({
                ...customTheme,
                palette: {
                    ...customTheme.palette,
                    primary: {
                        main: "#b5b5b5",
                        contrastText: '#fff',
                    },
                },
            }));
        }
    };

    React.useEffect(() => {

        // Add events
        window.addEventListener('online', onConnectionStatusChanged);
        window.addEventListener('offline', onConnectionStatusChanged);
        
        // Remove events
        return () => {
            window.removeEventListener('online', onConnectionStatusChanged);
            window.removeEventListener('offline', onConnectionStatusChanged);
        }
        
    }, []);
    
    return (
        <MuiThemeProvider theme={theme}>
            {children}
        </MuiThemeProvider>
    );
}

export default CustomThemeProvider
