import React, { useState } from 'react'
import { AppBar, Toolbar, Container, Box, Typography, IconButton, Button, useScrollTrigger, Slide, Dialog } from '@material-ui/core'
import { AccountBox as AccountBoxIcon, ExitToApp as ExitToAppIcon } from '@material-ui/icons'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { navigate } from '../../routes';
import PrivateComponent from './Auth/PrivateComponent';


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
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
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
                               
                                <Box display='flex' alignItems='center'>
                                    <Box display='flex' alignItems='center'>
                                        <Tabs>
                                            <Tab label={"Dashboard"} onClick={() => navigate.push("DashboardPage")} />
                                            <Tab label={"Transactions"} onClick={() => navigate.push("TransactionsPage")} />
                                            <Tab label={"Customers"} onClick={() => navigate.push("CustomersPage")} />
                                        </Tabs>
                                    </Box>
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
            <PrivateComponent type='saler'>
                <Dialog open={showCredentials} onClose={() => setShowCredentials(false)}>
                    {
                        (credentials) && (
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
                        )
                    }
                </Dialog>
            </PrivateComponent>
        </React.Fragment>
    )
}



export default Header
