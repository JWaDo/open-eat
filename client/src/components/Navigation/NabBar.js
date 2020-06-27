import React, { useState } from 'react'

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import StoreIcon from '@material-ui/icons/Store';

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.primary.contrastText
    },
    shopLogo: {
        margin: theme.spacing(2)
    }
}));


const NavBar = () => {

    const classes = useStyles();

    return (
        <>
            <AppBar position="static">
                <Toolbar>

                    <Hidden mdDown>
                        <StoreIcon className={classes.shopLogo} />
                        <Typography variant="h6" className={classes.title}>Mario Karl Shop</Typography>
                    </Hidden> 

                </Toolbar>
            </AppBar>
        </>
    );
}
 
export default NavBar;