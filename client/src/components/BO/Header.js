import React from 'react'
import { AppBar, Toolbar, Container, Box, Typography, IconButton, Button, useScrollTrigger, Slide } from '@material-ui/core'
import { AccountBox as AccountBoxIcon, ExitToApp as ExitToAppIcon } from '@material-ui/icons'


function HideOnScroll({ children }) {
    const trigger = useScrollTrigger();
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
}

function Header({ username, logout, ...props}) {
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
                                    <IconButton>
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
        </React.Fragment>
    )
}



export default Header
