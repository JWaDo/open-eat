import React, { useEffect, useState } from 'react';
import Listings from './Listings.data';
import { Grid, Container, makeStyles, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Box, CircularProgress, IconButton } from '@material-ui/core';
import { FavoriteBorder as FavoriteBorderIcon, StarBorder as StarBorderIcon } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';

const useListinCardStyles = makeStyles(theme => ({

    card: {
        marginTop: theme.spacing(2),
    },
    media: {
        height: '200px',
        width: '100%',
        backgroundSize: 'cover',
    }
    
}));

function ListingsList() {

    const [listings, setListings] = useState([]);
    const [fetching, isFetching] = useState(true);

    const onChange = changes => {
        let _listings = listings;
        isFetching(true);
        changes.forEach(change => {
            if (change.type === 'added') {
                _listings.push({...change.doc.data(), id: change.doc.ref.id });
            } else {
                _listings = _listings.filter((l, index) =>  index !== change.oldIndex);
            }
            isFetching(false);
        });
        setListings([..._listings]);
    }
    
    useEffect(() => {
        Listings.getListings(onChange);
    }, []);

    if (fetching) return (<Box p={3} display='flex' justifyContent='center' alignItems='center'><CircularProgress color='primary' /></Box>)

    return (
        <div>
            <Container maxWidth='xl'>
                <Grid container spacing={2}>
                    { listings.map((listing, key) => <Listing key={key} listing={listing} />) }
                </Grid>
            </Container>
        </div>
    );
}

const Listing = ({ listing }) => {

    const classes = useListinCardStyles();
    const [mark, setMark] = useState(null);
    
    useEffect(() => {
        Listings.getMark(listing.id)
            .then(_mark => setMark(_mark));
    }, [mark]);
    
    
    
    
    return (
        <React.Fragment>
            <Grid className={classes.card} item xs={12} sm={3}>
                <Card>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={listing.img}
                            title={listing.title}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {listing.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {listing.description}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                        <Box width='100%' px={2}>
                            <Rating
                                name="customized-empty"
                                defaultValue={listing.avgRating}
                                precision={0.1}
                                value={mark}
                                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                readOnly
                            />
                        </Box>
                    <CardActions>
                        <IconButton size='small' color='primary'>
                            <FavoriteBorderIcon />
                        </IconButton>
                        <Button size="small" color="primary">
                            Order now
                        </Button>
                    </CardActions>
                </Card>
                
            </Grid>
        </React.Fragment>
    );
}

export default ListingsList;
