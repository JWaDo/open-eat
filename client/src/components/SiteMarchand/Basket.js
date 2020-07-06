import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import Skeleton from '@material-ui/lab/Skeleton';

import listings from '../../config/listings'

import { makeStyles } from '@material-ui/core/styles';
import { TvRounded } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(3)
    },  
    root: {
      maxWidth: 345,
      minHeight: 500,
      margin: "0.5rem",
      width: '100%'
    },
    selectedCard: {
        border: `2px solid ${theme.palette.primary.main}`
    },
    media: {
      height: 280,
    },
    cardActions: {
        justifyContent: "center",
    },
    box: {
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap"
    },
    total: {
        textTransform: 'uppercase',
        margin: "1rem",
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function Basket() {

    // Nom, prénom, mail + model

    const [open, setOpen] = useState(false);
    const [Listings, setListings] = useState(listings);
    
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [total, setTotal] = useState(0);
    const [loaded, setLoaded] = useState(false);
    

    const classes = useStyles();

    useEffect(() => {
        setTotal(Listings.reduce((accumulator, current) => {
            const { quantity, price } = current;
            return accumulator + (quantity > 0 ? quantity * price : 0)
        }, 0));
    }, [Listings]);

    useEffect(() => {
        handleImageLoad();
    },[]);
    
    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleImageLoad = () => {
        setLoaded(true);
    }
    

    const handleConfirm = () => {
        const basket = Listings.filter(listing => listing.quantity !== 0)
        const total = basket.reduce((accumulator, current) => {
            return current.price * current.quantity
        }, 0) 

        console.log({
            name,
            surname,
            email,
            billingAddress,
            deliveryAddress,
            basket,
            total
        })
    }

    return (
        <div className={classes.container}>
            <form>
                <Grid 
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    { Listings && Listings.map(listing => (
                        <Grid 
                            item
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            xs={12}
                            md={3}
                        >
                            <Card className={classes.root}>
                                { loaded ?
                                    <CardMedia
                                    className={classes.media}
                                    image={listing.image}
                                    /> 
                                :
                                    <Skeleton animation="wave" variant="rect" className={classes.media} />
                                }       
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    { loaded ?
                                        `${listing.name} - ${listing.price}€`
                                    :
                                        <Skeleton animation="wave"/>
                                    }
                                    
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="h5">
                                    { loaded ?
                                        `${listing.description}`
                                    :
                                        <Skeleton animation="wave"/>
                                    }
                                </Typography>
                                </CardContent>
                                <CardActions className={classes.cardActions}>
                                    <Button 
                                        size="medium" 
                                        color="primary"
                                        variant="text"
                                        disabled={listing.quantity === 0}
                                        onClick={() => setListings(Listings.map(l => listing === l ? {...listing, quantity: listing.quantity - 1 } : l))}
                                    >
                                        -
                                    </Button>
                                    <Typography 
                                        variant="body2"
                                        color={ listing.quantity > 0 ? "primary" : "textSecondary"}
                                        component="p"
                                    >
                                        { listing.quantity }
                                    </Typography>
                                    <Button 
                                        size="medium"
                                        color="primary"
                                        variant="text"
                                        onClick={() => setListings(Listings.map(l => listing === l ? {...listing, quantity: listing.quantity + 1 } : l))}
                                    >
                                        +
                                    </Button>
                                </CardActions>
                                </Card>
                        </Grid>
                    ))}
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={classes.price}
                >
                    <Grid
                        container
                        item
                        xs={12}
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                         <Typography 
                            variant="body2"
                            color="primary"
                            component="p"
                            className={classes.total}
                        >
                            Total to pay
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12}
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Typography variant="h3">{total} €</Typography>
                    </Grid>
                    <Grid
                        container
                        item
                        className={classes.total}
                        xs={12}
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Button 
                            color="primary"
                            variant="contained"
                            size="large"
                            disabled={total === 0}
                            onClick={handleOpen}
                        >
                            Confirm my order
                        </Button>
                    </Grid>
                </Grid>
               
            </form>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Order confirmation</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To confirm your order, you have to fill the fields below
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="surname"
                    label="Surnanme"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    type="text"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="email"
                    label="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="billingAddress"
                    label="Billing Address"
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    type="text"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="deliveryAddress"
                    label="Delivery Address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
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
        </div>
    )
}

export default Basket
