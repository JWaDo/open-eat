import React, { useState, useEffect } from 'react'; 
import roles from '../configs/roles';
import NavBar from '../components/Navigation/NabBar';
import { Paper, makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
    const [amount, setAmount] = useState("");
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const id = props.match.params.id;

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        console.log("confirmed")
    }

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
                
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Order confirmation</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To confirm your order, you have to fill the fields below
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="amount"
                    label="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="text"
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="primary">
                    Confirm
                </Button>
                </DialogActions>
            </Dialog>
            </Paper>
        </>
    )
}

export default OrderDetails
