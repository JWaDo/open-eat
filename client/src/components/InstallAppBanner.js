import React, { useEffect, useState } from 'react'
import { Dialog, Typography, Button, Box } from '@material-ui/core';

function InstallAppBanner() {

    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [a2hs, setA2hs] = useState(false);
    
    useEffect(() => {

        // Save the before prompt event
        window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);

        // Remove event
        return () => window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
        
    }, []);
   
    const onBeforeInstallPrompt = e => {
        // Prevent the event
        e.preventDefault();
        // Memorized it
        setDeferredPrompt(e);
        // Must prompt the user to install the app
        setA2hs(true);
    }

    const installApp = e => {
        e.preventDefault();
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(choice => {
            if (choice.outcome === 'accepted') {
                console.log('You are a bavon.');
            } else {
                console.log('You are a looser.');
            }
            // Reblank the event
            setDeferredPrompt(null);
        });
    }
    
    return (
        <Dialog open={a2hs} onClose={() => setA2hs(false)}>
            <Box p={3}>

                <Typography variant='h6' color='primary'>
                    Install the application, and don't miss anything about us
                </Typography>
                <Button onClick={installApp} color='primary' variant='contained' fullWidth>
                    Install
                </Button>

            </Box>
        </Dialog>
    )
}

export default InstallAppBanner
