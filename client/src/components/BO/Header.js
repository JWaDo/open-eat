import React, { useState } from 'react'
import { AppBar, Toolbar, Container, Box, Typography, IconButton, Button, useScrollTrigger, Slide, Dialog } from '@material-ui/core'
import { AccountBox as AccountBoxIcon, ExitToApp as ExitToAppIcon } from '@material-ui/icons'


function HideOnScroll({ children }) {
    const trigger = useScrollTrigger();
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
}

function Header({ username, credentials, logout, ...props}) {

    const [showCredentials, setShowCredentials] = useState(false);
    
    return (
        <React.Fragment>
            <HideOnScroll {...props}>
                <AppBar color='secondary' style={{zIndex: 100}}>
                    <Toolbar disableGutters>
                        <Container maxWidth='lg'>
                            <Box
                                width='100%'
                                display='flex' justifyContent='space-between' alignItems='center'
                            >
                                <Box display='flex' alignItems='center'>
                                    <IconButton onClick={() => setShowCredentials(true)}>
                                        <AccountBoxIcon color='primary' />
                                    </IconButton>
                                    <Typography color='primary'>
                                        {username}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Button 
                                        variant='outlined' color='primary' size='small'
                                        endIcon={<ExitToAppIcon />}
                                        onClick={logout}
                                    >
                                        Log out
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar/>
            <Dialog open={showCredentials} onClose={() => setShowCredentials(false)}>
                <Box p={3}>
                    <Box my={2}>
                        <Typography component='p' variant='h6' color='primary'>
                            Client token
                        </Typography>
                        <Typography component='p'>
                            {credentials.user}
                        </Typography>
                        <Typography component='p' variant='h6' color='primary'>
                            Client secret
                        </Typography>
                        <Typography component='p'>
                            {credentials.password}
                        </Typography>
                    </Box>
                    <Box>
                        <Button fullWidth variant='contained' color='primary'>
                            Renew credentials
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </React.Fragment>
    )
}



export default Header
