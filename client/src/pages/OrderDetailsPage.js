import React, { useState, useEffect } from 'react'; 
import roles from '../configs/roles';
import NavBar from '../components/Navigation/NabBar';
import { Paper, makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    container: {
        width: "80%",
        margin: "3rem auto"
    },
    informations: {
        padding: "2rem",
    },
    informationsTable: {
        padding: "0 3rem",
    },
    informationContainer: {
        textAlign: "center",
        padding: "1rem",
    },
    informationTitle: {
        textTransform: "uppercase",
        color: theme.palette.primary.main
    },
    title: {
        textAlign: "center",
        paddingTop: "2rem",
        textTransform: "uppercase",
        color: theme.palette.primary.main
    }
    
  }));

function OrderDetails(props) {

    const [selectedItem, setSelectedItem] = useState(0);
    const classes = useStyles();
    const id = props.match.params.id;

    const mockDetails = {
        basket: [
            {
                name: "Blabla je suis une description",
                quantity: 13,
                price: 29,
            },
            {
                name: "Blabla je suis une description",
                quantity: 13,
                price: 29,
            },
            {
                name: "Blabla je suis une description",
                quantity: 13,
                price: 29,
            }
        ],
        name: "Charles",
        firstname: "Van Hamme",
        billingAdress: "4 avennue des lauriers 92700 Colombes",
        deliveryAdress: "4 avennue des lauriers 92700 Colombes",
        email: 'charles.vanhamme@gmail.com',
        total: 1587
    }

    useEffect(() => {
        if(!!id) { 
        // Fetch with given ID   
        }
    }, [])

    return (
        <>
            <NavBar 
                role={roles.TRADER}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
            />
            <Paper className={classes.container}>
                <Typography
                        className={classes.title}
                        variant="h3"
                >
                    Order details n°{ id }
                </Typography>

                <Grid
                    container
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    className={classes.informations}
                >
                    <Grid
                        item
                        className={classes.informationContainer}
                        xs="12"
                        md="4"
                    >
                        <Typography className={classes.informationTitle} variant="h6">Name</Typography>
                        <Typography variant="body">{mockDetails.name}</Typography>
                    </Grid>

                    <Grid
                        item
                        className={classes.informationContainer}
                        xs="12"
                        md="4"
                    >
                        <Typography className={classes.informationTitle} variant="h6">Firstname</Typography>
                        <Typography variant="body">{mockDetails.firstname}</Typography>
                    </Grid>

                    <Grid
                        item
                        className={classes.informationContainer}
                        xs="12"
                        md="4"
                    >
                        <Typography className={classes.informationTitle} variant="h6">Total</Typography>
                        <Typography variant="body">{mockDetails.total}</Typography>
                    </Grid>

                    <Grid
                        item
                        className={classes.informationContainer}
                        xs="12"
                        md="4"
                    >
                        <Typography className={classes.informationTitle} variant="h6">Email</Typography>
                        <Typography variant="body">{mockDetails.email}</Typography>
                    </Grid>
                    
                    <Grid
                        item
                        className={classes.informationContainer}
                        xs="12"
                        md="4"
                    >
                        <Typography className={classes.informationTitle} variant="h6">Billing adress</Typography>
                        <Typography variant="body">{mockDetails.billingAdress}</Typography>
                    </Grid>

                    
                    <Grid
                        item
                        className={classes.informationContainer}
                        xs="12"
                        md="4"
                    >
                        <Typography className={classes.informationTitle} variant="h6">Delivery adress</Typography>
                        <Typography variant="body">{mockDetails.deliveryAdress}</Typography>
                    </Grid>
                </Grid>
                
                <Grid
                    container
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    className={classes.informationsTable}
                >
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Subtotal</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {mockDetails.basket.map((mock) => (
                            <TableRow key={mock.name}>
                            <TableCell align="center">{mock.name}</TableCell>
                            <TableCell align="center">{mock.quantity}</TableCell>
                            <TableCell align="center">{mock.price}</TableCell>
                            <TableCell align="center">{ ((mock.quantity) * (mock.price)) }</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Grid>
            
                <Grid
                    container
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    className={classes.informations}
                >
                    <Grid
                        item
                        className={classes.informationContainer}
                        xs="12"
                    >
                        <Button fullWidth variant="contained" color="primary" size="large">Refund</Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default OrderDetails
