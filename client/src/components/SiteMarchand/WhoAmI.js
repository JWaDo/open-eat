import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import roles from '../../configs/roles';
import salesLogo from '../../assets/sales.svg'
import { navigate } from '../../routes';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    container: {
        height: '95vh',
        backgroundImage: `url(${salesLogo})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    },
    WhoAmIButton: {
        textAlign: 'center'
    }
  }));


function WhoAmI() {

    const classes = useStyles();

    return (
        <Grid 
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.container}
        >
        
            <Grid 
                item
                xs={12}
                md={2}
                className={classes.WhoAmIButton}
            >
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    onClick={() => {
                        navigate.push("CustomerPage")
                    }}
                >
                    {roles.CUSTOMER}
                </Button>
            </Grid>

            <Grid 
                item
                xs={12}
                md={2}
                className={classes.WhoAmIButton}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    className={classes.button}
                    onClick={() => {
                        navigate.push("OrdersPage")
                    }}
                >
                    {roles.TRADER}
                </Button>
            </Grid>

            <Grid 
                item
                xs={12}
                md={2}
                className={classes.WhoAmIButton}
            >
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    onClick={() => {
                        navigate.push("DashboardPage")
                    }}
                >
                    {roles.ADMINISTRATOR}
                </Button>         
            </Grid>
        </Grid>
    )
}

export default WhoAmI
