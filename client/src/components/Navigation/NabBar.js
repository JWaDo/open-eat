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
import roles from '../../configs/roles';
import { navigate } from '../../routes';
import Brand from '../Global/Brand';

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.primary.contrastText
    },
    shopLogo: {
        margin: theme.spacing(2)
    },
    homePageLink: {
        cursor: 'pointer'
    }
}));


const NavBar = ({role, selectedItem, setSelectedItem}) => {
    
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setSelectedItem(newValue);
      };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid
                            container
                            items
                            xs={4}
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                            className={classes.homePageLink}
                            onClick={() => navigate.push("SiteMarchandPage")}
                        >
                            <Brand contrastText />
                        </Grid>

                        <Grid
                            container
                            items
                            xs={4}
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            { role === roles.TRADER && 
                                <Tabs value={selectedItem} onChange={handleChange}>
                                    <Tab label={"Orders"} onClick={() => navigate.push("OrdersPage")} />
                                    <Tab label={"Settings"} onClick={() => navigate.push("SettingsPage")}/>
                                </Tabs>
                            }
                        </Grid>
                        <Grid
                            container
                            items
                            xs={4}
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    );
}
 
export default NavBar;