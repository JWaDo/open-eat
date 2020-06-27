import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import listings from '../../config/listings'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      margin: "0.5rem",
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
    price: {
        margin: "2rem"
    },
    total: {
        textTransform: 'uppercase',
        margin: "1rem",
    },
  });

function Basket() {

    const [Listings, setListings] = useState(listings);
    const [total, setTotal] = useState(0);
    const classes = useStyles();

    useEffect(() => {
        setTotal(Listings.reduce((accumulator, current) => {
            const { quantity, price } = current;
            return accumulator + (quantity > 0 ? quantity * price : 0)
        }, 0));
    }, [Listings])

    const handleConfirm = () => {
        alert("Your total is price is" + total);
        return Listings.filter(listing => listing.quantity !== 0); 
    }

    return (
        <div>
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
                                <CardMedia
                                className={classes.media}
                                image={listing.image}
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {listing.name} - {listing.price}€
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {listing.description}
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
                            onClick={handleConfirm}
                        >
                            Confirm my order
                        </Button>
                    </Grid>
                </Grid>
               
            </form>


            
        </div>
    )
}

export default Basket
